
import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error("Fetch error:", error);
    else setProducts(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = editingId
      ? await supabase.from("products").update(form).eq("id", editingId)
      : await supabase.from("products").insert([form]);

    if (error) return console.error("Submit error:", error);

    setForm({ name: "", description: "", price: "", image_url: "" });
    setEditingId(null);
    fetchProducts();
  }

  function handleEdit(product) {
    setForm(product);
    setEditingId(product.id);
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) console.error("Delete error:", error);
    else fetchProducts();
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-pink-100 p-6 shadow-md">
        <h2 className="text-2xl font-bold text-pink-800 mb-6">Admin Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="text-pink-700 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-pink-700 font-semibold">
              Dashboard
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-pink-50">
        <h1 className="text-4xl font-serif font-bold mb-10 text-center text-pink-800">
          Perfume Collection Dashboard
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6 mb-12 border border-pink-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Perfume Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
            <input
              type="number"
              placeholder="Price (USD)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="col-span-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="col-span-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition"
          >
            {editingId ? "Update Perfume" : "Add Perfume"}
          </button>
        </form>

        {/* Product List */}
        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-pink-100 shadow-md p-6 flex flex-col md:flex-row gap-6"
            >
              <img
                src={
                  product.image_url ||
                  "https://via.placeholder.com/120x120.png?text=No+Image"
                }
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-serif text-pink-800 font-semibold">
                  {product.name}
                </h2>
                <p className="text-gray-600 italic mb-2">{product.description}</p>
                <p className="text-lg font-medium text-pink-600">
                  ${product.price}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 border border-pink-400 text-pink-700 rounded-md hover:bg-pink-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
