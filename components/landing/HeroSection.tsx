
'use client';

import type { CSSProperties } from 'react';
import { Button } from '../ui/button';
import ScrollLink from './ScrollLink';
import BuskStationLogo from '../BuskStationLogo';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const [textOpacity, setTextOpacity] = useState(1);
  const [textTranslateY, setTextTranslateY] = useState(0);
  const [textScale, setTextScale] = useState(1);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<{ top: string; left: string; animationDelay: string }[]>([]);

  const [leftWaveformStyles, setLeftWaveformStyles] = useState<CSSProperties[] | null>(null);
  const [midWaveformStyles, setMidWaveformStyles] = useState<CSSProperties[] | null>(null);

  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const waveformBarDelays = [0, 0.2, 0.1, 0.3, 0.05, 0.25, 0.15];

  useEffect(() => {
    const numStars = 50;
    const newStars = Array.from({ length: numStars }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
    }));
    setStars(newStars);

    const tempLeftStyles: CSSProperties[] = waveformBarDelays.map((delay, index) => ({
      height: `${Math.random() * 30 + 20}px`,
      animationDelay: `${delay + index * 0.1}s`,
      left: `${index * 10}px`,
    }));
    setLeftWaveformStyles(tempLeftStyles);

    const tempMidStyles: CSSProperties[] = waveformBarDelays.slice(0, 5).map((delay, index) => ({
      height: `${Math.random() * 40 + 25}px`,
      animationDelay: `${delay + 0.5 + index * 0.12}s`,
      backgroundColor: 'hsla(var(--primary), 0.5)',
      left: `${index * 12}px`,
    }));
    setMidWaveformStyles(tempMidStyles);

    const handleScroll = () => {
      if (heroContentRef.current) {
        const heroHeight = heroContentRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        const fadeStartScroll = 0;

        if (scrollPosition > fadeStartScroll) {
          const scrollPastStart = scrollPosition - fadeStartScroll;
          const fadeRange = heroHeight * 0.5;
          let newOpacity = 1 - (scrollPastStart / fadeRange);
          newOpacity = Math.max(0, Math.min(1, newOpacity));
          setTextOpacity(newOpacity);

          let newTranslateY = -(scrollPastStart / 0.6);
          newTranslateY = Math.min(0, newTranslateY);
          setTextTranslateY(newTranslateY);

          const scrollRatio = scrollPosition / (heroHeight || window.innerHeight * 0.5);
          let currentScale = 1 - Math.min(0.2, scrollRatio * 0.2);
          currentScale = Math.max(0.8, Math.min(1, currentScale));
          setTextScale(currentScale);

        } else {
          setTextOpacity(1);
          setTextTranslateY(0);
          setTextScale(1);
        }
      }
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  return (
    <section id="hero" className="relative py-20 md:py-32 min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, index) => (
          <div
            key={`star-${index}`}
            className="star"
            style={{ top: star.top, left: star.left, animationDelay: star.animationDelay }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none">
        <div
          className="animated-spotlight"
          style={{ top: '-10%', left: '10%', transform: 'rotate(-30deg)', animationDelay: '0s' }}
        />
        <div
          className="animated-spotlight"
          style={{ top: '-15%', left: '40%', width: '250px', height: '350px', transform: 'rotate(-10deg)', animationDelay: '1s' }}
        />
         <div
          className="animated-spotlight"
          style={{ top: '-10%', right: '15%', transform: 'rotate(25deg)', animationDelay: '0.5s' }}
        />

        {leftWaveformStyles && (
          <div className="absolute bottom-[18%] left-[20%] flex space-x-1 pointer-events-none z-1">
            {leftWaveformStyles.map((style, index) => (
              <div
                key={`wf-left-${index}`}
                className="animated-waveform-bar"
                style={style}
              />
            ))}
          </div>
        )}
        {midWaveformStyles && (
          <div className="absolute bottom-[12%] left-[35%] flex space-x-1 pointer-events-none z-1 opacity-70">
            {midWaveformStyles.map((style, index) => (
              <div
                key={`wf-mid-${index}`}
                className="animated-waveform-bar"
                style={style}
              />
            ))}
          </div>
        )}

        <div className="animated-ui-element">
          <div className="animated-ui-play-button"></div>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background-image.jpeg"
          alt="Hero background image of a stage with lights"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-30"
          priority
          data-ai-hint="stage concert"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background"></div>
      </div>

      <div
        ref={heroContentRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px) scale(${textScale})`,
          transition: 'opacity 0.15s ease-out, transform 0.15s ease-out'
        }}
      >
        <BuskStationLogo className="h-24 w-24 md:h-32 md:w-32 mx-auto mb-8 text-primary transition-transform duration-300 ease-in-out hover:rotate-[-6deg] hover:scale-110" />
        <h1
          className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 cursor-default"
          onMouseEnter={() => setIsTitleHovered(true)}
          onMouseLeave={() => setIsTitleHovered(false)}
        >
          <span className={`transition-colors duration-300 ${isTitleHovered ? 'text-primary' : 'text-foreground'}`}>Busk</span>
          <span className={`transition-colors duration-300 ${isTitleHovered ? 'text-foreground' : 'text-primary'}`}>Station</span>
        </h1>
        <p className="font-headline text-2xl sm:text-3xl md:text-4xl text-foreground mb-10">
          Your Personal Side<span className="text-primary">gig</span>
        </p>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10">
          The ultimate toolkit for early musicians and gig artists to manage lyrics smartly, build setlists easily, promote events effortlessly, engage fans actively, track earnings seamlessly - all in one place.
        </p>
        <div className="space-x-4">
          <ScrollLink href="#features">
            <Button size="lg" className="rounded-2xl px-8 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">Explore Features</Button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
