import { useState, useRef } from "react";
import Draggable from "react-draggable";

// Main component to render a block
export default function Block ({ node, onLayerSelect, level }) {
  // useState hook to manage the expanded state of the block
  const [isExpanded, setIsExpanded] = useState(false);
  // useRef hook to reference the block element
  const blockRef = useRef(null);

  // Event handler for when the block is clicked
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to parent elements
    setIsExpanded(!isExpanded); // Toggle the expanded state of the block
    onLayerSelect(node); // Call the onLayerSelect function passed as a prop
  };

  // Determine if the block should be draggable based on the level
  const isDraggable = level >= 3; // Allow dragging for levels greater than or equal to 3

  // Function to get the style object based on the level
  const getStyle = () => {
    if (level === 0) {
      return { display: 'flex', flexDirection: 'column' }; // Column layout for level 0
    }
    if (level === 1) {
      return { display: 'flex', flexDirection: 'row' }; // Row layout for level 1
    }
    if (level >= 3) {
      return { display: 'flex', flexDirection: 'row' }; // Row layout for levels 3 and above
    }
    return {};
  };

  // Content of the block
  const content = (
    <div
      ref={blockRef} // Reference the block element
      style={{
        margin: "4px",
        padding: "8px",
        border: `1px solid ${node.borderColor || "#ccc"}`, // Default border color
        cursor: isDraggable ? "move" : "default", // Change cursor based on draggable state
        backgroundColor: node.color || "#ffffff", // Default background color
        opacity: node.opacity || 1, // Default opacity
        borderRadius: node.shape === "circle" ? "50%" : "0", // Circular shape if node.shape is "circle"
        ...getStyle(level) // Apply style based on level
      }}
      onClick={handleClick} // Handle click event
    >
      <strong>{node.title}</strong> {/* Display the node title */}
      {node.children && (
        <div style={{ marginLeft: "20px", display: isExpanded ? "block" : "none" }}>
          {/* Recursively render child blocks if expanded */}
          {node.children.map((child) => (
            <Block key={child.key} node={child} onLayerSelect={onLayerSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );

  // Render the block within a Draggable component if draggable, else render directly
  return isDraggable ? (
    <Draggable nodeRef={blockRef}>
      <div ref={blockRef}>{content}</div>
    </Draggable>
  ) : content;
};
