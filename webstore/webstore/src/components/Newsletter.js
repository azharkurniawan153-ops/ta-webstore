import { notify } from "../core/utils.js";

export function Newsletter(container) {
  container.innerHTML = `
    <div class="newsletter-inner">
      <div class="newsletter-text">
        <h2>Stay in the loop</h2>
        <p>Get the best deals, new arrivals, and exclusive offers straight to your inbox.</p>
      </div>
      <form class="newsletter-form" id="newsletter-form">
        <input type="email" placeholder="Enter your email address" required id="nl-email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  `;

  document.getElementById("newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("nl-email").value;
    if (email) {
      notify("🎉 You're subscribed! Check your inbox.");
      document.getElementById("nl-email").value = "";
    }
  });
}
