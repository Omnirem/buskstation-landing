
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface TeamMemberCardProps {
  imageSrc: string;
  imageAlt: string;
  name: string;
  title: string;
  bio: string;
  dataAiHint?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ imageSrc, imageAlt, name, title, bio, dataAiHint }) => {
  let displaySrc = imageSrc;
  let displayAlt = imageAlt;
  let displayDataAiHint = dataAiHint || 'person profile';

  // Check if imageSrc is a valid string.
  // If it's not an absolute URL (http/https), it must start with a '/' for next/image.
  if (typeof imageSrc !== 'string' || imageSrc.trim() === '' ||
      (!imageSrc.startsWith('/') && !imageSrc.startsWith('http://') && !imageSrc.startsWith('https://'))) {
    displaySrc = 'https://placehold.co/150x150.png'; // Fallback to placeholder
    displayAlt = `Placeholder for ${name}`;
    displayDataAiHint = 'placeholder person';
  }

  return (
    <Card className="bg-card text-center shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out rounded-2xl hover:-translate-y-1 hover:scale-[1.02]">
      <CardHeader className="pt-8">
        <Image
          src={displaySrc}
          alt={displayAlt}
          width={150}
          height={150}
          className="rounded-full mx-auto mb-4 border-4 border-primary/50 object-cover"
          data-ai-hint={displayDataAiHint}
        />
        <CardTitle className="font-headline text-2xl">{name}</CardTitle>
        <CardDescription className="text-primary text-sm font-medium">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
