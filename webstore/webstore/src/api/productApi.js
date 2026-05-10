const PRODUCTS = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 150,
    originalPrice: 158,
    rating: 4.8,
    reviews: 230,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80",
    badge: "Up to 5% off",
    fastDelivery: true,
  },
  {
    id: 2,
    name: "Gaming Mouse",
    category: "Electronics",
    price: 80,
    originalPrice: 88,
    rating: 4.6,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    badge: "Up to 9% off",
    fastDelivery: true,
  },
  {
    id: 3,
    name: '4K Monitor 24"',
    category: "Electronics",
    price: 300,
    originalPrice: 324,
    rating: 4.9,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    badge: "Up to 8% off",
    fastDelivery: true,
  },
  {
    id: 4,
    name: "Premium Coffee Beans",
    category: "Food",
    price: 25,
    originalPrice: 33,
    rating: 4.7,
    reviews: 500,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
    badge: "Up to 25% off",
    fastDelivery: true,
  },
  {
    id: 5,
    name: "Modern Sofa",
    category: "Furniture",
    price: 899,
    originalPrice: 999,
    rating: 4.5,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    badge: "Up to 10% off",
    fastDelivery: false,
  },
  {
    id: 6,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 120,
    originalPrice: 150,
    rating: 4.8,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    badge: "Up to 20% off",
    fastDelivery: true,
  },
  {
    id: 7,
    name: "Smart Watch",
    category: "Electronics",
    price: 250,
    originalPrice: 299,
    rating: 4.6,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    badge: "Up to 16% off",
    fastDelivery: true,
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 65,
    originalPrice: 79,
    rating: 4.4,
    reviews: 175,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    badge: "Up to 18% off",
    fastDelivery: true,
  },
];

export const productApi = {
  getAll() {
    return Promise.resolve([...PRODUCTS]);
  },
  getByCategory(category) {
    if (!category || category === "All") return this.getAll();
    return Promise.resolve(PRODUCTS.filter((p) => p.category === category));
  },
  getCategories() {
    const cats = [...new Set(PRODUCTS.map((p) => p.category))];
    return Promise.resolve(["All", ...cats]);
  },
  search(query) {
    const q = query.toLowerCase();
    return Promise.resolve(PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)));
  },
};
