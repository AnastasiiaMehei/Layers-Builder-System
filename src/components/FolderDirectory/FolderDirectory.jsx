import Tree from "rc-tree";
import "rc-tree/assets/index.css";

const FolderDirectory = ({ data, onLayerSelect, selectedLayer }) => {
  // Перевірка, чи дані існують
  if (!data || !data.blocks) {
    return <div>Loading...</div>; // Або інший компонент завантаження
  }

  const folderStructure = data.blocks.map(block => ({
    key: block.key,
    title: block.label,
    children: [] // Додайте дочірні елементи, якщо є
  }));

  const treeData = [
    {
      key: data._id,
      title: data.diagramName,
      children: folderStructure
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