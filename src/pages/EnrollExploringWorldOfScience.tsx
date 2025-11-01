import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Users, Mail } from "lucide-react";
import { TeamInviteManager } from "@/components/invites/TeamInviteManager";
import { TeamMembersDisplay } from "@/components/team/TeamMembersDisplay";
import { useTranslation } from "react-i18next";
import { useTeamMembers } from "@/hooks/useTeamMembers";

export default function EnrollExploringWorldOfSciencePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { t } = useTranslation();

  // Form state - only captain and team info
  const [teamName, setTeamName] = useState("");
  const [track, setTrack] = useState(""); // aslc, space_ai, rocket_science
  const [subtrack, setSubtrack] = useState(""); // for rocket_science only
  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);
  const [teamMembership, setTeamMembership] = useState<any>(null);
  const [showInviteForm, setShowInviteForm] = useState(false);

  // Captain info from profile
  const captainFullName = profile?.full_name || "";
  const captainEmail = user?.email || "";
  
  // Get team members count
  const { members } = useTeamMembers(existingEnrollment?.id);

  useEffect(() => {
    document.title = `${t('form.applicationTitle')} — Открываем Мир Науки`;
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDesc.content = "Регистрация на международный конкурс Открываем Мир Науки 2026";
  }, [t]);

  // Check for existing enrollment and team membership
  useEffect(() => {
    const checkExisting = async () => {
      if (!user) return;

      // Check if user is a captain (has enrollment)
      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("competition_id", "exploring-world-of-science")
        .eq("status", "active")
        .maybeSingle();

      if (enrollmentData) {
        setExistingEnrollment(enrollmentData);
        setTeamName(enrollmentData.team_name || "");
        setTrack(enrollmentData.league || "");
        setSource(enrollmentData.source || "");
        setQuestions(enrollmentData.questions || "");
        setConsent(enrollmentData.consent || false);
        return;
      }

      // Check if user is a team member (invited participant)
      const { data: memberData } = await supabase
        .from("team_members")
        .select(`
          *,
          enrollments!inner (
            id,
            team_name,
            competition_id,
            league
          )
        `)
        .eq("user_id", user.id)
        .eq("status", "active")
        .eq("enrollments.competition_id", "exploring-world-of-science")
        .eq("enrollments.status", "active")
        .maybeSingle();

      if (memberData) {
        setTeamMembership(memberData);
      }
    };

    checkExisting();
  }, [user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile?.is_complete) {
      toast.error(t('enrollExploringWorldOfScience.formFillProfile'), {
        description: t('enrollExploringWorldOfScience.formFillProfileDesc')
      });
      navigate("/dashboard");
      return;
    }

    if (!track) {
      toast.error(t('enrollExploringWorldOfScience.formSelectTrack'));
      return;
    }

    if (track === "rocket_science" && !subtrack) {
      toast.error(t('enrollExploringWorldOfScience.formSelectRocketCategory'));
      return;
    }

    setSubmitting(true);

    try {
      const enrollmentData = {
        user_id: user!.id,
        competition_id: "exploring-world-of-science",
        team_name: teamName.trim(),
        league: track === "rocket_science" ? `${track}_${subtrack}` : track,
        captain_full_name: captainFullName,
        captain_iin: profile.iin,
        captain_phone: profile.phone,
        study_place: profile.school,
        city: profile.city,
        captain_grade: profile.grade?.toString(),
        captain_age: profile.age,
        email: captainEmail,
        telegram: profile.telegram,
        source: source.trim() || null,
        questions: questions.trim() || null,
        consent: consent,
        status: "active"
      };

      if (existingEnrollment) {
        // Update existing
        const { error } = await supabase
          .from("enrollments")
          .update(enrollmentData)
          .eq("id", existingEnrollment.id);

        if (error) throw error;
        toast.success(t('enrollExploringWorldOfScience.formApplicationUpdated'));
      } else {
        // Create new
        const { data, error } = await supabase
          .from("enrollments")
          .insert(enrollmentData)
          .select()
          .single();

        if (error) {
          if (error.code === '23505') {
            toast.error(t('enrollExploringWorldOfScience.formAlreadyRegistered'));
            navigate("/dashboard");
            return;
          }
          throw error;
        }

        // Create captain team_member entry
        await supabase
          .from("team_members")
          .insert({
            team_id: data.id,
            user_id: user!.id,
            competition_id: "exploring-world-of-science",
            role: 'captain',
            status: 'active',
            joined_at: new Date().toISOString()
          });

        setExistingEnrollment(data);
        toast.success(t('enrollExploringWorldOfScience.formTeamCreated'), {
          description: t('enrollExploringWorldOfScience.formNowInvite')
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(t('enrollExploringWorldOfScience.formRegistrationError'), { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">{t('form.loginRequired')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('form.loginDescription')}
            </p>
            <Button asChild>
              <Link to="/auth">{t('form.loginButton')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Team size limits by track
  const getMaxTeamSize = () => {
    if (track === "aslc") return 4;
    if (track === "space_ai") return 4;
    if (track === "rocket_science") return 2;
    return 4;
  };

  const getMinTeamSize = () => {
    if (track === "aslc") return 4; // ASLC requires exactly 4
    return 1; // Others have no minimum
  };

  const getTeamSizeDescription = () => {
    if (track === "aslc") return t('enrollExploringWorldOfScience.formAslcDesc');
    if (track === "space_ai") return t('enrollExploringWorldOfScience.formSpaceAiDesc');
    if (track === "rocket_science") return t('enrollExploringWorldOfScience.formRocketScienceDesc');
    return "";
  };

  // If user is already a team member (not captain), show message
  if (teamMembership && !existingEnrollment) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-success/30 bg-success/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{t('enrollExploringWorldOfScience.alreadyInTeam')}</h2>
                <p className="text-muted-foreground mb-2">
                  {t('enrollExploringWorldOfScience.teamLabel')}: <span className="font-semibold">{teamMembership.enrollments?.team_name}</span>
                </p>
                <p className="text-muted-foreground mb-6">
                  {t('enrollExploringWorldOfScience.trackLabel')}: <span className="font-semibold">{teamMembership.enrollments?.league}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {t('enrollExploringWorldOfScience.memberInfo')}
                </p>
                <Button asChild>
                  <Link to="/dashboard">{t('enrollExploringWorldOfScience.goToDashboard')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">
                  {existingEnrollment ? t('enrollExploringWorldOfScience.teamManagement') : t('enrollExploringWorldOfScience.teamCreation')}
                </h1>
                <p className="text-muted-foreground">{t('enrollExploringWorldOfScience.title')}</p>
              </div>
            </div>

            {/* Step Indicator */}
            {!existingEnrollment ? (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">{t('enrollExploringWorldOfScience.step1Title')}</p>
                    <p className="text-xs text-muted-foreground">{t('enrollExploringWorldOfScience.step1Desc')}</p>
                  </div>
                </div>
                <div className="h-px flex-1 bg-border" />
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-muted border-2 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">{t('enrollExploringWorldOfScience.step2Title')}</p>
                    <p className="text-xs text-muted-foreground">{t('enrollExploringWorldOfScience.step2Desc')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold">{t('enrollExploringWorldOfScience.stepCompleted')}</p>
                    <p className="text-xs text-muted-foreground">{t('enrollExploringWorldOfScience.stepCompletedDesc')}</p>
                  </div>
                </div>
                <div className="h-px flex-1 bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">{t('enrollExploringWorldOfScience.stepManageMembers')}</p>
                    <p className="text-xs text-muted-foreground">{t('enrollExploringWorldOfScience.stepManageMembersDesc')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* If team exists - show team management view */}
          {existingEnrollment ? (
            <div className="space-y-6">
              {/* Instructions Card */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{t('enrollExploringWorldOfScience.stage2Title')}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('enrollExploringWorldOfScience.stage2Description')}
                      </p>
                      <div className="text-sm space-y-1">
                        <p>{t('enrollExploringWorldOfScience.stage2Point1')}</p>
                        <p>{t('enrollExploringWorldOfScience.stage2Point2')}</p>
                        <p>🎯 {getTeamSizeDescription()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Info Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('enrollExploringWorldOfScience.teamInfo')}</h3>
                    <div className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                      {t('enrollExploringWorldOfScience.registered')}
                    </div>
                  </div>

                  {/* Editable Team Name */}
                  <div className="space-y-2">
                    <Label htmlFor="teamName">{t('enrollExploringWorldOfScience.teamName')}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder={t('enrollExploringWorldOfScience.teamNamePlaceholder')}
                      />
                      <Button 
                        onClick={async () => {
                          if (!teamName.trim()) {
                            toast.error(t('enrollExploringWorldOfScience.enterTeamName'));
                            return;
                          }
                          try {
                            const { error } = await supabase
                              .from("enrollments")
                              .update({ team_name: teamName.trim() })
                              .eq("id", existingEnrollment.id);
                            
                            if (error) throw error;
                            toast.success(t('enrollExploringWorldOfScience.updateSuccess'));
                          } catch (error: any) {
                            toast.error(t('enrollExploringWorldOfScience.updateError'), { description: error.message });
                          }
                        }}
                        variant="outline"
                      >
                        {t('enrollExploringWorldOfScience.saveButton')}
                      </Button>
                    </div>
                  </div>

                  {/* Read-only info */}
                  <div className="space-y-3 pt-4 border-t">
                    <div>
                      <Label className="text-muted-foreground">{t('enrollExploringWorldOfScience.category')}</Label>
                      <p className="text-sm font-medium mt-1">
                        {existingEnrollment.league === "aslc" && t('enrollExploringWorldOfScience.aslcCategory')}
                        {existingEnrollment.league === "space_ai" && t('enrollExploringWorldOfScience.spaceAiCategory')}
                        {existingEnrollment.league === "rocket_science_water" && t('enrollExploringWorldOfScience.rocketScienceWaterCategory')}
                        {existingEnrollment.league === "rocket_science_model" && t('enrollExploringWorldOfScience.rocketScienceModelCategory')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members List */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">{t('enrollExploringWorldOfScience.teamComposition')}</h3>
                      <span className="text-sm text-muted-foreground">
                        ({members.filter(m => m.status === 'active').length}/{getMaxTeamSize()})
                      </span>
                    </div>
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => setShowInviteForm(!showInviteForm)}
                      disabled={members.filter(m => m.status === 'active').length >= getMaxTeamSize()}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {showInviteForm ? t('enrollExploringWorldOfScience.hideInviteForm') : t('enrollExploringWorldOfScience.inviteByEmail')}
                    </Button>
                  </div>
                  
                  {/* Team validation warning for ASLC */}
                  {track === "aslc" && members.filter(m => m.status === 'active').length !== 4 && (
                    <div className="mb-4 p-3 rounded-lg bg-warning/10 border border-warning/30">
                      <p className="text-sm text-warning-foreground">
                        {t('enrollExploringWorldOfScience.aslcWarning')}
                      </p>
                    </div>
                  )}

                  {/* Team validation success for ASLC */}
                  {track === "aslc" && members.filter(m => m.status === 'active').length === 4 && (
                    <div className="mb-4 p-3 rounded-lg bg-success/10 border border-success/30">
                      <p className="text-sm text-success-foreground">
                        {t('enrollExploringWorldOfScience.aslcSuccess')}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <TeamMembersDisplay teamId={existingEnrollment.id} canManage={true} />
                  </div>
                </CardContent>
              </Card>

              {/* Invite Form - shown on button click */}
              {showInviteForm && (
                <Card className="border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">{t('enrollExploringWorldOfScience.sendInvites')}</h3>
                    </div>
                    
                    <div className="mb-4 p-4 rounded-lg bg-muted border">
                      <p className="text-sm font-medium mb-2">{t('enrollExploringWorldOfScience.howItWorks')}</p>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>{t('enrollExploringWorldOfScience.howItWorksStep1')}</li>
                        <li>{t('enrollExploringWorldOfScience.howItWorksStep2')}</li>
                        <li>{t('enrollExploringWorldOfScience.howItWorksStep3')}</li>
                        <li>{t('enrollExploringWorldOfScience.howItWorksStep4')}</li>
                      </ol>
                      <p className="text-sm font-medium mt-3 text-primary">
                        {getTeamSizeDescription()}
                      </p>
                    </div>
                    
                    <TeamInviteManager
                      teamId={existingEnrollment.id}
                      competitionId="exploring-world-of-science"
                      teamName={teamName}
                      maxTeamSize={getMaxTeamSize()}
                      currentTeamSize={members.filter(m => m.status === 'active').length}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            /* Registration Form - Only for new teams */
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Instructions */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{t('enrollExploringWorldOfScience.stage1Title')}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('enrollExploringWorldOfScience.stage1Description')}
                      </p>
                      <div className="text-sm space-y-1">
                        <p>{t('enrollExploringWorldOfScience.stage1Point1')}</p>
                        <p>{t('enrollExploringWorldOfScience.stage1Point2')}</p>
                        <p>{t('enrollExploringWorldOfScience.stage1Point3')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Team Name */}
                  <div className="space-y-2">
                    <Label htmlFor="teamName">{t('enrollExploringWorldOfScience.formTeamNameLabel')}</Label>
                    <Input
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder={t('enrollExploringWorldOfScience.teamNamePlaceholder')}
                      required
                    />
                  </div>

                  {/* Track Selection */}
                  <div className="space-y-2">
                    <Label>{t('enrollExploringWorldOfScience.formCategoryLabel')}</Label>
                    <Select value={track} onValueChange={setTrack} required>
                      <SelectTrigger>
                        <SelectValue placeholder={t('enrollExploringWorldOfScience.formCategoryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aslc">
                          <div className="flex items-center gap-2">
                            {t('enrollExploringWorldOfScience.aslcCategory')}
                          </div>
                        </SelectItem>
                        <SelectItem value="space_ai">
                          <div className="flex items-center gap-2">
                            {t('enrollExploringWorldOfScience.spaceAiCategory')}
                          </div>
                        </SelectItem>
                        <SelectItem value="rocket_science">
                          <div className="flex items-center gap-2">
                            🚀 Rocket Science
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {track === "aslc" && t('enrollExploringWorldOfScience.formAslcDesc')}
                      {track === "space_ai" && t('enrollExploringWorldOfScience.formSpaceAiDesc')}
                      {track === "rocket_science" && t('enrollExploringWorldOfScience.formRocketScienceDesc')}
                    </p>
                  </div>

                  {/* Rocket Science Subtrack */}
                  {track === "rocket_science" && (
                    <div className="space-y-2">
                      <Label>{t('enrollExploringWorldOfScience.formRocketCategoryLabel')}</Label>
                      <Select value={subtrack} onValueChange={setSubtrack} required>
                        <SelectTrigger>
                          <SelectValue placeholder={t('enrollExploringWorldOfScience.formCategoryPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="water">{t('enrollExploringWorldOfScience.formWaterRockets')}</SelectItem>
                          <SelectItem value="model">{t('enrollExploringWorldOfScience.formModelRockets')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Captain Info */}
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t('enrollExploringWorldOfScience.formCaptainTitle')}
                    </h3>
                    <p className="text-sm">{captainFullName}</p>
                    <p className="text-sm text-muted-foreground">{captainEmail}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard">{t('enrollExploringWorldOfScience.formEditProfile')}</Link>
                    </Button>
                  </div>

                  {/* Source */}
                  <div className="space-y-2">
                    <Label htmlFor="source">{t('enrollExploringWorldOfScience.formSourceLabel')}</Label>
                    <Input
                      id="source"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder={t('enrollExploringWorldOfScience.formSourcePlaceholder')}
                    />
                  </div>

                  {/* Questions */}
                  <div className="space-y-2">
                    <Label htmlFor="questions">{t('enrollExploringWorldOfScience.formQuestionsLabel')}</Label>
                    <Textarea
                      id="questions"
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      rows={3}
                      placeholder={t('enrollExploringWorldOfScience.formQuestionsPlaceholder')}
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked as boolean)}
                      required
                    />
                    <Label htmlFor="consent" className="text-sm">
                      {t('enrollExploringWorldOfScience.formConsentLabel').split('*')[0]}{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        {t('enrollExploringWorldOfScience.formTermsLink')}
                      </Link>{" "}
                      *
                    </Label>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={submitting || !consent}
                    >
                      {submitting ? t('enrollExploringWorldOfScience.formSubmitting') : t('enrollExploringWorldOfScience.formSubmitButton')}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      {t('enrollExploringWorldOfScience.formAfterCreation')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </form>
          )}

          {/* Team Management - Only shown after team is created */}
          {existingEnrollment && (
            <div className="mt-6">
              {/* Intentionally empty - team management is above */}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
