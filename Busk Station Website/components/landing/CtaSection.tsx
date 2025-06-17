
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useEffect, useRef, useState } from 'react';
import ContactFormDialog from './ContactFormDialog';
import WaitlistFormDialog from './WaitlistFormDialog'; // Import the new waitlist dialog

const CtaSection: React.FC = () => {
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
      id="cta"
      ref={sectionRef}
      className={`py-16 md:py-24 bg-background transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Contact Us Card */}
          <Card
            className={`bg-gradient-to-br from-primary/80 via-primary to-accent/80 p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl text-center flex flex-col justify-between transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{transitionDelay: `${isVisible ? '0' : '0'}ms`}}
          >
            <div>
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-headline text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                  Have Questions?
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                  We&apos;d love to hear from you! Reach out with your thoughts or suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ContactFormDialog triggerLabel="Contact Us" />
                <p className="text-sm text-primary-foreground/70 mt-6">
                  Your feedback helps shape Busk Station.
                </p>
              </CardContent>
            </div>
          </Card>

          {/* Join Waitlist Card */}
          <Card
            className={`bg-gradient-to-bl from-accent/80 via-accent to-primary/80 p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl text-center flex flex-col justify-between transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{transitionDelay: `${isVisible ? '200' : '0'}ms`}}
          >
            <div>
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-headline text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                  Be the First In Line!
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                  Join our exclusive waitlist. Be the first to know and get early access when Busk Station launches!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <WaitlistFormDialog triggerLabel="Join Waitlist" />
                <p className="text-sm text-primary-foreground/70 mt-6">
                  Don&apos;t miss your chance to revolutionize your gigs.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
