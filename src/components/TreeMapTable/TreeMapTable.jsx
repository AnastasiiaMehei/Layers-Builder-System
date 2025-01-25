import Draggable from "react-draggable";

const Block = ({ node, onLayerSelect }) => {
  return (
    <Draggable>
      <div
        style={{
          margin: "4px",
          padding: "8px",
          border: "1px solid #ccc",
          cursor: "move",
          backgroundColor: node.color || "#ffffff",
        }}
        onClick={() => onLayerSelect(node)}
      >
        <strong>{node.title}</strong>
        {node.children && (
          <div style={{ marginLeft: "20px" }}>
            {node.children.map((child) => (
              <Block key={child.key} node={child} onLayerSelect={onLayerSelect} />
            ))}
          </div>
        )}
      </div>
    </Draggable>
  );
};

const TreeMapBlocks = ({ data, onLayerSelect }) => {
  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      {data.blocks.map((block) => (
        <Block key={block.key} node={block} onLayerSelect={onLayerSelect} />
      ))}
    </div>
  );
};

export default TreeMapBlocks;
