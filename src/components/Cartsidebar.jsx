import React from 'react';
import { FiChevronUp, FiChevronDown, FiX } from 'react-icons/fi';

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, onPurchase }) => {
  // Calculate total price
const totalPrice = cartItems.reduce(
  (total, item) => total + item.quantity * item.price * (1 - (item.discount || 0) / 100),
  0
);


  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart sidebar" className="text-gray-600 hover:text-black">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-auto space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  loading="lazy"
                />

                <div className="flex-1">
                  <h3 className="text-md font-medium">{item.name}</h3>
                <p className="text-sm text-pink-700 font-semibold">
  ${(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)} each
</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <FiChevronUp />
                    </button>

                    <span className="px-3">{item.quantity}</span>

                    <button
                      onClick={() =>
                        item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                </div>

               <div className="text-right font-semibold">
  ${(item.quantity * item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}
</div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <FiX size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total and Purchase */}
        {cartItems.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={onPurchase}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded transition"
              aria-label="Purchase items in cart"
            >
              Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
