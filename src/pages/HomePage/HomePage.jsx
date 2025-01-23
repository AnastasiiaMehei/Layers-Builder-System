// src/pages/HomePage/HomePage.jsx

import React, { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiagrams } from "../../redux/diagrams/operations";
import { selectDiagrams, selectLoading } from "../../redux/diagrams/selectors";
import FolderDirectory from "../../components/FolderDirectory/FolderDirectory";
import Block from "../../components/Block/Block";
import TreeMapTable from "../../components/TreeMapTable/TreeMapTable";

export default function HomePage() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const dispatch = useDispatch();
  const diagrams = useSelector(selectDiagrams);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchDiagrams());
  }, [dispatch]);

  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
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
              onLayerSelect={handleBlockSelect}
              selectedLayer={selectedBlock}
            />
          ))
        )}
      </div>
      <div className={css.customizer}>
        <Block selectedBlock={selectedBlock} onBlockChange={setSelectedBlock} />
      </div>
      <div className={css.treemap}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          diagrams.map((diagram) => (
            <TreeMapTable key={diagram.id || diagram._id} data={diagram} />
          ))
        )}
      </div>
    </div>
  );
}