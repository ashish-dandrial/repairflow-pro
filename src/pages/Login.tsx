import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { getUsers, setCurrentUser } from '@/lib/storage';
import { dummyUsers } from '@/data/dummyData';
import { LogIn } from 'lucide-react';
import gsap from 'gsap';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    gsap.fromTo(
      '.login-card',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    gsap.fromTo(
      '.login-field',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check dummy users first
    let user = dummyUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    // If not found in dummy users, check localStorage
    if (!user) {
      const users = getUsers();
      user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
    }

    if (user) {
      setCurrentUser(user);
      toast.success(`Welcome back, ${user.name}!`);
      
      // Redirect based on role
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'technician') {
          navigate('/technician');
        } else {
          navigate('/');
        }
      }, 500);
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="page-content min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-20">
      <Card className="login-card w-full max-w-md p-8 space-y-6 shadow-elegant">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
            <LogIn className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Login to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="login-field space-y-2">
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

          <div className="login-field space-y-2">
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

          <Button type="submit" className="w-full bg-gradient-hero shadow-elegant hover:shadow-glow transition-all login-field">
            Login
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground login-field">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Register here
          </Link>
        </div>

        <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground login-field">
          <p className="font-semibold text-foreground">Demo Credentials:</p>
          <p>Customer: john@example.com / password123</p>
          <p>Admin: admin@repair.com / admin123</p>
          <p>Technician: mike@repair.com / tech123</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
