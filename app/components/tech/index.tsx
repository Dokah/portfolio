import { CustomCarousel } from "../carousel";
import ReactLogo from "../../assets/react.svg";
import NodeLogo from "../../assets/node.svg";
import NextLogo from "../../assets/next.svg";
import JestLogo from "../../assets/jest.svg";
import GitlabLogo from "../../assets/gitlab.svg";
import RemixLogo from "../../assets/remix.svg";
import PSQLLogo from "../../assets/psql.svg";
import AWSLogo from "../../assets/aws.svg";
import LinuxLogo from "../../assets/linux.svg";
import DockerLogo from "../../assets/docker.svg";
import Pm2Logo from "../../assets/pm2.svg";
import GitLogo from "../../assets/git.svg";
import RedisLogo from "../../assets/redis.svg";
import TypescriptLogo from "../../assets/typescript.svg";
import CloudflareLogo from "../../assets/cloudflare.svg";
import GithubLogo from "../../assets/github.svg";
import "./index.css";
import { isMobile } from "~/utility/utils";

const codingStack = [
  { src: TypescriptLogo, name: "Typescript" },
  { src: ReactLogo, name: "ReactJS" },
  { src: JestLogo, name: "Jest" },
  { src: NodeLogo, name: "NodeJS" },
  { src: NextLogo, name: "NextJS" },
  { src: RemixLogo, name: "RemixJS" },
  { src: PSQLLogo, name: "PSQL" },
];

const deploymentStack = [
  { src: AWSLogo, name: "AWS" },
  { src: LinuxLogo, name: "Linux" },
  { src: DockerLogo, name: "Docker" },
  { src: Pm2Logo, name: "PM2" },
  { src: GitLogo, name: "Git" },
  { src: RedisLogo, name: "Redis" },
  { src: GitlabLogo, name: "Gitlab" },
  { src: CloudflareLogo, name: "CloudFlare" },
  { src: GithubLogo, name: "Github" },
];

const mobileStack = [
  { src: TypescriptLogo, name: "Typescript" },
  { src: ReactLogo, name: "ReactJS" },
  { src: NodeLogo, name: "NodeJS" },
  { src: AWSLogo, name: "AWS" },
  { src: LinuxLogo, name: "Linux" },
  { src: DockerLogo, name: "Docker" },
];

export const Tech = () => {
  return (
    <div className="tech-container">
      {!isMobile() && (
        <div className="tech-title">
          <h1 style={{ fontWeight: 100 }}>Technologies That Power My Work</h1>
        </div>
      )}

      <div className="tech">
        <CustomCarousel speed={40} pauseOnHover duplicateCount={10} gap={16}>
          {codingStack.map((logo, index) => (
            <div className="hex" key={index}>
              <img
                src={logo.src}
                alt={logo.name}
                style={{ width: "60%", height: "50%" }}
              />
            </div>
          ))}
        </CustomCarousel>
        <CustomCarousel speed={40} pauseOnHover duplicateCount={10} gap={16}>
          {deploymentStack.map((logo, index) => (
            <div className="hex" key={index}>
              <img
                src={logo.src}
                alt={logo.name}
                style={{ width: "60%", height: "50%" }}
              />
            </div>
          ))}
        </CustomCarousel>
        {isMobile() && (
          <CustomCarousel speed={40} pauseOnHover duplicateCount={10} gap={16}>
            {mobileStack.map((logo, index) => (
              <div className="hex" key={index}>
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{ width: "60%", height: "50%" }}
                />
              </div>
            ))}
          </CustomCarousel>
        )}
      </div>
    </div>
  );
};
