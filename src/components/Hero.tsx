import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Box, Settings, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlowingEffect } from './ui/glowing-effect';
import { setupScrollAnimation } from '../lib/animations';
import { gsap } from 'gsap';

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ icon, title, description }: GridItemProps) => {
  return (
    <div className="min-h-[14rem] w-full mb-4">
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black/50 p-6 shadow-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.04em]">
                {title}
              </h3>
              <h2 className="text-sm leading-[1.125rem] text-white/60">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);
  const animationSetupRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Setup the immersive scroll animation, but only once
    if (!animationSetupRef.current) {
      setupScrollAnimation({
        sectionRef,
        contentRef,
        backgroundRef,
        statsItemsSelector: '.stats-item'
      });
      animationSetupRef.current = true;
    }

    // Make sure animations can be triggered by scrolling
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Re-run animation setup when tab becomes visible again
        setupScrollAnimation({
          sectionRef,
          contentRef,
          backgroundRef,
          statsItemsSelector: '.stats-item'
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // When entering the component for the first time, ensure it's visible
  useEffect(() => {
    // Apply immediate styles to make sure content is visible even without scrolling
    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 0.8,
        filter: 'blur(2px)',
        scale: 0.92,
        y: 20,
        transformOrigin: "center top"
      });
      
      // Fade in effect when the component loads
      gsap.to(contentRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
      });
    }

    // Ensure stats section is visible - override any scale/opacity reduction
    if (statsBarRef.current) {
      gsap.set(statsBarRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        clearProps: "all",
        overwrite: true
      });

      // Animate stats items in
      const statsItems = document.querySelectorAll('.stats-item');
      if (statsItems.length > 0) {
        gsap.fromTo(statsItems, 
          { y: 15, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 0.6, 
            ease: "power2.out",
            delay: 0.8
          }
        );
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/vTtqP4ogeNJlMUD9DCo7phi1YcI.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 0%',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-6 relative">
        {/* Stats Bar */}
        <div ref={statsBarRef} className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-white/10 mt-20 gap-4">
          <div className="flex flex-wrap justify-center md:justify-start divide-x divide-white/10">
            <div className="stats-item px-4 first:pl-0">
              <span className="block text-sm text-white/40 font-light">Years</span>
              <span className="block text-2xl font-light">8+</span>
            </div>
            <div className="stats-item px-4">
              <span className="block text-sm text-white/40 font-light">Events</span>
              <span className="block text-2xl font-light">1200+</span>
            </div>
            <div className="stats-item px-4">
              <span className="block text-sm text-white/40 font-light">Clients</span>
              <span className="block text-2xl font-light">450+</span>
            </div>
          </div>
          <a href="#contact" className="hidden md:flex items-center gap-2 text-sm text-white/60 hover:text-white">
            Visit Us <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Main Content */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
              Crafting
              <span className="text-hurricane-red block mt-2">Experiences</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              From corporate gatherings to dream concerts, we transform visions into extraordinary moments.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="w-fit px-8 py-4 bg-white/5 rounded-full border border-white/10 
                hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span className="text-white font-light">Plan Your Event</span>
              <ArrowUpRight className="w-5 h-5 text-hurricane-grey" />
            </button>
          </div>

          {/* Right Side - Cards */}
          <div className="grid grid-cols-1 gap-4">
            <GridItem
              icon={<Box className="h-4 w-4" />}
              title="Corporate Events"
              description="Professional gatherings that exceed expectations"
            />
            <GridItem
              icon={<Settings className="h-4 w-4" />}
              title="Wedding Planning"
              description="Creating magical celebrations for your special day"
            />
            <GridItem
              icon={<Sparkles className="h-4 w-4" />}
              title="Social Gatherings"
              description="Memorable experiences that bring people together"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;