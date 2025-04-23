import "./index.css";
import githubLogoURL from "../../assets/github.svg";
import linkedinLogoURL from "../../assets/linkedin.svg";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-socials">
        <a href="https://github.com/Dokah">
          <img src={githubLogoURL} alt="GitHub" className="logo" />
        </a>
        <a href="https://www.linkedin.com/in/dominik-kukovec-b1a0251b8/">
          <img src={linkedinLogoURL} alt="LinkedIn" className="logo" />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Dominik Kukovec</p>
    </div>
  );
};
