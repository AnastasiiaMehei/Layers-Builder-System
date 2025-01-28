import Block from "../Block/Block";
import css from './TreeMapTable.module.css';
import Controls from "../Controls/Controls";  // Правильний імпорт компоненту Controls
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
export default function TreeMapTable ({ data, onLayerSelect, selectedLayer }) {
  if (!data || !data.blocks || !data.blocks[0]) {
    return <div>No data available.</div>;
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
            <Controls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />  
            <TransformComponent>
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
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

