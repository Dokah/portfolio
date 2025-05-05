import { useState, useEffect } from "react";
import { isMobile } from "~/utility/utils";
import "./index.css";

export const Header = ({
  currentSlide,
  setCurrentSlide,
  setHasScrolled,
}: {
  currentSlide: number;
  setCurrentSlide: Function;
  setHasScrolled: Function;
}) => {
  const slides = ["HOME", "TECH", "PROJECTS", "CONTACT"];

  const [isMobileClient, setIsMobileClient] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobileClient(isMobile());
  }, []);

  if (isMobileClient === null) {
    return null;
  }

  return (
    <div className={`${isMobileClient ? "tablet-" : ""}header-container`}>
      {!isMobileClient ? (
        slides.map((title, index) => (
          <span
            onClick={() => {
              if (currentSlide !== index) {
                setHasScrolled(true);
                setCurrentSlide(index);
              }
            }}
            key={index}
            className={currentSlide === index ? "selected" : ""}
          >
            {title}
          </span>
        ))
      ) : (
        <span>{currentSlide !== 0 && slides[currentSlide]}</span>
      )}
    </div>
  );
};
