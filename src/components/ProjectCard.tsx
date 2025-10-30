import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Star, TrendingUp } from 'lucide-react';
import { Project } from '@/lib/storage';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const difficultyColors = {
    beginner: 'bg-secondary/20 text-secondary-foreground',
    intermediate: 'bg-primary/20 text-primary-foreground',
    advanced: 'bg-accent/20 text-accent-foreground',
  };

  return (
    <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.15)]">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm border-0">
          {project.status}
        </Badge>
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="text-xs font-semibold">{project.rating}</span>
          <span className="text-xs text-muted-foreground">({project.reviews})</span>
        </div>
      </div>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-foreground leading-tight">{project.title}</h3>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={difficultyColors[project.difficulty]}>
            {project.difficulty}
          </Badge>
          <Badge variant="outline">{project.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="truncate">{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-secondary" />
          {new Date(project.startDate).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-accent" />
            {project.hours}h
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            {project.volunteers}/{project.maxVolunteers}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all" 
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          View Details
          <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};
