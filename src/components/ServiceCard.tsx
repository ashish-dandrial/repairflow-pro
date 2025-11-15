import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  name: string;
  icon: string;
  description: string;
  price: string;
  index: number;
}

const ServiceCard = ({ name, icon, description, price, index }: ServiceCardProps) => {
  const IconComponent = (Icons as any)[icon] as LucideIcon || Icons.Wrench;

  return (
    <Card
      className="service-card p-6 hover:shadow-elegant transition-all duration-300 group cursor-pointer bg-gradient-card border-border"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-gradient-hero group-hover:shadow-glow transition-all duration-300">
          <IconComponent className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-lg font-bold text-primary">{price}</p>
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          Book Now
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;
