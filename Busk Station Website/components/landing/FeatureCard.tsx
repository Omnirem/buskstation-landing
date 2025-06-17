
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionComponent?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, actionComponent }) => {
  return (
    <Card className="bg-card hover:shadow-primary/20 transition-all duration-300 ease-in-out flex flex-col rounded-2xl h-full group overflow-hidden">
      <CardHeader className="flex flex-row items-start space-x-4 pb-4">
        <div className="p-3 bg-primary/10 rounded-lg mt-1">
          <Icon className="h-8 w-8 text-primary transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-[-5deg]" />
        </div>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <CardDescription className="text-base text-foreground/80">{description}</CardDescription>
        {actionComponent && <div className="mt-auto pt-4">{actionComponent}</div>}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
