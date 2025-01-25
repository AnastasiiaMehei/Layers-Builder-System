import React from "react";
import Draggable from "react-draggable";
import css from './TreeMapTable.module.css'

const Block = ({ node, onLayerSelect }) => {
  if (node.type === "file") {
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
            <div style={{ marginLeft: "20px"}}>
              {node.children.map((child) => (
                <Block key={child.key} node={child} onLayerSelect={onLayerSelect} />
              ))}
            </div>
          )}
        </div>
      </Draggable>
    );
  }

  return (
    <div
      style={{
        margin: "4px",
        padding: "8px",
        border: "1px solid #ccc",
        cursor: "default",
        backgroundColor: node.color || "#ffffff",
        flex:"1"
      }}
      onClick={() => onLayerSelect(node)}
    >
      <strong>{node.title}</strong>
      {node.children && (
        <div style={{ marginLeft: "20px", display:"flex", flex:"1"}}>
          {node.children.map((child) => (
            <Block key={child.key} node={child} onLayerSelect={onLayerSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeMapBlocks = ({ data, onLayerSelect }) => {
  if (!data || !data.blocks || !data.blocks[0]) {
    return <div>No data available.</div>;
  }
  return (
<div className={css.treeMapTableContainer}>
      <div className={`${css.layer} ${css.layer1}`}>
        {data.blocks[0].children.map((block, index) => (
          <Block key={block.key} node={block} onLayerSelect={onLayerSelect} className={`${css.layer1-block}-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default TreeMapBlocks;
