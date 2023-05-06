import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

function App() {

  return (
    <BrowserRouter>
    <div className='flex flex-col bg-slate-50 min-h-screen'>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      <Footer />
    </div>
    </ BrowserRouter>
  );
}

export default App;
