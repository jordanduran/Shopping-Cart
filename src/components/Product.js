import React from 'react';

const Product = ({ product }) => {
// const { addItem, removeItem, findInCart } = useCart();

  return (
    <div className="product">
      <img src={product.image_url} alt={product.name} />

      <h3>{product.name}</h3>

      <div className="product-buttons">
        <button className="remove">Remove</button>
        <button className="add">Add to Cart (0)</button>
      </div>
    </div>
  );
};

export default Product;
