
import css from './Modal.module.css';

const Modal = ({ isOpen, onClose, onSubmit, blockData, setBlockData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlockData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2>Add New Block</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={blockData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Color:
            <input
              type="color"
              name="color"
              value={blockData.color}
              onChange={handleChange}
            />
          </label>
          <label>
            Border Color:
            <input
              type="color"
              name="borderColor"
              value={blockData.borderColor}
              onChange={handleChange}
            />
          </label>
          <label>
            Opacity:
            <input
              type="number"
              name="opacity"
              step="0.1"
              min="0"
              max="1"
              value={blockData.opacity}
              onChange={handleChange}
            />
          </label>
          <label>
            Shape:
            <select name="shape" value={blockData.shape} onChange={handleChange}>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
          </label>
          {/* <button className={css.blockAdd} type="submit">Add Block</button> */}
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
