import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { getRepairById, getRepairs } from '@/lib/storage';
import { RepairRequest, dummyRepairs } from '@/data/dummyData';
import { Search, Calendar, User, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';

const RepairStatus = () => {
  const [requestId, setRequestId] = useState('');
  const [repair, setRepair] = useState<RepairRequest | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      '.status-card',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }, []);

  useEffect(() => {
    if (repair) {
      gsap.fromTo(
        '.repair-details',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [repair]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    // Search in localStorage first
    let foundRepair = getRepairById(requestId);

    // If not found, search in dummy data
    if (!foundRepair) {
      const allRepairs = [...getRepairs(), ...dummyRepairs];
      foundRepair = allRepairs.find((r) => r.id === requestId) || null;
    }

    if (foundRepair) {
      setRepair(foundRepair);
      toast.success('Repair request found!');
    } else {
      setRepair(null);
      toast.error('No repair request found with this ID');
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { name: 'Pending', active: true },
      { name: 'In Progress', active: status === 'in-progress' || status === 'completed' },
      { name: 'Completed', active: status === 'completed' },
    ];
    return steps;
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-24">
      <div className="container mx-auto max-w-3xl space-y-8">
        <Card className="status-card p-8 space-y-6 shadow-elegant">
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
              <Search className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Track Repair Status</h1>
            <p className="text-muted-foreground">Enter your request ID to check status</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requestId">Request ID</Label>
              <div className="flex gap-2">
                <Input
                  id="requestId"
                  type="text"
                  placeholder="e.g., REQ001"
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value.toUpperCase())}
                  required
                  className="transition-all duration-200 focus:shadow-elegant"
                />
                <Button type="submit" className="bg-gradient-hero shadow-elegant hover:shadow-glow transition-all">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>

          {searched && !repair && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No repair request found. Please check your Request ID.</p>
              <p className="text-sm mt-2">Try: REQ001, REQ002, or REQ003</p>
            </div>
          )}
        </Card>

        {repair && (
          <Card className="repair-details p-8 space-y-6 shadow-elegant">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Repair Details</h2>
              <StatusBadge status={repair.status} />
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between relative py-8">
              <div className="absolute left-0 right-0 h-1 bg-muted top-1/2 -translate-y-1/2"></div>
              <div
                className="absolute left-0 h-1 bg-primary top-1/2 -translate-y-1/2 transition-all duration-500"
                style={{
                  width:
                    repair.status === 'completed'
                      ? '100%'
                      : repair.status === 'in-progress'
                      ? '50%'
                      : '0%',
                }}
              ></div>
              {getStatusSteps(repair.status).map((step, index) => (
                <div key={index} className="flex flex-col items-center gap-2 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.active
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs font-medium text-center">{step.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>Customer Name</span>
                </div>
                <p className="font-medium">{repair.customerName}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Smartphone className="w-4 h-4" />
                  <span>Device Type</span>
                </div>
                <p className="font-medium">{repair.deviceType}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Submitted On</span>
                </div>
                <p className="font-medium">{new Date(repair.createdAt).toLocaleDateString()}</p>
              </div>

              {repair.assignedTechnician && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>Assigned Technician</span>
                  </div>
                  <p className="font-medium">{repair.assignedTechnician}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Problem Description</Label>
              <p className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
                {repair.problemDescription}
              </p>
            </div>

            {repair.image && (
              <div className="space-y-2">
                <Label>Uploaded Image</Label>
                <img
                  src={repair.image}
                  alt="Repair"
                  className="w-full max-h-64 object-contain rounded-lg border border-border shadow-md"
                />
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default RepairStatus;
