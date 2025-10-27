import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Rocket, Users, Globe2, Cpu, Heart, TreePine, Building2, Recycle, Box, Zap, AlertCircle } from "lucide-react";

const HackathonTask = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [teamName, setTeamName] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Задача Хакатона — AEROO";
    
    const fetchTeamName = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select("team_name")
          .eq("user_id", user.id)
          .eq("competition_id", "space-settlement")
          .maybeSingle();
          
        if (error) throw error;
        if (data) {
          setTeamName(data.team_name);
        }
      } catch (error) {
        console.error("Error fetching team name:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamName();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!submissionLink.trim()) {
      toast.error("Пожалуйста, добавьте ссылку на вашу работу");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Update enrollment with submission link
      const { error } = await supabase
        .from("enrollments")
        .update({ 
          submission_link: submissionLink.trim(),
          updated_at: new Date().toISOString()
        })
        .eq("user_id", user!.id)
        .eq("competition_id", "space-settlement");
        
      if (error) throw error;
      
      toast.success("Работа успешно отправлена!", {
        description: "Ваша ссылка на работу сохранена"
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Ошибка отправки", {
        description: error.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-primary/5">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header with space theme */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-1 h-1 bg-primary rounded-full animate-pulse delay-75"></div>
              <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-150"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse delay-300"></div>
            </div>
            <Rocket className="h-16 w-16 mx-auto mb-4 text-primary animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Main Task for the Aeroo Space Settlement Contest
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Fostering scientific thinking and stimulating interest in space through interdisciplinary challenges
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed">
                To foster scientific thinking and stimulate participants' interest in space, the <span className="font-bold text-primary">ASSC Hackathon</span> suggests industry-specific challenges from various fields of space activity. By applying an interdisciplinary approach, participants will be able to look at the problem from different perspectives and find more creative and effective solutions.
              </p>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="font-semibold text-lg">
                  <strong>Your Task:</strong> Write a scientific paper (no more than 15 pages, including all parts) in PDF format describing a space colony you would design and build in the near future.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Requirements Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Colony Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Box className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Size & Shape:</strong> Detailed design of your colony</p>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Population:</strong> Between 100,000 and 300,000 people</p>
                </div>
                <div className="flex items-start gap-2">
                  <Globe2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Location:</strong> Within the Kuiper Belt</p>
                </div>
                <div className="flex items-start gap-2">
                  <Cpu className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Technologies:</strong> Innovations with scientific evidence</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Life Support Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Life Support:</strong> Air, water, and necessities systems</p>
                </div>
                <div className="flex items-start gap-2">
                  <TreePine className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Biodiversity:</strong> At least 7 plant species required</p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Artificial Gravity:</strong> Within 20% of Earth's gravity</p>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <p><strong>Modules:</strong> Residential, power, integration systems</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Rules */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Key Project Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>The colony must operate for at least <strong>80 Earth years</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>Cannot be located on any celestial body (stars, planets, moons, asteroids, comets)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>Must have an elliptical or circular orbit (eccentricity &lt; 1)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>Resource extraction from nearby celestial bodies is allowed (describe travel, extraction, and transportation)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span><strong>No budget limitations</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>Do not describe construction - assume the colony is already built and operational</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>The colony must be <strong>autonomous</strong> (no support from Earth or other colonies)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>Population growth must occur independently within the colony</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>Each inhabitant must have personal space, belongings, work, freedom of movement, cultural life, and development opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">➢</span>
                  <span>A person born in the colony must be able to live and grow entirely within its system</span>
                </li>
                <li className="flex items-start gap-3">
                  <Recycle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>Environmental impact assessment with waste reduction measures required</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Documentation Requirements */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Documentation Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Include diagrams or 3D models showing specific parts and modules of the colony</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>All visual materials must have scientific or technical justification and citations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>All technologies and innovations must have scientific evidence or hypotheses supported by reputable sources (NASA, Roscosmos, ESA, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Paper must include: title page, abstract, table of contents, and team member section</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>All sources must be listed in a bibliography section</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold mt-1">⚠</span>
                  <span><strong className="text-destructive">Plagiarism is strictly prohibited.</strong> The use of AI should be cited, or else the team will be disqualified.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Critical Notice */}
          <Card className="mb-8 bg-destructive/10 border-destructive/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-bold text-destructive mb-2">IMPORTANT NOTICE</p>
                  <p className="text-foreground">
                    <strong>ACCOMPLISHING THE MAIN PART IS OBLIGATORY. WITHOUT IT WORK WON'T BE EVALUATED.</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submission Form */}
          <Card className="border-primary/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Rocket className="h-6 w-6 text-primary" />
                Отправка работы / Submit Your Work
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-lg">Название команды / Team Name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    readOnly
                    className="bg-muted text-lg font-semibold"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submissionLink" className="text-lg">
                    Ссылка на работу / Link to Your Work <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="submissionLink"
                    type="url"
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    placeholder="https://drive.google.com/... или https://docs.google.com/..."
                    required
                    className="text-base"
                  />
                  <div className="flex items-start gap-2 mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      <strong>Не забудьте открыть доступ к документу!</strong> Убедитесь, что ссылка имеет доступ "Просмотр для всех, у кого есть ссылка"
                      <br />
                      <strong>Don't forget to open access to the document!</strong> Make sure the link has "View access for anyone with the link"
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg"
                  disabled={submitting || loading}
                >
                  {submitting ? "Отправка..." : "Отправить работу / Submit Work"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HackathonTask;
