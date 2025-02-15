import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verifyColumnsInCsvFiles } from "../middlewares/verifyColumnsInCsvFilesString.js";
import { assignSecretSantaForCurrentYear } from "../controllers/file.controller.js";

const router = Router();

router.post("/findSecretSanta", 
  upload.fields([
    {
      name: "currentYearEmployeesCsvFile",
      maxCount: 1,
    }, 
    {
      name: "previousYearSecretSantaCsvFile",
      maxCount: 1,
    }
  ]), 
  verifyColumnsInCsvFiles, 
  assignSecretSantaForCurrentYear);

export default router;