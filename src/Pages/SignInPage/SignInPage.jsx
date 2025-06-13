
import { useState } from "react";
import { login } from "./../../services/apiAuth";
import { Link, useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function SubmitFun(e) {
    e.preventDefault();
    setAccept(true);
    setErrorMessage("");

    const isValid = password.length >= 8;
    if (!isValid) return;

    try {
      const res = await login({ name, email, password });
      console.log("SignIn successful", res);
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);

      navigate("/home");
    } catch (err) {
      console.error("SignIn error", err);
      setErrorMessage("Incorrect email or password");
    }
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-4">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  via-white from-pink-50 to-rose-100 ">
      
    <form
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-rose-100"
        onSubmit={SubmitFun}
      >
        <h2 className="text-3xl font-semibold text-pink-500 mb-6 text-center">
          Welcome Back
        </h2>

        <label htmlFor="username" className="block text-gray-700font-medium mb-1">
          Username
        </label>
        <input
          type="text"
          placeholder="Your name"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <label htmlFor="email" className="block text-gray-700font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 "
        />

        <label htmlFor="password" className="block text-gray-700font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="********"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2  focus:ring-pink-400 "
        />

        {password.length < 8 && accept && (
          <p className="text-sm text-red-500 mb-2">
            Password must be more than 8 characters
          </p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
        )}

        <button
          className="w-full bg-pink-500 hover:bg-pink-600  text-white font-semibold py-3 rounded-lg transition duration-200"
          type="submit"
        >
          Log In
        </button>

        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <p>Don't have an account?</p>
          <Link to="/SignUp" className="text-pink-500 font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
