import React, { useState } from "react";
import Draggable from "react-draggable";

const Block = ({ node, onLayerSelect, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Запобігаємо розповсюдженню кліку на батьківські елементи
    setIsExpanded(!isExpanded);
    onLayerSelect(node);
  };

  const isDraggable = level >= 3; // Рухомими можуть бути елементи тільки починаючи з четвертого рівня

  const getStyle = () => {
    if (level === 0) {
      return { display: 'flex', flexDirection: 'column' }; // Вертикальне розміщення для першого рівня
    }
    if (level === 1) {
      return { display: 'flex', flexDirection: 'row' }; // Горизонтальне розміщення для другого рівня
    }
    if (level >= 3) {
      return { display: 'flex', flexDirection: 'row' }; // Горизонтальне розміщення для четвертого рівня і вище
    }
    return {}; // Стандартний стиль для інших рівнів
  };

  const content = (
    <div
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

  return isDraggable ? <Draggable>{content}</Draggable> : content;
};

export default Block;
