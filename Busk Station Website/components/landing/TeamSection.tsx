
'use client';

import TeamMemberCard from './TeamMemberCard';
import { useEffect, useRef, useState } from 'react';

const teamMembers = [
  {
    imageSrc: '/veeralyashupal.jpeg',
    imageAlt: 'Veeral Yashupal, Co-founder & CTO',
    name: 'Veeral Yashupal',
    title: 'Co-Founder & CTO',
    bio: 'Bridging the gap between technology, innovation, and music to empower artists.',
    dataAiHint: 'profile business',
  },
  {
    imageSrc: '/neil-jonathan.jpeg',
    imageAlt: 'Neil Johnathon Paul, Co-founder & Ad Hoc CCO',
    name: 'Neil Johnathon Paul',
    title: 'Co-Founder & Ad Hoc CCO',
    bio: "Dedicated to amplifying the reach of fellow early artists to the world and beyond.",
    dataAiHint: 'profile musician',
  },
];

const TeamSection: React.FC = () => {
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
      id="team"
      ref={sectionRef}
      className={`py-16 md:py-24 bg-card/50 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Meet the <span className="text-primary">Visionaries</span> Behind Busk Station
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Passionate individuals dedicated to revolutionizing the way musicians connect and perform around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
             <div
              key={member.name}
              className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
              style={{transitionDelay: `${isVisible ? index * 150 : 0}ms`}}
            >
              <TeamMemberCard
                imageSrc={member.imageSrc}
                imageAlt={member.imageAlt}
                name={member.name}
                title={member.title}
                bio={member.bio}
                dataAiHint={member.dataAiHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
