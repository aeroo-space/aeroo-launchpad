import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { competitions } from "@/data/competitions";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import { safeParseEnrollment } from "@/lib/enrollmentValidation";

export default function EnrollPage() {
  const { competitionId } = useParams<{ competitionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, refetch } = useProfile();
  const { t } = useTranslation();
  
  // Check if we're in edit mode based on URL params
  const urlParams = new URLSearchParams(window.location.search);
  const editEnrollmentId = urlParams.get('edit');

  const competition = useMemo(() => competitions.find(c => c.id === competitionId), [competitionId]);
  // Use competition.status (i18n key) but don't rely on translations to determine openness
  const statusText = competition ? t(competition.status, { defaultValue: competition.status }) : "";
  
  // List of competitions with open registration
  const openCompetitions = [
    "space-settlement",
    "exploring-world-of-science",
    "satellite-launch",
    "ai-challenge",
    "rocket-science"
  ];
  
  const isOpen = competition && openCompetitions.includes(competition.id);

  // SEO
  useEffect(() => {
    const title = competition
      ? `${t('form.applicationTitle')} — ${competition.title}`
      : `${t('form.applicationTitle')} — AEROO`;
    document.title = title;
    const metaDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement) || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDesc.content = competition
      ? `${t('form.metaDescription')} ${competition.title}.`
      : t('form.metaDescriptionGeneral');
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + `/enroll/${competitionId ?? ''}`;
  }, [competition, competitionId]);

  // Form state
  const [teamName, setTeamName] = useState("");
  const [league, setLeague] = useState(""); // Competition category
  const [teamMemberCount, setTeamMemberCount] = useState<number | null>(null);

  // Captain info (pre-filled from profile)
  const [captainFullName, setCaptainFullName] = useState("");
  const [captainIin, setCaptainIin] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainSchool, setCaptainSchool] = useState("");
  const [captainCity, setCaptainCity] = useState("");
  const [captainGrade, setCaptainGrade] = useState("");
  const [captainTelegram, setCaptainTelegram] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainAge, setCaptainAge] = useState("");

  // Participants
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

  // Mentor
  const [mentorFullName, setMentorFullName] = useState("");
  const [mentorIin, setMentorIin] = useState("");
  const [mentorPhone, setMentorPhone] = useState("");
  const [mentorSchool, setMentorSchool] = useState("");
  const [mentorCity, setMentorCity] = useState("");
  const [mentorTelegram, setMentorTelegram] = useState("");

  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [dupOpen, setDupOpen] = useState(false);
  const [dupName, setDupName] = useState("");

  // Helper functions for input validation
  const handleDigitsOnlyChange = (value: string, setter: (value: string) => void) => {
    const digitsOnly = value.replace(/\D/g, '');
    setter(digitsOnly);
  };

  const handleTelegramChange = (value: string, setter: (value: string) => void) => {
    if (!value.startsWith('@') && value.length > 0) {
      setter('@' + value.replace(/^@+/, ''));
    } else {
      setter(value);
    }
  };

  const handlePhoneChange = (value: string, setter: (value: string) => void) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as +7 XXX XXX XX XX
    let formatted = '';
    if (digits.length > 0) {
      if (digits.startsWith('7') && digits.length >= 11) {
        // Handle numbers starting with 7 (like 77479494560)
        formatted = '+7';
        if (digits.length > 1) {
          formatted += ' ' + digits.slice(1, 4);
        }
        if (digits.length > 4) {
          formatted += ' ' + digits.slice(4, 7);
        }
        if (digits.length > 7) {
          formatted += ' ' + digits.slice(7, 9);
        }
        if (digits.length > 9) {
          formatted += ' ' + digits.slice(9, 11);
        }
      } else if (digits.startsWith('8') && digits.length === 11) {
        // Convert 8XXXXXXXXXX to +7XXXXXXXXXX
        const withoutEight = digits.slice(1);
        formatted = '+7 ' + withoutEight.slice(0, 3) + ' ' + withoutEight.slice(3, 6) + ' ' + withoutEight.slice(6, 8) + ' ' + withoutEight.slice(8, 10);
      } else if (digits.startsWith('7')) {
        // Handle partial numbers starting with 7
        formatted = '+7';
        if (digits.length > 1) {
          formatted += ' ' + digits.slice(1, 4);
        }
        if (digits.length > 4) {
          formatted += ' ' + digits.slice(4, 7);
        }
        if (digits.length > 7) {
          formatted += ' ' + digits.slice(7, 9);
        }
        if (digits.length > 9) {
          formatted += ' ' + digits.slice(9, 11);
        }
      } else {
        // Start with +7 for any other input
        formatted = '+7';
        if (digits.length > 0) {
          formatted += ' ' + digits.slice(0, 3);
        }
        if (digits.length > 3) {
          formatted += ' ' + digits.slice(3, 6);
        }
        if (digits.length > 6) {
          formatted += ' ' + digits.slice(6, 8);
        }
        if (digits.length > 8) {
          formatted += ' ' + digits.slice(8, 10);
        }
      }
    }
    
    setter(formatted);
  };

  // Pre-fill captain data from profile and update when profile changes
  useEffect(() => {
    if (profile) {
      setCaptainFullName(profile.full_name || "");
      setCaptainIin(profile.iin || "");
      setCaptainPhone(profile.phone || "");
      setCaptainSchool(profile.school || "");
      setCaptainCity(profile.city || "");
      setCaptainTelegram(profile.telegram || "");
      setCaptainGrade(profile.grade?.toString() || "");
      setCaptainAge(profile.age?.toString() || "");
    }
    if (user?.email) {
      setCaptainEmail(user.email);
    }
  }, [profile, user]);

  // Check for existing enrollment and prefill form if editing
  useEffect(() => {
    let isMounted = true;
    
    const checkExistingEnrollment = async () => {
      if (!user || !competitionId) return;
      
      try {
        let enrollmentData = null;
        
        if (editEnrollmentId) {
          // Edit mode - fetch specific enrollment by ID
          const { data, error } = await supabase
            .from("enrollments")
            .select("*")
            .eq("id", editEnrollmentId)
            .eq("user_id", user.id) // Security check
            .single();
          
          if (error) {
            console.error("Error fetching enrollment for edit:", error);
            toast.error(t('form.enrollmentNotFound'));
            navigate('/dashboard');
            return;
          }
          
          enrollmentData = data;
          if (isMounted) setIsEditMode(true);
        } else {
          // Regular mode - check for existing enrollment
          const { data, error } = await supabase
            .from("enrollments")
            .select("*")
            .eq("user_id", user.id)
            .eq("competition_id", competitionId)
            .eq("status", "active")
            .maybeSingle();
            
          if (error) {
            console.error("Error checking existing enrollment:", error);
            return;
          }
          
          enrollmentData = data;
          if (isMounted) setIsEditMode(false);
        }

        if (enrollmentData && isMounted) {
          setExistingEnrollment(enrollmentData);
          
          // Batch all state updates to prevent multiple re-renders
          const updates = {
            teamName: enrollmentData.team_name || "",
            league: enrollmentData.league || "",
            captainEmail: enrollmentData.email || "",
            captainTelegram: enrollmentData.telegram || "",
            captainFullName: enrollmentData.captain_full_name || "",
            captainPhone: enrollmentData.captain_phone || "",
            captainAge: enrollmentData.captain_age?.toString() || "",
            captainIin: enrollmentData.captain_iin || "",
            captainGrade: enrollmentData.captain_grade || "",
            captainCity: enrollmentData.city || "",
            captainSchool: enrollmentData.study_place || "",
            source: enrollmentData.source || "",
            questions: enrollmentData.questions || "",
            consent: enrollmentData.consent || false
          };
          
          // Apply all updates at once
          setTeamName(updates.teamName);
          setLeague(updates.league);
          setCaptainEmail(updates.captainEmail);
          setCaptainTelegram(updates.captainTelegram);
          setCaptainFullName(updates.captainFullName);
          setCaptainPhone(updates.captainPhone);
          setCaptainAge(updates.captainAge);
          setCaptainIin(updates.captainIin);
          setCaptainGrade(updates.captainGrade);
          setCaptainCity(updates.captainCity);
          setCaptainSchool(updates.captainSchool);
          setSource(updates.source);
          setQuestions(updates.questions);
          setConsent(updates.consent);
          
          // Set team member count based on existing data
          let memberCount = 1; // Captain only
          if (enrollmentData.participant4_full_name) memberCount = 5;
          else if (enrollmentData.participant3_full_name) memberCount = 4;
          else if (enrollmentData.participant2_full_name) memberCount = 3;
          else if (enrollmentData.participant1_full_name) memberCount = 2;
          setTeamMemberCount(memberCount);
          
          // Prefill participant data
          setParticipant1FullName(enrollmentData.participant1_full_name || "");
          setParticipant1Iin(enrollmentData.participant1_iin || "");
          setParticipant1Phone(enrollmentData.participant1_phone || "");
          setParticipant1School(enrollmentData.participant1_school || "");
          setParticipant1City(enrollmentData.participant1_city || "");
          setParticipant1Grade(enrollmentData.participant1_grade || "");
          
          setParticipant2FullName(enrollmentData.participant2_full_name || "");
          setParticipant2Iin(enrollmentData.participant2_iin || "");
          setParticipant2Phone(enrollmentData.participant2_phone || "");
          setParticipant2School(enrollmentData.participant2_school || "");
          setParticipant2City(enrollmentData.participant2_city || "");
          setParticipant2Grade(enrollmentData.participant2_grade || "");
          
          setParticipant3FullName(enrollmentData.participant3_full_name || "");
          setParticipant3Iin(enrollmentData.participant3_iin || "");
          setParticipant3Phone(enrollmentData.participant3_phone || "");
          setParticipant3School(enrollmentData.participant3_school || "");
          setParticipant3City(enrollmentData.participant3_city || "");
          setParticipant3Grade(enrollmentData.participant3_grade || "");
          
          setParticipant4FullName(enrollmentData.participant4_full_name || "");
          setParticipant4Iin(enrollmentData.participant4_iin || "");
          setParticipant4Phone(enrollmentData.participant4_phone || "");
          setParticipant4School(enrollmentData.participant4_school || "");
          setParticipant4City(enrollmentData.participant4_city || "");
          setParticipant4Grade(enrollmentData.participant4_grade || "");
          
          // Prefill mentor data
          setMentorFullName(enrollmentData.mentor_full_name || "");
          setMentorIin(enrollmentData.mentor_iin || "");
          setMentorPhone(enrollmentData.mentor_phone || "");
          setMentorSchool(enrollmentData.mentor_school || "");
          setMentorCity(enrollmentData.mentor_city || "");
          setMentorTelegram(enrollmentData.mentor_telegram || "");
        }
      } catch (error) {
        console.error("Error in checkExistingEnrollment:", error);
      }
    };
    
    checkExistingEnrollment();
    
    return () => {
      isMounted = false;
    };
  }, [user, competitionId, editEnrollmentId, navigate]);

  // Refetch profile when user comes to the page to ensure latest data
  useEffect(() => {
    if (user && refetch) {
      refetch();
    }
  }, [user, refetch]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitionId) return;
    
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
      captainAge: captainAge || undefined,
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

    // Add mentor if provided
    if (mentorFullName.trim()) {
      validationData.mentor = {
        fullName: mentorFullName,
        iin: mentorIin || undefined,
        phone: mentorPhone || undefined,
        school: mentorSchool || undefined,
        city: mentorCity || undefined,
        telegram: mentorTelegram || undefined
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

    const enrollmentData = {
      user_id: user?.id,
      competition_id: competitionId,
      team_name: teamName,
      league: league,
      status: "active",

      // Captain info
      captain_full_name: captainFullName,
      captain_iin: captainIin,
      captain_phone: captainPhone,
      captain_grade: captainGrade,
      captain_age: parseInt(captainAge) || null,
      city: captainCity,
      study_place: captainSchool,
      email: captainEmail,
      telegram: captainTelegram,

      // Participants - clear unused participants based on team size
      participant1_full_name: teamMemberCount && teamMemberCount >= 2 ? (participant1FullName || null) : null,
      participant1_iin: teamMemberCount && teamMemberCount >= 2 ? (participant1Iin || null) : null,
      participant1_phone: teamMemberCount && teamMemberCount >= 2 ? (participant1Phone || null) : null,
      participant1_school: teamMemberCount && teamMemberCount >= 2 ? (participant1School || null) : null,
      participant1_city: teamMemberCount && teamMemberCount >= 2 ? (participant1City || null) : null,
      participant1_grade: teamMemberCount && teamMemberCount >= 2 ? (participant1Grade || null) : null,

      participant2_full_name: teamMemberCount && teamMemberCount >= 3 ? (participant2FullName || null) : null,
      participant2_iin: teamMemberCount && teamMemberCount >= 3 ? (participant2Iin || null) : null,
      participant2_phone: teamMemberCount && teamMemberCount >= 3 ? (participant2Phone || null) : null,
      participant2_school: teamMemberCount && teamMemberCount >= 3 ? (participant2School || null) : null,
      participant2_city: teamMemberCount && teamMemberCount >= 3 ? (participant2City || null) : null,
      participant2_grade: teamMemberCount && teamMemberCount >= 3 ? (participant2Grade || null) : null,

      participant3_full_name: teamMemberCount && teamMemberCount >= 4 ? (participant3FullName || null) : null,
      participant3_iin: teamMemberCount && teamMemberCount >= 4 ? (participant3Iin || null) : null,
      participant3_phone: teamMemberCount && teamMemberCount >= 4 ? (participant3Phone || null) : null,
      participant3_school: teamMemberCount && teamMemberCount >= 4 ? (participant3School || null) : null,
      participant3_city: teamMemberCount && teamMemberCount >= 4 ? (participant3City || null) : null,
      participant3_grade: teamMemberCount && teamMemberCount >= 4 ? (participant3Grade || null) : null,

      participant4_full_name: teamMemberCount && teamMemberCount >= 5 ? (participant4FullName || null) : null,
      participant4_iin: teamMemberCount && teamMemberCount >= 5 ? (participant4Iin || null) : null,
      participant4_phone: teamMemberCount && teamMemberCount >= 5 ? (participant4Phone || null) : null,
      participant4_school: teamMemberCount && teamMemberCount >= 5 ? (participant4School || null) : null,
      participant4_city: teamMemberCount && teamMemberCount >= 5 ? (participant4City || null) : null,
      participant4_grade: teamMemberCount && teamMemberCount >= 5 ? (participant4Grade || null) : null,

      // Mentor
      mentor_full_name: mentorFullName || null,
      mentor_iin: mentorIin || null,
      mentor_phone: mentorPhone || null,
      mentor_school: mentorSchool || null,
      mentor_city: mentorCity || null,
      mentor_telegram: mentorTelegram || null,

      source: source || null,
      questions: questions || null,
      consent,
    };

    const { error } = (isEditMode || editEnrollmentId) && existingEnrollment
      ? await supabase.from("enrollments").update(enrollmentData).eq("id", existingEnrollment.id)
      : await supabase.from("enrollments").insert(enrollmentData);

    setSubmitting(false);
    if (error) {
      if (error.code === "23505") {
        const compName = competition?.title || competitionId;
        setDupName(compName);
        setDupOpen(true);
      } else {
        toast.error(t('form.toastSubmitError'), { description: error.message });
      }
      return;
    }

    // Send confirmation email for new registrations
    if (!isEditMode && !editEnrollmentId) {
      try {
        console.log("Attempting to send confirmation email...");
        
        const participants = [
          { name: captainFullName, role: 'Капитан команды' },
          ...(participant1FullName ? [{ name: participant1FullName, role: 'Участник' }] : []),
          ...(participant2FullName ? [{ name: participant2FullName, role: 'Участник' }] : []),
          ...(participant3FullName ? [{ name: participant3FullName, role: 'Участник' }] : []),
          ...(participant4FullName ? [{ name: participant4FullName, role: 'Участник' }] : []),
          ...(mentorFullName ? [{ name: mentorFullName, role: 'Ментор' }] : []),
        ];

        const emailData = {
          captainEmail: captainEmail,
          captainName: captainFullName,
          teamName: teamName,
          competitionTitle: competition?.title || 'Соревнование',
          participants: participants
        };

        console.log("Email data:", emailData);

        const emailResult = await supabase.functions.invoke('send-enrollment-confirmation', {
          body: emailData
        });

        if (emailResult.error) {
          console.error('Email function error:', emailResult.error);
          throw new Error(`Email sending failed: ${emailResult.error.message}`);
        }

        console.log('Email sent successfully:', emailResult.data);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Show a warning but don't block the success flow
        toast.warning(t('form.toastSubmitError'));
      }
    }

    toast.success((isEditMode || editEnrollmentId) ? t('form.toastSubmitSuccess') : t('form.toastSubmitSuccess'));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <header className="container mx-auto px-4 pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/competitions" className="hover:underline">{t('form.breadcrumbCompetitions')}</Link>
            <span>/</span>
            <span>{t('form.breadcrumbApplication')}</span>
          </div>
        </header>

        <section className="container mx-auto px-4 py-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {isEditMode ? t('form.editApplication') : t('form.applicationTitle')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {competition ? t(competition.title) : t('form.selectCompetition')}
            </p>
            {competition && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>{t('form.statusLabel')} {statusText}</span>
              </div>
            )}
          </div>

          {!competition && (
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                {t('form.competitionNotFound')} <Link to="/competitions" className="text-primary hover:underline">{t('form.breadcrumbCompetitions')}</Link>.
              </CardContent>
            </Card>
          )}

          {competition && !isOpen && (
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                <p className="text-foreground mb-4">{t('form.registrationNotOpen')}</p>
                <div className="flex gap-3">
                  <Button asChild variant="outline"><Link to={`/competitions/${competition.id === 'satellite-launch' ? 'satellite-launch-2026' : ''}` || "/competitions"}>{t('common.learnMore')}</Link></Button>
                  <Button asChild><Link to="/competitions">{t('form.competitionsList')}</Link></Button>
                </div>
              </CardContent>
            </Card>
          )}

          {competition && isOpen && (
            <form onSubmit={onSubmit} className="max-w-4xl space-y-6">
              {/* Team Name */}
              <div className="space-y-2">
                <Label htmlFor="team">{t('form.teamName')}</Label>
                <Input
                  id="team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="AEROO Team"
                  required
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="league">{t('form.categoryLabel')} *</Label>
                <Select 
                  value={league} 
                  onValueChange={(value) => {
                    setLeague(value);
                    // Auto-set team member count based on category
                    if (value === "satellite-launch") {
                      setTeamMemberCount(4);
                    } else if (value === "space-ai") {
                      setTeamMemberCount(null); // Allow user to select 1-4
                    } else if (value === "rocket-science") {
                      setTeamMemberCount(null); // Allow user to select 1-2
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.selectCompetition')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satellite-launch">Satellite Launch</SelectItem>
                    <SelectItem value="space-ai">Space AI</SelectItem>
                    <SelectItem value="rocket-science">Rocket Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Team Member Count Selection */}
              {captainFullName.trim() && captainIin.trim() && captainPhone.trim() && captainSchool.trim() && captainCity.trim() && captainGrade.trim() && captainAge.trim() && (
                <div className="space-y-2">
                  <Label>{t('form.teamMemberCount')} *</Label>
                  {league === "satellite-launch" ? (
                    <div className="p-3 border border-input rounded-md bg-muted">
                      <p className="text-sm font-medium">{t('form.fixedParticipants')}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3 p-3 border border-input rounded-md bg-background">
                      {league === "space-ai" ? (
                        [1, 2, 3, 4].map((count) => (
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
                            <span className="text-sm font-medium">{count} {t('form.participantCount')}{count > 1 ? (count < 5 ? t('form.participantCountPlural') : t('form.participantCountMany')) : ''}</span>
                          </label>
                        ))
                      ) : league === "rocket-science" ? (
                        [1, 2].map((count) => (
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
                            <span className="text-sm font-medium">{count} {t('form.participantCount')}{count > 1 ? t('form.participantCountPlural') : ''}</span>
                          </label>
                        ))
                      ) : null}
                    </div>
                  )}
                </div>
              )}

              {/* Participant 1 (Captain) */}
              <div className="bg-muted rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t('form.participant1Captain')} *</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard">
                      {t('form.editInProfile')}
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="captain-name">{t('form.fullName')} *</Label>
                    <Input
                      id="captain-name"
                      value={captainFullName}
                      placeholder={t('form.fullNamePlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-iin">{t('form.iin')} *</Label>
                    <Input
                      id="captain-iin"
                      value={captainIin}
                      placeholder={t('form.iinPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-phone">{t('form.phone')} *</Label>
                    <Input
                      id="captain-phone"
                      value={captainPhone}
                      placeholder={t('form.phonePlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-school">{t('form.school')} *</Label>
                    <Input
                      id="captain-school"
                      value={captainSchool}
                      placeholder={t('form.schoolPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-city">{t('form.city')}</Label>
                    <Input
                      id="captain-city"
                      value={captainCity}
                      placeholder={t('form.cityPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-grade">{t('form.grade')} *</Label>
                    <Input
                      id="captain-grade"
                      value={captainGrade}
                      placeholder={t('form.gradePlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-email">Email *</Label>
                    <Input
                      id="captain-email"
                      value={captainEmail}
                      placeholder="example@email.com"
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-telegram">Telegram *</Label>
                    <Input
                      id="captain-telegram"
                      value={captainTelegram}
                      placeholder={t('form.telegramPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-age">{t('form.captainAge')} *</Label>
                    <Input
                      id="captain-age"
                      value={captainAge}
                      placeholder={t('form.ageRequired')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Participants (Optional) */}
              {teamMemberCount > 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('form.participant2Title')}</h3>

                  {/* Participant 2 */}
                  {teamMemberCount >= 2 && (
                    <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">{t('form.participant2')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant1FullName}
                        onChange={(e) => setParticipant1FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant1Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant1Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                     <div className="space-y-2">
                       <Label>{t('form.phone')} *</Label>
                       <Input
                         value={participant1Phone}
                         onChange={(e) => handlePhoneChange(e.target.value, setParticipant1Phone)}
                         placeholder="+7 777 777 77 77"
                         required={teamMemberCount >= 2}
                       />
                     </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant1School}
                        onChange={(e) => setParticipant1School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant1City}
                        onChange={(e) => setParticipant1City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant1Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant1Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                    </div>
                  </div>
                  )}

                  {/* Participant 3 */}
                  {teamMemberCount >= 3 && (
                    <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">{t('form.participant3Title')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant2FullName}
                        onChange={(e) => setParticipant2FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant2Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant2Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                     <div className="space-y-2">
                       <Label>{t('form.phone')} *</Label>
                       <Input
                         value={participant2Phone}
                         onChange={(e) => handlePhoneChange(e.target.value, setParticipant2Phone)}
                         placeholder="+7 777 777 77 77"
                         required={teamMemberCount >= 3}
                       />
                     </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant2School}
                        onChange={(e) => setParticipant2School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant2City}
                        onChange={(e) => setParticipant2City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant2Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant2Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                    </div>
                  </div>
                  )}

                  {/* Participant 4 */}
                  {teamMemberCount >= 4 && (
                    <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">{t('form.participant4Title')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant3FullName}
                        onChange={(e) => setParticipant3FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant3Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant3Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                     <div className="space-y-2">
                       <Label>{t('form.phone')} *</Label>
                       <Input
                         value={participant3Phone}
                         onChange={(e) => handlePhoneChange(e.target.value, setParticipant3Phone)}
                         placeholder="+7 777 777 77 77"
                         required={teamMemberCount >= 4}
                       />
                     </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant3School}
                        onChange={(e) => setParticipant3School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant3City}
                        onChange={(e) => setParticipant3City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant3Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant3Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                    </div>
                  </div>
                  )}

                  {/* Participant 5 */}
                  {teamMemberCount >= 5 && (
                    <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 5</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant4FullName}
                        onChange={(e) => setParticipant4FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant4Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant4Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.phone')}</Label>
                      <Input
                        value={participant4Phone}
                        onChange={(e) => handlePhoneChange(e.target.value, setParticipant4Phone)}
                        placeholder="+7 777 777 77 77"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant4School}
                        onChange={(e) => setParticipant4School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant4City}
                        onChange={(e) => setParticipant4City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant4Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant4Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                    </div>
                  </div>
                  )}
                </div>
              )}

              {/* Mentor */}
              <div className="bg-muted rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold">{t('form.mentor')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('form.fullName')}</Label>
                    <Input
                      value={mentorFullName}
                      onChange={(e) => setMentorFullName(e.target.value)}
                      placeholder={t('form.fullNamePlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.iin')}</Label>
                    <Input
                      value={mentorIin}
                      onChange={(e) => handleDigitsOnlyChange(e.target.value, setMentorIin)}
                      placeholder={t('form.iinPlaceholder')}
                      maxLength={12}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.phone')}</Label>
                    <Input
                      value={mentorPhone}
                      onChange={(e) => handlePhoneChange(e.target.value, setMentorPhone)}
                      placeholder="+7 777 777 77 77"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.school')}</Label>
                    <Input
                      value={mentorSchool}
                      onChange={(e) => setMentorSchool(e.target.value)}
                      placeholder={t('form.schoolPlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.city')}</Label>
                    <Input
                      value={mentorCity}
                      onChange={(e) => setMentorCity(e.target.value)}
                      placeholder={t('form.cityPlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telegram</Label>
                    <Input
                      value={mentorTelegram}
                      onChange={(e) => handleTelegramChange(e.target.value, setMentorTelegram)}
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              {/* Source and Consent */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('form.questions')}</Label>
                  <Textarea
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder={t('form.questionsPlaceholder')}
                    className="min-h-[100px] resize-y"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('form.source')}</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.selectSource')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram_aeroo">{t('form.sourceInstagramKaz')}</SelectItem>
                      <SelectItem value="instagram_other">{t('form.sourceInstagramOther')}</SelectItem>
                      <SelectItem value="telegram">{t('form.sourceTelegram')}</SelectItem>
                      <SelectItem value="friends">{t('form.sourceFriends')}</SelectItem>
                      <SelectItem value="other">{t('form.sourceOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                  <Label htmlFor="consent" className="leading-snug">
                    {t('form.consent')} *
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  submitting ||
                  !teamName || !league || !captainFullName || !captainIin || !captainPhone || !captainSchool ||
                  !captainCity || !captainGrade || !captainTelegram || !captainAge ||
                  !source || !consent
                }
              >
                {submitting ? t('form.sending') : (isEditMode ? t('form.editApplication') : t('form.submit'))}
              </Button>
            </form>
          )}
        </section>

        {/* Duplicate registration notice */}
        <AlertDialog open={dupOpen} onOpenChange={setDupOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">Вы уже зарегистрированы</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Вы уже зарегистрированы на «{dupName}». Запись доступна в личном кабинете на странице «Мои регистрации».
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogCancel>Закрыть</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link to="/dashboard">Перейти в личный кабинет</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Footer />
    </div>
  );
}
