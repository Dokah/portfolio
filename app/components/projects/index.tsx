import {
  ProjectComponent,
  ProjectComponentInterface,
} from "../projectComponent";
import portfolioPicture from "/assets/portfolio.png";
import pythonPicture from "/assets/python.jpg";
import "./index.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const cubeVariants = {
  enter: {
    rotateY: -90,
    opacity: 0,
    zIndex: 0,
  },
  center: {
    rotateY: 0,
    opacity: 1,
    zIndex: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    zIndex: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export const Projects = () => {
  const [index, setIndex] = useState(0);
  const [manualMode, setManualMode] = useState(false);

  const projects: ProjectComponentInterface[] = [
    {
      projectTitle: "Portfolio Website",
      projectDescription:
        "Personal portfolio website, built using Remix.js, a modern web framework focused on fast performance, and it's deployed seamlessly with Netlify.",
      projectPictureURL: portfolioPicture,
      projectLinkURL: "https://github.com/Dokah/portfolio",
    },
    {
      projectTitle: "Python Web Scraper",
      projectDescription:
        "A Python web scraper that extracts data from a website and saves it to a CSV file. It uses BeautifulSoup and requests libraries.",
      projectPictureURL: pythonPicture,
      projectLinkURL: "https://github.com/Dokah/Python_scraper-project",
    },
  ];

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [manualMode, projects.length]);

  const handleDotClick = (i: number) => {
    setManualMode(true);
    setIndex(i);
  };

  const handlePrevSwipe = () => {
    setManualMode(true);
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNextSwipe = () => {
    setManualMode(true);
    setIndex((prev) => (prev + 1) % projects.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextSwipe,
    onSwipedRight: handlePrevSwipe,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="projects-container">
      <div className="projects-wrapper">
        <div className="arrows-wrapper">
          <span onClick={handlePrevSwipe} className="arrow-component left" />
          <div className="project-cube-wrapper" {...swipeHandlers}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="project-cube"
                initial="enter"
                animate="center"
                exit="exit"
                variants={cubeVariants}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <ProjectComponent
                  key={index}
                  projectTitle={projects[index].projectTitle}
                  projectDescription={projects[index].projectDescription}
                  projectPictureURL={projects[index].projectPictureURL}
                  projectLinkURL={projects[index].projectLinkURL}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <span onClick={handleNextSwipe} className="arrow-component right" />
        </div>

        <div className="indicator-container">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleDotClick(i)}
              className="indicator-dot"
              animate={{
                scale: i === index ? 0.8 : 0.5,
                backgroundColor: i === index ? "#228b22" : "#6b7280",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
