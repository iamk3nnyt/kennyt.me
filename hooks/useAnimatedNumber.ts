"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A custom React hook that creates a smooth animation between two numbers.
 * Uses requestAnimationFrame for optimal performance and implements an easeOutQuart easing function.
 *
 * @param target - The target number to animate to
 * @param duration - The duration of the animation in milliseconds (default: 1000ms)
 * @param useDecimals - Whether to preserve decimal places in the animation (default: false)
 * @returns An object containing the current animated value
 */
export function useAnimatedNumber(
  target: number,
  duration: number = 1000,
  useDecimals: boolean = false,
) {
  // Current animated value that will be displayed
  const [current, setCurrent] = useState(0);

  // Refs to store animation state that persists between renders
  const startTime = useRef<number | null>(null); // Timestamp when animation started
  const startValue = useRef<number>(0); // Initial value when animation started
  const animationFrame = useRef<number | undefined>(undefined); // Animation frame ID for cleanup

  useEffect(() => {
    // Skip animation if target is already reached
    if (target === current) return;

    const animate = (timestamp: number) => {
      // Initialize animation state on first frame
      if (!startTime.current) {
        startTime.current = timestamp;
        startValue.current = current;
      }

      // Calculate animation progress (0 to 1)
      const progress = Math.min((timestamp - startTime.current) / duration, 1);

      // Apply easeOutQuart easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      // Calculate new value based on progress and easing
      const newValue =
        startValue.current + (target - startValue.current) * easeOutQuart;

      // Update current value, preserving decimals if specified
      setCurrent(
        useDecimals ? Number(newValue.toFixed(2)) : Math.round(newValue),
      );

      // Continue animation if not complete
      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact target
        setCurrent(
          useDecimals ? Number(target.toFixed(2)) : Math.round(target),
        );
        startTime.current = null;
      }
    };

    // Start animation
    animationFrame.current = requestAnimationFrame(animate);

    // Cleanup: cancel animation frame on unmount or when dependencies change
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [target, duration, useDecimals]);

  return { current };
}
