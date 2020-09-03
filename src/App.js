import React from 'react';
import Header from './components/Header';
import products from './products';
import './App.css';

const App = () => {
  return (
    <div className="app">
      {/* header */}
      <Header />

      <main>
        <div className="products-list">{/* show products here */}</div>
      </main>
    </div>
  );
};

export default App;
