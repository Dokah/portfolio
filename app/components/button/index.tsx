import "./index.css";
import whiteArrow from "/assets/whiteArrow.svg";
export const Button = ({ onClick }: { onClick: Function }) => {
  return (
    <div className="button" onClick={() => onClick()}>
      <img alt="arrow" className="arrow" src={whiteArrow}></img>
    </div>
  );
};
