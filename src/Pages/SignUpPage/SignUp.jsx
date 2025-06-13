
import { useState } from "react";
import { signup } from "./../../services/apiAuth";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [Accept, setAccept] = useState(false);

  const navigate = useNavigate();

  async function SubmitFun(e) {
    e.preventDefault();
    setAccept(true);

    const isValid = name.trim().length > 0 && password.length >= 8 && password === rePassword;
    if (!isValid) return;

    try {
      const res = await signup({ name, email, password });
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
      navigate("/home");
    } catch (err) {
      console.error("Signup error", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  via-white from-pink-50 to-rose-100 ">
      <form
        onSubmit={SubmitFun}
        className="w-[90%] max-w-md bg-white/80 shadow-xl p-8 rounded-2xl border border-pink-100 backdrop-blur-md"
      >
        <h2 className="text-center text-2xl font-serif text-pink-500 mb-6">Create Your Account</h2>

        <label className="block text-sm font-medium text-gray-700 mt-4">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        {name.trim().length < 1 && Accept && (
          <p className="text-sm text-red-500 mt-1">Username is required</p>
        )}

        <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        {password.length < 8 && Accept && (
          <p className="text-sm text-red-500 mt-1">Password must be at least 8 characters</p>
        )}

        <label className="block text-sm font-medium text-gray-700 mt-4">Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        {rePassword !== password && Accept && (
          <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 transition text-white font-semibold py-2 rounded-lg shadow"
        >
          Register
        </button>

        <div className="flex justify-between text-sm mt-4 text-gray-600">
          <p>Already have an account?</p>
          <Link to="/SignIn" className="text-pink-500 font-semibold">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
