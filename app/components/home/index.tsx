import { useEffect, useState } from "react";
import { canvasDots } from "../backgroundCanvas";
import "./index.css";
import { Button } from "../button";
import { debounce } from "~/utility/utils";

export const Home = ({ setNextSlide }: { setNextSlide: Function }) => {
  // const [size, setSize] = useState(0);

  // useEffect(() => {
  //   const handleResize = debounce(() => {
  //     setSize(window.innerWidth);
  //   }, 100);
  //   window.addEventListener("resize", () => handleResize());
  //   return () => {
  //     window.removeEventListener("resize", () => handleResize());
  //     handleResize.cancel();
  //   };
  // }, []);

  // useEffect(() => {
  //   // canvasDots();
  // }, [size]);

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
