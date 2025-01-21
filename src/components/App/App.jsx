import { lazy, Suspense,  } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

import Layout from "../Layout/Layout";
import { selectLoading } from "../../redux/diagrams/selectors";

function App() {
  const loading = useSelector(selectLoading);
  return  (
      <>
      <p>Hello world</p>
      {loading && <Loader/>}  
      <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Layout> 
    
      
    </>
  )
}

export default App
