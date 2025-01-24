// src/components/Canvas/Canvas.jsx

import React, { useState } from "react";
import Block from "../Block/Block";
import Modal from "../Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import css from "./Canvas.module.css";

const Canvas = () => {
  const [blocks, setBlocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockData, setBlockData] = useState({
    title: "New Block",
    color: "#ffffff",
    borderColor: "#000000",
    opacity: 1,
    shape: "rectangle",
    width: 100,
    height: 50,
  });

  const addBlock = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    const newBlock = {
      key: uuidv4(),
      ...blockData
    };
    setBlocks([...blocks, newBlock]);
    setIsModalOpen(false);
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

  const updateBlock = (updatedBlock) => {
    setBlocks(
      blocks.map((block) =>
        block.key === updatedBlock.key ? updatedBlock : block
      )
    );
  };

  const deleteBlock = (blockKey) => {
    setBlocks(blocks.filter((block) => block.key !== blockKey));
  };

  return (
    <div id="canvas" className={css.canvas}>
      <button className={css.addButton} onClick={addBlock}>Add Block</button>
      <div className={css.blockContainer}>
        {blocks.map((block) => (
          <Block
            key={block.key}
            block={block}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        blockData={blockData}
        setBlockData={setBlockData}
      />
    </div>
  );
};

export default Canvas;
