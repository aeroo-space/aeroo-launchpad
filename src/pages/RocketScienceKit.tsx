import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Zap, 
  Target, 
  BookOpen, 
  Users, 
  Brain, 
  GraduationCap, 
  Shield,
  Trophy,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RocketScienceKit = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    phone: '',
    email: '',
    kits: 1
  });
  const { toast } = useToast();

  const testimonials = [
    {
      quote: "This kit integrates seamlessly into our curriculum, turning passive learners into active engineers. We've seen test scores rise and interest in STEM soar.",
      author: "Aigul S.",
      role: "Physics Teacher"
    },
    {
      quote: "Building and launching my rocket hit 145m after tweaks—it taught me aerodynamics better than any textbook!",
      author: "Timur",
      role: "9th Grade Student"
    },
    {
      quote: "The safety protocols and teacher resources made implementation worry-free. Our school now runs 3 rocket clubs!",
      author: "Dr. Marat K.",
      role: "School Director"
    }
  ];

  const kitContents = [
    {
      icon: Rocket,
      title: "100 Rocket Bodies",
      description: "40 pre-designed for guided lessons + 60 customizable for advanced student projects"
    },
    {
      icon: Zap,
      title: "40 Model Engines",
      description: "Safe, beginner-level thrust (1.25–2.5 N·s) for authentic launches under teacher supervision"
    },
    {
      icon: Target,
      title: "Launch System",
      description: "Durable AEROO pad and remote controller for controlled, repeatable experiments"
    },
    {
      icon: BookOpen,
      title: "Detailed Guide",
      description: "Illustrated step-by-step manual aligned with school physics/engineering standards"
    },
    {
      icon: Users,
      title: "Online Platform Access",
      description: "AEROO portal with video tutorials, lesson plans, and progress tracking"
    },
    {
      icon: Brain,
      title: "Software",
      description: "OpenRocket simulator for virtual design and aerodynamics analysis"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Assemble",
      description: "Build 40 guided rockets using the manual to master basics in 1-2 class sessions"
    },
    {
      number: "02", 
      title: "Design",
      description: "Create custom models in OpenRocket, applying math and physics to optimize performance"
    },
    {
      number: "03",
      title: "Launch",
      description: "Launch safely outdoors, recording data like altitude and trajectory for analysis"
    },
    {
      number: "04",
      title: "Iterate",
      description: "Refine designs based on results, fostering iterative problem-solving and teamwork"
    }
  ];

  const specifications = [
    { label: "Recommended Engines", value: "1.25–2.5 N·s (Beginner-safe)" },
    { label: "Length", value: "Up to 800 mm" },
    { label: "Launch System", value: "AEROO Launch Pad" },
    { label: "Diameter", value: "30-50 mm" },
    { label: "Launch Rod Size", value: "10 mm" },
    { label: "Weight", value: "Up to 50 g" },
    { label: "Projected Max Altitude", value: "Up to 150 m" },
    { label: "Fin Material", value: "Paper / Polystyrene" },
    { label: "Recovery System", value: "30 cm Parachute" }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Builds Core Skills",
      description: "Develops engineering design, data analysis, and collaboration—aligned with national STEM standards"
    },
    {
      icon: BookOpen,
      title: "Ready-to-Use Curriculum", 
      description: "Plug-and-play lesson plans save prep time; ideal for physics classes or after-school clubs"
    },
    {
      icon: Target,
      title: "Hands-On Learning",
      description: "Transforms theory into practice, boosting student engagement and retention by 30-50%"
    },
    {
      icon: Trophy,
      title: "Competition Prep",
      description: "Equips teams for events like National Tech Olympiad, with proven wins in aerospace challenges"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Engines released only after teacher certification; includes risk assessments and consent templates"
    }
  ];

  const competitions = [
    {
      month: "April",
      event: "Astana \"Open World of Science\"",
      description: "Introductory launches for beginners"
    },
    {
      month: "June", 
      event: "Astana \"AEROO FEST\"",
      description: "Team challenges with prizes for innovation"
    },
    {
      month: "September",
      event: "Baikonur Tour & Launches",
      description: "Exclusive excursions and real-site tests"
    },
    {
      month: "On-Demand",
      event: "Regional Events",
      description: "Customized for your area (minimum 15 teams)"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Request Submitted!",
      description: "Our team will respond within 24 hours with bulk pricing options.",
    });
    setFormData({ name: '', school: '', phone: '', email: '', kits: 1 });
  };

  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Rocket Science Kit - Educational STEM Rocket Building Set | AEROO</title>
        <meta name="description" content="Professional Rocket Science Kit for schools. Educational STEM rocket building set for students ages 12+. Hands-on engineering, launches up to 150m, competition ready." />
        <meta name="keywords" content="rocket science kit, educational STEM, rocket building set, school science kit, model rockets, aerospace education, engineering curriculum" />
        <meta property="og:title" content="Rocket Science Kit - Educational STEM Rocket Building Set" />
        <meta property="og:description" content="Empower students to engineer and launch real rockets. Comprehensive STEM kit for schools with guided lessons and competition preparation." />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://aeroo.space/products/rocket-science-kit" />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent opacity-90" />
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
          <div className="relative z-10 text-center text-primary-foreground px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              🚀 Rocket Science Kit: Empower Students to Engineer and Launch Real Rockets
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Integrate hands-on STEM into your curriculum: Design, build, and test model rockets that reach 150m, 
              preparing teams for national competitions while building critical engineering skills.
            </p>
            <Button 
              size="xl" 
              onClick={scrollToOrder}
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Order Kit Now
            </Button>
          </div>
        </section>

        {/* What's Inside Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 text-foreground">
              Comprehensive Components for Classroom Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kitContents.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-card-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-muted/30 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 text-foreground">
              Streamlined 4-Step Process for Engaging Lessons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 text-foreground">
              Key Specs for Reliable Educational Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specifications.map((spec, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-card-foreground">{spec.label}</span>
                      <span className="text-primary font-semibold">{spec.value}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Buy Section */}
        <section className="py-16 lg:py-24 bg-muted/30 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 text-foreground">
              Proven Benefits for Educators and Students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <benefit.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitions Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 text-foreground">
              From Classroom to Cosmos: Join Aeroo Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {competitions.map((comp, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-6 w-6 text-primary mr-3" />
                      <Badge variant="outline" className="text-primary border-primary">
                        {comp.month}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-card-foreground">{comp.event}</h3>
                    <p className="text-muted-foreground">{comp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-muted/30 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 text-foreground">
              Real Impact from Teachers and Students
            </h2>
            <div className="relative">
              <Card className="p-8 min-h-[250px] flex items-center">
                <CardContent className="text-center w-full">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg lg:text-xl italic mb-6 text-card-foreground leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <cite className="text-primary font-semibold text-lg">
                    — {testimonials[currentTestimonial].author}
                  </cite>
                  <p className="text-muted-foreground mt-1">{testimonials[currentTestimonial].role}</p>
                </CardContent>
              </Card>
              
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section id="order-form" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
                Secure Rocket Science Kit for Your School Today
              </h2>
              <p className="text-lg text-muted-foreground">
                Submit details for a customized quote; our team responds within 24 hours with bulk pricing options.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="school">School/Organization *</Label>
                      <Input
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="kits">Number of Kits</Label>
                    <Input
                      id="kits"
                      name="kits"
                      type="number"
                      min="1"
                      value={formData.kits}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full h-12 text-lg">
                    Submit Order Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default RocketScienceKit;