import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./App.css";
import { getProducts } from "./productApi-temp";

const clothingAPIs = [
  "mens-shirts",
  "womens-dresses",
  "tops",
  "mens-shoes",
  "womens-shoes",
  "Jewellery",
];

const categories = [
  { name: "All Clothing", icon: "👕", api: "all" },
  { name: "Men", icon: "👔", api: "mens-shirts" },
  { name: "Women", icon: "👗", api: "womens-dresses" },
  { name: "Tops", icon: "👚", api: "tops" },
  { name: "Kids", icon: "👟", api: "Kids" },
  { name: "Electronics", icon: "👠", api: "Smartphones" },
  { name: "Beauty", icon: "👠", api: "beauty" },
  { name: "Jewellery", icon: "👠", api: "womens-jewellery" },
];

function Home() {
  const { addToCart, cartCount } = useCart();

  const [products, setProducts] = useState([]);

  const loadCategoryProducts = async (category) => {
  try {
    const data = await getProducts(category);
    setProducts(data);
  } catch (error) {
    console.error("Unable to load products:", error);
  }
};
  const [activeCategory, setActiveCategory] =
    useState("All Clothing");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

//  offer const 
const offersRef = useRef(null);

useEffect(() => {
  const slider = offersRef.current;
  if (!slider) return;

  const interval = setInterval(() => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (maxScroll <= 0) return;

    if (slider.scrollLeft >= maxScroll - 5) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({
        left: slider.clientWidth * 0.7,
        behavior: "smooth",
      });
    }
  }, 3000);

  return (

  ) => clearInterval(interval);
}, []);

useEffect(() => {
  let cancelled = false;

  async function fetchClothing() {
    setLoading(true);
    setError("");

    try {
      let productList = [];

      if (activeCategory === "All Clothing") {
        const responses = await Promise.all(
          clothingAPIs.map((category) =>
            fetch(
              `https://dummyjson.com/products/category/${category}`
            )
          )
        );

        if (responses.some((response) => !response.ok)) {
          throw new Error("Could not load clothing products.");
        }

        const results = await Promise.all(
          responses.map((response) => response.json())
        );

        productList = results.flatMap(

          (result) => result.products || []
        );
      } else {
        const selectedCategory = categories.find(
          (category) => category.name === activeCategory
        );

        // if (!selectedCategory) {
        //   throw new Error("Please choose a valid category.");
        // }

        const response = await fetch(
          `https://dummyjson.com/products/category/${selectedCategory.api}?limit=0`);

        // if (!response.ok) {
        //   throw new Error("Could not load this category.");
        // }

        const result = await response.json();
       setProducts = result.products || [];
      }

      const formattedProducts = productList.map((item) => ({
        ...item,
        name: item.title,
        image: item.thumbnail,
        price: Math.round(item.price * 30),
      }));

      if (!cancelled) {
        setProducts(formattedProducts);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error.message || "Could not load products.");
        setProducts([]);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  fetchClothing();

  return () => {
    cancelled = true;
  };
}, [activeCategory]);



  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      (product.title || "").toLowerCase().includes(searchText) ||
      (product.category || "").toLowerCase().includes(searchText)
    );
  });

  const formatPrice = (price) =>
    "₹" + Number(price).toLocaleString("en-IN");

  function handleAddToCart(product) {
    addToCart(product);
  }

  return (
    <div className="eshop-page">
      {/* STICKY NAVIGATION */}
      <nav className="shop-navbar">
        

      </nav>

      <main>
        {/* FESTIVE HERO BANNER */}
       {/* DIWALI DHAMAKA HERO */}
<section className="diwali-hero">
  <div className="diwali-glow glow-one"></div>
  <div className="diwali-glow glow-two"></div>

  <div className="diwali-content">
    <div className="diwali-badge">
      🪔 THE GRAND DIWALI SALE 🪔
    </div>

    <h1>
      Diwali <span>Dhamaka!</span>
      <br />
      <span className="diwali-highlight">
        Light Up Your Style
      </span>
    </h1>

    <p className="diwali-description">
      Celebrate the festival of lights with stunning outfits,
      festive fashion, and fabulous finds for everyone.
    </p>

    <div className="diwali-offer">
      <span className="offer-sparkle">✨</span>
      <div>
        <strong>FESTIVE SPECIAL</strong>
        <p>Discover your festive favourites today!</p>
      </div>
    </div>

    <a href="#products" className="diwali-shop-btn">
      🛍️ Shop Diwali Collection <span>→</span>
    </a>

    <div className="diwali-trust">
      <span>🪔 Festive Fashion</span>
      <span>✨ Amazing Styles</span>
      <span>🎁 Gifts for Everyone</span>
    </div>
  </div>

  <div className="diwali-art" aria-hidden="true">
    <div className="diwali-sun"></div>
    <div className="diwali-ring ring-one"></div>
    <div className="diwali-ring ring-two"></div>

    <div className="hero-diya diya-large">🪔</div>
    <div className="hero-diya diya-small">🪔</div>

    <div className="hero-float float-one">✨</div>
    <div className="hero-float float-two">🌟</div>
    <div className="hero-float float-three">✨</div>

    <div className="diwali-art-caption">
      <span>CELEBRATE IN STYLE</span>
      <strong>Happy Diwali!</strong>
    </div>
  </div>
</section>
        {/* FASHION OFFERS SECTION */}
<section className="fashion-offers">
  <div className="offers-heading">
    <span className="offers-label">THE STYLE EDIT</span>
    <h2>Fresh Styles, Fresh Savings</h2>
    <p>Find your favourite fashion at exciting prices.</p>
  </div>

  <div className="offers-grid">
    <article className="offer-card offer-green">
      <img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
        alt="Women's fashion"
      />
      <div className="offer-content">
        <p>Women's Collection</p>
        <h3>UP TO 50% OFF</h3>
        <a href="#products">Shop Now →</a>
      </div>
    </article>

    <article className="offer-card offer-blue">
      <img
        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80"
        alt="Men's fashion"
      />
      <div className="offer-content">
        <p>Men's Collection</p>
        <h3>UP TO 40% OFF</h3>
        <a href="#products">Shop Now →</a>
      </div>
    </article>

    <article className="offer-card offer-mint">
      <img
        src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
        alt="Kids' fashion"
      />
      <div className="offer-content">
        <p>Kids' Collection</p>
        <h3>UP TO 30% OFF</h3>
        <a href="#products">Shop Now →</a>
      </div>
    </article>

    <article className="offer-card offer-blue">
      <img
        src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80"
        alt="Fashion accessories"
      />
      <div className="offer-content">
        <p>Fashion Accessories</p>
        <h3>UP TO 40% OFF</h3>
        <a href="#products">Shop Now →</a>
      </div>
    </article>

    <article className="offer-card offer-mint">
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
        alt="Casual fashion"
      />
      <div className="offer-content">
        <p>Casual Styles</p>
        <h3>UP TO 50% OFF</h3>
        <a href="#products">Shop Now →</a>
      </div>
    </article>

    <article className="offer-card offer-green">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
        alt="Women's seasonal fashion"
      />
      <div className="offer-content">
        <p>Seasonal Picks</p>
        <h3>UP TO 35% OFF</h3>
        <a href="#products">Shop Now →</a>
      </div>
    </article>
  </div>
</section>

        {/* SHOPPING BENEFITS */}
        <section className="benefits-row">
          <div>🚚 <span>Easy Shopping</span></div>
          <div>👗 <span>Fashion Finds</span></div>
          <div>💳 <span>Convenient Checkout</span></div>
          <div>🎁 <span>Festive Picks</span></div>
        </section>

        {/* CATEGORIES */}
        <section
          className="categories-section"
          id="categories"
        >
          <div className="section-heading">
            <p className="section-kicker">FIND YOUR STYLE</p>
            <h2>Shop by Category</h2>
            <p>Choose your favourite clothing collection.</p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <button
                type="button"
                key={category.name}
                className={`category-card ${
                  activeCategory === category.name
                    ? "category-active"
                    : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="category-icon">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>


        {/* CLOTHING PRODUCTS */}
        <section
          className="products-section"
          id="products"
        >
          <div className="products-heading">
            <div>
              <p className="section-kicker">YOUR NEXT FAVOURITE</p>
              <h2>{activeCategory}</h2>
              <p>Explore our latest fashion collection.</p>
            </div>

            <input
              type="search"
              className="product-search"
              placeholder="Search clothing..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search clothing products"
            />
          </div>

          {loading && (
            <p className="status-message">
              Loading your fashion collection...
            </p>
          )}

          {!loading && error && (
            <div className="status-message error-message">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => setActiveCategory("All Clothing")}
              >
                Try All Clothing Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-image-wrap">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="product-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="product-details">
                    <p className="product-category">
                      {(product.category || "").replace(/-/g, " ")}
                    </p>

                    <h3>{product.title}</h3>

                    <p className="product-rating">
                      ⭐ {product.rating ?? "New"}
                    </p>

                    <p className="product-price">
                      {formatPrice(product.price)}
                    </p>

                    <button
                      type="button"
                      className="add-cart-btn"
                      onClick={() => addToCart({
                        ...product,
                        product:product.price,})
                      }
                    >
                      + Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <p className="status-message">
                No matching clothing found. Try another search
                or category.
              </p>
            )}
        </section>

        {/* FASHION PROMOTION */}
        <section className="newsletter-section">
          <div>
            <h2>Stay in Style ✨</h2>
            <p>
              Discover new looks and explore our latest fashion
              collection.
            </p>
          </div>

          <a href="#products" className="newsletter-btn">
            Explore Fashion
          </a>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="shop-footer">
        <div className="footer-grid">
          <div>
            <h2>🛍️ E-Shop Mall</h2>
            <p>
              Find your style with our collection of clothing
              and footwear.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <a href="#categories">Categories</a>
            <a href="#products">Products</a>
          </div>

          <div>
            <h3>My Account</h3>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/cart">My Cart</Link>
          </div>

          <div>
            <h3>Customer Care</h3>
            <p>Help & Support</p>
            <p>Shipping Information</p>
            <p>Returns & Exchanges</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} E-Shop Mall. All rights
            reserved.
          </p>
                    <p>Created By <b>Lalita</b></p>

          <p>Made with ❤️ for fashion lovers.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;