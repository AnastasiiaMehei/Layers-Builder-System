import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { selectLoading } from '../../redux/diagrams/selectors';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));

function App() {
  const loading = useSelector(selectLoading);
  return (
    <>
      {loading && <Loader />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
