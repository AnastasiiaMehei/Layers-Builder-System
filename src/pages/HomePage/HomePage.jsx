import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiagrams, deleteDiagram } from "../../redux/diagrams/operations";
import { selectDiagrams, selectLoading } from "../../redux/diagrams/selectors";
import FolderDirectory from "../../components/FolderDirectory/FolderDirectory";
import TreeMapTable from "../../components/TreeMapTable/TreeMapTable";
import Toolbar from "../../components/Toolbar/Toolbar";
import Canvas from "../../components/Canvas/Canvas";

export default function HomePage() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const dispatch = useDispatch();
  const diagrams = useSelector(selectDiagrams);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchDiagrams());
  }, [dispatch]);

  const handleLayerSelect = (layer) => {
    setSelectedLayer(layer);
  };

  const handleDeleteDiagram = async (diagramId) => {
    await dispatch(deleteDiagram(diagramId));
    dispatch(fetchDiagrams());
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Save clicked");
  };

  const handleUndo = () => {
    // Implement undo functionality here
    console.log("Undo clicked");
  };

  const handleRedo = () => {
    // Implement redo functionality here
    console.log("Redo clicked");
  };

  return (
    <div className={css.container}>
      <Toolbar onSave={handleSave} onUndo={handleUndo} onRedo={handleRedo} />
    
      <div className={css.folders}>
        <div id="canvas" className={css.mainInfo}>
          <div className={css.folder}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              diagrams.map((diagram) => (
                <FolderDirectory
                  key={diagram.id || diagram._id}
                  data={diagram}
                  diagramId={diagram.id || diagram._id} // Переконайтеся, що передається правильний diagramId
                  onLayerSelect={handleLayerSelect}
                  selectedLayer={selectedLayer}
                  onDeleteDiagram={handleDeleteDiagram}
                />
              ))
            )}
                <div className={css.customizer}>
          <Canvas />
        </div>
          </div>
          <div className={css.treemap}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              diagrams.map((diagram) => (
                <TreeMapTable
                  key={diagram.id || diagram._id}
                  data={diagram}
                  selectedLayer={selectedLayer}
                  onLayerSelect={handleLayerSelect}
                />
              ))
            )}
          </div>
        </div>
  
      </div>
  
    </div>
  );
}
