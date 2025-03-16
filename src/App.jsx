import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FnnHeader from '@/fnn-components/FnnHeader';
import FnnFooter from '@/fnn-components/FnnFooter';
import Home from '@/pages/Home';
import FnnCard from '@/fnn-components/FnnCard';
import FnnListProducts from '@/fnn-components/FnnListProducts';
import products from '@/data/x.json'; // Ambil data dari src/data/x.json

function App() {
  const dummyProduct = products[0]; // Ambil produk pertama dari JSON

  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <FnnHeader />
          <main className="container mx-auto grow px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/test"
                element={<FnnCard product={dummyProduct} />}
              />
              <Route path="/list" element={<FnnListProducts />} />
            </Routes>
          </main>
          <FnnFooter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
