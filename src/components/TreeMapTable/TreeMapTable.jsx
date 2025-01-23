import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const TreeMapTable = ({ selectedLayer, onLayerSelect }) => {
  const initialBlocks = [
    { key: '2.1', label: 'Business Process Framework', color: '#8B0000', shape: 'rectangle', x: 50, y: 50, width: 600, height: 50 },
    { key: '2.2', label: 'Strategy to Readiness', color: '#B22222', shape: 'rectangle', x: 50, y: 100, width: 300, height: 50, parent: '2.1' },
    { key: '2.3', label: 'Operations', color: '#B22222', shape: 'rectangle', x: 350, y: 100, width: 300, height: 50, parent: '2.1' },
    { key: '2.1.1', label: 'Strategy Management', color: '#DC143C', shape: 'rectangle', x: 50, y: 150, width: 80, height: 50, parent: '2.1' },
    { key: '2.1.2', label: 'Capability Management', color: '#DC143C', shape: 'rectangle', x: 140, y: 150, width: 80, height: 50, parent: '2.1' },
    { key: '2.1.3', label: 'Business Value Development', color: '#DC143C', shape: 'rectangle', x: 230, y: 150, width: 80, height: 50, parent: '2.1' },
    { key: '2.1.4', label: 'Operations Readiness & Support', color: '#DC143C', shape: 'rectangle', x: 320, y: 150, width: 80, height: 50, parent: '2.1' },
    { key: '2.2.1', label: 'Fulfillment', color: '#DC143C', shape: 'rectangle', x: 50, y: 200, width: 80, height: 50, parent: '2.2' },
    { key: '2.2.2', label: 'Assurance', color: '#DC143C', shape: 'rectangle', x: 140, y: 200, width: 80, height: 50, parent: '2.2' },
    { key: '2.2.3', label: 'Billing', color: '#DC143C', shape: 'rectangle', x: 230, y: 200, width: 80, height: 50, parent: '2.2' },
    { key: '3.1.1', label: 'Market and Sales Domain', color: '#FF4500', shape: 'rectangle', x: 50, y: 250, width: 200, height: 50, parent: '2.1.1' },
    { key: '3.1.2', label: 'Customer Domain', color: '#FF4500', shape: 'rectangle', x: 260, y: 250, width: 200, height: 50, parent: '2.1.1' },
    { key: '3.1.3', label: 'Product Domain', color: '#FF4500', shape: 'rectangle', x: 470, y: 250, width: 200, height: 50, parent: '2.1.1' },
    { key: '4.1', label: 'Processes', color: 'yellow', shape: 'rectangle', x: 50, y: 300, width: 200, height: 50, parent: '3.1.1', movable: true },
  ];

  const [blocks, setBlocks] = useState(initialBlocks);

  const getParentBlocks = (key) => {
    let relatedBlocks = [];
    const findBlocks = (currentKey) => {
      const parentBlock = blocks.find(block => block.key === currentKey);
      if (parentBlock) {
        relatedBlocks.push(parentBlock);
        if (parentBlock.parent) {
          findBlocks(parentBlock.parent);
        }
      }
    };
    findBlocks(key);
    return relatedBlocks.reverse();
  };

  const [filteredBlocks, setFilteredBlocks] = useState(blocks);

  useEffect(() => {
    if (selectedLayer) {
      const relatedBlocks = getParentBlocks(selectedLayer.key);
      setFilteredBlocks(relatedBlocks.concat(blocks.filter(block => block.parent === selectedLayer.key)));
    } else {
      setFilteredBlocks(blocks);
    }
  }, [selectedLayer]);

  const createBlock = (newBlock) => {
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockEdit = (key, newProps) => {
    const updatedBlocks = blocks.map(block =>
      block.key === key ? { ...block, ...newProps } : block
    );
    setBlocks(updatedBlocks);
  };

  return (
    <div style={{ overflowX: "auto", position: "relative", width: "800px", height: "700px", border: "1px solid #ddd" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
        <h2>Block Creator</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const label = e.target.label.value;
          const color = e.target.color.value;
          const shape = e.target.shape.value;
          createBlock({ key: Date.now().toString(), label, color, shape, x: 0, y: 0, width: 100, height: 50, movable: true });
        }}>
          <input type="text" name="label" placeholder="Enter block label" required />
          <input type="color" name="color" defaultValue="#000000" required />
          <select name="shape" required>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
          <button type="submit">Create Block</button>
        </form>
      </div>

      <svg width="800" height="700" style={{ position: "absolute", top: 0, left: 0 }}>
        {filteredBlocks.map((block) => (
          <g
            key={block.key}
            onClick={() => onLayerSelect(block)}
          >
            {block.movable ? (
              <Draggable
                position={{ x: block.x, y: block.y }}
                onDrag={(e, data) => {
                  setBlocks(blocks.map(b =>
                    b.key === block.key ? { ...b, x: data.x, y: data.y } : b
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
                      stroke={block.highlighted ? 'blue' : '#000000'}
                      strokeWidth="2"
                      onDoubleClick={() => handleBlockEdit(block.key, { label: prompt("Edit label:", block.label), color: prompt("Edit color:", block.color) })}
                    />
                  ) : (
                    <circle
                      cx={block.x + 50}
                      cy={block.y + 50}
                      r="50"
                      fill={block.color}
                      stroke={block.highlighted ? 'blue' : '#000000'}
                      strokeWidth="2"
                      onDoubleClick={() => handleBlockEdit(block.key, { label: prompt("Edit label:", block.label), color: prompt("Edit color:", block.color) })}
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
              </Draggable>
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
