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
  const slides = ["Home", "About", "Projects", "Contact"];

  return (
    <div className="header">
      {slides.map((title, index) => (
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
      ))}
    </div>
  );
};
