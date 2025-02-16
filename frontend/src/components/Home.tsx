import { useState } from "react";
import csv_img_1 from "../assets/csv_img1.png";
import csv_img_2 from "../assets/csv_img2.png";

const Home = () => {
  const [currentYearEmployeesfile, setCurrentYearEmployeesfile] = useState<
    File | undefined
  >();
  const [previousYearSecretSantafile, setPreviousYearSecretSantafile] =
    useState<File | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCurrentYearEmployeesfile = (e) => {
    setCurrentYearEmployeesfile(e.target.files[0]);
  };

  const handlePreviousYearSecretSantafile = (e) => {
    setPreviousYearSecretSantafile(e.target.files[0]);
  };

  const findSecretSanta = async (e) => {
    e.preventDefault();

    if (
      currentYearEmployeesfile &&
      currentYearEmployeesfile.size > 0 &&
      previousYearSecretSantafile &&
      previousYearSecretSantafile.size > 0
    ) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("currentYearEmployeesCsvFile", currentYearEmployeesfile);
      formData.append(
        "previousYearSecretSantaCsvFile",
        previousYearSecretSantafile
      );

      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/files/findSecretSanta",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Failed to fetch the file");
        }

        console.log(response);

        const blob = await response.blob();
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "currentYearSecretSantaList.csv"; // You can customize this name

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up the URL object after download starts
        window.URL.revokeObjectURL(url);
        setIsLoading(false);
        alert("File downloaded successfully");
        setCurrentYearEmployeesfile();
        setPreviousYearSecretSantafile();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    } else {
      alert("provide the csv files required.");
    }
  };

  return (
    <div className="pt-5 flex-column w-8/12 items-center mx-auto min-h-[calc(100vh-22vh)]">
      <h1 className="text-green-800 text-4xl text-center font-bold mb-4 ">
        Welcome to Secret Santa Game
      </h1>

      <div className="space-y-2">
        <p className="text-lg">
          <b>Ho ho ho!</b> Welcome to our Secret Santa gift exchange platform. Here's
          where the magic of anonymous gift-giving comes to life!
        </p>

        <p className="font-semibold text-green-800">Here's an example of how both your csv files should look like:</p>
        <div className="flex justify-between">
          <img
            className="rounded-md"
            src={csv_img_1}
            width="39%"
            alt="csv example img 1"
          />
          <img
            className="rounded-md"
            src={csv_img_2}
            width="60%"
            alt="csv example img 2"
          />
        </div>

        <p className="text-center border-2 border-green-800 font-semibold rounded-md p-2">
          Using the below buttons, provide the below 2 csv files & find your
          secret santa🎅. Your csv file will be downloaded with the secret santa
          data for the current year.
        </p>
      </div>

      <div className="flex mt-5 mb-5">
        <label
          htmlFor="currentYearCsvfile"
          className="hover:text-blue-500 hover:scale-110 cursor-pointer "
        >
          <b>Browse Current Year CSV File: </b>
        </label>
        <input
          className="hidden"
          type="file"
          accept=".csv"
          id="currentYearCsvfile"
          onChange={handleCurrentYearEmployeesfile}
        />
        {currentYearEmployeesfile && (
          <div className="ml-5 w-6/12 px-2 bg-gray-400 rounded-md">
            {currentYearEmployeesfile.name}
          </div>
        )}
      </div>

      <div className="flex mt-5 mb-5">
        <label
          htmlFor="previousYearSecretSantasCsvfile"
          className="hover:text-blue-500 hover:scale-110 cursor-pointer"
        >
          <b>Browse Previous Year Secret Santas CSV File: </b>
        </label>
        <input
          className="hidden"
          type="file"
          accept=".csv"
          id="previousYearSecretSantasCsvfile"
          onChange={handlePreviousYearSecretSantafile}
        />
        {previousYearSecretSantafile && (
          <div className="ml-5 w-6/12 px-2 bg-gray-400 rounded-md">
            {previousYearSecretSantafile.name}
          </div>
        )}
      </div>

      <div>
        <button
          className="mb-5 w-full cursor-pointer bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={findSecretSanta}
        >
          Find Secret Santa
        </button>
        {isLoading && <div>loading...</div>}
      </div>
    </div>
  );
};

export default Home;
