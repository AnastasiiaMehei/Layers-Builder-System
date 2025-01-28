import ReactModal from 'react-modal';
import { useState, useEffect } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import styles from "./FolderDirectory.module.css";
import { useDispatch } from "react-redux";
import { updateDiagram, fetchDiagrams } from "../../redux/diagrams/operations";
import Button from '@mui/material/Button';
import Modal from "../Modal/Modal";

ReactModal.setAppElement('#root');

export default function FolderDirectory  ({ data, diagramId, onLayerSelect, selectedLayer }) {
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
  const [blockData, setBlockData] = useState({
    title: '',
    color: '#ffffff',
    borderColor: '#000000',
    opacity: 1,
    shape: 'rectangle'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

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

  const renameLayer = async () => {
    const renameNodeTitle = (nodes, key, newTitle) => {
      return nodes.map((node) => {
        if (node.key === key) {
          return {
            ...node,
            title: newTitle,
          };
        }
        if (node.children) {
          return {
            ...node,
            children: renameNodeTitle(node.children, key, newTitle),
          };
        }
        return node;
      });
    };

    const updatedTreeData = renameNodeTitle(treeData, selectedLayer.key, blockData.title);
    setTreeData(updatedTreeData);
    setIsRenameModalOpen(false);

    await dispatch(updateDiagram({ diagramId, updatedData: { blocks: updatedTreeData } }));
    dispatch(fetchDiagrams());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRenameModal = () => {
    if (selectedLayer) {
      setBlockData((prevData) => ({ ...prevData, title: selectedLayer.title }));
    }
    setIsRenameModalOpen(true);
  };

  const closeRenameModal = () => {
    setIsRenameModalOpen(false);
  };

  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onLayerSelect(selectedNode);
  };

  return (
    <div className={styles.container}>
        <Button
        variant="contained"
        color="primary"
        onClick={openModal}
      >
        Add Layer
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={deleteLayer}
        disabled={!selectedLayer}
      >
        Delete Layer
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={openRenameModal}
        disabled={!selectedLayer}
      >
        Rename Layer
      </Button>
      <Tree
        showLine
        defaultExpandAll
        treeData={treeData}
        onSelect={onSelect}
        selectedKeys={selectedLayer ? [selectedLayer.key] : []}
        className={styles.treeContainer}
      />
      <ReactModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={addLayer}
          blockData={blockData}
          setBlockData={setBlockData}
        />
      </ReactModal>
      <ReactModal isOpen={isRenameModalOpen} onRequestClose={closeRenameModal}>
        <Modal
          isOpen={isRenameModalOpen}
          onClose={closeRenameModal}
          onSubmit={renameLayer}
          blockData={blockData}
          setBlockData={setBlockData}
        />
      </ReactModal>
    </div>
  );
};
