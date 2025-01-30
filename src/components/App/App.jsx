import { lazy, Suspense } from "react"; // Import lazy and Suspense for code splitting and lazy loading
import { Route, Routes } from "react-router-dom"; // Import Route and Routes for routing
import { useSelector } from "react-redux"; // Import useSelector for accessing Redux store state
import Loader from "../Loader/Loader"; // Import Loader component

// Lazy load the HomePage component for code splitting
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

import Layout from "../Layout/Layout"; // Import Layout component
import { selectLoading } from "../../redux/diagrams/selectors"; // Import selector for loading state

// Main App component
export default function App() {
  const loading = useSelector(selectLoading); // Access loading state from Redux store

  return (
    <>
      {loading && <Loader />} {/* Show Loader component if loading state is true */}
      <Layout>
        <Suspense fallback={null}>
          {/* Use Suspense to handle lazy loading of components */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Define route for HomePage */}
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
