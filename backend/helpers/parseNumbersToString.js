import { mapNumbersToNamesAndEmails } from "./mapEmailsToNumbersAndViceVersa.js";

// use fxn mapNumbersToNamesAndEmails to get string value for each number & join for each row.
const parseCurrentYearSecretSantasNumbersToString = (currentYearSecretSantasNumbers, currentYearString) => {
  // Get the rows using the helper function
  const arr = mapNumbersToNamesAndEmails(currentYearString);
  
  const result = [];

  // Add the header row as the first element
  result.push('Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID');
  
  // Loop through the currentYearSecretSantasNumbers object
  for (const key in currentYearSecretSantasNumbers) {
    // Get the corresponding index from the mapping
    const index = currentYearSecretSantasNumbers[key];
    
    // Combine the mapped row
    const row = `${arr[key]},${arr[index]}`;
    
    // Add the row to the result array
    result.push(row);
  }
  
  // Join all rows with a new line and return the resulting CSV string
  return result.join('\n');
}

export default parseCurrentYearSecretSantasNumbersToString;