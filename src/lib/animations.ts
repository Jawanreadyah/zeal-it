import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationParams {
  sectionRef: RefObject<HTMLElement>;
  contentRef: RefObject<HTMLDivElement>;
  backgroundRef: RefObject<HTMLDivElement>;
  statsItemsSelector?: string;
}

interface ScrollPromptParams {
  scrollPromptRef: RefObject<HTMLDivElement>;
}

interface ScrollDismissParams {
  scrollPromptRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
  onComplete: () => void;
}

/**
 * Setup immersive scroll animation effect
 * @param params Configuration parameters for the animation
 */
export const setupScrollAnimation = ({
  sectionRef,
  contentRef,
  backgroundRef,
  statsItemsSelector = '.stats-item',
}: ScrollAnimationParams) => {
  if (!sectionRef.current || !contentRef.current || !backgroundRef.current) return;
  
  // Clear any existing ScrollTrigger instances to prevent duplicates
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Find the stats bar element (direct child of contentRef)
  const statsBar = contentRef.current.querySelector('.flex.flex-col.md\\:flex-row');
  
  // Exclude stats bar from the blur/scale effects by ensuring it's at full opacity/scale
  if (statsBar) {
    gsap.set(statsBar, {
      opacity: 1,
      scale: 1,
      filter: "none",
      clearProps: "all"
    });
  }
  
  // Set initial scale for the perspective effect - make sure it's visible on mobile
  // but exclude the stats bar from these effects
  gsap.set(contentRef.current, {
    scale: 0.9,
    opacity: 0.7,
    filter: "blur(3px)",
    y: 30,
    transformOrigin: "center top"
  });
  
  // Make sure the stats bar stays visible
  if (statsBar) {
    gsap.set(statsBar, {
      opacity: 1,
      scale: 1, 
      filter: "none",
      overwrite: "auto"
    });
  }

  // Create the animation timeline for the content
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom", // Start as soon as the section enters viewport from bottom
      end: "20% top",
      scrub: 0.5,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      preventOverlaps: true
    }
  });

  // Animate content from small/far away to full size
  tl.to(contentRef.current, {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    ease: "power1.out",
    duration: 1
  });
  
  // Make sure stats section stays visible throughout animation
  if (statsBar) {
    gsap.to(statsBar, {
      opacity: 1,
      scale: 1,
      filter: "none",
      duration: 0.1,
      overwrite: "auto"
    });
  }

  // Animate background parallax effect
  gsap.to(backgroundRef.current, {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true
    },
    backgroundPositionY: "50%",
    ease: "none",
    duration: 1
  });

  // Force initial rendering in case user doesn't scroll
  setTimeout(() => {
    // Make sure stats section is fully visible
    if (statsBar) {
      gsap.set(statsBar, {
        opacity: 1,
        scale: 1,
        filter: "none",
        overwrite: "auto"
      });
    }
    
    ScrollTrigger.refresh();
    
    // Slight scroll to trigger animations if at the top of the page
    if (window.scrollY < 5) {
      window.scrollTo({
        top: 5,
        behavior: 'smooth'
      });
    }
  }, 500);

  // Animate stats bar elements to stagger in
  const statsItems = document.querySelectorAll(statsItemsSelector);
  if (statsItems.length > 0) {
    // Make sure each stats item is visible immediately
    gsap.set(statsItems, {
      opacity: 1,
      y: 0
    });
    
    // Then apply a subtle animation when scrolling into view
    gsap.fromTo(statsItems, 
      { opacity: 0.8, y: 5 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power1.out"
      }
    );
  }
};

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