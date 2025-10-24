// Socket.IO connection
const socket = io();

// Generate or retrieve user ID
let userId = localStorage.getItem('userId');
if (!userId) {
    userId = 'user-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
}

// State management
let cart = [];
let products = [];
let orders = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeSocketListeners();
    loadProducts();
    updateCartDisplay();
});

// Socket event listeners
function initializeSocketListeners() {
    socket.on('connect', () => {
        console.log('Connected to server');
        updateConnectionStatus(true);
        socket.emit('register-user', userId);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        updateConnectionStatus(false);
    });

    socket.on('products-update', (updatedProducts) => {
        console.log('Products updated:', updatedProducts);
        products = updatedProducts;
        renderProducts();
    });

    socket.on('cart-updated', (updatedCart) => {
        cart = updatedCart;
        updateCartDisplay();
    });

    socket.on('order-placed', (order) => {
        console.log('Order placed:', order);
        orders.unshift(order);
        cart = [];
        updateCartDisplay();
        renderOrders();
    });

    socket.on('order-status-update', (update) => {
        console.log('Order status update:', update);
        const order = orders.find(o => o.id === update.orderId);
        if (order) {
            order.status = update.status;
            order.updatedAt = update.updatedAt;
            renderOrders();
        }
    });

    socket.on('notification', (notification) => {
        showNotification(notification.message, notification.type);
    });
}

// Update connection status indicator
function updateConnectionStatus(connected) {
    const statusDot = document.getElementById('connectionStatus');
    const statusText = document.getElementById('statusText');
    
    if (connected) {
        statusDot.classList.add('connected');
        statusDot.classList.remove('disconnected');
        statusText.textContent = 'Connected';
    } else {
        statusDot.classList.add('disconnected');
        statusDot.classList.remove('connected');
        statusText.textContent = 'Disconnected';
    }
}

// Load products
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Failed to load products', 'error');
    }
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p class="empty-cart">No products available</p>';
        return;
    }

    grid.innerHTML = products.map(product => {
        const stockStatus = getStockStatus(product.stock);
        return `
            <div class="product-card">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-stock ${stockStatus.class}">
                    ${stockStatus.text}
                </div>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="changeQuantity('${product.id}', -1)" 
                            ${product.stock === 0 ? 'disabled' : ''}>-</button>
                    <input type="number" class="quantity-input" id="qty-${product.id}" 
                           value="1" min="1" max="${product.stock}" 
                           ${product.stock === 0 ? 'disabled' : ''}>
                    <button class="quantity-btn" onclick="changeQuantity('${product.id}', 1)"
                            ${product.stock === 0 ? 'disabled' : ''}>+</button>
                </div>
                <button class="add-to-cart-btn" 
                        onclick="addToCart('${product.id}')"
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        `;
    }).join('');
}

// Get stock status
function getStockStatus(stock) {
    if (stock === 0) {
        return { class: 'stock-out', text: '❌ Out of Stock' };
    } else if (stock < 5) {
        return { class: 'stock-low', text: `⚠️ Only ${stock} left!` };
    } else if (stock < 15) {
        return { class: 'stock-medium', text: `📦 ${stock} in stock` };
    } else {
        return { class: 'stock-high', text: `✅ ${stock} in stock` };
    }
}

// Change quantity
function changeQuantity(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(input.value);
    const newValue = currentValue + delta;
    const product = products.find(p => p.id === productId);
    
    if (newValue >= 1 && newValue <= product.stock) {
        input.value = newValue;
    }
}

// Add to cart
function addToCart(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyInput.value);
    
    socket.emit('add-to-cart', {
        userId: userId,
        productId: productId,
        quantity: quantity
    });
    
    // Reset quantity input
    qtyInput.value = 1;
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        checkoutBtn.disabled = true;
    } else {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">
                        Qty: ${item.quantity} × $${item.price.toFixed(2)}
                    </div>
                </div>
                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
    }
}

// Toggle cart
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('show');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    socket.emit('place-order', {
        userId: userId,
        cartItems: cart
    });
    
    toggleCart();
}

// Load and render orders
async function loadOrders() {
    try {
        const response = await fetch(`/api/orders/${userId}`);
        orders = await response.json();
        renderOrders();
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Render orders
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="no-orders">No orders yet</p>';
        return;
    }

    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">Order #${order.id.substring(0, 8)}</span>
                <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <span>Total:</span>
                <span>$${order.total.toFixed(2)}</span>
            </div>
            <div class="order-date">
                Placed on ${new Date(order.createdAt).toLocaleString()}
                ${order.updatedAt ? `<br>Updated: ${new Date(order.updatedAt).toLocaleString()}` : ''}
            </div>
        </div>
    `).join('');
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationsContainer = document.getElementById('notifications');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${getNotificationIcon(type)}</span>
        <span>${message}</span>
    `;
    
    notificationsContainer.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            notificationsContainer.removeChild(notification);
        }, 300);
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return '✅';
        case 'error':
            return '❌';
        case 'info':
            return 'ℹ️';
        default:
            return '📢';
    }
}

// Load orders on page load
loadOrders();
