import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Impact from './components/Impact';
import Concert from './components/Concert';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import CorporateEvents from './pages/CorporateEvents';
import WeddingPlanning from './pages/WeddingPlanning';
import SocialGatherings from './pages/SocialGatherings';
import EventProduction from './pages/EventProduction';
import About from './pages/About';
import LoadingScreen from './components/LoadingScreen';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentFrameRef = useRef<HTMLDivElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const initialFadeRef = useRef(false);
  const scrollProxy = useRef<HTMLDivElement>(null);
  const expandTimeline = useRef<gsap.core.Timeline | null>(null);

  // Set up initial state for the frame (small centered window)
  const setupInitialFrameState = () => {
    if (frameRef.current) {
      // Ensure frame starts small before any animations
      gsap.set(frameRef.current, {
        width: '20vw',
        height: '20vh',
        borderRadius: '12px',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        boxShadow: '0 0 30px rgba(255,255,255,0.08)',
        opacity: 1
      });
    }
    
    if (contentFrameRef.current) {
      // Make content visible but prevent scrolling initially
      gsap.set(contentFrameRef.current, {
        scale: 1,
        opacity: 1,
        overflow: 'hidden'
      });
    }
    
    if (mainWrapperRef.current) {
      // Hide the main scroll container initially
      gsap.set(mainWrapperRef.current, {
        opacity: 0.3 // Start partially visible
      });
    }
  };

  // Trigger scrolling programmatically to start expanding the frame
  const triggerInitialScroll = () => {
    // Simulate a scroll to start frame expansion
    window.scrollTo({
      top: 1,
      behavior: 'smooth'
    });
    
    // Add a small delay then trigger more scrolling to ensure animation starts
    setTimeout(() => {
      window.scrollTo({
        top: 20, 
        behavior: 'smooth'
      });
    }, 200);
  };

  // Setup the expanding frame animation
  const setupFrameExpansion = () => {
    if (!contentReady || !frameRef.current || !contentFrameRef.current) return;
    
    // Create animation timeline for expanding the frame
    expandTimeline.current = gsap.timeline({ 
      paused: true,
      onComplete: () => {
        // Enable normal scrolling when complete
        if (contentFrameRef.current && mainWrapperRef.current) {
          contentFrameRef.current.style.overflow = 'auto';
          gsap.to(mainWrapperRef.current, {
            opacity: 1,
            duration: 0.3
          });
          document.body.style.overflow = '';
        }
      }
    });
    
    // Add a subtle glow to the frame
    const frameGlow = document.createElement('div');
    frameGlow.className = 'absolute inset-0 pointer-events-none';
    frameGlow.style.boxShadow = 'inset 0 0 30px rgba(255,255,255,0.1)';
    frameGlow.style.borderRadius = '12px';
    frameGlow.style.opacity = '0';
    frameRef.current.appendChild(frameGlow);
    
    // Build the animation timeline
    expandTimeline.current
      // Stage 1: Initial glow effect
      .to(frameGlow, {
        opacity: 0.8,
        duration: 0.3
      })
      // Stage 2: Start expanding and fading glow
      .to(frameRef.current, {
        width: '60vw',
        height: '60vh',
        duration: 0.5,
        ease: "power2.out"
      }, 0.2)
      .to(frameGlow, {
        opacity: 0.4,
        duration: 0.5
      }, 0.2)
      // Stage 3: Continue expanding to full screen
      .to(frameRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        boxShadow: '0 0 0px rgba(255,255,255,0)',
        duration: 0.5,
        ease: "power3.inOut"
      }, 0.7)
      .to(frameGlow, {
        opacity: 0,
        borderRadius: '0px',
        duration: 0.4
      }, 0.7);
    
    // Set up direct DOM-based scroll handler
    let lastScrollY = 0;
    const totalScrollNeeded = window.innerHeight * 0.5;
    
    const handleScroll = () => {
      // Get current scroll position and calculate delta
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Update progress of expansion timeline based on scroll
      if (expandTimeline.current) {
        // Calculate the incremental progress
        const currentProgress = expandTimeline.current.progress();
        const progressIncrement = (scrollDelta / totalScrollNeeded);
        const newProgress = Math.min(1, Math.max(0, currentProgress + progressIncrement));
        
        // Apply the new progress to the timeline
        expandTimeline.current.progress(newProgress);
        
        // If we're fully expanded, remove the scroll handler
        if (newProgress >= 1) {
          window.removeEventListener('scroll', handleScroll);
          
          // Enable content scrolling
          if (contentFrameRef.current) {
            contentFrameRef.current.style.overflow = 'auto';
          }
          
          // Fade in content
          if (mainWrapperRef.current) {
            gsap.to(mainWrapperRef.current, {
              opacity: 1,
              duration: 0.3
            });
          }
        } else {
          // While expanding, prevent content from scrolling
          window.scrollTo(0, currentScrollY);
        }
      }
      
      // Update last scroll position
      lastScrollY = currentScrollY;
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add scroll indicator that fades out as frame expands
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      expandTimeline.current.to(scrollIndicator, {
        opacity: 0,
        y: 20,
        duration: 0.3
      }, 0.5);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  // Effect to handle transition from loading screen to content
  useEffect(() => {
    if (isLoading) {
      // When loading, ensure scroll is disabled and position is reset
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      // Check if this was a direct transition from loading screen via click
      const isDirectTransition = window.sessionStorage.getItem('directTransition') === 'true';
      
      // Remove the flag so it's not used again
      window.sessionStorage.removeItem('directTransition');
      
      // Set up initial small frame before showing content
      setupInitialFrameState();
      
      // Create a smooth transition from loading screen
      if (transitionOverlayRef.current) {
        gsap.to(transitionOverlayRef.current, { 
          opacity: 0, 
          duration: isDirectTransition ? 0.5 : 0.8, // Faster for direct transition
          ease: "power2.inOut",
          onComplete: () => {
            // Don't enable scrolling yet - we want to control it
            document.body.style.overflow = 'hidden';
            setContentReady(true);
            
            if (isFirstLoad) {
              document.documentElement.style.scrollBehavior = 'smooth';
              setIsFirstLoad(false);
            }
            
            // Smaller delay for direct transition
            const setupDelay = isDirectTransition ? 50 : 100;
            
            // Small delay before setting up expansion
            setTimeout(() => {
              // Now set up frame expansion
              setupFrameExpansion();
              
              // Allow scrolling to trigger expansion
              document.body.style.overflow = '';
              
              // Trigger initial scroll to start expansion
              // For direct transition, trigger more scrolling to start expansion faster
              if (isDirectTransition) {
                // Immediately scroll further to start expansion
                window.scrollTo({
                  top: 50,
                  behavior: 'smooth'
                });
                
                // After a slight delay, continue scrolling to fully expand
                setTimeout(() => {
                  window.scrollTo({
                    top: window.innerHeight * 0.3,
                    behavior: 'smooth'
                  });
                }, 300);
              } else {
                triggerInitialScroll();
              }
              
              // Refresh ScrollTrigger
              ScrollTrigger.refresh();
            }, setupDelay);
          }
        });
      } else {
        // Fallback
        document.body.style.overflow = 'hidden';
        setContentReady(true);
        setupInitialFrameState();
        setupFrameExpansion();
        triggerInitialScroll();
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, isFirstLoad]);

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update ScrollTrigger when content is ready
  useEffect(() => {
    if (contentReady && appRef.current) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [contentReady]);

  const handleLoadingComplete = () => {
    console.log("Loading complete, transitioning to main content");
    setIsLoading(false);
    
    setTimeout(() => {
      ScrollTrigger.refresh();
      console.log("ScrollTrigger refreshed");
    }, 300);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          {/* Transition overlay */}
          <div 
            ref={transitionOverlayRef} 
            className="fixed inset-0 bg-black z-50 pointer-events-none"
          ></div>
          
          {/* Expanding frame */}
          <div 
            ref={frameRef}
            className="fixed z-40 overflow-hidden border border-white/10 bg-black"
            style={{ 
              boxShadow: '0 0 40px rgba(0,0,0,0.6)',
              transition: 'box-shadow 0.5s ease-out'
            }}
          >
            {/* Content inside the frame */}
            <div 
              ref={contentFrameRef}
              className="w-screen h-screen overflow-hidden" // Start without scrolling
            >
              {/* Actual scrollable content */}
              <div ref={mainWrapperRef} className="w-full h-full">
                <Router>
                  <div ref={appRef} className="min-h-screen">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={
                        <>
                          <Hero />
                          <div id="services">
                            <Services />
                          </div>
                          <Projects />
                          <Concert />
                          <Partners />
                          <Impact />
                        </>
                      } />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/services/corporate-events" element={<CorporateEvents />} />
                      <Route path="/services/wedding-planning" element={<WeddingPlanning />} />
                      <Route path="/services/social-gatherings" element={<SocialGatherings />} />
                      <Route path="/services/event-production" element={<EventProduction />} />
                    </Routes>
                    <Footer />
                  </div>
                </Router>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="scroll-indicator fixed bottom-16 left-1/2 -translate-x-1/2 z-50 opacity-80 animate-bounce pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <div className="w-5 h-9 border-2 border-white/80 rounded-full flex justify-center p-1">
                <div className="w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
              </div>
              <span className="text-white text-sm font-light tracking-wider uppercase">
                Scroll to Expand
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;