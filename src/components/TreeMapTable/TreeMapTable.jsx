// TreeMapTable.jsx
import { useState, useCallback } from 'react';

const TreeMapTable = ({ data, onTreeChange, onLayerSelect }) => {
  const [dragging, setDragging] = useState(null);
  const [items, setItems] = useState(data ? data.children : []);

  const handleDragStart = useCallback((e, item) => {
    e.dataTransfer.setData('text', item.key);
    setDragging(item);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragging(null);
  }, []);

  const handleDrop = useCallback((e, targetItem) => {
    e.preventDefault();
    const sourceKey = e.dataTransfer.getData('text');
    const sourceIndex = items.findIndex(item => item.key === sourceKey);
    const targetIndex = items.findIndex(item => item.key === targetItem.key);
    const newItems = [...items];
    newItems.splice(targetIndex, 0, newItems.splice(sourceIndex, 1)[0]);
    setItems(newItems);
    onTreeChange({ ...data, children: newItems });
  }, [items, data, onTreeChange]);

  const handleLayerClick = useCallback((layer) => {
    onLayerSelect(layer);
  }, [onLayerSelect]);

  const handleBlockEdit = (key, newProps) => {
    const newData = JSON.parse(JSON.stringify(data));
    const loop = (items) => {
      for (let item of items) {
        if (item.key === key) {
          Object.assign(item, newProps);
        }
        if (item.children) {
          loop(item.children);
        }
      }
    };
    loop(newData.children);
    onTreeChange(newData);
  };

  if (!data || !data.children) {
    return <div>No data available</div>;
  }

  const renderLayer = (layer) => {
    if (!layer) return null;
    return (
      <div onClick={() => handleLayerClick(layer)}>
        {layer.title}
      </div>
    );
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {items.map((header, index) => (
              <th
                key={index}
                colSpan={header.children ? header.children.length : 1}
                style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}
              >
                {renderLayer(header)}
              </th>
            ))}
          </tr>
          <tr>
            {items.map((header) =>
              header.children ? header.children.map((column, index) => (
                <th
                  key={index}
                  style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}
                >
                  {renderLayer(column)}
                </th>
              )) : null
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {items.map((header) =>
              header.children ? header.children.map((column, index) => (
                <td
                  key={index}
                  style={{ border: '1px solid #ddd', padding: '8px', verticalAlign: 'top' }}
                >
                  {column.children && column.children.map((child) => (
                    <div
                      key={child.key}
                      draggable
                      onDragStart={(e) => handleDragStart(e, child)}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => handleDrop(e, child)}
                      style={{
                        margin: '4px',
                        padding: '4px',
                        border: '1px solid #ccc',
                        cursor: 'move',
                        backgroundColor: dragging === child ? 'lightblue' : 'transparent',
                      }}
                      onDoubleClick={() => handleBlockEdit(child.key, { title: prompt('Edit title:', child.title) })}
                    >
                      {child.title}
                    </div>
                  ))}
                </td>
              )) : null
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TreeMapTable;
