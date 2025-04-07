import { useEffect } from "react";
import { canvasDots } from "../backgroundCanvas";
import "./index.css";

export const Hero = () => {
  useEffect(() => {
    canvasDots();
  }, []);

  return (
    <div id="hero" className="hero">
      <canvas className="connecting-dots"></canvas>
      <h1>
        Hello, I'm <span>Dominik</span>.
      </h1>
      <h1>I'm a Full Stack Web Developer.</h1>
      {/* <a className="hero-link">About me</a> */}
    </div>
  );
};
