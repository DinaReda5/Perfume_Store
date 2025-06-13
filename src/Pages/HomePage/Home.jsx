import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./../../Style/Header.module.css";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import About from "../../components/About";
import Contact from "../../components/Contact";
import Products from "../../components/Products";

export default function Home({ onAddToCart, onAddToWish }) {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function HandleLogOut() {
    window.localStorage.removeItem("email");
    navigate("/SignIn");
  }

  const isLoggedIn = !!window.localStorage.getItem("email");

  useEffect(() => {
    const storedName = window.localStorage.getItem("name");
    setName(storedName || "");
  }, []);

  return (
    <div className="bg-amber-50">
      {isLoggedIn ? (
        <div className={style.DivButton}>
          <div className="flex">
              <Link to={'/dashboard'}
                 className="px-6 py-3 mt-1.5 mr-2 bg-pink-900 cursor-pointer text-white text-sm font-semibold rounded-1g
                  shadow hover:bg-pink-600 transition "
            >
              Dashboard
            </Link>
            <button
              className="px-6 py-3 mt-1.5 bg-red-600 hover:bg-red-500 cursor-pointer text-white text-sm font-semibold rounded-1g
                  shadow transition "
           
              onClick={HandleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className={style.DivButton}>
          <Link to="/SignIn" className="px-6 py-3 mt-1.5 mr-2 bg-pink-900 cursor-pointer text-white text-sm font-semibold rounded-lg
                  shadow hover:bg-pink-600 transition ">
            SignIn
          </Link>
          <Link to="/SignUp" className="px-6 py-3 mt-1.5 mr-2 bg-pink-900 cursor-pointer text-white text-sm font-semibold rounded-lg
                  shadow hover:bg-pink-600 transition ">
            SignUp
          </Link>
        </div>
      )}
     
        <Hero />
    <Products onAddToCart={onAddToCart} onAddToWish={onAddToWish} />
    <Categories />
    <Offers />
    <About />
    <Contact />
    </div>
  );
}
