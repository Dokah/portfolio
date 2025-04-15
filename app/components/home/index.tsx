import { useEffect } from "react";
import { canvasDots } from "../backgroundCanvas";
import "./index.css";
import { Button } from "../button";

export const Home = ({ setNextSlide }: { setNextSlide: Function }) => {
  useEffect(() => {
    canvasDots();
  }, []);

  return (
    <div id="home" className="home">
      <h1>
        Hello, I'm <span>Dominik</span>.
      </h1>
      <h1>I'm a Full Stack Web Developer.</h1>
      <h1 style={{ zIndex: 10000 }}>
        <Button onClick={setNextSlide} />
      </h1>
    </div>
  );
};
