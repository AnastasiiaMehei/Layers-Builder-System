import ReactModal from 'react-modal';

// Додаємо це десь у верхній частині вашого коду, перед рендерингом компонента
ReactModal.setAppElement('#root');
import css from './Modal.module.css';

export default function Modal ({ isOpen, onClose, onSubmit, blockData, setBlockData })  {
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
        <h2>Rename Block</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={blockData.title || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Color:
            <input
              type="color"
              name="color"
              value={blockData.color || '#ffffff'}
              onChange={handleChange}
            />
          </label>
          <label>
            Border Color:
            <input
              type="color"
              name="borderColor"
              value={blockData.borderColor || '#000000'}
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
              value={blockData.opacity || 1}
              onChange={handleChange}
            />
          </label>
          <label>
            Shape:
            <select name="shape" value={blockData.shape || 'rectangle'} onChange={handleChange}>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
          </label>
          <button className={css.blockAdd} type="submit">Rename Block</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
