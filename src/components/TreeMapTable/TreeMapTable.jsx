import Block from "../Block/Block"; // Import Block component
import css from './TreeMapTable.module.css'; // Import CSS module for styling
import Controls from "../Controls/Controls"; // Import Controls component

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch"; // Import components for zoom and pan functionality

// Main component to render the TreeMapTable
export default function TreeMapTable ({ data, onLayerSelect, selectedLayer }) {
  // Check if data is available and if it contains blocks
  if (!data || !data.blocks || !data.blocks[0]) {
    return <div>No data available.</div>; // Return a message if no data is available
  }

  return (
    <div>
      <TransformWrapper
        initialScale={1}
        initialPositionX={200}
        initialPositionY={100}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <Controls 
              zoomIn={zoomIn} 
              zoomOut={zoomOut} 
              resetTransform={resetTransform} 
            /> {/* Render Controls component with zoom and pan functions */}
            <TransformComponent>
              <div className={css.treeMapTableContainer}> {/* Apply styling for tree map container */}
                <div className={`${css.layer} ${css.layer1}`}> {/* Apply styling for layer */}
                  {data.blocks[0].children.map((block) => (
                    <Block 
                      key={block.key} // Unique key for each block
                      node={block} // Pass block data as a prop
                      onLayerSelect={onLayerSelect} // Pass onLayerSelect function as a prop
                      level={0} // Set level to 0 for first layer blocks
                      isSelected={selectedLayer && selectedLayer.key === block.key} // Check if block is selected
                    />
                  ))}
                </div>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
