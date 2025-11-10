// Cart Manager - handles all cart operations
class CartManager {
  constructor() {
    this.storageKey = 'tualmi_cart';
  }

  getCart() {
    try {
      const cart = localStorage.getItem(this.storageKey);
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      console.error('Error reading cart:', e);
      return [];
    }
  }

  saveCart(cart) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
      this.updateCartCount();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  addItem(product, color, size, quantity) {
    const cart = this.getCart();
    
    // Check if item already exists
    const existingIndex = cart.findIndex(
      item => item.slug === product.slug && 
              item.color === color && 
              item.size === size
    );

    if (existingIndex > -1) {
      // Update quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: color,
        size: size,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    return cart;
  }

  removeItem(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    return cart;
  }

  updateQuantity(index, quantity) {
    const cart = this.getCart();
    if (quantity <= 0) {
      return this.removeItem(index);
    }
    cart[index].quantity = quantity;
    this.saveCart(cart);
    return cart;
  }

  clearCart() {
    this.saveCart([]);
  }

  getTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartCount() {
    // Update cart count in nav if element exists
    const countEl = document.getElementById('cartCount');
    if (countEl) {
      const count = this.getItemCount();
      countEl.textContent = count;
      countEl.style.display = count > 0 ? 'inline' : 'none';
    }
  }
}

// Make globally available
window.cartManager = new CartManager();