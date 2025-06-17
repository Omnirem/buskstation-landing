
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Zap, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const problems = [
  "Juggling lyric sheets and setlist changes on the fly?",
  "Struggling to promote your gigs effectively?",
  "Finding it hard to connect with fans in real-time?",
  "Losing track of your earnings and tips?",
  "Spending too much time on admin, not enough on art?",
  "Feeling overwhelmed by managing multiple social media platforms for promotion?",
  "Manually tracking gig schedules and availability?",
];

const solutions = [
  "Seamless lyrics and setlist management with karaoke-style display of lyrics that sync with your voice and audio through smart scroll.",
  "Generate stunning AI-powered promotional materials and manage event details effortlessly.",
  "Engage your audience with real-time fan requests.",
  "Keep precise track of your income with our intuitive earnings tracker.",
  "Streamline your workflow, so you can focus on what you do best: performing.",
];

const ProblemSolutionSection: React.FC = () => {
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
      id="why-us" 
      ref={sectionRef}
      className={`py-16 md:py-24 bg-card/50 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Focus on <span className="text-primary">Your Music</span>, We&apos;ll Handle <span className="text-primary">the Rest.</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Tired of the performance hustle? Busk Station is here to streamline your workflow and amplify your impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Card 
            className={`bg-background/50 border-border shadow-xl rounded-2xl transition-all duration-500 ease-out hover:shadow-destructive/30 hover:scale-[1.03] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
            style={{transitionDelay: isVisible ? '200ms': '0ms'}}
            >
            <CardHeader>
              <CardTitle className="font-headline text-2xl sm:text-3xl flex items-center text-destructive/80">
                <Zap className="h-8 w-8 mr-3 text-destructive/80" />
                The Hustle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start group">
                    <Zap className="h-5 w-5 mr-3 mt-1 text-destructive/70 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-foreground/80">{problem}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`bg-background/50 border-border shadow-xl rounded-2xl transition-all duration-500 ease-out hover:shadow-primary/30 hover:scale-[1.03] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
            style={{transitionDelay: isVisible ? '400ms': '0ms'}}
            >
            <CardHeader>
              <CardTitle className="font-headline text-2xl sm:text-3xl flex items-center text-primary">
                <CheckCircle className="h-8 w-8 mr-3 text-primary" />
                The Station Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start group">
                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary shrink-0 transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-foreground/90">{solution}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
