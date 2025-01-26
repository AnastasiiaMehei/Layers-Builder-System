import { useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import styles from "./FolderDirectory.module.css";

const FolderDirectory = ({ data, onLayerSelect, selectedLayer }) => {
  const processData = (data) => {
    if (!data || !data.blocks) {
      return [];
    }
    return data.blocks.map((block) => ({
      key: block.key,
      title: block.title,
      children: block.children ? processData({ blocks: block.children }) : [],
    }));
  };

  const [treeData, setTreeData] = useState(processData(data));
  const [newLayerTitle, setNewLayerTitle] = useState("");

  const addLayer = () => {
    const newLayer = {
      key: `layer-${Date.now()}`,
      title: newLayerTitle || "New Layer",
      children: [],
    };
    setTreeData([...treeData, newLayer]);
    setNewLayerTitle("");
  };

  const deleteLayer = () => {
    setTreeData(treeData.filter((layer) => layer.key !== selectedLayer.key));
    onLayerSelect(null); // Deselect after deletion
  };

  const renameLayer = (newTitle) => {
    const newTreeData = treeData.map((layer) => {
      if (layer.key === selectedLayer.key) {
        return { ...layer, title: newTitle };
      }
      return layer;
    });
    setTreeData(newTreeData);
  };

  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onLayerSelect(selectedNode);
  };

  return (
    <div className={styles.container}>
      <button onClick={addLayer} className={`${styles.button} ${styles.addButton}`}>
        Add Layer
      </button>
      <button
        onClick={deleteLayer}
        disabled={!selectedLayer}
        className={`${styles.button} ${styles.deleteButton}`}
      >
        Delete Layer
      </button>
      <input
        type="text"
        value={newLayerTitle}
        onChange={(e) => setNewLayerTitle(e.target.value)}
        placeholder="New layer"
        className={styles.inputField}
      />
      <Tree
        showLine
        defaultExpandAll
        treeData={treeData}
        onSelect={onSelect}
        selectedKeys={selectedLayer ? [selectedLayer.key] : []}
        className={styles.treeContainer}
      />
    </div>
  );
};

export default FolderDirectory;
