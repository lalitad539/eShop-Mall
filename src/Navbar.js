import React, { useState, useEffect } from "react";

import "./Navbar.css";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import { useCart } from "./CartContext";
import KidsDropdown from "./kidsdropdown";


function Navbar({ onCategoryClick }) {

    // Existing dropdown states
    const [showWomen, setShowWomen] = useState(false);
    const [showmen, setShowmen] = useState(false);
    const [showKids, setShowKids] = useState(false);

    // Cart
    const { cartCount } = useCart();

    // Individual customer profile
    const [user, setUser] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();


    // FETCH LOGGED-IN CUSTOMER DETAILS
    useEffect(() => {

        const fetchUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setUser(null);
                setProfileLoading(false);
                return;
            }

            try {

                const response = await fetch(
                    "https://eshop-mall.onrender.com/api/auth/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to fetch profile"
                    );
                }

                setUser(data.user);

            } catch (error) {

                console.error("Customer profile error:", error);
                setUser(null);

            } finally {

                setProfileLoading(false);

            }

        };

        fetchUser();

    }, [location.pathname]);


    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");

        setUser(null);

        navigate("/login");

    };


    // KIDS CATEGORY
    const handleKidsCategory = (category) => {

        console.log("Selected Kids Category:", category);

        setShowKids(false);

    };


    // WOMEN CATEGORIES
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


    // MEN CATEGORIES
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
        }

    ];


    return (

        <nav className="navbar">

            {/* LOGO */}
            <div className="logo">

                <Link to="/" className="navbar-logo">
                    🛍️ E-Shop Mall
                </Link>

            </div>


            {/* NAVIGATION LINKS */}
            <div className="nav-links">

                <Link to="/" className="nav-link">
                    HOME
                </Link>


                {/* KIDS DROPDOWN */}
                <div
                    className="nav-kids"
                    onMouseEnter={() => setShowKids(true)}
                    onMouseLeave={() => setShowKids(false)}
                >

                    <button
                        onClick={() => setShowKids(!showKids)}
                        className="kids-nav-button"
                    >
                        KIDS
                    </button>

                    {showKids && (

                        <KidsDropdown
                            onCategoryClick={handleKidsCategory}
                        />

                    )}

                </div>


                {/* WOMEN DROPDOWN */}
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

                                <div
                                    className="mega-column"
                                    key={index}
                                >

                                    <h4>{category.heading}</h4>

                                    {category.items.map((item, i) => (

                                        <p key={i}>{item}</p>

                                    ))}

                                    {category.secondHeading && (

                                        <>

                                            <h4>
                                                {category.secondHeading}
                                            </h4>

                                            {category.secondItems.map(
                                                (item, i) => (

                                                    <p key={i}>{item}</p>

                                                )
                                            )}

                                        </>

                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* MEN DROPDOWN */}
                <div
                    className="men-menu"
                    onMouseEnter={() => setShowmen(true)}
                    onMouseLeave={() => setShowmen(false)}
                >

                    <button
                        className="men-button"
                        onClick={() => {
                            onCategoryClick?.("men");
                        }}
                    >
                        MEN
                    </button>

                    {showmen && (

                        <div className="mega-dropdown">

                            {menCategories.map((category, index) => (

                                <div
                                    className="men-category"
                                    key={index}
                                >

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

                    )}

                </div>


                {/* OTHER CATEGORIES */}
                <Link to="/home-living">
                    HOME & LIVING
                </Link>

                <Link to="/beauty">
                    BEAUTY
                </Link>

                <Link to="/electronics">
                    ELECTRONICS
                </Link>

                <Link to="/jewellery">
                    JEWELLERY
                </Link>

            </div>


            {/* SEARCH BOX */}
            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search for products..."
                />

            </div>


            {/* CUSTOMER ACCOUNT AND CART */}
            <div className="nav-actions">

                {profileLoading ? (

                    <span>Loading...</span>

                ) : user ? (

                    <>

                        <Link
                            to="/profile"
                            className="profile-link"
                        >
                            👤 {user.name}
                        </Link>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </>

                ) : (

                    <>

                        <Link to="/login">
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="register-btn"
                        >
                            Register
                        </Link>

                    </>

                )}


                {/* CART */}
                <Link
                    to="/cart"
                    className="cart-link"
                >
                    🛒 Cart ({cartCount})
                </Link>

            </div>

        </nav>

    );

}


export default Navbar;