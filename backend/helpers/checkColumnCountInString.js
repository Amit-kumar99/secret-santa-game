const checkColumnCountInString = (string, numberOfRequiredColumns) => {
  // Split the CSV string into rows
  console.log(typeof string);
  const rows = string.split("\n");

  // Initialize an array to store the column counts for each row
  let columnCounts = [];

  // Loop through each row (starting from index 1 to skip the header if needed)
  for (let i = 0; i < rows.length; i++) {
    // Trim any extra spaces or newlines and split the row by commas
    const columns = rows[i].trim().split(",");

    // Count the number of columns in this row
    columnCounts.push(columns.length);
  }

  // You can check if the number of columns is 
  const isValid = columnCounts.every((count) => count === numberOfRequiredColumns); 
  
  return isValid;
};

export default checkColumnCountInString;