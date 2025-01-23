import  { useRef, useState } from "react";

const DraggableComponent = ({ children, position, onDrag }) => {
  const [isDragging, setDragging] = useState(false);
  const dragRef = useRef(null);

  const handleMouseDown = (e) => {
    setDragging(true);
    dragRef.current = {
      startX: e.pageX,
      startY: e.pageY,
      initialX: position.x,
      initialY: position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.pageX - dragRef.current.startX;
      const dy = e.pageY - dragRef.current.startY;
      onDrag({ x: dragRef.current.initialX + dx, y: dragRef.current.initialY + dy });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <g
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}
    </g>
  );
};

export default DraggableComponent;
