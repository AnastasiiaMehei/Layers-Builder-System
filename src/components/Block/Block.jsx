// Block.jsx

const Block = ({ selectedNode, onNodeChange }) => {
  if (!selectedNode) {
    return <div>Select a node to customize</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onNodeChange({ ...selectedNode, data: { ...selectedNode.data, [name]: value } });
  };

  return (
    <div>
      <h3>Customize Node {selectedNode.id}</h3>
      <label>
        Label:
        <input
          type="text"
          name="label"
          value={selectedNode.data?.label || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Color:
        <input
          type="color"
          name="color"
          value={selectedNode.data?.color || '#ff0000'} // Default to red
          onChange={handleChange}
        />
      </label>
      {/* Додайте інші властивості за необхідності */}
    </div>
  );
};

export default Block;
