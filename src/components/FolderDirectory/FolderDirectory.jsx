// src/components/FolderDirectory/FolderDirectory.jsx

import React, { useState, useEffect } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import axios from "axios";

const FolderDirectory = ({ onLayerSelect, selectedLayer }) => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://layers-builder-system-server.onrender.com/api/diagrams/67927c686c595a3bf8cabdd5');
        const diagram = response.data;
        // Припустимо, що ви хочете відобразити blocks як структуру папок
        const folderStructure = diagram.blocks.map(block => ({
          key: block.key,
          title: block.label,
          children: [], // Додайте дочірні елементи, якщо є
        }));
        setTreeData([{ key: diagram._id, title: diagram.diagramName, children: folderStructure }]);
      } catch (error) {
        console.error('Error fetching folder directory:', error);
      }
    };

    fetchData();
  }, []);

  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onLayerSelect(selectedNode);
  };

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ddd" }}>
      <Tree
        showLine
        defaultExpandAll
        treeData={treeData}
        onSelect={onSelect}
        selectedKeys={selectedLayer ? [selectedLayer.key] : []}
      />
    </div>
  );
};

export default FolderDirectory;