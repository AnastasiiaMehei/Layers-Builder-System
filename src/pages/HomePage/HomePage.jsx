import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiagrams } from "../../redux/diagrams/operations";
import { selectDiagrams, selectLoading } from "../../redux/diagrams/selectors";
import FolderDirectory from "../../components/FolderDirectory/FolderDirectory";
import Block from "../../components/Block/Block";
import TreeMapTable from "../../components/TreeMapTable/TreeMapTable";

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

  return (
    <div className={css.container}>
      <div className={css.folder}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          diagrams.map((diagram) => (
            <FolderDirectory
              key={diagram.id || diagram._id}
              data={diagram}
              onLayerSelect={handleLayerSelect}
              selectedLayer={selectedLayer}
            />
          ))
        )}
      </div>
      <div className={css.customizer}>
        <Block selectedBlock={selectedLayer} onBlockChange={setSelectedLayer} />
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
  );
}
