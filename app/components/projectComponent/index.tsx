import "./index.css";
import githubLogoURL from "../../assets/github.svg";

export interface ProjectComponentInterface {
  projectTitle: string;
  projectDescription: string;
  projectPictureURL: string;
  projectLinkURL: string;
}

export const ProjectComponent = ({
  projectTitle,
  projectDescription,
  projectPictureURL,
  projectLinkURL,
}: ProjectComponentInterface) => {
  return (
    <div className="project-component-container">
      <div className="project-component-image-container">
        <img
          onClick={() => {
            window.open(projectLinkURL, "_blank");
          }}
          src={projectPictureURL}
          alt="Project"
          className="project-component-image"
        />
      </div>
      <div className="project-component-title">
        <a href={projectLinkURL} target="_blank" rel="noopener noreferrer">
          {projectTitle}
        </a>
      </div>
      <div className="project-component-description">
        <p>{projectDescription}</p>
      </div>
      <div className="project-component-footer">
        <a href={projectLinkURL} target="_blank" rel="noopener noreferrer">
          <img src={githubLogoURL} alt="GitHub" className="logo" />
        </a>
      </div>
    </div>
  );
};
