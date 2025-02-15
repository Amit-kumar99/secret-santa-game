import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";

const app = express();

const port = process.env.PORT || 8000;

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: true,
  })
);

app.use("/api/v1/files", fileRoutes);
app.use("/api/v1/health", healthcheckRoutes);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
