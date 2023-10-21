import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Categories from './containers/Categories';
import Products from './containers/Products';
import Settings from './containers/Settings';
import HomePage from './containers/HomePage';
import CategoryDetail from './components/Category/CategoryDetail';

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kategoriler" element={<Categories />} />
          <Route path="/urunler" element={<Products />} />
          <Route path="/ayarlar" element={<Settings />} />
          <Route path="/kategoriDetay" element={<CategoryDetail />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
