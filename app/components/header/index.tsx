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
  const slides = ["HOME", "STACK", "PROJECTS", "CONTACT"];

  if (!window) return null;
  return (
    <div className={`${isMobile() ? "tablet-" : ""}header-container`}>
      {!isMobile() ? (
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
