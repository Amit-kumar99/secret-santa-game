export const mapEmailsToNumbers = (currentYearCsvString) => {
  const rows = currentYearCsvString.trim().split('\n');
  const header = rows[0].split(',');

  // Initialize an object to store the email-to-number mapping
  const emailToNumberMapping = {};

  // Loop through rows, starting from 1 to skip header
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(',');

    // Extract the email (assumes email is in the second column, index 1)
    const email = row[1].trim();

    // Assign a number (row index) for this email
    emailToNumberMapping[email] = i - 1; // (i - 1) to start numbering from 0
  }

  return emailToNumberMapping;
}

export const mapNumbersToNamesAndEmails = (currentYearCsvString) => {
  const rows = currentYearCsvString.trim().split('\n');
  const header = rows[0].split(',');

  // Initialize an object to store the mapping of number to email and name
  const numberToEmailAndNameMapping = {};

  // Loop through rows, starting from 1 to skip header
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(',');

    // Extract the name (assumes name is in the first column, index 0)
    const name = row[0].trim();

    // Extract the email (assumes email is in the second column, index 1)
    const email = row[1].trim();

    // Use the row index (i - 1) as the key, and assign a string as the value
    numberToEmailAndNameMapping[i - 1] = `${name},${email}`;
  }

  return numberToEmailAndNameMapping;
}