import { useState } from "react"; // Import useState for state management
import Block from "../Block/Block"; // Import Block component
import Modal from "../Modal/Modal"; // Import Modal component
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique IDs
import css from "./Canvas.module.css"; // Import CSS module

// Main component to render the canvas
export default function Canvas ({ selectedLayer, onUpdate }) {
  const [blocks, setBlocks] = useState([]); // useState to manage blocks state
  const [isModalOpen, setIsModalOpen] = useState(false); // useState to manage modal open/close state
  const [blockData, setBlockData] = useState({
    title: "New Block",
    color: "#ffffff",
    borderColor: "#000000",
    opacity: 1,
    shape: "rectangle",
    width: 100,
    height: 50,
  }); // useState to manage block data

  // Function to handle form submission in the modal
  const handleSubmit = () => {
    const newBlock = {
      key: uuidv4(), // Generate unique ID for the new block
      ...blockData,
      parentKey: selectedLayer ? selectedLayer.key : null, // Set parent key if selectedLayer is present
    };
    setBlocks([...blocks, newBlock]); // Add the new block to the blocks array
    onUpdate(newBlock); // Call onUpdate function passed as a prop
    setIsModalOpen(false); // Close the modal
    // Reset block data to default values
    setBlockData({
      title: "New Block",
      color: "#ffffff",
      borderColor: "#000000",
      opacity: 1,
      shape: "rectangle",
      width: 100,
      height: 50,
    });
  };

  return (
    <div id="canvas" className={css.canvas}>
      {/* Commented out button to add a new block */}
      {/* <button className={css.addButton} onClick={addBlock}>Add Block</button> */}
      <div className={css.blockContainer}>
        {blocks.map((block) => (
          <Block
            key={block.key} // Unique key for each block
            block={block} // Pass block data as a prop
            onUpdate={onUpdate} // Pass onUpdate function as a prop
            parentLayer={selectedLayer} // Pass selectedLayer as a prop
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen} // Pass isModalOpen state as a prop
        onClose={() => setIsModalOpen(false)} // Close the modal when onClose is called
        onSubmit={handleSubmit} // Handle form submission
        blockData={blockData} // Pass blockData state as a prop
        setBlockData={setBlockData} // Pass setBlockData function as a prop
      />
    </div>
  );
};
