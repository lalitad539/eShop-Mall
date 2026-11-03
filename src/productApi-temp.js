const DUMMY_API = "https://dummyjson.com/products/category/tops";
const FAKE_API = "https://fakestoreapi.com/products/category/beauty";

// Map your E-Shop Mall categories to API endpoints
const categoryAPIs = {
  men: [
    `${DUMMY_API}mens-shirts`,
    `${FAKE_API}men's clothing`
  ],

  women: [
    `${DUMMY_API}womens-dresses`,
    `${FAKE_API}women's clothing`
  ],

  kids: [
    `${DUMMY_API}tops`
  ],

  beauty: [
    `${DUMMY_API}beauty`,
    `${DUMMY_API}skin-care`
  ],

  jewellery: [
    `${DUMMY_API}womens-jewellery`,
    `${FAKE_API}jewelery`
  ],

  electronics: [
    `${DUMMY_API}smartphones`,
    `${DUMMY_API}laptops`
  ],

  home: [
    `${DUMMY_API}furniture`,
    `${DUMMY_API}home-decoration`
  ],

  footwear: [
    `${DUMMY_API}mens-shoes`,
    `${DUMMY_API}womens-shoes`
  ]
};

// Convert different API responses into one format
const normalizeProduct = (product, source) => ({
  id: `${source}-${product.id}`,
  title: product.title,
  price: product.price,
  description: product.description || "",
  image: product.thumbnail || product.image,
  category: product.category,
  rating: product.rating?.rate || product.rating || 0,
  source
});

// Fetch products from multiple APIs
export const getProducts = async (category) => {
  const urls = categoryAPIs[category.toLowerCase()];

  if (!urls) {
    throw new Error("Category not found: " + category);
  }

  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    })
  );

  const products = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      const data = result.value;

      const items = Array.isArray(data)
        ? data
        : data.products || [];

      const source = urls[index].includes("dummyjson")
        ? "dummyjson"
        : "fakestore";

      products.push(
        ...items.map((item) =>
          normalizeProduct(item, source)
        )
      );
    } else {
      console.error("One product API failed:", result.reason);
    }
  });

  return products;
};