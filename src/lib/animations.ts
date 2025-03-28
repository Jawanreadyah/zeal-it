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
  
  // Find the main content grid for separate animations
  const mainContentGrid = contentRef.current.querySelector('.mt-32.grid');
  
  // Set extremely small initial size - this creates a more dramatic scaling effect
  gsap.set(contentRef.current, {
    scale: 0.3, // Start extremely small
    opacity: 0.4,
    filter: "blur(8px)",
    y: 300, // Start far below
    z: -800, // Start very far back in 3D space
    transformOrigin: "center center", // Scale from center
    transformPerspective: 1200, // Enhanced perspective for 3D effect
    force3D: true
  });
  
  // If we have main content, set it to be initially farther away
  if (mainContentGrid) {
    gsap.set(mainContentGrid, {
      scale: 0.6,
      opacity: 0.3,
      y: 100,
      transformOrigin: "center center"
    });
  }
  
  // Ensure stats bar stays fully visible but starts further away
  if (statsBar) {
    gsap.set(statsBar, {
      opacity: 0.5,
      y: 50,
      z: -100
    });
  }
  
  // Create the main timeline for the dramatic scaling effect
  // The key here is to make the animation end point much further down the page
  // to extend the scaling effect throughout more scrolling
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom", // Start when section enters viewport
      end: "100% top", // End animation at the very bottom of the section
      scrub: 1, // Smoother scrubbing for more cinematic feel
      invalidateOnRefresh: true,
      preventOverlaps: true,
      markers: false // Set to true for debugging
    }
  });

  // Animate content from tiny to full size with a dramatic scaling effect
  tl.to(contentRef.current, {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    z: 0,
    ease: "power1.inOut",
    duration: 3 // Much longer duration for more gradual scaling
  });
  
  // If we have main content, animate it separately with slightly different timing
  if (mainContentGrid) {
    tl.to(mainContentGrid, {
      scale: 1,
      opacity: 1,
      y: 0,
      ease: "power1.out",
      duration: 2.5
    }, "-=2.8"); // Start earlier in the main animation
  }
  
  // Animate stats bar separately with its own timing
  if (statsBar) {
    tl.to(statsBar, {
      opacity: 1,
      y: 0,
      z: 0,
      duration: 1.5
    }, "-=2.5");
  }
  
  // Animate background with parallax effect
  gsap.to(backgroundRef.current, {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true
    },
    backgroundPositionY: "60%", // More dramatic position shift
    scale: 1.1, // Subtle scale effect on background
    ease: "none",
    duration: 1
  });

  // Enhanced scroll-responsive animation that's more dramatic
  const scrollResponsiveAnimation = () => {
    // Calculate scroll progress (0 to 1) more gradually
    // Use a larger denominator to make the effect last longer as you scroll
    const scrollProgress = Math.min(1, window.scrollY / (window.innerHeight * 1.2));
    
    if (contentRef.current) {
      // Apply scaling directly based on scroll position for a more immediate feel
      const currentScale = 0.3 + (scrollProgress * 0.7); // Scale from 0.3 to 1.0
      const currentBlur = Math.max(0, 8 - (scrollProgress * 8)); // Blur from 8px to 0px
      const currentY = Math.max(0, 300 - (scrollProgress * 300)); // Y from 300 to 0
      const currentZ = Math.max(0, -800 + (scrollProgress * 800)); // Z from -800 to 0
      
      gsap.to(contentRef.current, {
        scale: currentScale,
        filter: `blur(${currentBlur}px)`,
        y: currentY,
        z: currentZ,
        opacity: 0.4 + (scrollProgress * 0.6),
        duration: 0.1, // Very quick updates for immediate response
        ease: "none",
        overwrite: "auto"
      });
    }
    
    // Apply subtle movements to cards for layered effect
    const cards = document.querySelectorAll('.min-h-\\[14rem\\]');
    if (cards.length > 0) {
      gsap.to(cards, {
        y: 80 * (1 - scrollProgress), // More dramatic movement for cards
        scale: 0.6 + (scrollProgress * 0.4),
        stagger: 0.05,
        duration: 0.2,
        ease: "power1.out",
        overwrite: "auto"
      });
    }
  };
  
  // Create scroll listener for responsive animation
  window.addEventListener('scroll', scrollResponsiveAnimation);
  
  // Trigger initial animation state but don't auto-scroll
  // We want the user's scrolling to control everything
  setTimeout(() => {
    // Initial state for stats items
    const statsItems = document.querySelectorAll(statsItemsSelector);
    if (statsItems.length > 0) {
      gsap.set(statsItems, {
        opacity: 0,
        y: 30
      });
    }
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
    
    // Call scroll animation once to set initial state
    scrollResponsiveAnimation();
  }, 500);

  // Update stats items based on scroll
  const statsItems = document.querySelectorAll(statsItemsSelector);
  if (statsItems.length > 0) {
    gsap.fromTo(statsItems, 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "5% bottom", // Trigger a bit later
          end: "15% center",
          scrub: 0.5,
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.2)" // More dynamic easing
      }
    );
  }
  
  // Return a cleanup function to remove event listeners
  return () => {
    window.removeEventListener('scroll', scrollResponsiveAnimation);
  };
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