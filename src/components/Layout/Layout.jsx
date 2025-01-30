import css from "./Layout.module.css"; // Import CSS module for styling

// Main component to render the layout
export default function Layout({ children }) {
  return (
    <div className={css.container}> {/* Apply container class from the CSS module */}
      {children} {/* Render the children elements passed as props */}
    </div>
  );
}
