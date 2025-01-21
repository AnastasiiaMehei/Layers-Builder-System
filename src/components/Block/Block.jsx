const Block = ({ selectedBlock, onBlockChange }) => {
  if (!selectedBlock) {
    return <div>Select a block to customize</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onBlockChange({ ...selectedBlock, [name]: value });
  };

  return (
    <div>
      <h3>Customize Block {selectedBlock.id}</h3>
      <label>
        Label:
        <input type="text" name="label" value={selectedBlock.label} onChange={handleChange} />
      </label>
      <label>
        Color:
        <input type="color" name="fill" value={selectedBlock.fill} onChange={handleChange} />
      </label>
      {/* Додайте інші властивості за необхідності */}
    </div>
  );
};

export default Block;
