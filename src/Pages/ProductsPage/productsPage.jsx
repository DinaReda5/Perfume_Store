import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import { Link } from "react-router-dom";
import { FiHeart, FiStar, FiShoppingCart } from "react-icons/fi";

export default function ProductsPage({ onAddToCart, onAddToWish }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Fetch error:", error);
    } else {
      setProducts(data);
    }
  }

  // Simple search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Perfume Store</h1>
        <Link
          to="/"
          className="text-pink-600 font-medium hover:underline"
        >
          Home
        </Link>
      </header>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="search"
          placeholder="Search perfumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
      </div>

      <div className="max-w-7xl mx-auto relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product) => {
              // Provide defaults if properties missing:
              const discount = product.discount || 0;
              const rating = product.rating || 4.5; // default rating
              const price = product.price || 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={
                        product.image_url ||
                        "https://via.placeholder.com/400x256.png?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {discount > 0 && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{discount}%
                      </span>
                    )}
                    <button
                      className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-pink-100 text-gray-700"
                      onClick={() => onAddToWish(product)}
                      aria-label="Add to wishlist"
                    >
                      <FiHeart size={18} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({rating.toFixed(1)})
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-pink-600">
                          $
                          {(
                            price *
                            (1 - discount / 100)
                          ).toFixed(2)}
                        </span>
                        {discount > 0 && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        className="p-2.5 bg-pink-950 rounded-full text-white hover:bg-pink-700 transition-colors"
                        onClick={() => onAddToCart(product)}
                        aria-label="Add to cart"
                      >
                        <FiShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
