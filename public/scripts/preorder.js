// public/scripts/preorder.js

document.addEventListener("DOMContentLoaded", () => {
  // ===== IMAGE GALLERY =====
  const mainImage = document.getElementById("mainImage");
  const thumbs = document.querySelectorAll(".thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newImg = thumb.dataset.image;
      if (newImg && mainImage) {
        mainImage.src = newImg;
      }

      // active state
      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // ===== COLOR SELECTION =====
  const colorSwatches = document.querySelectorAll(".color-swatch");
  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const newImg = swatch.dataset.image;
      if (mainImage && newImg) {
        mainImage.src = newImg;
      }
      colorSwatches.forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");
    });
  });

  // ===== SIZE SELECTION =====
  const sizeButtons = document.querySelectorAll(".size-btn");
  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ===== PREORDER POPUP =====
  const preorderBtn = document.getElementById("preorderBtn");
  const modal = document.getElementById("preorderModal");
  const closeModal = document.getElementById("closeModal");
  const form = document.getElementById("preorderForm");
  const successMsg = document.getElementById("successMsg");

  if (preorderBtn) {
    preorderBtn.addEventListener("click", () => {
      modal.hidden = false;
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.hidden = true;
      successMsg.hidden = true;
      form.hidden = false;
      form.reset();
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("preorderEmail").value;
      console.log("Preorder email:", email);

      form.hidden = true;
      successMsg.hidden = false;

      // Optional: send data to your backend or newsletter service
      // fetch('/api/preorder', { method: 'POST', body: JSON.stringify({ email }) })
    });
  }
});
