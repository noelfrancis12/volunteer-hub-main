import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/ProjectCard';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Target, TrendingUp, Sparkles, Award, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/lib/storage';

const Index = () => {
  const navigate = useNavigate();
  const featuredProjects = projects.getAll().slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              Transform Lives Through Volunteering
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-foreground leading-tight">
              Your Impact
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Join VolunteerHub to discover meaningful opportunities, connect with passionate communities, and make a real difference.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button size="lg" onClick={() => navigate('/projects')} className="gap-2 text-lg px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <Heart className="h-5 w-5" />
                Explore Projects
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth')} className="text-lg px-8 border-2">
                Get Started
                <Zap className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all group hover:shadow-[0_0_30px_rgba(var(--primary),0.15)]">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:scale-110 transition-transform">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">2,500+</h3>
                <p className="text-muted-foreground font-medium">Active Volunteers</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-secondary/50 transition-all group hover:shadow-[0_0_30px_rgba(var(--secondary),0.15)]">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 group-hover:scale-110 transition-transform">
                  <Target className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-br from-secondary to-secondary/60 bg-clip-text text-transparent">450+</h3>
                <p className="text-muted-foreground font-medium">Projects Completed</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-accent/50 transition-all group hover:shadow-[0_0_30px_rgba(var(--accent),0.15)]">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent">50K+</h3>
                <p className="text-muted-foreground font-medium">Hours Contributed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm">
              <Award className="h-4 w-4" />
              Featured Opportunities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Make an Impact Today</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover projects that align with your passions and skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" onClick={() => navigate('/projects')} className="text-lg px-8 border-2">
              View All Projects
              <TrendingUp className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t-2 border-border bg-gradient-to-br from-card/50 to-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="font-bold text-lg">VolunteerHub</span>
            </div>
            <p className="text-center text-muted-foreground">
              © 2025 VolunteerHub. Empowering communities through meaningful connections.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
