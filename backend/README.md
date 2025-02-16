# Tech Stack
- Nodejs
- Expressjs

## Middlewares
- multer
- cors

# The backend has 2 Api's:

## 1. api/v1/files/findSecretSanta Api

The `assignSecretSantaForCurrentYear` function is an Express.js controller responsible for assigning Secret Santa pairs for the current year based on employee lists. It processes uploaded CSV files containing employee data, determines pairings while avoiding previous year’s assignments, and returns the final Secret Santa list as a downloadable CSV file to the frontend.

### Request

Method: `POST`

Endpoint: `http://localhost:8000/api/v1/files/findSecretSanta`

### Flow

#### 1. Read CSV files:

Extracts file paths from req.files (handling file uploads via `multer`).
Converts CSV data into string format using `parseCsvFileToString`.

#### 2. Parse employee data:

Transforms current year’s employee list into an array of unique identifiers.

Extracts previous year’s Secret Santa pairs while ensuring compatibility with the current year’s employee list.

#### 3. Assign Secret Santa pairs:

Uses assignSecretSanta to generate new assignments while avoiding last year’s pairings.

#### 4. Generate new CSV file:

Converts the new Secret Santa assignments into a CSV format using parseStringToCsvFile.

#### 5. Send file as response:

Sends the generated CSV file (current_Year_Secret_Santa_List.csv) as a downloadable response. 

Deletes all temporary CSV files to free up storage.

### Response:

#### Success (200 OK)

The response is a file download named `current_Year_Secret_Santa_List.csv`.

The CSV contains employee IDs mapped to their assigned Secret Santa.

#### Error (500 Internal Server Error):

JSON response with an error message in case of failures.

{
  "message": "Error occurred.",
  "error": { error details },
}

### Error Handling

Catches errors related to file processing, data parsing, and assignment logic.

Logs errors to the console and returns a JSON response with an appropriate status.

### Notes

Ensure that `multer` middleware is correctly configured to handle file uploads before calling this controller.

The `assignSecretSanta` function automatically deletes temporary CSV files after the response is sent.

## 2. api/v1/health/checkHealth Api

### Function Overview

The `healthcheck` function is a simple Express.js controller that provides a health status check for the API. It is used to verify whether the server is running and responding correctly.

### Request

Method: `GET`

Endpoint: `http://localhost:8000/api/v1/health/checkHealth`

### Response

#### Success (200 OK)

JSON response indicating that the API is running properly.

`"health is fine"`

#### Error Handling

No specific error handling is required, as this function only returns a static response.