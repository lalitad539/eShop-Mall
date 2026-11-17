import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { useLocation } from "react-router-dom";

const CartContext = createContext();

const API_URL = "https://eshop-mall.onrender.com/api/auth/me";

function getSavedCart(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);
  const [cartKey, setCartKey] = useState(null);
  const [cartReady, setCartReady] = useState(false);

  const location = useLocation();

  // FETCH INDIVIDUAL CUSTOMER AND LOAD THEIR CART
  useEffect(() => {

    let cancelled = false;

    async function loadCustomerCart() {

      setCartReady(false);

      const token = localStorage.getItem("token");

      // GUEST CART
      if (!token) {
        if (!cancelled) {
          const key = "eshop-cart-guest";

          setCartKey(key);
          setCartItems(getSavedCart(key));
          setCartReady(true);
        }
        return;
      }

      try {

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to identify customer"
          );
        }

        const userId = data.user?.id || data.user?._id;

        if (!userId) {
          throw new Error("Customer ID not found");
        }

        // UNIQUE CART FOR EACH CUSTOMER
        const key = `eshop-cart-user-${userId}`;

        if (!cancelled) {
          setCartKey(key);
          setCartItems(getSavedCart(key));
          setCartReady(true);
        }

      } catch (error) {

        console.error("Customer cart error:", error);

        if (!cancelled) {
          setCartKey(null);
          setCartItems([]);
          setCartReady(true);
        }

      }
    }

    loadCustomerCart();

    return () => {
      cancelled = true;
    };

  }, [location.pathname]);

  // SAVE INDIVIDUAL CUSTOMER CART
  useEffect(() => {

    if (!cartReady || !cartKey) return;

    localStorage.setItem(
      cartKey,
      JSON.stringify(cartItems)
    );

  }, [cartItems, cartKey, cartReady]);

  // ADD TO CART
  function addToCart(product) {

    if (!cartReady || !cartKey) return;

    setCartItems((items) => {

      const existing = items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...items,
        { ...product, quantity: 1 }
      ];

    });
  }

  // INCREASE QUANTITY
  function increaseQuantity(id) {

    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // DECREASE QUANTITY
  function decreaseQuantity(id) {

    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // REMOVE PRODUCT
  function removeFromCart(id) {

    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  }

  // CLEAR CART
  function clearCart() {
    setCartItems([]);
  }

  // TOTAL CART COUNT
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );

}

export function useCart() {
  return useContext(CartContext);
}