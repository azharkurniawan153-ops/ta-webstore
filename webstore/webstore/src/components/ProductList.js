import { store } from "../core/Store.js";
import { formatPrice, renderStars, notify } from "../core/utils.js";

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-img-wrap">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        ${renderStars(product.rating)}
        <span class="rating-value">${product.rating}</span>
        <span class="rating-count">(${product.reviews})</span>
      </div>
      ${product.fastDelivery ? '<div class="delivery"><span class="delivery-icon">🚚</span> Fast Delivery</div>' : ""}
      <div class="product-footer">
        <span class="price">${formatPrice(product.price)}</span>
        <button class="btn-add" data-id="${product.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add
        </button>
      </div>
    </div>
  `;

  card.querySelector(".btn-add").addEventListener("click", (e) => {
    e.stopPropagation();
    const state = store.getState();
    const cart = [...state.cart];
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    store.setState({ cart });
    notify(`${product.name} added to cart!`);

    const btn = e.currentTarget;
    btn.classList.add("added");
    setTimeout(() => btn.classList.remove("added"), 600);
  });

  return card;
}

export function ProductList(container) {
  function render() {
    const { products, category, sortBy, searchQuery, isLoading } = store.getState();

    if (isLoading) {
      container.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
      return;
    }

    let filtered = [...products];

    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

    container.innerHTML = "";

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-state">
        <span>🔍</span>
        <p>No products found</p>
      </div>`;
      return;
    }

    filtered.forEach((p, i) => {
      const card = createProductCard(p);
      card.style.animationDelay = `${i * 60}ms`;
      container.appendChild(card);
    });
  }

  store.on("products", render);
  store.on("category", render);
  store.on("sortBy", render);
  store.on("searchQuery", render);
  store.on("isLoading", render);

  render();
}
