'use client';

import FeatureCard from './FeatureCard';
import { LayoutGrid, Music2, ListMusic, CalendarDays, Users, Wand2, DollarSign, SlidersHorizontal, MousePointerClick } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: LayoutGrid,
    title: 'Dashboard',
    description: 'Your central hub for quick access to all app sections and performance insights.',
  },
  {
    icon: Music2,
    title: 'Lyrics Management',
    description: 'Effortlessly manage and display song lyrics. Enjoy karoke-style highlighting synced with your audio through smart scroll.',
  },
  {
    icon: ListMusic,
    title: 'Setlist Builder',
    description: 'Dynamically create, organize, and manage your setlists with an intuitive drag-and-drop interface and AI reorder feature.',
  },
  {
    icon: CalendarDays,
    title: 'Event Management',
    description: 'Promote your upcoming gigs with a gig calendar, comprehensive event details, and powerful promotional tools.',
  },
  {
    icon: Users,
    title: 'Fan Requests',
    description: 'Connect with your audience by receiving and managing song requests in real-time during your performances.',
  },
  {
    icon: Wand2,
    title: 'AI Promo Material Creation',
    description: 'Instantly generate visually appealing promotional materials like posters using AI, based on your event data.',
  },
  {
    icon: DollarSign,
    title: 'Earnings Box',
    description: 'Easily receive earnings from the audience and seamlessly keep a track of it through the in-app wallet and earnings tracker.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Personalisation',
    description: 'Customize the app interface, lyric display styles, and notification preferences to match your unique workflow.',
  },
  {
    icon: MousePointerClick,
    title: 'Intuitive Interface',
    description: 'Navigate a clean, user-friendly design that makes managing your music career effortless and enjoyable.',
  }
];

const FeaturesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className={`py-16 md:py-24 bg-background transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            All-In-One <span className="text-primary">Powerhouse</span> for Performers
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Discover the features designed to elevate your performance and streamline your musical journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
              style={{transitionDelay: `${isVisible ? index * 100 : 0}ms`}}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                actionComponent={feature.actionComponent}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

