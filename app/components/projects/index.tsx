import {
  ProjectComponent,
  ProjectComponentInterface,
} from "../projectComponent";
import portfolioPicture from "../../assets/portfolio.png";

export const Projects = () => {
  const projects: ProjectComponentInterface[] = [
    {
      projectTitle: "Portfolio Website",
      projectDescription:
        "Personal portfolio website, built using Remix.js, a modern web framework focused on fast performance, and it's deployed seamlessly with Netlify.",
      projectPictureURL: portfolioPicture,
      projectLinkURL: "https://github.com/Dokah/portfolio",
    },
  ];

  //TODO: Uncomment this code when the projects are ready to be displayed

  // return (
  //   <div className="projects-container">
  //     {projects.map((project, index) => (
  //       <ProjectComponent
  //         key={index}
  //         projectTitle={project.projectTitle}
  //         projectDescription={project.projectDescription}
  //         projectPictureURL={project.projectPictureURL}
  //         projectLinkURL={project.projectLinkURL}
  //       />
  //     ))}
  //   </div>
  // );

  return (
    <div>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmIybDl0OGF0ZHZ6NmYwZ25lcXp2Z2h6bnpxZ3IyeW50ZHBlMnAxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vR1dPIYzQmkRzLZk2w/giphy.gif"
        alt="under-construction"
      ></img>
    </div>
  );
};
