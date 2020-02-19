import React from "react";
import { CloudDownloadRounded } from "@material-ui/icons";
import { Button } from "@material-ui/core";

class CSVDownloader extends React.Component {
  downloadCSV = () => {
    const arr = this.props.data;
    const csvString = this.getCSVString(arr);
    const csvBlob = this.getCSVBlob(csvString);
    this.serveCSVBlob(csvBlob);
  };

  getCSVString = arr => {
    const csvArray = [Object.keys(arr[0])].concat(arr);

    return csvArray
      .map(row => {
        return Object.values(row);
      })
      .join("\n");
  };

  getCSVBlob = csvString => {
    return new Blob([csvString], { type: "text/csv" });
  };

  serveCSVBlob = csvBlob => {
    const url = URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "CSVData.csv");
    document.body.appendChild(link);
    link.click();
  };

  render() {
    return (
      <div>
        <Button onClick={this.downloadCSV}>
          <CloudDownloadRounded />
          CSV
        </Button>
      </div>
    );
  }
}

export default CSVDownloader;
