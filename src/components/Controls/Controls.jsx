import Button from '@mui/material/Button';

export default function  Controls ({ zoomIn, zoomOut, resetTransform }) {
  return (
    <div className="tools">
      <Button variant="contained" color="primary" onClick={() => zoomIn()}>
        +
      </Button>
      <Button variant="contained" color="primary" onClick={() => zoomOut()}>
        -
      </Button>
      <Button variant="contained" color="secondary" onClick={() => resetTransform()}>
        x
      </Button>
    </div>
  );
};


