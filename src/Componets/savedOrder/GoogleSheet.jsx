import axios from "axios";
import { useState, useEffect } from "react";
import GoogleSheetShow from "./GoogleSheetShow";
const GoogleSheet = () => {
  {
    /*Dynamic Google sheet*/
  }
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetchCSVData(); // Fetch the CSV data when the component mounts
  }, []); // The empty array ensures that this effect runs only once, like componentDidMount
  function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/); // Use a regular expression to split the CSV text into rows while handling '\r'
    const headers = rows[0].split(","); // Extract headers (assumes the first row is the header row)
    const data = []; // Initialize an array to store the parsed data
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(","); // Use the regular expression to split the row while handling '\r'
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }
    return data;
  }
  const fetchCSVData = () => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS8ZuOrR-CJYfj67rJ79r8fFVjhXHk4RPbmJtJ_PZKbAKcq9amCasNLxK_eyJ_RKQ-GBvTqAhrkHbQJ/pubhtml"; // Replace with your Google Sheets CSV file URL

    axios
      .get(csvUrl) // Use Axios to fetch the CSV data
      .then((response) => {
        const parsedCsvData = parseCSV(response.data); // Parse the CSV data into an array of objects
        setCsvData(parsedCsvData); // Set the fetched data in the component's state
        console.log(parsedCsvData); // Now you can work with 'csvData' in your component's state.
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };

  return (
    <>
      {csvData.map((item) => (
        <GoogleSheetShow {...{ item }}></GoogleSheetShow>
      ))}
    </>
  );
};

export default GoogleSheet;
