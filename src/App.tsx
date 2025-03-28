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
  const appRef = useRef<HTMLDivElement>(null);

  // Effect to disable scroll during loading and refresh ScrollTrigger
  useEffect(() => {
    if (isLoading) {
      // Disable scrolling when loading
      document.body.style.overflow = 'hidden';
      // Reset scroll position to top
      window.scrollTo(0, 0);
    } else {
      // Enable scrolling when loading is complete
      document.body.style.overflow = '';
      
      // If this is the first time loading, add smooth scrolling
      if (isFirstLoad) {
        // Add smooth scroll behavior to body
        document.documentElement.style.scrollBehavior = 'smooth';
        setIsFirstLoad(false);
        
        // Small delay to ensure animations are ready
        setTimeout(() => {
          // Refresh ScrollTrigger to make sure it picks up elements
          ScrollTrigger.refresh();
          
          // Scroll 1px to trigger scroll animations
          window.scrollTo({
            top: 1,
            behavior: 'smooth'
          });
        }, 200);
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
    if (!isLoading && appRef.current) {
      // Clear any existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Wait for DOM to update
      setTimeout(() => {
        // Make sure scroll is enabled
        document.body.style.overflow = '';
        
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
        
        // Trigger a small scroll to activate animations
        if (window.scrollY < 2) {
          window.scrollTo({
            top: 2,
            behavior: 'smooth'
          });
        }
      }, 500);
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    console.log("Loading complete, transitioning to main content");
    setIsLoading(false);
    
    // Force refresh ScrollTrigger after a short delay
    setTimeout(() => {
      // Make sure scroll is enabled
      document.body.style.overflow = '';
      
      ScrollTrigger.refresh();
      
      console.log("ScrollTrigger refreshed");
    }, 100);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
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
      )}
    </>
  );
}

export default App;