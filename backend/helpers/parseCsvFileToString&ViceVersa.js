import { promises as fs } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import deleteFile from "./deleteFile.js";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const parseCsvFileToString = async (csvFilePath) => {
  try {
    const data = await fs.readFile(csvFilePath, "utf8");

    //converting object to string
    const csvString = "" + data;

    return csvString;

  } catch (err) {
    console.error("Error:", err);
    throw err; // Re-throw the error for handling in the calling code
  }
};

export const parseStringToCsvFile = async (string) => {
  const filename = Date.now() + `currentYearSecretSantaCsvFile.csv`;
  // filePath for file to be saved
  const filePath = path.join(__dirname, "../assets", filename);

  try {
    // Write the CSV string to the file asynchronously
    await fs.writeFile(filePath, string, "utf8");

    console.log("CSV file saved at:", filePath);

    // Return the file path or any other response
    return filePath;
  } catch (error) {
    console.error("Error saving the CSV file:", error);
    throw error;
  }
};
