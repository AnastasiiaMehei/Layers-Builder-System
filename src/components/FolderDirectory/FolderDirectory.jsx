import Tree from "rc-tree";
import "rc-tree/assets/index.css";

const buildTree = (blocks) => {
  const map = new Map();
  blocks.forEach(block => map.set(block.key, {...block, title: block.label, children: []}));
  
  const treeData = [];
  blocks.forEach(block => {
    if (block.parent) {
      const parent = map.get(block.parent);
      if (parent) {
        parent.children.push(map.get(block.key));
      }
    } else {
      treeData.push(map.get(block.key));
    }
  });
  
  return treeData;
};

const FolderDirectory = ({ data, onLayerSelect, selectedLayer }) => {
  if (!data || !data.blocks) {
    return <div>Loading...</div>;
  }

  const treeData = [
    {
      key: data._id,
      title: data.diagramName,
      children: buildTree(data.blocks)
    }
  ];

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
