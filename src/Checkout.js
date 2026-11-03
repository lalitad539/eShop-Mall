import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Checkout.css";

function Checkout() {
  const { cartItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add a product first.");
      return;
    }

    const generatedOrderNumber =
      "ESM" + Date.now().toString().slice(-8);

    setOrderNumber(generatedOrderNumber);
    setOrderPlaced(true);

    // Demo only: no real payment is processed.
    // Keep the cart until the demo order is confirmed.
    clearCart();
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping with E-Shop Mall.</p>
          <p>
            Your demo order number is{" "}
            <strong>{orderNumber}</strong>
          </p>
          <p className="demo-note">
            This is a demo confirmation. No payment was collected.
          </p>
          <Link to="/" className="checkout-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <p className="checkout-kicker">E-SHOP MALL</p>
        <h1>Billing & Checkout</h1>
        <p>Almost yours! Enter your delivery details below.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some clothing before proceeding to checkout.</p>
          <Link to="/" className="checkout-primary">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="billing-card" onSubmit={handleSubmit}>
            <h2>1. Billing & Delivery Details</h2>

            <div className="billing-grid">
              <label>
                Full Name
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Mobile Number
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </label>

              <label className="full-width">
                House No. & Street Address
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  autoComplete="street-address"
                  rows={3}
                  required
                />
              </label>

              <label>
                City
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />
              </label>

              <label>
                State
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  autoComplete="address-level1"
                  required
                />
              </label>

              <label>
                PIN Code
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit PIN code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  autoComplete="postal-code"
                  required
                />
              </label>
            </div>

            <div className="payment-section">
              <h2>2. Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives</small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>
                  <strong>Online Payment</strong>
                  <small>Demo option — payment is not enabled</small>
                </span>
              </label>

              {paymentMethod === "online" && (
                <p className="demo-note">
                  Online payments are not connected yet. This demo
                  will not charge your card or UPI account.
                </p>
              )}
            </div>

            <button type="submit" className="checkout-primary place-order">
              Place Demo Order · ₹{total.toLocaleString("en-IN")}
            </button>

            <p className="checkout-disclaimer">
              Demo only. This form does not send your details to a
              server or arrange actual delivery.
            </p>
          </form>

          <aside className="order-card">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img
                  src={item.image || item.thumbnail}
                  alt={item.title || item.name}
                />
                <div className="checkout-item-info">
                  <strong>{item.title || item.name}</strong>
                  <span>Quantity: {item.quantity}</span>
                  <span>
                    ₹
                    {(
                      Number(item.price || 0) * item.quantity
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}

            <div className="summary-line">
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-line">
              <span>Delivery</span>
              <strong>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery.toLocaleString("en-IN")}`}
              </strong>
            </div>

            <div className="summary-total">
              <span>Total Amount</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <Link to="/cart" className="edit-cart-link">
              ← Return to Cart
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Checkout;