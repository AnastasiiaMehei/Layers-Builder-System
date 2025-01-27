// src/components/Toolbar/Toolbar.jsx

import React from "react";
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import css from "./Toolbar.module.css";
import Button from '@mui/material/Button';

const Toolbar = ({ onSave, onUndo, onRedo }) => {

  const handleExportAsImage = async (format) => {
    const canvasElement = document.querySelector("#canvas");
    if (!canvasElement) {
      console.error("Canvas element not found");
      return;
    }
    const canvas = await html2canvas(canvasElement);
    canvas.toBlob((blob) => {
      saveAs(blob, `diagram.${format}`);
    });
  };

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
    <div className={css.toolbar}>
      <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
      <Button variant="contained" color="default" onClick={onUndo}>Undo</Button>
      <Button variant="contained" color="default" onClick={onRedo}>Redo</Button>
      <Button variant="contained" color="secondary" onClick={() => handleExportAsImage('png')}>Export as PNG</Button>
      <Button variant="contained" color="secondary" onClick={() => handleExportAsImage('jpeg')}>Export as JPEG</Button>
      {/* <Button variant="contained" color="secondary" onClick={handleExportAsPDF}>Export as PDF</Button> */}
    </div>
  );
};

export default Toolbar;
