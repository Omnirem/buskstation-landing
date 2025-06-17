
'use client';

import { CheckSquare, TrendingUp, HeartHandshake, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  {
    icon: CheckSquare,
    title: 'Unparalleled Organization',
    description: 'Say goodbye to scattered notes and lyric sheets. Manage everything from setlists to event promos in one streamlined dashboard, freeing up your mental space to focus purely on your performance.',
    colorClass: 'text-primary', 
    shadowClass: 'hover:shadow-primary/20'
  },
  {
    icon: TrendingUp,
    title: 'Amplify Your Reach',
    description: 'Effortlessly create professional-grade promotional materials with AI. Manage your event details seamlessly, growing your audience show by show.',
    colorClass: 'text-accent',
    shadowClass: 'hover:shadow-accent/20'
  },
  {
    icon: HeartHandshake,
    title: 'Deeper Fan Connection',
    description: 'Engage with your audience like never before. Take real-time song requests, display lyrics for sing-alongs, and build a loyal fanbase that feels connected to your music and performance style.',
    colorClass: 'text-primary', 
    shadowClass: 'hover:shadow-primary/20'
  },
  {
    icon: Sparkles,
    title: 'Focus on Your Art',
    description: 'By automating and simplifying the administrative side of gigging, Busk Station gives you back precious time. Spend less energy on logistics and more on what you love – creating and sharing your music.',
    colorClass: 'text-accent', 
    shadowClass: 'hover:shadow-accent/20'
  },
];

const BenefitsSection: React.FC = () => {
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
      id="benefits" 
      ref={sectionRef}
      className={`py-16 md:py-24 bg-background transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How Busk Station Will <span className="text-primary">Transform Your Gigging</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            More than just tools, Busk Station is a catalyst for a more professional, engaging, and rewarding performance career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title} 
              className={`bg-card border-border shadow-lg rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${benefit.shadowClass} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
              style={{transitionDelay: `${isVisible ? index * 100 : 0}ms`}}
            >
              <CardHeader className="flex flex-row items-start space-x-4 p-6">
                <div className={`p-3 bg-primary/10 rounded-lg mt-1`}>
                  <benefit.icon className={`h-8 w-8 ${benefit.colorClass}`} />
                </div>
                <div>
                  <CardTitle className={`font-headline text-2xl mb-1 ${benefit.colorClass}`}>{benefit.title}</CardTitle>
                  <p className="text-foreground/80">{benefit.description}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
