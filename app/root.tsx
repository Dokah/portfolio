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
        "Creative full-stack web developer portfolio built with Remix.js. Explore projects, design systems, and modern web solutions showcasing performance and accessibility.",
    },
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
