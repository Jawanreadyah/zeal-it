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
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationSetupRef = useRef(false);
  const cleanupFnRef = useRef<(() => void) | null>(null);

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
      const cleanup = setupScrollAnimation({
        sectionRef,
        contentRef,
        backgroundRef,
        statsItemsSelector: '.stats-item'
      });
      
      // Store the cleanup function
      if (cleanup && typeof cleanup === 'function') {
        cleanupFnRef.current = cleanup;
      }
      
      animationSetupRef.current = true;
    }

    // Make sure animations can be triggered by scrolling
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Clean up any existing animations first
        if (cleanupFnRef.current) {
          cleanupFnRef.current();
          cleanupFnRef.current = null;
        }
        
        // Re-run animation setup when tab becomes visible again
        const cleanup = setupScrollAnimation({
          sectionRef,
          contentRef,
          backgroundRef,
          statsItemsSelector: '.stats-item'
        });
        
        // Store new cleanup function
        if (cleanup && typeof cleanup === 'function') {
          cleanupFnRef.current = cleanup;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Clean up animations when component unmounts
      if (cleanupFnRef.current) {
        cleanupFnRef.current();
      }
    };
  }, []);

  // Add enhanced 3D effect to heading and content elements
  useEffect(() => {
    if (headingRef.current && gridRef.current) {
      // Apply a 3D perspective to the main content elements
      gsap.set([headingRef.current, gridRef.current], {
        transformPerspective: 1000,
        force3D: true
      });
      
      // Create subtle hover-like effect that follows mouse/scroll
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate offset from center (normalized -1 to 1)
        const offsetX = (clientX - centerX) / centerX;
        const offsetY = (clientY - centerY) / centerY;
        
        // Apply subtle rotation based on mouse position
        if (headingRef.current) {
          gsap.to(headingRef.current, {
            rotationY: 5 * offsetX,
            rotationX: -3 * offsetY,
            duration: 0.5,
            ease: "power1.out"
          });
        }
        
        // Apply opposite rotation to grid for dynamic effect
        if (gridRef.current) {
          gsap.to(gridRef.current, {
            rotationY: -3 * offsetX,
            rotationX: 2 * offsetY,
            duration: 0.5,
            ease: "power1.out"
          });
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // When entering the component for the first time, ensure it's visible
  useEffect(() => {
    // Apply initial extremely small state
    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 0.4,
        filter: 'blur(8px)',
        scale: 0.3,
        y: 300,
        z: -800,
        transformOrigin: "center center",
        transformPerspective: 1200,
        force3D: true
      });
    }

    // Set main grid initially small
    if (gridRef.current) {
      gsap.set(gridRef.current, {
        scale: 0.6,
        opacity: 0.3,
        y: 100,
        transformOrigin: "center center"
      });
    }

    // Set stats section to start far away
    if (statsBarRef.current) {
      gsap.set(statsBarRef.current, {
        opacity: 0.5,
        y: 50,
        z: -100
      });
    }

    // Set heading for 3D effect
    if (headingRef.current) {
      gsap.set(headingRef.current, {
        transformPerspective: 1000,
        force3D: true,
        rotationX: -15, // Slight initial angle
        y: 30
      });
    }

    // Note: We don't animate these in automatically anymore
    // Instead, we'll let the scroll-triggered animations handle everything
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden perspective-1000">
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
        <div ref={gridRef} className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center">
            <h1 ref={headingRef} className="text-4xl md:text-6xl font-light leading-tight mb-6">
              Crafting
              <span className="text-hurricane-red block mt-2">Experiences</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              From corporate gatherings to dream concerts, we transform visions into extraordinary moments.
            </p>
            <button 
              ref={buttonRef}
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