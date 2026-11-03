import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
            }}
          />

          <h3>{product.title}</h3>
          <p>Price: ₹{(product.price * 85).toFixed(0)}</p>

          <button onClick={() => alert(product.title)}>
            View Product
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;