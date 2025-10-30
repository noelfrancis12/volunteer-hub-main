import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ProjectCard } from '@/components/ProjectCard';
import { Leaderboard } from '@/components/Leaderboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth, projects } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { User, Heart, Award, Clock, TrendingUp, Target, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(auth.getCurrentUser());
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const myProjects = projects.getAll().filter(p => user.joinedProjects.includes(p.id));
  const matchingProjects = projects.getMatchingProjects(user.skills).slice(0, 3);

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates = {
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: interests.split(',').map(i => i.trim()).filter(Boolean),
    };
    auth.updateUser(updates);
    setUser(auth.getCurrentUser());
    toast({ title: 'Profile updated successfully!', description: 'Your changes have been saved.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground text-lg">Track your impact and manage your volunteer journey</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Heart className="h-4 w-4" />
              My Projects
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Hours</p>
                      <p className="text-3xl font-bold text-primary">{user.volunteerHours}h</p>
                    </div>
                    <Clock className="h-10 w-10 text-primary/40" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Projects Joined</p>
                      <p className="text-3xl font-bold text-secondary">{myProjects.length}</p>
                    </div>
                    <Heart className="h-10 w-10 text-secondary/40" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Completed</p>
                      <p className="text-3xl font-bold text-accent">{user.completedProjects}</p>
                    </div>
                    <Target className="h-10 w-10 text-accent/40" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {user.rating || 'N/A'}
                      </p>
                    </div>
                    <Award className="h-10 w-10 text-primary/40" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {user.skills.length > 0 && matchingProjects.length > 0 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Recommended For You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {matchingProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Leaderboard />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            {myProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center space-y-4">
                  <Heart className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground text-lg">You haven't joined any projects yet</p>
                  <Button onClick={() => navigate('/projects')} size="lg">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Browse Projects
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" defaultValue={user.name} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user.email} disabled className="bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          name="bio" 
                          defaultValue={user.bio} 
                          placeholder="Tell us about yourself and what drives your passion for volunteering..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Input 
                          id="skills" 
                          value={skills || user.skills.join(', ')} 
                          onChange={(e) => setSkills(e.target.value)}
                          placeholder="e.g., Teaching, Gardening, Organization, Technology"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interests">Interests (comma separated)</Label>
                        <Input 
                          id="interests" 
                          value={interests || user.interests.join(', ')} 
                          onChange={(e) => setInterests(e.target.value)}
                          placeholder="e.g., Environment, Education, Community Service, Animal Welfare"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" size="lg">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Current Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No skills added yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, idx) => (
                          <Badge key={idx} variant="outline" className="px-3 py-1">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No interests added yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
