import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { ClipboardList, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [repairs, setRepairs] = useState([...getRepairs(), ...dummyRepairs]);

  useEffect(() => {
    if (!isAuthenticated() || user?.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/');
      return;
    }

    gsap.fromTo(
      '.stat-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.table-row',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3 }
    );
  }, [navigate, user]);

  const handleStatusUpdate = (id: string, newStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled') => {
    updateRepair(id, { status: newStatus });
    setRepairs([...getRepairs(), ...dummyRepairs]);
    toast.success('Status updated successfully');
  };

  const handleAssignTechnician = (id: string, technician: string) => {
    updateRepair(id, { assignedTechnician: technician });
    setRepairs([...getRepairs(), ...dummyRepairs]);
    toast.success('Technician assigned successfully');
  };

  const stats = {
    total: repairs.length,
    pending: repairs.filter((r) => r.status === 'pending').length,
    inProgress: repairs.filter((r) => r.status === 'in-progress').length,
    completed: repairs.filter((r) => r.status === 'completed').length,
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-24">
      <div className="container mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage all repair requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stat-card p-6 space-y-2 shadow-elegant hover:shadow-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <ClipboardList className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="stat-card p-6 space-y-2 shadow-elegant hover:shadow-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-warning">{stats.pending}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-xl">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="stat-card p-6 space-y-2 shadow-elegant hover:shadow-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-primary">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="stat-card p-6 space-y-2 shadow-elegant hover:shadow-glow transition-all">
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

        {/* Repair Requests Table */}
        <Card className="p-6 shadow-elegant overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">All Repair Requests</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repairs.map((repair, index) => (
                  <TableRow key={repair.id} className="table-row">
                    <TableCell className="font-medium">{repair.id}</TableCell>
                    <TableCell>{repair.customerName}</TableCell>
                    <TableCell>{repair.deviceType}</TableCell>
                    <TableCell className="max-w-xs truncate">{repair.problemDescription}</TableCell>
                    <TableCell>
                      <StatusBadge status={repair.status} />
                    </TableCell>
                    <TableCell>{repair.assignedTechnician || 'Not Assigned'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        <Select
                          value={repair.status}
                          onValueChange={(value: any) => handleStatusUpdate(repair.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          value={repair.assignedTechnician || ''}
                          onValueChange={(value) => handleAssignTechnician(repair.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Assign Tech" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tech Mike">Tech Mike</SelectItem>
                            <SelectItem value="Tech Sarah">Tech Sarah</SelectItem>
                            <SelectItem value="Tech John">Tech John</SelectItem>
                            <SelectItem value="Tech Emma">Tech Emma</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
