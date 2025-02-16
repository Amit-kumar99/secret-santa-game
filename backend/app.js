import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";

const app = express();

const port = 8000;

// cors middleware to allow cross origin requests from frontend
app.use(
  cors({
    origin:`http://localhost:5173`,
  })
);

app.use("/api/v1/files", fileRoutes);
app.use("/api/v1/health", healthcheckRoutes);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
