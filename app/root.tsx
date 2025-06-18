import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./index.css";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dominik | Fullstack Web Developer" },
    {
      name: "description",
      content:
        "Explore the portfolio of Dominik Kukovec, a web developer specializing in modern JavaScript frameworks like Remix.js and Next.js. Discover clean, fast, and accessible websites built with performance and user experience in mind.",
    },
    {
      name: "keywords",
      content:
        "web developer, fullstack developer, JavaScript, TypeScript, Remix.js, Next.js, React, Node.js, web development, portfolio",
    },
    { name: "author", content: "Dominik Kukovec" },
    {
      property: "og:image",
      content: "https://dominikkukovec.com/og-image.png",
    },
    { property: "og:title", content: "Dominik | Fullstack Web Developer" },
    {
      property: "og:description",
      content:
        "Explore the portfolio of Dominik Kukovec, a web developer specializing in modern JavaScript frameworks like Remix.js and Next.js. Discover clean, fast, and accessible websites built with performance and user experience in mind.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://dominikkukovec.com" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <title>Dominik | Fullstack Web Developer</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
