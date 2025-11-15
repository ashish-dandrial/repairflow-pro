import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Target, Users, Award, Heart, CheckCircle, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import techTeam1 from '@/assets/tech-team-1.jpg';
import techTeam2 from '@/assets/tech-team-2.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    gsap.fromTo(
      '.about-hero',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.value-card',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 75%',
        },
      }
    );

    gsap.fromTo(
      '.timeline-item',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 70%',
        },
      }
    );

    gsap.fromTo(
      '.team-card',
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.team-section',
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="about-hero max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            About QuickFix
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            We're on a mission to revolutionize the repair service industry by providing fast,
            reliable, and professional solutions for all your device and appliance repair needs.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <h2 className="text-4xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2024, QuickFix started with a simple idea: make quality repair services
              accessible to everyone. What began as a small team of passionate technicians has grown
              into a comprehensive repair service platform serving thousands of customers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that technology should work for you, not against you. That's why we've
              built a system that makes getting your devices and appliances repaired as easy as
              clicking a button.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="value-card p-8 text-center space-y-4 hover:shadow-elegant transition-all">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for perfection in every repair, ensuring the highest quality standards.
              </p>
            </Card>

            <Card className="value-card p-8 text-center space-y-4 hover:shadow-elegant transition-all">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Customer First</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We go the extra mile to ensure you're happy.
              </p>
            </Card>

            <Card className="value-card p-8 text-center space-y-4 hover:shadow-elegant transition-all">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Expertise</h3>
              <p className="text-muted-foreground">
                Our certified technicians bring years of experience to every job.
              </p>
            </Card>

            <Card className="value-card p-8 text-center space-y-4 hover:shadow-elegant transition-all">
              <div className="mx-auto w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold">Trust</h3>
              <p className="text-muted-foreground">
                We build lasting relationships through transparency and reliability.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">Milestones that shaped QuickFix</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="timeline-item flex gap-6">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-primary">2024</span>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">Launch</h3>
                <p className="text-muted-foreground">
                  QuickFix was founded with a vision to transform the repair service industry.
                </p>
              </div>
            </div>

            <div className="timeline-item flex gap-6">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-accent">Q2 2024</span>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-accent pl-6">
                <h3 className="text-xl font-semibold mb-2">Expansion</h3>
                <p className="text-muted-foreground">
                  Grew our technician team to 50+ certified professionals.
                </p>
              </div>
            </div>

            <div className="timeline-item flex gap-6">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-success">Q3 2024</span>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-success pl-6">
                <h3 className="text-xl font-semibold mb-2">Milestone</h3>
                <p className="text-muted-foreground">
                  Served our 10,000th happy customer with a 98% satisfaction rate.
                </p>
              </div>
            </div>

            <div className="timeline-item flex gap-6">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-warning">Present</span>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-warning pl-6">
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Continuing to innovate with 24/7 support and same-day service options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Skilled professionals dedicated to providing the best repair services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Tech Mike', role: 'Senior Technician', specialty: 'Mobile & Laptop Expert', image: techTeam1, color: 'from-primary to-accent', repairs: '2,500+' },
              { name: 'Tech Sarah', role: 'Electronics Specialist', specialty: 'AC & TV Professional', image: techTeam2, color: 'from-accent to-success', repairs: '3,000+' },
              { name: 'Admin Team', role: 'Operations Manager', specialty: 'Service Coordination', image: null, color: 'from-warning to-primary', repairs: '10,000+' },
            ].map((member, idx) => (
              <Card key={idx} className="team-card overflow-hidden group hover:shadow-glow transition-all hover:scale-105 bg-gradient-to-br from-card to-background">
                <div className="relative h-72 overflow-hidden">
                  {member.image ? (
                    <>
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60"></div>
                    </>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center relative`}>
                      <Users className="w-32 h-32 text-white opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"></div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-accent font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6 space-y-3 text-center">
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-semibold">{member.repairs} Repairs Completed</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
