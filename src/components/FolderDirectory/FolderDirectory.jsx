import { useState, useEffect } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import styles from "./FolderDirectory.module.css";
import { useDispatch } from "react-redux";
import { updateDiagram, fetchDiagrams } from "../../redux/diagrams/operations"; // Замініть на актуальний шлях до ваших дій

const FolderDirectory = ({ data, diagramId, onLayerSelect, selectedLayer }) => {
  const processData = (data) => {
    if (!data || !data.blocks) {
      return [];
    }
    return data.blocks.map((block) => ({
      key: block.key,
      title: block.title,
      type: block.type,
      color: block.color,
      children: block.children ? processData({ blocks: block.children }) : [],
    }));
  };

  const [treeData, setTreeData] = useState(processData(data));
  const [newLayerTitle, setNewLayerTitle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setTreeData(processData(data));
  }, [data]);

  const addLayer = async () => {
    if (!selectedLayer) {
      return; // Вихід, якщо жодна папка не обрана
    }

    const newLayer = {
      key: `layer-${Date.now()}`,
      title: newLayerTitle || "New Layer",
      type: "folder",
      color: "#ffffb4",
      children: [],
    };

    const addLayerToNode = (nodes, key, newLayer) => {
      return nodes.map((node) => {
        if (node.key === key) {
          return {
            ...node,
            children: [...(node.children || []), newLayer],
          };
        }

        if (node.children) {
          return {
            ...node,
            children: addLayerToNode(node.children, key, newLayer),
          };
        }

        return node;
      });
    };

    const updatedTreeData = addLayerToNode(treeData, selectedLayer.key, newLayer);
    setTreeData(updatedTreeData);
    setNewLayerTitle("");

    // Відправка оновлених даних до бази даних
    await dispatch(updateDiagram({ diagramId, updatedData: { blocks: updatedTreeData } }));
    
    // Оновлення діаграм після додавання нового шару
    dispatch(fetchDiagrams());
  };

  const deleteLayer = async () => {
    const updatedTreeData = treeData.filter((layer) => layer.key !== selectedLayer.key);
    setTreeData(updatedTreeData);
    onLayerSelect(null); // Deselect after deletion

    // Відправка оновлених даних до бази даних
    await dispatch(updateDiagram({ diagramId, updatedData: { blocks: updatedTreeData } }));

    // Оновлення діаграм після видалення шару
    dispatch(fetchDiagrams());
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
