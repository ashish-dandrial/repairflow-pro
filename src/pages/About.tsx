import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Target, Users, Award, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">The people behind QuickFix</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center space-y-4 hover:shadow-elegant transition-all">
              <div className="w-24 h-24 mx-auto bg-gradient-hero rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground">
                AK
              </div>
              <div>
                <h3 className="text-xl font-semibold">Amit Kumar</h3>
                <p className="text-sm text-muted-foreground">Project Lead</p>
              </div>
              <p className="text-sm text-muted-foreground">
                BCA student passionate about creating innovative solutions
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-elegant transition-all">
              <div className="w-24 h-24 mx-auto bg-gradient-hero rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground">
                PS
              </div>
              <div>
                <h3 className="text-xl font-semibold">Priya Sharma</h3>
                <p className="text-sm text-muted-foreground">UI/UX Designer</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Crafting beautiful and intuitive user experiences
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-elegant transition-all">
              <div className="w-24 h-24 mx-auto bg-gradient-hero rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground">
                RV
              </div>
              <div>
                <h3 className="text-xl font-semibold">Rahul Verma</h3>
                <p className="text-sm text-muted-foreground">Developer</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Building robust and scalable web applications
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
