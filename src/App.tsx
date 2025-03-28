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
  const initialFadeRef = useRef(false);

  // Setup the expanding frame animation when content is ready
  useEffect(() => {
    if (contentReady && frameRef.current && contentFrameRef.current) {
      // Set initial frame size - starts very small
      gsap.set(frameRef.current, {
        width: '20vw',
        height: '20vh',
        borderRadius: '12px',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        boxShadow: '0 0 30px rgba(255,255,255,0.08)'
      });
      
      // Content should be already normal size but visible only through the small frame
      gsap.set(contentFrameRef.current, {
        scale: 1,
        opacity: 1,
      });
      
      // Create animation timeline for expanding the frame
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "25% top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });
      
      // Animate the frame to expand to full screen with enhanced effects
      tl.to(frameRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        boxShadow: '0 0 0px rgba(255,255,255,0)',
        ease: "power3.inOut",
        duration: 2.5
      });
      
      // Add a subtle glow to the frame as it expands
      const frameGlow = document.createElement('div');
      frameGlow.className = 'absolute inset-0 pointer-events-none';
      frameGlow.style.boxShadow = 'inset 0 0 30px rgba(255,255,255,0.1)';
      frameGlow.style.borderRadius = '12px';
      frameGlow.style.opacity = '0';
      frameRef.current.appendChild(frameGlow);
      
      // Animate the glow effect
      tl.to(frameGlow, {
        opacity: 0.8,
        duration: 1
      }, 0).to(frameGlow, {
        opacity: 0,
        borderRadius: '0px',
        duration: 1.5
      }, 1);
      
      // Add scroll indicator that fades out as user scrolls
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "10% top",
            scrub: true,
          },
          opacity: 0,
          y: 20,
          duration: 1
        });
      }
    }
  }, [contentReady]);

  // Effect to disable scroll during loading and refresh ScrollTrigger
  useEffect(() => {
    if (isLoading) {
      // Disable scrolling when loading
      document.body.style.overflow = 'hidden';
      // Reset scroll position to top
      window.scrollTo(0, 0);
    } else {
      // Create a smooth transition effect
      if (transitionOverlayRef.current) {
        // Fade out the overlay
        gsap.to(transitionOverlayRef.current, { 
          opacity: 0, 
          duration: 1, 
          ease: "power2.inOut",
          onComplete: () => {
            // Enable scrolling when transition completes
            document.body.style.overflow = '';
            setContentReady(true);
            
            // Add smooth scroll behavior
            if (isFirstLoad) {
              document.documentElement.style.scrollBehavior = 'smooth';
              setIsFirstLoad(false);
              
              // Refresh ScrollTrigger to ensure animations work
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 200);
            }
          }
        });
      } else {
        // Fallback if overlay ref is not available
        document.body.style.overflow = '';
        setContentReady(true);
      }
    }
    
    return () => {
      // Cleanup
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

  // Force ScrollTrigger update when main content becomes visible
  useEffect(() => {
    if (contentReady && appRef.current) {
      // Clear any existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Wait for DOM to update
      setTimeout(() => {
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [contentReady]);

  const handleLoadingComplete = () => {
    console.log("Loading complete, transitioning to main content");
    setIsLoading(false);
    
    // Force refresh ScrollTrigger after a short delay
    setTimeout(() => {
      // Refresh ScrollTrigger
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
              className="w-screen h-screen overflow-auto"
            >
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