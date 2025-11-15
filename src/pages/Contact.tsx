import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import gsap from 'gsap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    gsap.fromTo(
      '.contact-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Success animation
    gsap.to('.contact-form', {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      },
    });
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="contact-card p-6 space-y-4 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-muted-foreground">+91 9876543210</p>
                <p className="text-muted-foreground">+91 9876543211</p>
              </div>
            </Card>

            <Card className="contact-card p-6 space-y-4 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">support@quickfix.com</p>
                <p className="text-muted-foreground">info@quickfix.com</p>
              </div>
            </Card>

            <Card className="contact-card p-6 space-y-4 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-muted-foreground">
                  123 Repair Street<br />
                  Tech City, TC 12345<br />
                  India
                </p>
              </div>
            </Card>

            <Card className="contact-card p-6 space-y-4 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9AM - 8PM</p>
                <p className="text-muted-foreground">Saturday: 10AM - 6PM</p>
                <p className="text-muted-foreground">Sunday: 10AM - 4PM</p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="contact-form contact-card p-8 shadow-elegant">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="transition-all duration-200 focus:shadow-elegant"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="transition-all duration-200 focus:shadow-elegant"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-hero shadow-elegant hover:shadow-glow transition-all"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Map */}
            <Card className="contact-card mt-6 p-4 shadow-elegant overflow-hidden">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Map integration placeholder</p>
                  <p className="text-sm text-muted-foreground">123 Repair Street, Tech City</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
