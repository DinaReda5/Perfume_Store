
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import SignUp from "./Pages/SignUpPage/SignUp";
import SignInPage from "./Pages/SignInPage/SignInPage";
import Home from "./Pages/HomePage/Home";
import Header from "./components/Header";
import ProductsPage from "./Pages/ProductsPage/productsPage";
import Footer from "./components/Footer";
import CartSidebar from "./components/Cartsidebar";
import WishSidebar from "./components/Wishsidebar";
import Dashboard from "./Pages/DashboardPage/DashboardPage";

function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/SignIn" || location.pathname === "/SignUp";

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const onPurchase = () => {
    alert("Thanks for your purchase!");
    setCart([]);
    setIsCartOpen(false);
  };

  const addToWish = (product) => {
    setWish((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev;
      return [...prev, { ...product }];
    });
  };

  const removeFromWish = (id) =>
    setWish((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      {!hideLayout && (
        <Header
          cart={cart}
          wish={wish}
          onCartClick={() => setIsCartOpen(true)}
          isWishClick={() => setIsWishOpen(true)}
        />
      )}

      <Routes>
        
        <Route
          path="/"
          element={
            <Home onAddToCart={addToCart} onAddToWish={addToWish} />
          }
        />
        <Route
          path="/home"
          element={
            <Home onAddToCart={addToCart} onAddToWish={addToWish} />
          }
        />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/products"
          element={
            <ProductsPage
              onAddToCart={addToCart}
              onAddToWish={addToWish}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

      {!hideLayout && (
        <>
          <Footer />
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            updateQuantity={updateQuantity}
            onPurchase={onPurchase}
            removeFromCart={removeFromCart}
          />
          <WishSidebar
            isOpen={isWishOpen}
            onClose={() => setIsWishOpen(false)}
            wishItems={wish}
            removeFromWish={removeFromWish}
          />
        </>
      )}
    </>
  );
}

function App() {
  return (
    
      <AppContent />
   
  );
}

export default App;
