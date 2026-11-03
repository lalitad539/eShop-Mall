import React from "react";
import "./kidsdropdown.css";

const kidsCategories = [
  {
    title: "Boys Clothing",
    items: [
      "T-Shirts",
      "Shirts",
      "Shorts",
      "Jeans",
      "Trousers",
      "Clothing Sets",
      "Ethnic Wear",
      "Track Pants & Pyjamas",
      "Jackets & Sweatshirts",
      "Party Wear",
      "Innerwear",
      "Nightwear",
    ],
  },
  {
    title: "Girls Clothing",
    items: [
      "Dresses",
      "Tops",
      "T-Shirts",
      "Clothing Sets",
      "Lehenga Choli",
      "Kurta Sets",
      "Party Wear",
      "Dungarees & Jumpsuits",
      "Skirts & Shorts",
      "Tights & Leggings",
      "Jeans & Trousers",
      "Jackets & Sweatshirts",
    ],
  },
  {
    title: "Footwear",
    items: [
      "Casual Shoes",
      "Sports Shoes",
      "School Shoes",
      "Sandals",
      "Flats",
      "Flipflops",
      "Boots",
      "Socks",
    ],
  },
  {
    title: "Infants",
    items: [
      "Bodysuits",
      "Rompers & Sleepsuits",
      "Clothing Sets",
      "T-Shirts & Tops",
      "Dresses",
      "Bottom Wear",
      "Winter Wear",
      "Innerwear",
      "Baby Care",
    ],
  },
  {
    title: "Toys & Games",
    items: [
      "Learning & Development",
      "Activity Toys",
      "Soft Toys",
      "Action Figures",
      "Educational Toys",
      "Board Games",
    ],
  },
  {
    title: "Kids Accessories",
    items: [
      "School Bags",
      "Backpacks",
      "Watches",
      "Hair Accessories",
      "Sunglasses",
      "Caps & Hats",
      "Jewellery",
    ],
  },
];

const KidsDropdown = ({ onCategoryClick }) => {
  return (
    <div className="kids-mega-menu">
      {kidsCategories.map((category, index) => (
        <div className="kids-menu-column" key={index}>
          <h4>{category.title}</h4>

          {category.items.map((item, i) => (
            <button
              className="kids-menu-item"
              key={i}
              onClick={() => onCategoryClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KidsDropdown;