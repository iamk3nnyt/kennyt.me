import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(
  targetValue: number | string,
  duration: number = 1000,
  useDecimals: boolean = false,
) {
  const [current, setCurrent] = useState(targetValue);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const startValueRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // If the value is a string (like percentage), don't animate
    if (typeof targetValue === "string") {
      setCurrent(targetValue);
      return;
    }

    const startValue =
      typeof startValueRef.current === "number"
        ? startValueRef.current
        : targetValue;
    const startTime = performance.now();
    const endValue = targetValue;

    startTimeRef.current = startTime;
    startValueRef.current = startValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;

      // Only use decimals if specified
      setCurrent(
        useDecimals
          ? Number(currentValue.toFixed(2))
          : Math.round(currentValue),
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration, useDecimals]);

  return { current };
}
