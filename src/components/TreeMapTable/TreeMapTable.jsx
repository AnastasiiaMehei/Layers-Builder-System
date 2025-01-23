// src/components/TreeMapTable/TreeMapTable.jsx

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";

const TreeMapTable = ({ selectedLayer, onLayerSelect }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://layers-builder-system-server.onrender.com/api/diagrams/67927c686c595a3bf8cabdd5');
        const { blocks } = response.data;
        setBlocks(blocks);
      } catch (error) {
        console.error('Error fetching layers overview:', error);
      }
    };

    fetchData();
  }, []);

  const renderBlock = (block) => (
    <Draggable
      key={block.key}
      position={{ x: block.x, y: block.y }}
    >
      <g>
        {block.shape === 'rectangle' ? (
          <rect
            x={block.x}
            y={block.y}
            width={block.width}
            height={block.height}
            fill={block.color}
            stroke="#000000"
            strokeWidth="2"
          />
        ) : (
          <circle
            cx={block.x + block.width / 2}
            cy={block.y + block.height / 2}
            r={block.width / 2}
            fill={block.color}
            stroke="#000000"
            strokeWidth="2"
          />
        )}
        <text
          x={block.x + 10}
          y={block.y + 20}
          fontSize="12"
          fill="#ffffff"
        >
          {block.label}
        </text>
      </g>
    </Draggable>
  );

  return (
    <div style={{ overflowX: "auto", height: "100vh" }}>
      <svg width="100%" height="100%">
        {blocks.map(renderBlock)}
      </svg>
    </div>
  );
};

export default TreeMapTable;