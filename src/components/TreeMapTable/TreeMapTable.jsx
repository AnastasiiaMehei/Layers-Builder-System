import React from "react";
import Draggable from "react-draggable";
import styles from "./TreeMapTable.module.css"; // Імпорт CSS модуля

const TreeMapTable = ({ data }) => {
  const renderBlock = (block) => {
    // Перевірка, чи значення є дійсними числами
    const x = isNaN(block.x) ? 0 : block.x;
    const y = isNaN(block.y) ? 0 : block.y;
    const width = isNaN(block.width) ? 100 : block.width;
    const height = isNaN(block.height) ? 50 : block.height;

    return (
      <Draggable key={block.key} position={{ x, y }}>
        <g className={styles.blockGroup}>
          {block.shape === 'rectangle' ? (
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              className={styles.blockRectangle}
            />
          ) : (
            <circle
              cx={x + width / 2}
              cy={y + height / 2}
              r={width / 2}
              className={styles.blockCircle}
            />
          )}
          <text
            x={x + 10}
            y={y + 20}
            className={styles.blockText}
          >
            {block.label}
          </text>
        </g>
      </Draggable>
    );
  };

  return (
    <div className={styles.treeMapTableContainer}>
      <svg width="100%" height="100%">
        {data.blocks.map((block, index) => (
          <React.Fragment key={block.key || index}>
            {renderBlock(block)}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default TreeMapTable;
