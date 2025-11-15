import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { getCurrentUser, saveRepair, generateRepairId, isAuthenticated } from '@/lib/storage';
import { Upload, FileText } from 'lucide-react';
import gsap from 'gsap';

const RepairRequest = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    deviceType: '',
    problemDescription: '',
    image: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('Please login to submit a repair request');
      navigate('/login');
      return;
    }

    gsap.fromTo(
      '.repair-card',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    gsap.fromTo(
      '.repair-field',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
    );
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    const newRequest = {
      id: generateRepairId(),
      customerId: user.id,
      customerName: user.name,
      deviceType: formData.deviceType,
      problemDescription: formData.problemDescription,
      image: formData.image,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveRepair(newRequest);

    // Success animation
    gsap.to('.repair-card', {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        toast.success(`Request submitted successfully! Request ID: ${newRequest.id}`);
        setTimeout(() => navigate('/status'), 1000);
      },
    });
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-24">
      <div className="container mx-auto max-w-2xl">
        <Card className="repair-card p-8 space-y-6 shadow-elegant">
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Submit Repair Request</h1>
            <p className="text-muted-foreground">Fill in the details to book your repair service</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="repair-field space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                type="text"
                value={user?.name || ''}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="repair-field space-y-2">
              <Label htmlFor="deviceType">Device Type</Label>
              <Select
                value={formData.deviceType}
                onValueChange={(value) => setFormData({ ...formData, deviceType: value })}
                required
              >
                <SelectTrigger className="transition-all duration-200 focus:shadow-elegant">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mobile">Mobile Phone</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="AC">Air Conditioner</SelectItem>
                  <SelectItem value="TV">Television</SelectItem>
                  <SelectItem value="Refrigerator">Refrigerator</SelectItem>
                  <SelectItem value="Washing Machine">Washing Machine</SelectItem>
                  <SelectItem value="Computer">Computer</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="repair-field space-y-2">
              <Label htmlFor="problemDescription">Problem Description</Label>
              <Textarea
                id="problemDescription"
                placeholder="Describe the issue in detail..."
                value={formData.problemDescription}
                onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                required
                rows={5}
                className="transition-all duration-200 focus:shadow-elegant"
              />
            </div>

            <div className="repair-field space-y-2">
              <Label htmlFor="image">Upload Image (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-muted-foreground">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Click to upload image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-hero shadow-elegant hover:shadow-glow transition-all repair-field"
              size="lg"
            >
              Submit Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RepairRequest;
