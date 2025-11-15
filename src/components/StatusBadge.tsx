import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variants = {
    pending: 'bg-warning/10 text-warning border-warning/20',
    'in-progress': 'bg-primary/10 text-primary border-primary/20',
    completed: 'bg-success/10 text-success border-success/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const labels = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return (
    <Badge variant="outline" className={variants[status]}>
      {labels[status]}
    </Badge>
  );
};

export default StatusBadge;
