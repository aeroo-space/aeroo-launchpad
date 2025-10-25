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
import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import { safeParseEnrollment } from "@/lib/enrollmentValidation";

export default function EnrollSpaceSettlementPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { t } = useTranslation();

  // Form state
  const [teamName, setTeamName] = useState("");
  const [league, setLeague] = useState(""); // Junior or Senior
  const [teamMemberCount, setTeamMemberCount] = useState<number | null>(null);

  // Captain info
  const [captainFullName, setCaptainFullName] = useState("");
  const [captainIin, setCaptainIin] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainSchool, setCaptainSchool] = useState("");
  const [captainCity, setCaptainCity] = useState("");
  const [captainGrade, setCaptainGrade] = useState("");
  const [captainTelegram, setCaptainTelegram] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");

  // Participants (up to 4 additional members)
  const [participant1FullName, setParticipant1FullName] = useState("");
  const [participant1Iin, setParticipant1Iin] = useState("");
  const [participant1Phone, setParticipant1Phone] = useState("");
  const [participant1School, setParticipant1School] = useState("");
  const [participant1City, setParticipant1City] = useState("");
  const [participant1Grade, setParticipant1Grade] = useState("");

  const [participant2FullName, setParticipant2FullName] = useState("");
  const [participant2Iin, setParticipant2Iin] = useState("");
  const [participant2Phone, setParticipant2Phone] = useState("");
  const [participant2School, setParticipant2School] = useState("");
  const [participant2City, setParticipant2City] = useState("");
  const [participant2Grade, setParticipant2Grade] = useState("");

  const [participant3FullName, setParticipant3FullName] = useState("");
  const [participant3Iin, setParticipant3Iin] = useState("");
  const [participant3Phone, setParticipant3Phone] = useState("");
  const [participant3School, setParticipant3School] = useState("");
  const [participant3City, setParticipant3City] = useState("");
  const [participant3Grade, setParticipant3Grade] = useState("");

  const [participant4FullName, setParticipant4FullName] = useState("");
  const [participant4Iin, setParticipant4Iin] = useState("");
  const [participant4Phone, setParticipant4Phone] = useState("");
  const [participant4School, setParticipant4School] = useState("");
  const [participant4City, setParticipant4City] = useState("");
  const [participant4Grade, setParticipant4Grade] = useState("");

  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Helper functions
  const handlePhoneChange = (value: string, setter: (value: string) => void) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) {
      if (digits.startsWith('7') && digits.length >= 11) {
        formatted = '+7';
        if (digits.length > 1) formatted += ' ' + digits.slice(1, 4);
        if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
        if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
        if (digits.length > 9) formatted += ' ' + digits.slice(9, 11);
      } else if (digits.startsWith('8') && digits.length === 11) {
        const withoutEight = digits.slice(1);
        formatted = '+7 ' + withoutEight.slice(0, 3) + ' ' + withoutEight.slice(3, 6) + ' ' + withoutEight.slice(6, 8) + ' ' + withoutEight.slice(8, 10);
      } else if (digits.startsWith('7')) {
        formatted = '+7';
        if (digits.length > 1) formatted += ' ' + digits.slice(1, 4);
        if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
        if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
        if (digits.length > 9) formatted += ' ' + digits.slice(9, 11);
      } else {
        formatted = '+7';
        if (digits.length > 0) formatted += ' ' + digits.slice(0, 3);
        if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
        if (digits.length > 6) formatted += ' ' + digits.slice(6, 8);
        if (digits.length > 8) formatted += ' ' + digits.slice(8, 10);
      }
    }
    setter(formatted);
  };

  const handleTelegramChange = (value: string, setter: (value: string) => void) => {
    if (!value.startsWith('@') && value.length > 0) {
      setter('@' + value.replace(/^@+/, ''));
    } else {
      setter(value);
    }
  };

  // Pre-fill from profile
  useEffect(() => {
    if (profile) {
      setCaptainFullName(profile.full_name || "");
      setCaptainIin(profile.iin || "");
      setCaptainPhone(profile.phone || "");
      setCaptainSchool(profile.school || "");
      setCaptainCity(profile.city || "");
      setCaptainTelegram(profile.telegram || "");
      setCaptainGrade(profile.grade?.toString() || "");
    }
    if (user?.email) {
      setCaptainEmail(user.email);
    }
  }, [profile, user]);

  // SEO
  useEffect(() => {
    document.title = `${t('form.applicationTitle')} — Space Settlement 2025`;
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDesc.content = t('spaceSettlement.subtitle');
  }, [t]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build validation data structure
    const validationData: any = {
      teamName,
      league,
      captainFullName,
      captainIin,
      captainPhone,
      captainEmail,
      captainSchool,
      captainCity,
      captainGrade,
      captainAge: undefined, // Space Settlement doesn't use age
      captainTelegram: captainTelegram || undefined,
      source: source || undefined,
      questions: questions || undefined,
      consent
    };

    // Add participants based on team size
    if (teamMemberCount && teamMemberCount >= 2) {
      validationData.participant1 = {
        fullName: participant1FullName,
        iin: participant1Iin,
        phone: participant1Phone,
        school: participant1School,
        city: participant1City,
        grade: participant1Grade
      };
    }

    if (teamMemberCount && teamMemberCount >= 3) {
      validationData.participant2 = {
        fullName: participant2FullName,
        iin: participant2Iin,
        phone: participant2Phone,
        school: participant2School,
        city: participant2City,
        grade: participant2Grade
      };
    }

    if (teamMemberCount && teamMemberCount >= 4) {
      validationData.participant3 = {
        fullName: participant3FullName,
        iin: participant3Iin,
        phone: participant3Phone,
        school: participant3School,
        city: participant3City,
        grade: participant3Grade
      };
    }

    if (teamMemberCount && teamMemberCount >= 5) {
      validationData.participant4 = {
        fullName: participant4FullName,
        iin: participant4Iin,
        phone: participant4Phone,
        school: participant4School,
        city: participant4City,
        grade: participant4Grade
      };
    }

    // Validate using Zod schema
    const validation = safeParseEnrollment(validationData);
    
    if (!validation.success) {
      const errors = validation.error.errors.map(err => {
        const field = err.path.join('.');
        return `${field}: ${err.message}`;
      });
      toast.error("Ошибки валидации", {
        description: errors.slice(0, 3).join("\n") + (errors.length > 3 ? `\n... и еще ${errors.length - 3}` : "")
      });
      return;
    }

    setSubmitting(true);

    try {
      const enrollmentData: any = {
        user_id: user!.id,
        competition_id: "space-settlement",
        team_name: teamName.trim(),
        league: league,
        captain_full_name: captainFullName.trim(),
        captain_iin: captainIin.trim(),
        captain_phone: captainPhone.trim(),
        study_place: captainSchool.trim(),
        city: captainCity.trim(),
        captain_grade: captainGrade.trim(),
        email: captainEmail.trim(),
        telegram: captainTelegram.trim(),
        source: source.trim(),
        questions: questions.trim(),
        consent: consent,
        status: "active"
      };

      // Add participant data if team has more than 1 member
      if (teamMemberCount && teamMemberCount >= 2) {
        enrollmentData.participant1_full_name = participant1FullName.trim();
        enrollmentData.participant1_iin = participant1Iin.trim();
        enrollmentData.participant1_phone = participant1Phone.trim();
        enrollmentData.participant1_school = participant1School.trim();
        enrollmentData.participant1_city = participant1City.trim();
        enrollmentData.participant1_grade = participant1Grade.trim();
      }

      if (teamMemberCount && teamMemberCount >= 3) {
        enrollmentData.participant2_full_name = participant2FullName.trim();
        enrollmentData.participant2_iin = participant2Iin.trim();
        enrollmentData.participant2_phone = participant2Phone.trim();
        enrollmentData.participant2_school = participant2School.trim();
        enrollmentData.participant2_city = participant2City.trim();
        enrollmentData.participant2_grade = participant2Grade.trim();
      }

      if (teamMemberCount && teamMemberCount >= 4) {
        enrollmentData.participant3_full_name = participant3FullName.trim();
        enrollmentData.participant3_iin = participant3Iin.trim();
        enrollmentData.participant3_phone = participant3Phone.trim();
        enrollmentData.participant3_school = participant3School.trim();
        enrollmentData.participant3_city = participant3City.trim();
        enrollmentData.participant3_grade = participant3Grade.trim();
      }

      if (teamMemberCount && teamMemberCount >= 5) {
        enrollmentData.participant4_full_name = participant4FullName.trim();
        enrollmentData.participant4_iin = participant4Iin.trim();
        enrollmentData.participant4_phone = participant4Phone.trim();
        enrollmentData.participant4_school = participant4School.trim();
        enrollmentData.participant4_city = participant4City.trim();
        enrollmentData.participant4_grade = participant4Grade.trim();
      }

      const { data, error } = await supabase
        .from("enrollments")
        .insert(enrollmentData)
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast.error(t('spaceSettlement.alreadyRegistered'), {
            description: t('spaceSettlement.alreadyRegisteredDesc')
          });
          navigate("/dashboard");
          return;
        }
        throw error;
      }

      toast.success(t('spaceSettlement.submissionSuccess'), {
        description: t('spaceSettlement.submissionSuccessDesc')
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(t('spaceSettlement.submissionError'), {
        description: error.message
      });
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
            <p className="text-muted-foreground mb-4">{t('form.loginDescription')}</p>
            <Button asChild>
              <Link to="/auth">{t('form.loginButton')}</Link>
            </Button>
          </CardContent>
        </Card>
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
                <h1 className="text-3xl font-bold">{t('spaceSettlement.title')}</h1>
                <p className="text-muted-foreground">{t('spaceSettlement.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Team Name */}
                <div className="space-y-2">
                  <Label htmlFor="teamName">{t('spaceSettlement.teamName')} *</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder={t('spaceSettlement.teamNamePlaceholder')}
                    required
                  />
                </div>

                {/* League Selection */}
                <div className="space-y-2">
                  <Label>{t('spaceSettlement.league')} *</Label>
                  <Select value={league} onValueChange={setLeague} required>
                    <SelectTrigger>
                      <SelectValue placeholder={t('spaceSettlement.leagueSelect')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">{t('spaceSettlement.juniorLeague')}</SelectItem>
                      <SelectItem value="senior">{t('spaceSettlement.seniorLeague')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Member Count - Radio Buttons */}
                {captainFullName.trim() && captainIin.trim() && captainPhone.trim() && captainSchool.trim() && captainCity.trim() && captainGrade.trim() && (
                  <div className="space-y-2">
                    <Label>{t('spaceSettlement.teamMemberCount')} *</Label>
                    <div className="flex flex-col sm:flex-row gap-3 p-3 border border-input rounded-md bg-background">
                      {[1, 2, 3, 4, 5].map((count) => (
                        <label key={count} className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
                          <input
                            type="radio"
                            name="teamMemberCount"
                            value={count}
                            checked={teamMemberCount === count}
                            onChange={(e) => setTeamMemberCount(Number(e.target.value))}
                            className="w-4 h-4 text-primary border-2 border-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            required
                          />
                          <span className="text-sm font-medium">{count} {count === 1 ? t('spaceSettlement.participant') : count < 5 ? t('spaceSettlement.participants2to4') : t('spaceSettlement.participants5')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Captain Info */}
                <div className="bg-muted rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{t('spaceSettlement.participant1Captain')} *</h3>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard">
                        {t('spaceSettlement.editProfile')}
                      </Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="captain-name">{t('spaceSettlement.fullName')} *</Label>
                      <Input
                        id="captain-name"
                        value={captainFullName}
                        placeholder={t('spaceSettlement.fullNamePlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captain-iin">{t('spaceSettlement.iin')} *</Label>
                      <Input
                        id="captain-iin"
                        value={captainIin}
                        placeholder={t('spaceSettlement.iinPlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captain-phone">{t('spaceSettlement.phone')} *</Label>
                      <Input
                        id="captain-phone"
                        value={captainPhone}
                        placeholder={t('spaceSettlement.phonePlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captain-school">{t('spaceSettlement.school')} *</Label>
                      <Input
                        id="captain-school"
                        value={captainSchool}
                        placeholder={t('spaceSettlement.schoolPlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captain-city">{t('spaceSettlement.city')} *</Label>
                      <Input
                        id="captain-city"
                        value={captainCity}
                        placeholder={t('spaceSettlement.cityPlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captain-grade">{t('spaceSettlement.grade')} *</Label>
                      <Input
                        id="captain-grade"
                        value={captainGrade}
                        placeholder={t('spaceSettlement.gradePlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captain-email">{t('spaceSettlement.email')} *</Label>
                      <Input
                        id="captain-email"
                        value={captainEmail}
                        placeholder={t('spaceSettlement.emailPlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captain-telegram">{t('spaceSettlement.telegram')} *</Label>
                      <Input
                        id="captain-telegram"
                        value={captainTelegram}
                        placeholder={t('spaceSettlement.telegramPlaceholder')}
                        readOnly
                        className="bg-muted-foreground/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Participants */}
                {teamMemberCount && teamMemberCount > 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mt-6">{t('spaceSettlement.additionalParticipants')}</h3>

                    {/* Participant 2 */}
                    {teamMemberCount >= 2 && (
                      <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                        <h4 className="font-medium">{t('spaceSettlement.participant2')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.fullName')}</Label>
                            <Input
                              value={participant1FullName}
                              onChange={(e) => setParticipant1FullName(e.target.value)}
                              placeholder={t('spaceSettlement.fullNamePlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.iin')}</Label>
                            <Input
                              value={participant1Iin}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant1Iin(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.iinPlaceholder')}
                              maxLength={12}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.phone')} *</Label>
                            <Input
                              value={participant1Phone}
                              onChange={(e) => handlePhoneChange(e.target.value, setParticipant1Phone)}
                              placeholder={t('spaceSettlement.phonePlaceholder')}
                              required={teamMemberCount >= 2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.school')}</Label>
                            <Input
                              value={participant1School}
                              onChange={(e) => setParticipant1School(e.target.value)}
                              placeholder={t('spaceSettlement.schoolPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.city')}</Label>
                            <Input
                              value={participant1City}
                              onChange={(e) => setParticipant1City(e.target.value)}
                              placeholder={t('spaceSettlement.cityPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.grade')}</Label>
                            <Input
                              value={participant1Grade}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant1Grade(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.gradePlaceholder')}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Participant 3 */}
                    {teamMemberCount >= 3 && (
                      <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                        <h4 className="font-medium">{t('spaceSettlement.participant3')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.fullName')}</Label>
                            <Input
                              value={participant2FullName}
                              onChange={(e) => setParticipant2FullName(e.target.value)}
                              placeholder={t('spaceSettlement.fullNamePlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.iin')}</Label>
                            <Input
                              value={participant2Iin}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant2Iin(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.iinPlaceholder')}
                              maxLength={12}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.phone')} *</Label>
                            <Input
                              value={participant2Phone}
                              onChange={(e) => handlePhoneChange(e.target.value, setParticipant2Phone)}
                              placeholder={t('spaceSettlement.phonePlaceholder')}
                              required={teamMemberCount >= 3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.school')}</Label>
                            <Input
                              value={participant2School}
                              onChange={(e) => setParticipant2School(e.target.value)}
                              placeholder={t('spaceSettlement.schoolPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.city')}</Label>
                            <Input
                              value={participant2City}
                              onChange={(e) => setParticipant2City(e.target.value)}
                              placeholder={t('spaceSettlement.cityPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.grade')}</Label>
                            <Input
                              value={participant2Grade}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant2Grade(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.gradePlaceholder')}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Participant 4 */}
                    {teamMemberCount >= 4 && (
                      <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                        <h4 className="font-medium">{t('spaceSettlement.participant4')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.fullName')}</Label>
                            <Input
                              value={participant3FullName}
                              onChange={(e) => setParticipant3FullName(e.target.value)}
                              placeholder={t('spaceSettlement.fullNamePlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.iin')}</Label>
                            <Input
                              value={participant3Iin}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant3Iin(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.iinPlaceholder')}
                              maxLength={12}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.phone')} *</Label>
                            <Input
                              value={participant3Phone}
                              onChange={(e) => handlePhoneChange(e.target.value, setParticipant3Phone)}
                              placeholder={t('spaceSettlement.phonePlaceholder')}
                              required={teamMemberCount >= 4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.school')}</Label>
                            <Input
                              value={participant3School}
                              onChange={(e) => setParticipant3School(e.target.value)}
                              placeholder={t('spaceSettlement.schoolPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.city')}</Label>
                            <Input
                              value={participant3City}
                              onChange={(e) => setParticipant3City(e.target.value)}
                              placeholder={t('spaceSettlement.cityPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.grade')}</Label>
                            <Input
                              value={participant3Grade}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant3Grade(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.gradePlaceholder')}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Participant 5 */}
                    {teamMemberCount >= 5 && (
                      <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                        <h4 className="font-medium">{t('spaceSettlement.participant5')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.fullName')}</Label>
                            <Input
                              value={participant4FullName}
                              onChange={(e) => setParticipant4FullName(e.target.value)}
                              placeholder={t('spaceSettlement.fullNamePlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.iin')}</Label>
                            <Input
                              value={participant4Iin}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant4Iin(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.iinPlaceholder')}
                              maxLength={12}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.phone')}</Label>
                            <Input
                              value={participant4Phone}
                              onChange={(e) => handlePhoneChange(e.target.value, setParticipant4Phone)}
                              placeholder={t('spaceSettlement.phonePlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.school')}</Label>
                            <Input
                              value={participant4School}
                              onChange={(e) => setParticipant4School(e.target.value)}
                              placeholder={t('spaceSettlement.schoolPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.city')}</Label>
                            <Input
                              value={participant4City}
                              onChange={(e) => setParticipant4City(e.target.value)}
                              placeholder={t('spaceSettlement.cityPlaceholder')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('spaceSettlement.grade')}</Label>
                            <Input
                              value={participant4Grade}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');
                                setParticipant4Grade(digitsOnly);
                              }}
                              placeholder={t('spaceSettlement.gradePlaceholder')}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mt-6">{t('spaceSettlement.additionalInfo')}</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="source">{t('spaceSettlement.source')}</Label>
                    <Textarea
                      id="source"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder={t('spaceSettlement.sourcePlaceholder')}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="questions">{t('spaceSettlement.questions')}</Label>
                    <Textarea
                      id="questions"
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      placeholder={t('spaceSettlement.questionsPlaceholder')}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-start space-x-3 p-4 border border-border rounded-lg bg-muted/50">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    {t('spaceSettlement.consentText')}{" "}
                    <Link to="/terms" className="text-primary underline" target="_blank">
                      {t('spaceSettlement.termsLink')}
                    </Link>{" "}
                    {t('spaceSettlement.and')}{" "}
                    <Link to="/privacy" className="text-primary underline" target="_blank">
                      {t('spaceSettlement.privacyLink')}
                    </Link>
                    {t('spaceSettlement.consentConfirm')}
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={submitting}
                  >
                    {t('spaceSettlement.cancel')}
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? t('spaceSettlement.submitting') : t('spaceSettlement.submit')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
