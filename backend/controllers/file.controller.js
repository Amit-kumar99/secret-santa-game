import {
  parseCsvFileToString,
  parseStringToCsvFile,
} from "../helpers/parseCsvFileToString&ViceVersa.js";
import {
  parseCurrentYearStringToNumbers,
  parsePreviousYearSecretSantasStringToNumbers,
} from "../helpers/parseStringToNumbers.js";
import assignSecretSanta from "../helpers/assignSecretSanta.js";
import parseCurrentYearSecretSantasNumbersToString from "../helpers/parseNumbersToString.js";
import deleteFile from '../helpers/deleteFile.js';


export const assignSecretSantaForCurrentYear = async (req, res) => {
  try {
    const currentYearEmployeesString = await parseCsvFileToString(
      req.files.currentYearEmployeesCsvFile[0].path
    );
    const previousYearSecretSantaString = await parseCsvFileToString(
      req.files.previousYearSecretSantaCsvFile[0].path
    );
  
    const currentYearEmployeesNumbers = parseCurrentYearStringToNumbers(
      currentYearEmployeesString
    );
    const previousYearSecretSantaNumbers =
      parsePreviousYearSecretSantasStringToNumbers(
        previousYearSecretSantaString,
        currentYearEmployeesString
      );
  
    const currentYearSecretSantaNumbers = assignSecretSanta(
      currentYearEmployeesNumbers,
      previousYearSecretSantaNumbers
    );
    const currentYearSecretSantaString =
      parseCurrentYearSecretSantasNumbersToString(
        currentYearSecretSantaNumbers,
        currentYearEmployeesString
      );
  
    const currentYearSecretSantaCsvFilePath = await parseStringToCsvFile(
      currentYearSecretSantaString
    );
  
    res.download(
      currentYearSecretSantaCsvFilePath,
      "current_Year_Secret_Santa_List.csv",
      (err) => {
        if (err) {
          console.log("Error sending file:", err);
        }
        console.log("File sent successfully.");
  
        //delete all the 3 csv files once current_Year_Secret_Santa_List file sent to the frontend 
        deleteFile(currentYearSecretSantaCsvFilePath);
        deleteFile(req.files.currentYearEmployeesCsvFile[0].path);
        deleteFile(req.files.previousYearSecretSantaCsvFile[0].path);
      }
    );
  } catch (error) {
    console.log("Error occured in controller method - assignSecretSantaForCurrentYear");
    res.status(500).json({ message: "Error occured.", error});
  }
};