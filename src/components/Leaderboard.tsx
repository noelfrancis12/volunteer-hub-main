import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { projects } from '@/lib/storage';

export const Leaderboard = () => {
  const topVolunteers = projects.getLeaderboard();

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-accent" />;
    if (index === 1) return <Medal className="h-5 w-5 text-secondary" />;
    if (index === 2) return <Award className="h-5 w-5 text-primary" />;
    return <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>;
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Top Volunteers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topVolunteers.map((volunteer, index) => (
            <div 
              key={volunteer.id} 
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 w-8 flex justify-center">
                {getRankIcon(index)}
              </div>
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
                  {volunteer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{volunteer.name}</p>
                <p className="text-sm text-muted-foreground">{volunteer.completedProjects} projects</p>
              </div>
              <Badge variant="outline" className="font-bold">
                {volunteer.volunteerHours}h
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
