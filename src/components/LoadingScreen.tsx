import React, { useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { Code2, MousePointer, ArrowUpRight } from 'lucide-react';
import { setupScrollPrompt, handleScrollDismiss } from '../lib/animations';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const interactionHintRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  // Function to handle dismissal of loading screen
  const dismissLoadingScreen = () => {
    if (scrollPromptRef.current && overlayRef.current && loadingComplete) {
      gsap.to(scrollPromptRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.inOut"
      });
      
      // Animate out the loading screen
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(onLoadingComplete, 300);
        }
      });
    }
  };

  useEffect(() => {
    const duration = 4000; // 4 seconds - shortened for better UX
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(timer);
        setLoadingComplete(true);
        // Show scroll prompt
        if (scrollPromptRef.current) {
          gsap.fromTo(scrollPromptRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" }
          );
          
          // Setup scroll prompt animation
          setupScrollPrompt({ scrollPromptRef });
        }
        
        // Animate progress bar out
        gsap.to(contentRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.inOut"
        });

        // Auto-dismiss after 8 seconds if user doesn't interact
        setTimeout(() => {
          if (document.body.style.overflow === 'hidden') {
            dismissLoadingScreen();
          }
        }, 8000);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && interactionHintRef.current) {
        setHasInteracted(true);
        gsap.to(interactionHintRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (interactionHintRef.current) {
              interactionHintRef.current.style.display = 'none';
            }
          }
        });
      }
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (loadingComplete) {
      // Setup scroll to dismiss
      const cleanup = handleScrollDismiss({
        scrollPromptRef,
        overlayRef,
        onComplete: onLoadingComplete
      });

      // Add keyboard event listener for pressing any key to dismiss
      const handleKeyDown = () => dismissLoadingScreen();
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        cleanup && cleanup();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [loadingComplete, onLoadingComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50">
      {/* Spline Container - Full Screen */}
      <div className="absolute inset-0 w-screen h-screen">
        <Spline 
          scene="https://prod.spline.design/vWJQmJoNNGz9TNeI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Loading Overlay - Pointer events none to allow interaction with 3D scene */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Interaction Hint - Center */}
        <div 
          ref={interactionHintRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
        >
          <MousePointer className="w-8 h-8 text-white/80 animate-bounce" />
          <span className="text-white/80 text-sm font-light tracking-wider flex items-center gap-2">
            Click & Drag to Interact
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Scroll Down Prompt - Centered at bottom */}
        <div 
          ref={scrollPromptRef}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 cursor-pointer pointer-events-auto"
          onClick={dismissLoadingScreen}
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-5 h-9 border-2 border-white/80 rounded-full flex justify-center p-1">
              <div className="mouse-wheel w-1 h-1 bg-white/80 rounded-full"></div>
            </div>
          </div>
          <span className="text-white text-sm font-light tracking-wider uppercase">
            Click or Scroll Down
          </span>
        </div>

        {/* Loading Bar - Bottom */}
        <div ref={contentRef} className="absolute bottom-32 left-0 right-0 flex flex-col items-center">
          {/* Progress Bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Loading Text */}
          <div className="text-white/60 text-sm font-light tracking-wider">
            LOADING {Math.round(progress)}%
          </div>
        </div>

        {/* Built with Dev Technologies Button - Bottom Right */}
        <button className="absolute bottom-6 right-6 group flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all z-50 pointer-events-auto">
          <Code2 className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
            Built with Dev Technologies
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;