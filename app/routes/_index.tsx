import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { About } from "~/components/about";
import { Contact } from "~/components/contact";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Home } from "~/components/home";
import { Projects } from "~/components/projects";

const slides = [Home, About, Projects, Contact];

export default function Screen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartY = useRef<number | null>(null);

  const nextSlide = () => {
    setHasScrolled(true);
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setHasScrolled(true);
    setDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setHasScrolled(true);
    if (index > currentSlide) {
      setDirection("next");
    } else if (index < currentSlide) {
      setDirection("prev");
    }
    setCurrentSlide(index);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) {
        nextSlide();
      } else if (e.deltaY < -20) {
        previousSlide();
      }
    };
    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current !== null) {
        const deltaY = touchStartY.current - e.changedTouches[0].clientY;
        if (deltaY > 50) {
          nextSlide();
        } else if (deltaY < -50) {
          previousSlide();
        }
        touchStartY.current = null;
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const ActiveSlide = slides[currentSlide];

  return (
    <div className="screen">
      <Header
        setHasScrolled={setHasScrolled}
        setCurrentSlide={goToSlide}
        currentSlide={currentSlide}
      />

      {!hasScrolled ? (
        <Home setNextSlide={nextSlide} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: direction === "next" ? 50 : -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === "next" ? -50 : 50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <ActiveSlide setNextSlide={nextSlide} />
          </motion.div>
        </AnimatePresence>
      )}

      <Footer />
    </div>
  );
}
