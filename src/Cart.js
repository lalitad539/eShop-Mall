import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const navigate  = useNavigate();

  const handleCheckout = () =>{
    navigate("/checkout");
  };

  // Same demo conversion used by the Home page.
  const formatPrice = (price) =>
    "₹" + Number(price).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    });

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  return (
    <div className="eshop-page">
      

      <main className="cart-page">
        <h1>🛒 My Shopping Cart</h1>
        <p className="cart-subtitle">
          Review your items and check your total.
        </p>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛍️</div>
            <h2>Your cart is empty</h2>
            <p>Find something stylish in our clothing collection.</p>
            <Link to="/" className="shop-now-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p className="cart-item-category">
                      {item.category.replaceAll("-", " ")}
                    </p>
                    <strong>{formatPrice(item.price)}</strong>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-end">
                    <strong>
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}

              <Link to="/" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </section>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items ({cartItems.length})</span>
                  {/* (sum, item) => sum + item.quantity, 0
                })</span> */}
                <strong>{formatPrice(subtotal )}</strong>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>

              {subtotal > 0 && subtotal < 999 && (
                <p className="delivery-note">
                  Add {formatPrice((999 - subtotal) / 85)} more for free delivery.
                </p>
              )}

              <div className="summary-total">
                <span>Total Amount</span>
                <strong>₹{Math.round(total).toLocaleString("en-IN")}</strong>
              </div>

              <button
                className="checkout-btn"
                onClick={handleCheckout}>Proceed to Checkout

              </button>

              {/* <p className="demo-note">
                Demo store: checkout and payment are not enabled yet.
              </p> */}
            </aside>
          </div>
        )}
      </main>

      <footer className="shop-footer">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} E-Shop Mall. All rights reserved.</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      </footer>
    </div>
  );
}

export default Cart;