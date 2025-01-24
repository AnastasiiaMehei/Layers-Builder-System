import React, { useState } from "react";
import Draggable from "react-draggable";
import css from "./Block.module.css";

const Block = ({ block, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(block.title);
  const [color, setColor] = useState(block.color);
  const [width, setWidth] = useState(block.width);
  const [height, setHeight] = useState(block.height);
  const [shape, setShape] = useState(block.shape);
  const [borderColor, setBorderColor] = useState(block.borderColor);
  const [opacity, setOpacity] = useState(block.opacity);

  const handleSave = () => {
    const updatedBlock = {
      ...block,
      title,
      color,
      width,
      height,
      shape,
      borderColor,
      opacity
    };
    onUpdate(updatedBlock);
    setEditing(false);
  };

  return (
    <Draggable>
      <div
        className={css.block}
        style={{
          backgroundColor: color,
          width,
          height,
          border: `2px solid ${borderColor}`,
          opacity,
          borderRadius: shape === "rectangle" ? "4px" : "50%"
        }}
        onDoubleClick={() => setEditing(true)}
      >
        {editing ? (
          <div className={css.editor}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
            />
            <input
              type="text"
              value={shape}
              onChange={(e) => setShape(e.target.value)}
            />
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
            />
            <button onClick={handleSave}>Save</button>
            <button className="delete" onClick={() => onDelete(block.key)}>Delete</button>
          </div>
        ) : (
          <div>
            {title}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Block;
