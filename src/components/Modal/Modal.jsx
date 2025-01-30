import ReactModal from 'react-modal'; // Import ReactModal for modal functionality

// Set the app element for accessibility
// Add this somewhere in the top part of your code, before rendering the component
ReactModal.setAppElement('#root');

import css from './Modal.module.css'; // Import CSS module for styling

// Main component to render the modal
export default function Modal({ isOpen, onClose, onSubmit, blockData, setBlockData }) {
  if (!isOpen) return null; // Return null if the modal is not open

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlockData((prevData) => ({
      ...prevData,
      [name]: value // Update block data state with new values
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit(); // Call the onSubmit function passed as a prop
  };

  return (
    <div className={css.modalOverlay}> {/* Apply modal overlay styling */}
      <div className={css.modalContent}> {/* Apply modal content styling */}
        <h2>Rename Block</h2>
        <form onSubmit={handleSubmit}> {/* Form for renaming block */}
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={blockData.title || ''} // Set input value to block data title
              onChange={handleChange} // Handle changes in input
              required
            />
          </label>
          <label>
            Color:
            <input
              type="color"
              name="color"
              value={blockData.color || '#ffffff'} // Set input value to block data color
              onChange={handleChange} // Handle changes in input
            />
          </label>
          <label>
            Border Color:
            <input
              type="color"
              name="borderColor"
              value={blockData.borderColor || '#000000'} // Set input value to block data border color
              onChange={handleChange} // Handle changes in input
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
              value={blockData.opacity || 1} // Set input value to block data opacity
              onChange={handleChange} // Handle changes in input
            />
          </label>
          <label>
            Shape:
            <select 
              name="shape" 
              value={blockData.shape || 'rectangle'} // Set select value to block data shape
              onChange={handleChange} // Handle changes in select
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
          </label>
          <button className={css.blockAdd} type="submit">Rename Block</button> {/* Submit button */}
        </form>
        <button onClick={onClose}>Close</button> {/* Button to close the modal */}
      </div>
    </div>
  );
}
