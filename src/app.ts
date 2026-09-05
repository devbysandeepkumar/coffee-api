import cors from "cors";
import express from "express";
import router from "./routes/search.route.js";

export function createApp(routePrefix = "/api") {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: "*" }));
  app.get(["/", "/api", "/api/index"], (_req, res) => {
    res.status(200).json({ status: "ok", service: "coffee-api" });
  });
  app.use(routePrefix, router);

  // Vercel may preserve the /api function prefix when forwarding the request.
  if (routePrefix === "") {
    app.use("/api", router);
  }

  return app;
}
