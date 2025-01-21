import { useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import css from './HomePage.module.css';
import CircularIndeterminate from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/diagrams/selectors";
import FolderDirectory from "../../components/FolderDirectory/FolderDirectory";
import Block from "../../components/Block/Block";

export default function HomePage() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
  };
  const loading = useSelector(selectLoading);

  return (
    <div className={css.container}>
      <div className={css.folder}>
        <FolderDirectory onLayerSelect={handleBlockSelect} />
      </div>
      <div className={css.canvas}>
        {loading ? <CircularIndeterminate /> : <Canvas onBlockSelect={handleBlockSelect} />}
      </div>
      <div className={css.customizer}>
        <Block selectedBlock={selectedBlock} onBlockChange={setSelectedBlock} />
      </div>
    </div>
  );
}
