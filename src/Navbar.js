import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import KidsDropdown from "./kidsdropdown";
// import { Category } from "@mui/icons-material";


const menuItems = [
  { name: "HOME", path: "/" },
  { name: "KIDS", path: "/category/kids" },
  { name: "WOMEN", path: "/category/women" },
  { name: "MEN", path: "/category/men" },
  { name: "HOME & LIVING", path: "/category/home-living" },
  { name: "BEAUTY", path: "/category/beauty" },
  { name: "ELECTRONICS", path: "/category/electronics" },
  { name: "JEWELLERY", path: "/category/jewellery" },
];

function Navbar({onCategoryClick}) {
    const [showWomen, setShowWomen] = useState(false);
    const [showmen, setShowmen] = useState(false);

    const { cartCount } = useCart();

    const [showKids, setshowKids] = useState(false);

    const handleKidsCategory = (category) => {
        console.log("Selected Kids Category:",category);
        setshowKids(false);

    };

    const womenCategories = [
        {
            heading: "Indian & Fusion Wear",
            items: [
                "Kurtas & Suits",
                "Kurtis & Tunics",
                "Sarees",
                "Ethnic Wear",
                "Leggings & Pants",
                "Skirts & Palazzos",
                "Dress Materials",
                "Lehenga Cholis"
            ]
        },
        {
            heading: "Western Wear",
            items: [
                "Dresses",
                "Tops",
                "Tshirts",
                "Jeans",
                "Trousers",
                "Shorts & Skirts",
                "Jumpsuits",
                "Jackets & Coats"
            ]
        },
        {
            heading: "Footwear",
            items: [
                "Flats",
                "Casual Shoes",
                "Heels",
                "Boots",
                "Sports Shoes"
            ],
            secondHeading: "Sports & Active Wear",
            secondItems: [
                "Sports Clothing",
                "Sports Footwear",
                "Sports Accessories"
            ]
        },
        {
            heading: "Beauty & Personal Care",
            items: [
                "Makeup",
                "Skincare",
                "Premium Beauty",
                "Lipsticks",
                "Fragrances"
            ],
            secondHeading: "Jewellery",
            secondItems: [
                "Fashion Jewellery",
                "Fine Jewellery",
                "Earrings",
                "Necklaces"
            ]
        },
        {
            heading: "Accessories",
            items: [
                "Watches",
                "Sunglasses",
                "Handbags",
                "Backpacks",
                "Wallets",
                "Belts"
            ]
        }
    ];
        
        

const menCategories = [
  {
    title: "Topwear",
    items: [
      "T-Shirts",
      "Casual Shirts",
      "Formal Shirts",
      "Sweatshirts",
      "Sweaters",
      "Jackets",
      "Blazers & Coats",
      "Suits",
      "Rain Jackets"
    ]
  },
  {
    title: "Indian & Festive Wear",
    items: [
      "Kurtas & Kurta Sets",
      "Sherwanis",
      "Nehru Jackets",
      "Dhotis"
    ]
  },
  {
    title: "Bottomwear",
    items: [
      "Jeans",
      "Casual Trousers",
      "Formal Trousers",
      "Shorts",
      "Track Pants & Joggers"
    ]
  },
  {
    title: "Innerwear & Sleepwear",
    items: [
      "Briefs & Trunks",
      "Boxers",
      "Vests",
      "Sleepwear & Loungewear",
      "Thermals"
    ]
  },
  {
    title: "Footwear",
    items: [
      "Casual Shoes",
      "Sports Shoes",
      "Formal Shoes",
      "Sneakers",
      "Sandals & Floaters",
      "Flip Flops",
      "Socks"
    ]
  },
];


    

    return (
        <nav className="navbar">

            <div className="logo">
              <Link to="/" className="navbar-logo"> 🛍️ E-Shop Mall</Link>
            </div>

            <div className="nav-links">

                <Link to="/" className="nav-link">HOME</Link>


<div className="nav-kids"
        onMouseEnter={() => setshowKids(true)}
        onMouseLeave={() => setshowKids(false)}
      >
        <button
          onClick={() => setshowKids(!showKids)}
          className="kids-nav-button">
        
          KIDS
        </button>

        {showKids && (
          <KidsDropdown
            onCategoryClick={handleKidsCategory}
          />
        )}
      </div>

                <div
                    className="women-menu"
                    onMouseEnter={() => setShowWomen(true)}
                    onMouseLeave={() => setShowWomen(false)}
                >

                    <button
                        className="women-button"
                        onClick={() => setShowWomen(!showWomen)}
                    >
                        WOMEN
                    </button>

                    {showWomen && (
                        <div className="mega-dropdown">

                            {womenCategories.map((category, index) => (
                                <div className="mega-column" key={index}>

                                    <h4>{category.heading}</h4>

                                    {category.items.map((item, i) => (
                                        <p key={i}>{item}</p>
                                    ))}

                                    {category.secondHeading && (
                                        <>
                                            <h4>{category.secondHeading}</h4>

                                            {category.secondItems.map((item, i) => (
                                                <p key={i}>{item}</p>
                                            ))}
                                        </>
                                    )}

                                </div>
                            ))}

                        </div>
                    )}
                    </div>


                    <div
                        className="men-menu"
                        onMouseEnter={() => setShowmen(true)}
                        onMouseLeave={() => setShowmen(false)}
                    >

                        <button
                            className="men-button"
                            onClick={() => onCategoryClick("men")}
                        >
                            MEN
                        </button>

                        {showmen && (
                            <div className="mega-dropdown">

                               {menCategories.map((category, index) => (
  <div className="men-category" key={index}>

    <h4 className="men-category-title">
      {category.title}
    </h4>

    {category.items.map((item, i) => (
      <Link to="#" key={i}>
        {item}
      </Link>
    ))}

  </div>
))}

                            </div>
                        
                        )
                    }
                    </div>

                    <Link to="/home-living">HOME & LIVING</Link>
                    <Link to="/beauty">BEAUTY</Link>
                    <Link to="/electronics">ELECTRONICS</Link>
                    <Link to="/jewellery">JEWELLERY</Link>

                </div>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search for products..."
                    />
                </div>

                <div className="nav-actions">
                    <Link to="/login">Login</Link>
                    <Link to="/register" className="register-btn">
                        Register
                    </Link>
                    <Link to="/cart" className="cart-link">
                        🛒 Cart ({cartCount})
                    </Link>
                </div>


        </nav>
    );

}

export default Navbar;
