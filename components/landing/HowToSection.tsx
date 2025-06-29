'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UserPlus, Settings, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    icon: UserPlus,
    title: 'Register & Open Account',
    description: 'Sign up in minutes and unlock your free Busk Station account.',
  },
  {
    icon: Settings,
    title: 'Customize & Configure',
    description: 'Personalize your dashboard, setup your song lyrics, build your first setlist, and set up your event preferences.',
  },
  {
    icon: Zap,
    title: 'Gig Your Way',
    description: 'Hit the streets or stage with all your tools in one place. Manage lyrics, requests, and promo like a pro!',
  },
];

const HowToSection: React.FC = () => {
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
      { threshold: 0.1 }
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
      id="how-to" 
      ref={sectionRef}
      className={`py-16 md:py-24 bg-card/50 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get Started in <span className="text-primary">3 Easy Steps</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Joining Busk Station is quick and simple. Start supercharging your performances as soon as we're out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className={`bg-background text-center shadow-lg hover:shadow-primary/20 transition-all duration-500 ease-in-out rounded-2xl transform hover:-translate-y-2 group ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
              style={{transitionDelay: `${isVisible ? index * 150 : 0}ms`}}
            >
              <CardHeader className="pt-8">
                <div className="relative mx-auto mb-6">
                  <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-primary/10 rounded-full border-2 border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <step.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg shadow-md">
                    {index + 1}
                  </span>
                </div>
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors duration-300">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
