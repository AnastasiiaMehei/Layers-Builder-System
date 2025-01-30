import Button from '@mui/material/Button'; // Import Button component from MUI

// Main component to render control buttons
export default function Controls({ zoomIn, zoomOut, resetTransform }) {
  return (
    <div className="tools">
      {/* Button to zoom in */}
      <Button variant="contained" color="primary" onClick={() => zoomIn()}>
        +
      </Button>
      {/* Button to zoom out */}
      <Button variant="contained" color="primary" onClick={() => zoomOut()}>
        -
      </Button>
      {/* Button to reset transform */}
      <Button variant="contained" color="secondary" onClick={() => resetTransform()}>
        x
      </Button>
    </div>
  );
};
