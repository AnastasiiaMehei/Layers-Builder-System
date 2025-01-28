import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');
import { useState, useEffect } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import styles from "./FolderDirectory.module.css";
import { useDispatch } from "react-redux";
import { updateDiagram, fetchDiagrams } from "../../redux/diagrams/operations";

import Modal from "../Modal/Modal";

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
  const [blockData, setBlockData] = useState({
    title: '',
    color: '#ffffff',
    borderColor: '#000000',
    opacity: 1,
    shape: 'rectangle'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTreeData(processData(data));
  }, [data]);

  const addLayer = async () => {
    if (!selectedLayer) {
      return;
    }

    const newLayer = {
      key: `layer-${Date.now()}`,
      title: blockData.title || "New Layer",
      type: "folder",
      color: blockData.color,
      children: [],
      borderColor: blockData.borderColor,
      opacity: blockData.opacity,
      shape: blockData.shape
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
    setIsModalOpen(false);

    await dispatch(updateDiagram({ diagramId, updatedData: { blocks: updatedTreeData } }));
    dispatch(fetchDiagrams());
  };

  const deleteLayer = async () => {
    const removeLayerFromNode = (nodes, key) => {
      return nodes
        .map((node) => {
          if (node.key === key) {
            return null;
          }
          if (node.children) {
            return {
              ...node,
              children: removeLayerFromNode(node.children, key).filter(Boolean),
            };
          }
          return node;
        })
        .filter(Boolean);
    };

    const updatedTreeData = removeLayerFromNode(treeData, selectedLayer.key);
    setTreeData(updatedTreeData);
    onLayerSelect(null);

    await dispatch(updateDiagram({ diagramId, updatedData: { blocks: updatedTreeData } }));
    dispatch(fetchDiagrams());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onLayerSelect(selectedNode);
  };

  return (
    <div className={styles.container}>
      <button onClick={openModal} className={`${styles.button} ${styles.addButton}`}>
        Add Layer
      </button>
      <button
        onClick={deleteLayer}
        disabled={!selectedLayer}
        className={`${styles.button} ${styles.deleteButton}`}
      >
        Delete Layer
      </button>
      {/* <input
        type="text"
        value={newLayerTitle}
        onChange={(e) => setNewLayerTitle(e.target.value)}
        placeholder="New layer"
        className={styles.inputField}
      /> */}
      <Tree
        showLine
        defaultExpandAll
        treeData={treeData}
        onSelect={onSelect}
        selectedKeys={selectedLayer ? [selectedLayer.key] : []}
        className={styles.treeContainer}
      />
<ReactModal isOpen={isModalOpen} onRequestClose={closeModal} appElement={document.getElementById('root')}>
  <Modal
    isOpen={isModalOpen}
    onClose={closeModal}
    onSubmit={addLayer}
    blockData={blockData}
    setBlockData={setBlockData}
  />
</ReactModal>
    </div>
  );
};

export default FolderDirectory;
