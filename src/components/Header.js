import React, { useState, useRef } from 'react';
import CartIcon from '../supermarket.svg';
import useOnClickOutside from 'use-onclickoutside';

const Header = () => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Close modal if we click outside
  useOnClickOutside(modalRef, () => setIsOpen(false));

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
            <img src={CartIcon} width="30" alt="cart" />({0})
          </button>
          {/* Show Modal */}
          <div
            ref={modalRef}
            className="cart-modal"
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            Cart goes here
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
