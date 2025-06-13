import React from 'react';


const WishSidebar = ({ isOpen, onClose, wishItems, removeFromWish }) => {

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Wish</h2>
          <button onClick={onClose} aria-label="Close wish sidebar" className="text-gray-600 hover:text-black">
           X
          </button>
        </div>

        <div className="flex-grow overflow-auto space-y-4">
          {wishItems.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            wishItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  loading="lazy"
                />

                <div className="flex-1">
                  <h3 className="text-md font-medium">{item.name}</h3>
                

                 
                </div>

                <div className="text-right font-semibold">
                   ${(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromWish(item.id)}
                  aria-label={`Remove ${item.name} from wish`}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <FiX size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishSidebar;
