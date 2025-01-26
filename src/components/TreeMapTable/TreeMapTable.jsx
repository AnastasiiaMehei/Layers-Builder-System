import React from "react";
import Block from "../Block/Block";
import css from './TreeMapTable.module.css';

const TreeMapTable = ({ data, onLayerSelect, selectedLayer }) => {
  if (!data || !data.blocks || !data.blocks[0]) {
    return <div>No data available.</div>;
  }

  return (
    <div className={css.treeMapTableContainer}>
      <div className={`${css.layer} ${css.layer1}`}>
        {data.blocks[0].children.map((block) => (
          <Block 
            key={block.key} 
            node={block} 
            onLayerSelect={onLayerSelect} 
            level={0} 
            isSelected={selectedLayer && selectedLayer.key === block.key}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeMapTable;
