import { saveAs } from 'file-saver'; // Import saveAs function from file-saver
import html2canvas from 'html2canvas'; // Import html2canvas for converting HTML elements to canvas
// import jsPDF from 'jspdf'; // Commented out jsPDF import for generating PDFs
import css from "./Toolbar.module.css"; // Import CSS module for styling
import Button from '@mui/material/Button'; // Import Button component from MUI

// Main component to render the toolbar
export default function Toolbar () {

  // Function to handle exporting the canvas as an image
  const handleExportAsImage = async (format) => {
    const canvasElement = document.querySelector("#canvas"); // Select the canvas element
    if (!canvasElement) {
      console.error("Canvas element not found"); // Log error if canvas element is not found
      return;
    }
    const canvas = await html2canvas(canvasElement); // Convert canvas element to a canvas
    canvas.toBlob((blob) => {
      saveAs(blob, `diagram.${format}`); // Save the canvas as an image file
    });
  };

  // Commented out function to handle exporting the canvas as a PDF
  // const handleExportAsPDF = async () => {
  //   const canvasElement = document.querySelector("#canvas");
  //   if (!canvasElement) {
  //     console.error("Canvas element not found");
  //     return;
  //   }
  //   const canvas = await html2canvas(canvasElement);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF();
  //   pdf.addImage(imgData, 'PNG', 10, 10);
  //   pdf.save("diagram.pdf");
  // };

  return (
    <div className={css.toolbar}> {/* Apply toolbar styling */}
      {/* Commented out buttons for save, undo, and redo */}
      {/* <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
      <Button variant="contained" color="default" onClick={onUndo}>Undo</Button>
      <Button variant="contained" color="default" onClick={onRedo}>Redo</Button> */}
      <Button variant="contained" color="secondary" onClick={() => handleExportAsImage('png')}>Export as PNG</Button> {/* Button to export as PNG */}
      <Button variant="contained" color="secondary" onClick={() => handleExportAsImage('jpeg')}>Export as JPEG</Button> {/* Button to export as JPEG */}
      {/* Commented out button to export as PDF */}
      {/* <Button variant="contained" color="secondary" onClick={handleExportAsPDF}>Export as PDF</Button> */}
    </div>
  );
};
