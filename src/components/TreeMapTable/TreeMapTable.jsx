// src/components/TreeMapTable/TreeMapTable.jsx

import React from "react";
import Draggable from "react-draggable";

const TreeMapTable = ({ data }) => {
  if (!data || !data.blocks) {
    return <div>Loading...</div>;
  }

  const renderBlock = (block) => {
    const x = isNaN(block.x) ? 0 : block.x;
    const y = isNaN(block.y) ? 0 : block.y;
    const width = isNaN(block.width) ? 100 : block.width;
    const height = isNaN(block.height) ? 50 : block.height;

    return (
      <Draggable key={block.key} position={{ x, y }}>
        <g>
          {block.shape === 'rectangle' ? (
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill={block.color}
              stroke="#000000"
              strokeWidth="2"
            />
          ) : (
            <circle
              cx={x + width / 2}
              cy={y + height / 2}
              r={width / 2}
              fill={block.color}
              stroke="#000000"
              strokeWidth="2"
            />
          )}
          <text
            x={x + 10}
            y={y + 20}
            fontSize="12"
            fill="#ffffff"
          >
            {block.label}
          </text>
        </g>
      </Draggable>
    );
  };

  return (
    <div style={{ overflowX: "auto", height: "100vh" }}>
      <svg width="100%" height="100%">
        {data.blocks.map(renderBlock)}
      </svg>
    </div>
  );
};

export default TreeMapTable;