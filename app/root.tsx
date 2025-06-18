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
