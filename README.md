<!-- App.jsx: -->
The main component of the application.
Uses useSelector to access the loading state from Redux.
Displays the Loader component if the loading state is true.
Uses Suspense to handle lazy loading of components.
Defines routing for the HomePage.
<!-- HomePage.jsx: -->
The main component for rendering the home page.
Uses useEffect to fetch diagrams when the component mounts.
Displays Toolbar, FolderDirectory, TreeMapTable, and Canvas.
Handles layer selection, diagram deletion, save, undo, and redo actions.
<!-- Loader.jsx: -->
Displays a loading indicator in the form of a circular progress.
Uses CircularProgress and Box components from MUI for styling.
<!-- Layout.jsx: -->
Renders the layout for the application.
Displays child elements passed as props.
<!-- Canvas.jsx: -->
Renders a canvas for blocks.
Uses useState to manage the state of blocks and the modal window.
Handles adding new blocks through a modal window.
<!-- Block.jsx: -->
Renders an individual block.
Uses useState to manage the expanded state of the block.
Allows dragging of blocks at certain levels.
<!-- Toolbar.jsx: -->
Renders a toolbar.
Contains buttons for exporting the canvas as images in PNG and JPEG formats.
<!-- TreeMapTable.jsx: -->
Renders a tree map table.
Uses TransformWrapper and TransformComponent for zoom and pan functionality.
Displays first-level blocks.
<!-- FolderDirectory.jsx: -->
Renders a folder structure in a tree format.
Allows adding, deleting, and renaming layers.
Uses Tree from rc-tree to display the tree.
<!-- Modal.jsx: -->
Renders a modal window for editing block properties.
Allows changing the title, color, border color, opacity, and shape of the block.
<!-- ErrorBoundary.jsx: -->
A component for handling errors in the component tree.
Displays fallback UI if an error occurs.
<!-- Controls.jsx: -->
Renders control buttons for zooming and resetting transformations.
Uses Button components from MUI.