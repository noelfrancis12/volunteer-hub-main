// LocalStorage-based data management for VolunteerHub

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'volunteer' | 'admin';
  skills: string[];
  interests: string[];
  bio: string;
  joinedProjects: string[];
  volunteerHours: number;
  rating: number;
  completedProjects: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  duration: string;
  volunteers: number;
  maxVolunteers: number;
  startDate: string;
  status: 'active' | 'completed' | 'upcoming';
  organizer: string;
  requirements: string[];
  requiredSkills: string[];
  image: string;
  hours: number;
  rating: number;
  reviews: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const STORAGE_KEYS = {
  USERS: 'volunteerhub_users',
  PROJECTS: 'volunteerhub_projects',
  CURRENT_USER: 'volunteerhub_current_user',
};

// Initialize with mock data
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Community Garden Restoration',
        description: 'Transform our community garden into a thriving green space. Join us for planting native species, building raised beds, and creating a sustainable ecosystem.',
        category: 'Environment',
        location: 'Riverside Community Garden',
        duration: '3 hours',
        volunteers: 12,
        maxVolunteers: 20,
        startDate: '2025-11-05',
        status: 'active',
        organizer: 'Green Earth Initiative',
        requirements: ['Physical fitness', 'Outdoor work experience'],
        requiredSkills: ['Gardening', 'Landscaping'],
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
        hours: 3,
        rating: 4.8,
        reviews: 24,
        difficulty: 'beginner',
      },
      {
        id: '2',
        title: 'Food Bank Distribution Drive',
        description: 'Make a direct impact by helping families in need. Sort, pack, and distribute nutritious meals to our community members.',
        category: 'Community',
        location: 'Metro Food Bank',
        duration: '4 hours',
        volunteers: 18,
        maxVolunteers: 25,
        startDate: '2025-11-08',
        status: 'active',
        organizer: 'Helping Hands Network',
        requirements: ['Lifting capability', 'Team player'],
        requiredSkills: ['Organization', 'Physical work'],
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
        hours: 4,
        rating: 4.9,
        reviews: 45,
        difficulty: 'beginner',
      },
      {
        id: '3',
        title: 'Youth Mentorship Academy',
        description: 'Shape the future by mentoring high school students. Provide guidance on academics, career paths, and personal growth.',
        category: 'Education',
        location: 'Lincoln High School',
        duration: 'Ongoing',
        volunteers: 15,
        maxVolunteers: 25,
        startDate: '2025-11-12',
        status: 'upcoming',
        organizer: 'Future Leaders Foundation',
        requirements: ['Background check', 'Communication skills'],
        requiredSkills: ['Mentoring', 'Teaching', 'Communication'],
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        hours: 10,
        rating: 5.0,
        reviews: 38,
        difficulty: 'intermediate',
      },
      {
        id: '4',
        title: 'Beach Cleanup Initiative',
        description: 'Protect marine life and beautify our coastline. Join us for a comprehensive beach cleanup event.',
        category: 'Environment',
        location: 'Ocean Beach',
        duration: '2 hours',
        volunteers: 8,
        maxVolunteers: 30,
        startDate: '2025-11-15',
        status: 'active',
        organizer: 'Ocean Guardians',
        requirements: ['Sun protection', 'Comfortable shoes'],
        requiredSkills: ['Environmental awareness'],
        image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800',
        hours: 2,
        rating: 4.7,
        reviews: 52,
        difficulty: 'beginner',
      },
      {
        id: '5',
        title: 'Senior Tech Tutoring',
        description: 'Bridge the digital divide by teaching seniors how to use smartphones, tablets, and computers.',
        category: 'Technology',
        location: 'Sunset Senior Center',
        duration: '2 hours',
        volunteers: 5,
        maxVolunteers: 10,
        startDate: '2025-11-20',
        status: 'upcoming',
        organizer: 'TechConnect',
        requirements: ['Patience', 'Tech knowledge'],
        requiredSkills: ['Teaching', 'Technology', 'Communication'],
        image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800',
        hours: 2,
        rating: 4.9,
        reviews: 31,
        difficulty: 'intermediate',
      },
      {
        id: '6',
        title: 'Animal Shelter Care',
        description: 'Spend quality time with shelter animals. Help with feeding, grooming, walking, and socializing our furry friends.',
        category: 'Animal Welfare',
        location: 'Happy Paws Shelter',
        duration: '3 hours',
        volunteers: 10,
        maxVolunteers: 15,
        startDate: '2025-11-10',
        status: 'active',
        organizer: 'Animal Rescue League',
        requirements: ['Love for animals', 'Physical fitness'],
        requiredSkills: ['Animal care', 'Physical work'],
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800',
        hours: 3,
        rating: 5.0,
        reviews: 67,
        difficulty: 'beginner',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mockProjects));
  }
};

export const auth = {
  signup: (email: string, password: string, name: string): { success: boolean; error?: string } => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    if (users.find((u: User) => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'volunteer',
      skills: [],
      interests: [],
      bio: '',
      joinedProjects: [],
      volunteerHours: 0,
      rating: 0,
      completedProjects: 0,
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return { success: true };
  },

  login: (email: string, password: string): { success: boolean; error?: string } => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u: User) => u.email === email);
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  updateUser: (updates: Partial<User>) => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const index = users.findIndex((u: User) => u.id === currentUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  },
};

export const projects = {
  getAll: (): Project[] => {
    initializeStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
  },

  getById: (id: string): Project | null => {
    const allProjects = projects.getAll();
    return allProjects.find(p => p.id === id) || null;
  },

  create: (project: Omit<Project, 'id'>): Project => {
    const allProjects = projects.getAll();
    const newProject = { ...project, id: Date.now().toString() };
    allProjects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(allProjects));
    return newProject;
  },

  update: (id: string, updates: Partial<Project>) => {
    const allProjects = projects.getAll();
    const index = allProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      allProjects[index] = { ...allProjects[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(allProjects));
    }
  },

  delete: (id: string) => {
    const allProjects = projects.getAll();
    const filtered = allProjects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
  },

  applyToProject: (projectId: string) => {
    const user = auth.getCurrentUser();
    if (!user) return false;
    
    const project = projects.getById(projectId);
    if (!project || project.volunteers >= project.maxVolunteers) return false;

    if (user.joinedProjects.includes(projectId)) return false;

    projects.update(projectId, { volunteers: project.volunteers + 1 });
    auth.updateUser({ 
      joinedProjects: [...user.joinedProjects, projectId],
      volunteerHours: user.volunteerHours + project.hours
    });
    return true;
  },

  getLeaderboard: (): User[] => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    return users.sort((a: User, b: User) => b.volunteerHours - a.volunteerHours).slice(0, 10);
  },

  getMatchingProjects: (userSkills: string[]): Project[] => {
    const allProjects = projects.getAll();
    return allProjects.filter(project => 
      project.status === 'active' && 
      project.requiredSkills.some(skill => 
        userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      )
    ).sort((a, b) => {
      const aMatches = a.requiredSkills.filter(skill => 
        userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
      ).length;
      const bMatches = b.requiredSkills.filter(skill => 
        userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
      ).length;
      return bMatches - aMatches;
    });
  },
};
