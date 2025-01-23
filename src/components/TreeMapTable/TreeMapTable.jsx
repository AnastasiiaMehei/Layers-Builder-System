import React, { useState, useEffect } from "react";
import DraggableComponent from "../DraggableComponent/DraggableComponent";

const TreeMapTable = ({ selectedLayer, onLayerSelect }) => {
  const [blocks, setBlocks] = useState([
    { key: '0-0', label: 'Business Process Framework', color: '	#B0E0E6', shape: 'rectangle', x: 50, y: 50, width: 600, height: 50 },
    { key: '0-0-0', label: 'Strategy to Readiness', color: '#DDA0DD', shape: 'rectangle', x: 50, y: 100, width: 300, height: 50, parent: '0-0' },
    { key: '0-0-1', label: 'Operations', color: '#DDA0DD', shape: 'rectangle', x: 350, y: 100, width: 300, height: 50, parent: '0-0' },
    { key: '0-0-0-0', label: 'Strategy Management', color: '#D3D3D3', shape: 'rectangle', x: 50, y: 150, width: 80, height: 50, parent: '0-0-0' },
    { key: '0-0-0-1', label: 'Capability Management', color: '#D3D3D3', shape: 'rectangle', x: 140, y: 150, width: 80, height: 50, parent: '0-0-0' },
    { key: '0-0-0-2', label: 'Business Value Development', color: '#D3D3D3', shape: 'rectangle', x: 230, y: 150, width: 80, height: 50, parent: '0-0-0' },
    { key: '0-0-0-3', label: 'Operations Readiness & Support', color: '#D3D3D3', shape: 'rectangle', x: 320, y: 150, width: 80, height: 50, parent: '0-0-0' },
    { key: '0-0-1-0', label: 'Fulfillment', color: '#CD853F', shape: 'rectangle', x: 50, y: 200, width: 80, height: 50, parent: '0-0-1' },
    { key: '0-0-1-1', label: 'Assurance', color: '#D3D3D3', shape: 'rectangle', x: 140, y: 200, width: 80, height: 50, parent: '0-0-1' },
    { key: '0-0-1-2', label: 'Billing', color: '#D3D3D3', shape: 'rectangle', x: 230, y: 200, width: 80, height: 50, parent: '0-0-1' },
    { key: '0-0-0-0-0', label: 'Market and Sales Domain', color: '#CD853F	', shape: 'rectangle', x: 50, y: 250, width: 200, height: 50, parent: '0-0-0-0' },
    { key: '0-0-0-0-1', label: 'Customer Domain', color: '#DAA520', shape: 'rectangle', x: 260, y: 250, width: 200, height: 50, parent: '0-0-0-0' },
    { key: '0-0-0-0-2', label: 'Product Domain', color: '#CD853F', shape: 'rectangle', x: 470, y: 250, width: 200, height: 50, parent: '0-0-0-0' },
    // Movable Yellow Boxes (5th Layer)
    { key: '0-0-0-0-0-0', label: 'Processes', color: 'yellow', shape: 'rectangle', x: 50, y: 300, width: 200, height: 50, parent: '0-0-0-0-0', movable: true },
  ]);

  const [filteredBlocks, setFilteredBlocks] = useState(blocks);

  useEffect(() => {
    if (selectedLayer) {
      const relevantBlocks = blocks.filter(block => block.key === selectedLayer.key || block.parent === selectedLayer.key);
      setFilteredBlocks(relevantBlocks);
    } else {
      setFilteredBlocks(blocks);
    }
  }, [selectedLayer, blocks]);

  return (
    <div style={{ overflowX: "auto", position: "relative", width: "800px", height: "700px", border: "1px solid #ddd" }}>
      <svg width="800" height="700" style={{ position: "absolute", top: 0, left: 0 }}>
        {filteredBlocks.map((block) => (
          <g
            key={block.key}
            onClick={() => onLayerSelect(block)}
          >
            {block.movable ? (
              <DraggableComponent
                position={{ x: block.x, y: block.y }}
                onDrag={(newPosition) => {
                  setBlocks(blocks.map(b => b.key === block.key ?
                    { ...b, x: newPosition.x, y: newPosition.y } : b
                  ));
                }}
              >
                <g>
                  {block.shape === 'rectangle' ? (
                    <rect
                      x={block.x}
                      y={block.y}
                      width={block.width}
                      height={block.height}
                      fill={block.color}
                      stroke={block.highlighted ? 'blue' : '#CD853F'}
                      strokeWidth="2"
                    />
                  ) : (
                    <circle
                      cx={block.x + 50}
                      cy={block.y + 50}
                      r="50"
                      fill={block.color}
                      stroke={block.highlighted ? 'blue' : '#CD853F'}
                      strokeWidth="2"
                    />
                  )}
                  <text
                    x={block.x + 10}
                    y={block.y + 20}
                    fontSize="12"
                    fill="#000000"
                  >
                    {block.label}
                  </text>
                </g>
              </DraggableComponent>
            ) : (
              <>
                {block.shape === 'rectangle' ? (
                  <rect
                    x={block.x}
                    y={block.y}
                    width={block.width}
                    height={block.height}
                    fill={block.color}
                    stroke={block.highlighted ? 'blue' : '#000000'}
                    strokeWidth="2"
                  />
                ) : (
                  <circle
                    cx={block.x + 50}
                    cy={block.y + 50}
                    r="50"
                    fill={block.color}
                    stroke={block.highlighted ? 'blue' : '#000000'}
                    strokeWidth="2"
                  />
                )}
                <text
                  x={block.x + 10}
                  y={block.y + 20}
                  fontSize="12"
                  fill="#000000"
                >
                  {block.label}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default TreeMapTable;
