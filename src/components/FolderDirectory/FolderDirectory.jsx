import React from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";

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

  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onLayerSelect(selectedNode);
  };

  return (
    <Tree
      showLine
      defaultExpandAll
      treeData={processData(data)}
      onSelect={onSelect}
      selectedKeys={selectedLayer ? [selectedLayer.key] : []}
    />
  );
};

export default FolderDirectory;
