import { productApi } from "./src/api/productApi.js";
import { store } from "./src/core/Store.js";
import { debounce } from "./src/core/utils.js";
import { ProductList } from "./src/components/ProductList.js";
import { Cart } from "./src/components/Cart.js";
import { Newsletter } from "./src/components/Newsletter.js";

async function init() {
  ProductList(document.getElementById("product-grid"));
  Cart();
  Newsletter(document.getElementById("newsletter-section"));

  const products = await productApi.getAll();
  store.setState({ products, isLoading: false });

  const categories = await productApi.getCategories();
  const filterBar = document.getElementById("filter-bar");
  filterBar.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-btn${cat === "All" ? " active" : ""}" data-cat="${cat}">${cat}</button>`
    )
    .join("");

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    store.setState({ category: btn.dataset.cat });
    updateBreadcrumb(btn.dataset.cat);
  });

  document.getElementById("sort-select").addEventListener("change", (e) => {
    store.setState({ sortBy: e.target.value });
  });

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", debounce((e) => {
    store.setState({ searchQuery: e.target.value });
  }, 250));

  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("main-nav").classList.toggle("open");
  });
}

function updateBreadcrumb(category) {
  const crumb = document.getElementById("breadcrumb-category");
  crumb.textContent = category === "All" ? "All Products" : category;
  document.getElementById("page-title").textContent = category === "All" ? "All Products" : category;
}

document.addEventListener("DOMContentLoaded", init);
