import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component from MUI
import Box from '@mui/material/Box'; // Import Box component from MUI

// Main component to render a circular progress indicator
export default function CircularIndeterminate() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }} // Style Box to center the loader
    >
      <CircularProgress /> {/* Render CircularProgress indicator */}
    </Box>
  );
}
