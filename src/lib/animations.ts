import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initGSAP = () => {
  gsap.registerPlugin(ScrollTrigger);
};

// Hero text animation
export const animateHeroText = (selector: string) => {
  gsap.fromTo(
    selector,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    }
  );
};

// Fade in animation
export const fadeIn = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
    }
  );
};

// Scale in animation
export const scaleIn = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

// Slide in from right
export const slideInRight = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    { x: 100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Slide in from left
export const slideInLeft = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    { x: -100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Stagger animation for cards
export const staggerCards = (selector: string) => {
  gsap.fromTo(
    selector,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Scroll reveal animation
export const scrollReveal = (selector: string) => {
  gsap.fromTo(
    selector,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Page transition
export const pageTransition = (onComplete?: () => void) => {
  const tl = gsap.timeline({ onComplete });
  tl.to('.page-content', {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power2.in',
  });
  return tl;
};

// Page enter
export const pageEnter = () => {
  gsap.fromTo(
    '.page-content',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }
  );
};

// Button hover animation
export const animateButton = (element: HTMLElement) => {
  const tl = gsap.timeline({ paused: true });
  tl.to(element, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out',
  });
  return tl;
};

// Success animation
export const successAnimation = (selector: string) => {
  gsap.fromTo(
    selector,
    { scale: 0.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(2)',
    }
  );
};

// Loading animation
export const loadingAnimation = (selector: string) => {
  gsap.to(selector, {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'linear',
  });
};

// Table row animation
export const animateTableRow = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    { x: -20, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.5,
      delay,
      ease: 'power2.out',
    }
  );
};
