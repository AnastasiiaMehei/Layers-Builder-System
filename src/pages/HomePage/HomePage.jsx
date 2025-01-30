import { useEffect, useState } from "react"; // Import useEffect and useState from React
import css from "./HomePage.module.css"; // Import CSS module for styling
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from Redux
import { fetchDiagrams, deleteDiagram } from "../../redux/diagrams/operations"; // Import Redux operations
import { selectDiagrams, selectLoading } from "../../redux/diagrams/selectors"; // Import Redux selectors
import FolderDirectory from "../../components/FolderDirectory/FolderDirectory"; // Import FolderDirectory component
import TreeMapTable from "../../components/TreeMapTable/TreeMapTable"; // Import TreeMapTable component
import Toolbar from "../../components/Toolbar/Toolbar"; // Import Toolbar component
import Canvas from "../../components/Canvas/Canvas"; // Import Canvas component

// Main component to render the HomePage
export default function HomePage() {
  const [selectedLayer, setSelectedLayer] = useState(null); // useState to manage selected layer
  const dispatch = useDispatch(); // Use dispatch to send actions to Redux store
  const diagrams = useSelector(selectDiagrams); // Select diagrams from Redux store
  const loading = useSelector(selectLoading); // Select loading state from Redux store

  useEffect(() => {
    dispatch(fetchDiagrams()); // Fetch diagrams when component mounts
  }, [dispatch]); // Dependency array to rerun effect when dispatch changes

  // Function to handle layer selection
  const handleLayerSelect = (layer) => {
    setSelectedLayer(layer); // Update selected layer state
  };

  // Function to handle diagram deletion
  const handleDeleteDiagram = async (diagramId) => {
    await dispatch(deleteDiagram(diagramId)); // Dispatch deleteDiagram action
    dispatch(fetchDiagrams()); // Fetch diagrams again to update list
  };

  // Function to handle save action
  const handleSave = () => {
    // Implement save functionality here
    console.log("Save clicked");
  };

  // Function to handle undo action
  const handleUndo = () => {
    // Implement undo functionality here
    console.log("Undo clicked");
  };

  // Function to handle redo action
  const handleRedo = () => {
    // Implement redo functionality here
    console.log("Redo clicked");
  };

  return (
    <div className={css.container}> {/* Apply container styling */}
      <Toolbar onSave={handleSave} onUndo={handleUndo} onRedo={handleRedo} /> {/* Render Toolbar component with action handlers */}
    
      <div className={css.folders}> {/* Apply folders styling */}
        <div id="canvas" className={css.mainInfo}> {/* Apply mainInfo styling and set id to canvas */}
          <div className={css.folder}> {/* Apply folder styling */}
            {loading ? (
              <p>Loading...</p> // Display loading message if data is loading
            ) : (
              diagrams.map((diagram) => (
                <FolderDirectory
                  key={diagram.id || diagram._id} // Unique key for each diagram
                  data={diagram} // Pass diagram data as a prop
                  diagramId={diagram.id || diagram._id} // Pass diagramId as a prop
                  onLayerSelect={handleLayerSelect} // Pass handleLayerSelect function as a prop
                  selectedLayer={selectedLayer} // Pass selected layer as a prop
                  onDeleteDiagram={handleDeleteDiagram} // Pass handleDeleteDiagram function as a prop
                />
              ))
            )}
            <div className={css.customizer}> {/* Apply customizer styling */}
              <Canvas /> {/* Render Canvas component */}
            </div>
          </div>
          <div className={css.treemap}> {/* Apply treemap styling */}
            {loading ? (
              <p>Loading...</p> // Display loading message if data is loading
            ) : (
              diagrams.map((diagram) => (
                <TreeMapTable
                  key={diagram.id || diagram._id} // Unique key for each diagram
                  data={diagram} // Pass diagram data as a prop
                  selectedLayer={selectedLayer} // Pass selected layer as a prop
                  onLayerSelect={handleLayerSelect} // Pass handleLayerSelect function as a prop
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
