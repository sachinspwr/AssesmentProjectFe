// hooks/useScroll.ts
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollOptions {
  /**
   * Scroll behavior (auto or smooth)
   * @default 'auto'
   */
  behavior?: ScrollBehavior;
  
  /**
   * Offset from top of page
   * @default 0
   */
  offset?: number;
}

interface UseScrollReturn {
  /**
   * Scroll to a specific position
   */
  scrollTo: (options?: ScrollOptions) => void;
  
  /**
   * Scroll to top of page
   */
  scrollToTop: (options?: ScrollOptions) => void;
  
  /**
   * Scroll to a DOM element
   */
  scrollToElement: (element: HTMLElement | null, options?: ScrollOptions) => void;
}

export function useScroll(autoScrollOptions?: ScrollOptions): UseScrollReturn {
  const { pathname, hash } = useLocation();

  const scrollTo = useCallback((options?: ScrollOptions) => {
    window.scrollTo({
      top: options?.offset ?? autoScrollOptions?.offset ?? 0,
      behavior: options?.behavior ?? autoScrollOptions?.behavior ?? 'auto'
    });
  }, [autoScrollOptions]);

  const scrollToTop = useCallback((options?: ScrollOptions) => {
    scrollTo(options);
  }, [scrollTo]);

  const scrollToElement = useCallback((element: HTMLElement | null, options?: ScrollOptions) => {
    if (!element) return;
    
    const top = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: top - (options?.offset ?? autoScrollOptions?.offset ?? 0),
      behavior: options?.behavior ?? autoScrollOptions?.behavior ?? 'auto'
    });
  }, [autoScrollOptions]);

  // Auto scroll to top on route change
  useEffect(() => {
    if (hash) {
      // Let browser handle hash links
      return;
    }
    
    scrollToTop(autoScrollOptions);
  }, [pathname, hash, scrollToTop, autoScrollOptions]);

  return {
    scrollTo,
    scrollToTop,
    scrollToElement
  };
}