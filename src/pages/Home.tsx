import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/dummyData';
import { CheckCircle, Clock, Shield, Headphones, ArrowRight, Wrench, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isAuthenticated } from '@/lib/storage';
import heroTechnicianImg from '@/assets/hero-technician.jpg';
import servicesGraphicImg from '@/assets/services-graphic.jpg';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const authenticated = isAuthenticated();

  useEffect(() => {
    // Hero animations
    gsap.fromTo(
      '.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-buttons',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
    );

    // Hero image floating animation
    gsap.to('.hero-image', {
      y: -20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Service cards animation
    gsap.fromTo(
      '.service-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 70%',
        },
      }
    );

    // Services graphic animation
    gsap.fromTo(
      '.services-graphic',
      { x: -100, opacity: 0, rotation: -5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-graphic',
          start: 'top 75%',
        },
      }
    );

    // Features animation
    gsap.fromTo(
      '.feature-card',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 75%',
        },
      }
    );

    // Stats animation
    gsap.fromTo(
      '.stat-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="hero-title text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                Professional Repair Services at Your Doorstep
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground">
                Fast, reliable, and affordable repair solutions for all your devices and appliances
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                <Link to={authenticated ? "/repair-request" : "/register"}>
                  <Button size="lg" className="bg-gradient-hero shadow-elegant hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 animate-glow">
                    Book a Repair
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/status">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                    Track Repair Status
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hero-image relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={heroTechnicianImg} 
                alt="Professional technician repairing smartphone" 
                className="relative rounded-2xl shadow-elegant hover:shadow-glow transition-shadow duration-500 w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Expert repair services for all your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">We're committed to providing the best service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="feature-card p-8 text-center space-y-4 bg-card hover:shadow-elegant transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Expert Technicians</h3>
              <p className="text-muted-foreground">Certified professionals with years of experience</p>
            </Card>

            <Card className="feature-card p-8 text-center space-y-4 bg-card hover:shadow-elegant transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Fast Service</h3>
              <p className="text-muted-foreground">Same-day service available for urgent repairs</p>
            </Card>

            <Card className="feature-card p-8 text-center space-y-4 bg-card hover:shadow-elegant transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Warranty Included</h3>
              <p className="text-muted-foreground">90-day warranty on all repairs and parts</p>
            </Card>

            <Card className="feature-card p-8 text-center space-y-4 bg-card hover:shadow-elegant transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center">
                <Headphones className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock customer support available</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-card space-y-2">
              <div className="text-5xl font-bold">10K+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div className="stat-card space-y-2">
              <div className="text-5xl font-bold">50+</div>
              <div className="text-lg opacity-90">Expert Technicians</div>
            </div>
            <div className="stat-card space-y-2">
              <div className="text-5xl font-bold">98%</div>
              <div className="text-lg opacity-90">Success Rate</div>
            </div>
            <div className="stat-card space-y-2">
              <div className="text-5xl font-bold">24/7</div>
              <div className="text-lg opacity-90">Available Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-3xl mx-auto p-12 bg-gradient-card shadow-elegant">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book your repair service today and experience professional service
            </p>
            <Link to={authenticated ? "/repair-request" : "/register"}>
              <Button size="lg" className="bg-gradient-hero shadow-glow text-lg px-8 py-6">
                Book Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
