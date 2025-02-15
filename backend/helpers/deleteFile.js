import fs from "fs";

const deleteFile = async (filePath) => {
  fs.unlink(filePath, (deleteErr) => {
    if (deleteErr) {
      console.error("Error deleting file:", deleteErr);
    } else {
      console.log("File deleted successfully: ", filePath);
    }
  });
}

export default deleteFile;