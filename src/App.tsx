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
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const initialFadeRef = useRef(false);

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
        // Only fade the overlay partially - we want to see content emerge as we scroll
        gsap.fromTo(transitionOverlayRef.current,
          { opacity: 1 },
          { 
            opacity: 0.7, // Keep a slight overlay to make content look distant 
            duration: 1, 
            ease: "power2.inOut",
            onComplete: () => {
              // Enable scrolling when transition completes
              document.body.style.overflow = '';
              setContentReady(true);
              
              // If this is the first time loading, add smooth scrolling
              if (isFirstLoad) {
                // Add smooth scroll behavior to body
                document.documentElement.style.scrollBehavior = 'smooth';
                setIsFirstLoad(false);
                
                // Don't auto-scroll - we want the user to control the animation
                setTimeout(() => {
                  // Refresh ScrollTrigger to make sure it picks up elements
                  ScrollTrigger.refresh();
                }, 200);
              }
            }
          }
        );
        
        // Add a scroll listener to fade out the overlay completely as user scrolls
        const handleInitialScroll = () => {
          if (!initialFadeRef.current && transitionOverlayRef.current) {
            // Further fade out the overlay based on scroll position
            const scrollProgress = Math.min(1, window.scrollY / (window.innerHeight * 0.3));
            const newOpacity = Math.max(0, 0.7 - (scrollProgress * 0.7));
            
            gsap.to(transitionOverlayRef.current, {
              opacity: newOpacity,
              duration: 0.3
            });
            
            // When completely scrolled, remove the listener
            if (scrollProgress >= 1) {
              initialFadeRef.current = true;
              window.removeEventListener('scroll', handleInitialScroll);
            }
          }
        };
        
        window.addEventListener('scroll', handleInitialScroll);
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
          {/* Transition overlay - initially quite dark */}
          <div 
            ref={transitionOverlayRef} 
            className="fixed inset-0 bg-black z-40 pointer-events-none"
          ></div>
          
          {/* Scroll indicator */}
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 opacity-80 animate-bounce pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <div className="w-5 h-9 border-2 border-white/80 rounded-full flex justify-center p-1">
                <div className="w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
              </div>
              <span className="text-white text-sm font-light tracking-wider uppercase">
                Scroll to Discover
              </span>
            </div>
          </div>
          
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
        </>
      )}
    </>
  );
}

export default App;