import React from 'react';
import { useCart } from '../contexts/use-cart';

const Product = ({ product }) => {
  const { addItem, removeItem, countItemsInCart } = useCart();

  return (
    <div className="product">
      <img width="150" src={product.image_url} alt={product.name} />

      <h3>{product.name}</h3>

      <div className="product-buttons">
        {countItemsInCart(product.sku) > 0 ? (
          <button className="remove" onClick={() => removeItem(product.sku)}>
            Remove
          </button>
        ) : (
          <div />
        )}
        <button className="add" onClick={() => addItem(product.sku)}>
          Add to Cart ({countItemsInCart(product.sku)})
        </button>
      </div>
    </div>
  );
};

export default Product;
