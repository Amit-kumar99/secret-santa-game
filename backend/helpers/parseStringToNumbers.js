import { mapEmailsToNumbers } from "./mapEmailsToNumbersAndViceVersa.js";

export const parseCurrentYearStringToNumbers = (currentYearString) => {
  // Split the CSV into rows and skip the header row
  const rows = currentYearString.trim().split('\n').slice(1);

  // Generate an array from 0 to length of rows - 1
  const numbers = Array.from({ length: rows.length }, (_, index) => index);
  
  return numbers;
}

export const parsePreviousYearSecretSantasStringToNumbers = (previousYearSecretSantasString, currentYearString) => {
  // Use parseCSVToNumbers to get the email-to-number mapping
  const emailToNumberMapping = mapEmailsToNumbers(currentYearString);

  // Split the CSV into rows and skip the header
  const rows = previousYearSecretSantasString.trim().split('\n').slice(1);

  // Initialize an object to store the number mapping of secret santa relationships
  const secretSantaMapping = {};

  // Loop through each row starting from 1 (skip header)
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split(',');

    // Extract the email (assumes email is in the second column, index 1)
    const email = row[1].trim();

    // Extract the secretSantaEmail (assumes secretSantaEmail is in the fourth column, index 3)
    const secretSantaEmail = row[3].trim();

    // Get the row number for the secretSantaEmail from the email-to-number mapping
    const secretSantaNumber = emailToNumberMapping[secretSantaEmail];

    // Assign the number to the secretSantaMapping object
    secretSantaMapping[emailToNumberMapping[email]] = secretSantaNumber;
  }

  return secretSantaMapping;
}

