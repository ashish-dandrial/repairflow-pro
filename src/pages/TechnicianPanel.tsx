import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatusBadge from '@/components/StatusBadge';
import { getCurrentUser, getRepairs, updateRepair, isAuthenticated } from '@/lib/storage';
import { dummyRepairs } from '@/data/dummyData';
import { toast } from 'sonner';
import { Wrench, ClipboardList, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

const TechnicianPanel = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [repairs, setRepairs] = useState([...getRepairs(), ...dummyRepairs]);

  useEffect(() => {
    if (!isAuthenticated() || user?.role !== 'technician') {
      toast.error('Access denied. Technician only.');
      navigate('/');
      return;
    }

    gsap.fromTo(
      '.tech-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.task-row',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3 }
    );
  }, [navigate, user]);

  // Filter repairs assigned to this technician
  const myRepairs = repairs.filter((r) => r.assignedTechnician === user?.name);

  const handleUpdateStatus = (id: string, newStatus: 'in-progress' | 'completed') => {
    updateRepair(id, { status: newStatus });
    setRepairs([...getRepairs(), ...dummyRepairs]);
    toast.success('Task status updated');
  };

  const stats = {
    assigned: myRepairs.length,
    inProgress: myRepairs.filter((r) => r.status === 'in-progress').length,
    completed: myRepairs.filter((r) => r.status === 'completed').length,
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-24">
      <div className="container mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Technician Panel</h1>
          <p className="text-xl text-muted-foreground">Welcome, {user?.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="tech-card p-6 space-y-2 shadow-elegant hover:shadow-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assigned Tasks</p>
                <p className="text-3xl font-bold">{stats.assigned}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <ClipboardList className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="tech-card p-6 space-y-2 shadow-elegant hover:shadow-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-warning">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-xl">
                <Wrench className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="tech-card p-6 space-y-2 shadow-elegant hover:shadow-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-success">{stats.completed}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-xl">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* My Tasks Table */}
        <Card className="p-6 shadow-elegant overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">My Assigned Tasks</h2>
          {myRepairs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Wrench className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No tasks assigned yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myRepairs.map((repair) => (
                    <TableRow key={repair.id} className="task-row">
                      <TableCell className="font-medium">{repair.id}</TableCell>
                      <TableCell>{repair.customerName}</TableCell>
                      <TableCell>{repair.deviceType}</TableCell>
                      <TableCell className="max-w-xs truncate">{repair.problemDescription}</TableCell>
                      <TableCell>
                        <StatusBadge status={repair.status} />
                      </TableCell>
                      <TableCell>{new Date(repair.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {repair.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(repair.id, 'in-progress')}
                              className="bg-gradient-hero"
                            >
                              Start
                            </Button>
                          )}
                          {repair.status === 'in-progress' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(repair.id, 'completed')}
                              className="border-success text-success hover:bg-success hover:text-success-foreground"
                            >
                              Complete
                            </Button>
                          )}
                          {repair.status === 'completed' && (
                            <span className="text-sm text-success font-medium">✓ Done</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TechnicianPanel;
