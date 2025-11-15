import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { getUsers, saveUser, setCurrentUser } from '@/lib/storage';
import { UserPlus } from 'lucide-react';
import gsap from 'gsap';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    gsap.fromTo(
      '.register-card',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    gsap.fromTo(
      '.register-field',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Check if email already exists
    const users = getUsers();
    if (users.some((u) => u.email === formData.email)) {
      toast.error('Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'customer' as const,
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    
    gsap.to('.register-card', {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        toast.success('Registration successful!');
        setTimeout(() => navigate('/'), 500);
      },
    });
  };

  return (
    <div className="page-content min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-20">
      <Card className="register-card w-full max-w-md p-8 space-y-6 shadow-elegant">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
            <UserPlus className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Register to book repair services</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="register-field space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="transition-all duration-200 focus:shadow-elegant"
            />
          </div>

          <div className="register-field space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="transition-all duration-200 focus:shadow-elegant"
            />
          </div>

          <div className="register-field space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="transition-all duration-200 focus:shadow-elegant"
            />
          </div>

          <div className="register-field space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="transition-all duration-200 focus:shadow-elegant"
            />
          </div>

          <div className="register-field space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="transition-all duration-200 focus:shadow-elegant"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-hero shadow-elegant hover:shadow-glow transition-all register-field">
            Register
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground register-field">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login here
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
