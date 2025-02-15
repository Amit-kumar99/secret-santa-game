// middleware to verify if both the csv files have correct number of columns in 1st row. 
// else reject
import checkColumnCountInString from '../helpers/checkColumnCountInString.js';
import { parseCsvFileToString } from '../helpers/parseCsvFileToString&ViceVersa.js';

export const verifyColumnsInCsvFiles = async (req, res, next) => {
  const currentYearEmployeesString = await parseCsvFileToString(req.files.currentYearEmployeesCsvFile[0].path);
  const previousYearSecretSantaString = await parseCsvFileToString(req.files.previousYearSecretSantaCsvFile[0].path);

  const currentYearEmployeesStringIsValid = checkColumnCountInString(currentYearEmployeesString, 2);
  const previousYearSecretSantaStringIsValid = checkColumnCountInString(previousYearSecretSantaString, 4);

  if (currentYearEmployeesStringIsValid && previousYearSecretSantaStringIsValid) {
    next();
  }
  else {
    res.json(400, "One or both of the files don't have the required amount of columns in some row.");
  }

};