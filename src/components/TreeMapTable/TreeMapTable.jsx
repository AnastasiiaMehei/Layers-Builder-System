import Block from "../Block/Block";
import css from './TreeMapTable.module.css';
import Button from '@mui/material/Button';

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools">
  <Button variant="contained" color="primary" onClick={() => zoomIn()}>
        +
      </Button>
      <Button variant="contained" color="primary" onClick={() => zoomOut()}>
        -
      </Button>
      <Button variant="contained" color="secondary" onClick={() => resetTransform()}>
        x
      </Button>
    </div>
  );
};
const TreeMapTable = ({ data, onLayerSelect, selectedLayer }) => {
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
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controls />
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

export default TreeMapTable;