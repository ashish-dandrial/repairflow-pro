import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wrench, Menu, X, LogOut, User } from 'lucide-react';
import { getCurrentUser, setCurrentUser, isAuthenticated } from '@/lib/storage';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const location = useLocation();
  const authenticated = isAuthenticated();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.mobile-menu',
        { x: '100%' },
        { x: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = user?.role === 'admin'
    ? [
        { name: 'Home', path: '/' },
        { name: 'Admin Dashboard', path: '/admin' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ]
    : user?.role === 'technician'
    ? [
        { name: 'Home', path: '/' },
        { name: 'Technician Panel', path: '/technician' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/#services' },
        { name: 'Track Repair', path: '/status' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-hero p-2 rounded-lg group-hover:shadow-glow transition-all duration-300">
              <Wrench className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              QuickFix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {authenticated && user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-hero shadow-elegant hover:shadow-glow transition-all duration-300">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu md:hidden bg-background border-t border-border shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-border pt-4 flex flex-col gap-2">
              {authenticated && user ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-foreground py-2">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-hero">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
