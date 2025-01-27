import { useState, useRef } from "react";
import Draggable from "react-draggable";

const Block = ({ node, onLayerSelect, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const blockRef = useRef(null); // Create a ref for the draggable element

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click propagation to parent elements
    setIsExpanded(!isExpanded);
    onLayerSelect(node);
  };

  const isDraggable = level >= 3; // Only elements from the fourth level and above are draggable

  const getStyle = () => {
    if (level === 0) {
      return { display: 'flex', flexDirection: 'column' }; // Vertical layout for the first level
    }
    if (level === 1) {
      return { display: 'flex', flexDirection: 'row' }; // Horizontal layout for the second level
    }
    if (level >= 3) {
      return { display: 'flex', flexDirection: 'row' }; // Horizontal layout for the fourth level and above
    }
    return {}; // Default style for other levels
  };

  const content = (
    <div
      ref={blockRef} // Attach the ref to the div
      style={{
        margin: "4px",
        padding: "8px",
        border: "1px solid #ccc",
        cursor: isDraggable ? "move" : "default",
        backgroundColor: node.color || "#ffffff",
        ...getStyle(level)
      }}
      onClick={handleClick}
    >
      <strong>{node.title}</strong>
      {node.children && (
        <div style={{ marginLeft: "20px", display: isExpanded ? "block" : "none" }}>
          {node.children.map((child) => (
            <Block key={child.key} node={child} onLayerSelect={onLayerSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );

  return isDraggable ? <Draggable nodeRef={blockRef}>{content}</Draggable> : content;
};

export default Block;