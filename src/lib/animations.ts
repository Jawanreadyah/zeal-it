import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ScrollPromptParams {
  scrollPromptRef: RefObject<HTMLDivElement>;
}

interface ScrollDismissParams {
  scrollPromptRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
  onComplete: () => void;
}

/**
 * Setup scroll prompt animation
 * @param scrollPromptRef Reference to the scroll prompt element
 */
export const setupScrollPrompt = ({ scrollPromptRef }: ScrollPromptParams) => {
  if (!scrollPromptRef.current) return;
  
  // Make sure the scroll prompt is visible
  gsap.to(scrollPromptRef.current, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  });
  
  const mouseWheel = scrollPromptRef.current.querySelector('.mouse-wheel');
  if (!mouseWheel) return;
  
  // Animate the mouse wheel indicator
  gsap.to(mouseWheel, {
    y: 6,
    repeat: -1,
    duration: 1,
    ease: "power2.inOut",
    yoyo: true
  });
};

/**
 * Handle scroll to dismiss loading screen
 * @param params Parameters for handling scroll dismissal
 */
export const handleScrollDismiss = ({
  scrollPromptRef,
  overlayRef,
  onComplete
}: ScrollDismissParams) => {
  if (!scrollPromptRef.current || !overlayRef.current) return;
  
  // Track if we've already started dismissing to prevent multiple triggers
  let isDismissing = false;
  
  // Function to actually dismiss the loading screen
  const dismiss = () => {
    if (isDismissing) return;
    isDismissing = true;
    
    // Stop listening for scroll events
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchmove', handleTouchMove);
    
    // Animate out the scroll prompt
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
        setTimeout(() => {
          onComplete();
          // Force refresh ScrollTrigger
          ScrollTrigger.refresh();
        }, 300);
      }
    });
  };
  
  // Different event handlers to catch all types of scrolling
  const handleScroll = () => {
    if (window.scrollY > 10) {
      dismiss();
    }
  };
  
  const handleWheel = () => {
    dismiss();
  };
  
  const handleTouchMove = () => {
    dismiss();
  };
  
  // Add all event listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('wheel', handleWheel, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchmove', handleTouchMove);
  };
}; 