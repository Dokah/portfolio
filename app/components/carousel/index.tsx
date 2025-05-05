import { motion, useAnimationFrame } from "framer-motion";
import {
  ReactNode,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";

interface CustomCarouselProps {
  children: ReactNode[];
  speed?: number;
  gap?: number;
  pauseOnHover?: boolean;
  duplicateCount?: number;
}

export const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  speed = 60,
  gap = 8,
  pauseOnHover = true,
  duplicateCount = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const allChildren = Array.from(
    { length: duplicateCount },
    () => children
  ).flat();

  const measureWidth = useCallback(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / duplicateCount);
    }
  }, [children, duplicateCount]);

  useLayoutEffect(() => {
    measureWidth();
    const handleResize = () => measureWidth();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureWidth]);

  useAnimationFrame((t, delta) => {
    if (!isPaused && contentWidth) {
      setOffsetX((prev) => {
        const distance = (speed * delta) / 1000;
        const next = prev - distance;
        return next <= -contentWidth ? 0 : next;
      });
    }
  });

  return (
    <div
      ref={wrapperRef}
      style={{
        overflow: "hidden",
        width: "100%",
        position: "relative",
        ...(pauseOnHover && {
          onMouseEnter: () => setIsPaused(true),
          onMouseLeave: () => setIsPaused(false),
        }),
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        style={{
          display: "flex",
          gap: `${gap}px`,
          transform: `translateX(${offsetX}px)`,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {allChildren.map((child, i) => (
          <div key={i}>{child}</div>
        ))}
      </motion.div>
    </div>
  );
};
