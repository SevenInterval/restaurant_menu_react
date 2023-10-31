import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Categories from './containers/Categories';
import Products from './containers/Products';
import HomePage from './containers/HomePage';
import CategoryDetail from './components/Category/CategoryDetail';
import ProductDetail from './components/Product/ProductDetail';
import Menu from './containers/Menu';
import Oneriler from './containers/Oneriler';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Navbar />
        <Content>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kategoriler" element={<Categories />} />
              <Route path="/urunler" element={<Products />} />
              <Route path="/oneriler" element={<Oneriler />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/kategoriDetay" element={<CategoryDetail />} />
              <Route path="/urunDetay" element={<ProductDetail />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Örnektir. ©2023 Tüm Hakları Rıdvan Öztürk'e aittir. İletişim: ridvanozturk94@gmail.com</Footer>
      </Layout>
    </>

  );
}

export default App;
