// Product Page - handles product interactions and add to cart
document.addEventListener('DOMContentLoaded', () => {
  const cartManager = window.cartManager;
  
  // Get product data from page
  const productTitle = document.querySelector('.product-title')?.textContent || '';
  const productPriceEl = document.querySelector('.product-price-large')?.textContent || '$0';
  const productPrice = parseFloat(productPriceEl.replace('$', ''));
  const productSlug = window.location.pathname.split('/').pop();
  const mainImage = document.getElementById('mainImage');
  
  // State
  let selectedColor = null;
  let selectedSize = null;
  let currentImage = mainImage?.src || '';

  // Initialize
  function init() {
    setupImageGallery();
    setupColorSelection();
    setupSizeSelection();
    setupAddToCart();
    cartManager.updateCartCount();
  }

  // Image Gallery
  function setupImageGallery() {
    const thumbnails = document.querySelectorAll('.thumb');
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const imageUrl = thumb.dataset.image;
        if (mainImage && imageUrl) {
          mainImage.src = imageUrl;
          currentImage = imageUrl;
          
          // Update active state
          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        }
      });
    });

    // Set first thumbnail as active
    if (thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
    }
  }

  // Color Selection
  function setupColorSelection() {
    const colorSwatches = document.querySelectorAll('#colorOptions .color-swatch');
    
    // Set first color as selected by default
    if (colorSwatches.length > 0) {
      selectedColor = colorSwatches[0].dataset.color || 'Default';
      const firstImage = colorSwatches[0].dataset.image;
      if (firstImage && mainImage) {
        mainImage.src = firstImage;
        currentImage = firstImage;
      }
    }
    
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        // Remove active class from all
        colorSwatches.forEach(s => s.classList.remove('active'));
        
        // Add active to clicked
        swatch.classList.add('active');
        
        // Update selected color
        selectedColor = swatch.dataset.color;
        
        // Update main image if color has an image
        const colorImage = swatch.dataset.image;
        if (colorImage && mainImage) {
          mainImage.src = colorImage;
          currentImage = colorImage;
        }
      });
    });
  }

  // Size Selection
  function setupSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        sizeButtons.forEach(b => b.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        
        // Update selected size
        selectedSize = btn.dataset.size;
      });
    });
  }

  // Add to Cart
  function setupAddToCart() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const qtySelect = document.getElementById('qty');
    const miniCart = document.getElementById('miniCart');
    
    if (!addToCartBtn) return;
    
    addToCartBtn.addEventListener('click', () => {
      // Validation
      if (!selectedSize) {
        alert('Please select a size');
        return;
      }
      
      if (!selectedColor) {
        alert('Please select a color');
        return;
      }
      
      // Get quantity
      const quantity = parseInt(qtySelect?.value || '1');
      
      // Create product object
      const product = {
        slug: productSlug,
        name: productTitle,
        price: productPrice,
        images: [currentImage]
      };
      
      // Add to cart
      cartManager.addItem(product, selectedColor, selectedSize, quantity);
      
      // Show mini cart
      if (miniCart) {
        miniCart.hidden = false;
        
        // Hide after 3 seconds
        setTimeout(() => {
          miniCart.hidden = true;
        }, 3000);
      }
      
      // Optional: Add visual feedback
      addToCartBtn.textContent = 'Added!';
      setTimeout(() => {
        addToCartBtn.textContent = 'Add to Cart';
      }, 1500);
    });
  }

  // Initialize everything
  init();
});