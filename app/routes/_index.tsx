import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Tech } from "~/components/tech";
import { Contact } from "~/components/contact";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Home } from "~/components/home";
import { Projects } from "~/components/projects";
import { ScreenWrapper } from "~/components/screenWrapper/ScreenWrapper";
import { canvasDots } from "~/components/backgroundCanvas";
import { debounce } from "~/utility/utils";

const slides = [Home, Tech, Projects, Contact];

export default function Screen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartY = useRef<number | null>(null);
  const [size, setSize] = useState(0);

  const isScrollingRef = useRef(false);

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
    let timeout: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;

      if (e.deltaY > 20) {
        nextSlide();
        isScrollingRef.current = true;
        timeout = setTimeout(() => (isScrollingRef.current = false), 800);
      } else if (e.deltaY < -20) {
        previousSlide();
        isScrollingRef.current = true;
        timeout = setTimeout(() => (isScrollingRef.current = false), 800);
      }
    };

    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(timeout);
    };
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

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize(window.innerWidth);
    }, 200);
    window.addEventListener("resize", () => handleResize());
    return () => {
      window.removeEventListener("resize", () => handleResize());
      handleResize.cancel();
    };
  }, []);

  useEffect(() => {
    canvasDots();
  }, [size]);

  return (
    <ScreenWrapper>
      <canvas className="connecting-dots"></canvas>
      <div className="header">
        <Header
          currentSlide={currentSlide}
          setCurrentSlide={goToSlide}
          setHasScrolled={setHasScrolled}
        />
      </div>
      {!hasScrolled ? (
        <div className="content">
          <Home setNextSlide={nextSlide} />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <div className="content">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: direction === "next" ? 50 : -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction === "next" ? -50 : 50 }}
              transition={{ duration: 0.6 }}
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActiveSlide setNextSlide={nextSlide} />
            </motion.div>
          </div>
        </AnimatePresence>
      )}

      <div className="footer">
        <Footer />
      </div>
    </ScreenWrapper>
  );
}
