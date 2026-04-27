import { useState } from "react";
import { products } from "./data";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home"); // "home" | "cart"

  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div>
      {/* Navbar */}
      <nav>
        <span className="brand">🛒 FreshMart</span>
        <div>
          <button onClick={() => setPage("home")} className={page === "home" ? "active" : ""}>Home</button>
          <button onClick={() => setPage("cart")} className={page === "cart" ? "active" : ""}>
            Cart {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </button>
        </div>
      </nav>

      {/* Home Page */}
      {page === "home" && (
        <div className="container">
          <h1>Fresh Groceries 🥦</h1>
          <p className="subtitle">Quality products at great prices</p>
          <div className="grid">
            {products.map(p => {
              const inCart = cart.find(i => i.id === p.id);
              return (
                <div className="card" key={p.id}>
                  <div className="emoji">{p.emoji}</div>
                  <h3>{p.name}</h3>
                  <p>₹{p.price}</p>
                  <button onClick={() => addToCart(p)} className={inCart ? "added" : ""}>
                    {inCart ? `In Cart (${inCart.qty})` : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cart Page */}
      {page === "cart" && (
        <div className="container">
          <h1>Your Cart</h1>
          {cart.length === 0 ? (
            <p>Cart is empty. <button onClick={() => setPage("home")}>Shop now</button></p>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-row" key={item.id}>
                  <span>{item.emoji} {item.name}</span>
                  <span>x{item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
              <div className="cart-total">Total: ₹{total}</div>
              <button className="checkout" onClick={() => { setCart([]); alert("Order placed! 🎉"); }}>
                Place Order
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}