import { useState, useRef } from "react";
import Draggable from "react-draggable";

const Block = ({ node, onLayerSelect, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const blockRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    onLayerSelect(node);
  };

  const isDraggable = level >= 3;

  const getStyle = () => {
    if (level === 0) {
      return { display: 'flex', flexDirection: 'column' };
    }
    if (level === 1) {
      return { display: 'flex', flexDirection: 'row' };
    }
    if (level >= 3) {
      return { display: 'flex', flexDirection: 'row' };
    }
    return {};
  };

  const content = (
    <div
      ref={blockRef}
      style={{
        margin: "4px",
        padding: "8px",
        border: `1px solid ${node.borderColor || "#ccc"}`,
        cursor: isDraggable ? "move" : "default",
        backgroundColor: node.color || "#ffffff",
        opacity: node.opacity || 1,
        borderRadius: node.shape === "circle" ? "50%" : "0",
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