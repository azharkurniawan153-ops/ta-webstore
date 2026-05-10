import { store } from "../core/Store.js";
import { formatPrice, notify } from "../core/utils.js";

export function Cart() {
  const overlay = document.getElementById("cart-overlay");
  const panel = document.getElementById("cart-panel");
  const countEl = document.getElementById("cart-count");

  function updateCount() {
    const { cart } = store.getState();
    const total = cart.reduce((s, i) => s + i.qty, 0);
    countEl.textContent = total;
    countEl.style.display = total > 0 ? "flex" : "none";
  }

  function renderCart() {
    const { cart } = store.getState();
    const body = document.getElementById("cart-body");
    const footer = document.getElementById("cart-footer");

    if (cart.length === 0) {
      body.innerHTML = `<div class="cart-empty">
        <span>🛒</span>
        <p>Your cart is empty</p>
      </div>`;
      footer.innerHTML = "";
      return;
    }

    body.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn minus" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">✕</button>
      </div>
    `
      )
      .join("");

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    footer.innerHTML = `
      <div class="cart-subtotal">
        <span>Subtotal</span>
        <strong>${formatPrice(subtotal)}</strong>
      </div>
      <button class="btn-checkout" onclick="alert('Proceeding to checkout!')">Checkout</button>
    `;

    body.querySelectorAll(".qty-btn.plus").forEach((btn) => {
      btn.addEventListener("click", () => changeQty(+btn.dataset.id, 1));
    });
    body.querySelectorAll(".qty-btn.minus").forEach((btn) => {
      btn.addEventListener("click", () => changeQty(+btn.dataset.id, -1));
    });
    body.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", () => removeItem(+btn.dataset.id));
    });
  }

  function changeQty(id, delta) {
    const cart = store.getState().cart.map((i) => {
      if (i.id === id) return { ...i, qty: Math.max(1, i.qty + delta) };
      return i;
    });
    store.setState({ cart });
  }

  function removeItem(id) {
    const cart = store.getState().cart.filter((i) => i.id !== id);
    store.setState({ cart });
    notify("Item removed from cart", "error");
  }

  function open() {
    store.setState({ isCartOpen: true });
    overlay.classList.add("active");
    panel.classList.add("active");
    renderCart();
  }

  function close() {
    store.setState({ isCartOpen: false });
    overlay.classList.remove("active");
    panel.classList.remove("active");
  }

  document.getElementById("cart-btn").addEventListener("click", open);
  overlay.addEventListener("click", close);
  document.getElementById("cart-close").addEventListener("click", close);

  store.on("cart", () => {
    updateCount();
    const { isCartOpen } = store.getState();
    if (isCartOpen) renderCart();
  });

  updateCount();
}
