const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store
let products = [
  { id: '1', name: 'Laptop', price: 999.99, stock: 10, category: 'Electronics' },
  { id: '2', name: 'Smartphone', price: 699.99, stock: 15, category: 'Electronics' },
  { id: '3', name: 'Headphones', price: 149.99, stock: 25, category: 'Audio' },
  { id: '4', name: 'Keyboard', price: 79.99, stock: 30, category: 'Accessories' },
  { id: '5', name: 'Mouse', price: 49.99, stock: 40, category: 'Accessories' }
];

let orders = [];
let carts = new Map();

// Real-time connection management
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  connectedUsers.set(socket.id, { socketId: socket.id, connectedAt: new Date() });

  // Send current products to new connection
  socket.emit('products-update', products);

  // Join user-specific room for personalized notifications
  socket.on('register-user', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  // Handle cart updates
  socket.on('add-to-cart', (data) => {
    // Input validation
    if (!data || !data.userId || !data.productId || typeof data.quantity !== 'number') {
      socket.emit('notification', {
        type: 'error',
        message: 'Invalid request data'
      });
      return;
    }
    
    const { userId, productId, quantity } = data;
    
    // Validate quantity
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      socket.emit('notification', {
        type: 'error',
        message: 'Invalid quantity'
      });
      return;
    }
    
    const product = products.find(p => p.id === productId);
    
    if (product && product.stock >= quantity) {
      if (!carts.has(userId)) {
        carts.set(userId, []);
      }
      const cart = carts.get(userId);
      const existingItem = cart.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ productId, quantity, name: product.name, price: product.price });
      }
      
      socket.emit('cart-updated', cart);
      socket.emit('notification', {
        type: 'success',
        message: `${product.name} added to cart`
      });
    } else {
      socket.emit('notification', {
        type: 'error',
        message: 'Insufficient stock'
      });
    }
  });

  // Handle order placement
  socket.on('place-order', (data) => {
    // Input validation
    if (!data || !data.userId || !Array.isArray(data.cartItems) || data.cartItems.length === 0) {
      socket.emit('notification', {
        type: 'error',
        message: 'Invalid order data'
      });
      return;
    }
    
    const { userId, cartItems } = data;
    const orderId = uuidv4();
    
    // Validate stock and create order (atomic operation simulation)
    let isValid = true;
    const orderItems = [];
    
    for (const item of cartItems) {
      if (!item.productId || typeof item.quantity !== 'number' || item.quantity <= 0) {
        isValid = false;
        socket.emit('notification', {
          type: 'error',
          message: 'Invalid item in cart'
        });
        break;
      }
      
      const product = products.find(p => p.id === item.productId);
      if (!product || product.stock < item.quantity) {
        isValid = false;
        socket.emit('notification', {
          type: 'error',
          message: `Insufficient stock for ${item.name || 'product'}`
        });
        break;
      }
      orderItems.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
    }
    
    if (isValid) {
      // Update stock (in a real app, this would be a database transaction)
      for (const item of cartItems) {
        const product = products.find(p => p.id === item.productId);
        product.stock -= item.quantity;
      }
      
      // Create order
      const order = {
        id: orderId,
        userId,
        items: orderItems,
        status: 'pending',
        createdAt: new Date(),
        total: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      
      orders.push(order);
      carts.delete(userId);
      
      // Notify user
      socket.emit('order-placed', order);
      socket.emit('notification', {
        type: 'success',
        message: `Order ${orderId} placed successfully`
      });
      
      // Broadcast stock update to all clients
      io.emit('products-update', products);
      
      // Simulate order status updates
      setTimeout(() => updateOrderStatus(orderId, 'processing'), 2000);
      setTimeout(() => updateOrderStatus(orderId, 'shipped'), 5000);
      setTimeout(() => updateOrderStatus(orderId, 'delivered'), 8000);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    connectedUsers.delete(socket.id);
  });
});

// Function to update order status in real-time
function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    order.updatedAt = new Date();
    
    // Notify specific user about their order update
    io.to(`user-${order.userId}`).emit('order-status-update', {
      orderId: order.id,
      status: newStatus,
      updatedAt: order.updatedAt
    });
    
    io.to(`user-${order.userId}`).emit('notification', {
      type: 'info',
      message: `Order ${orderId} status updated to: ${newStatus}`
    });
  }
}

// REST API Endpoints

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Get user orders
app.get('/api/orders/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.json(userOrders);
});

// Get specific order
app.get('/api/orders/:userId/:orderId', (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId && o.userId === req.params.userId);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Admin endpoint to update product stock (for demonstration)
// NOTE: In production, this should require authentication and authorization
app.post('/api/admin/products/:id/stock', (req, res) => {
  const { stock } = req.body;
  const product = products.find(p => p.id === req.params.id);
  
  // Input validation
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
    return res.status(400).json({ error: 'Invalid stock value. Must be a non-negative integer.' });
  }
  
  product.stock = stock;
  // Broadcast stock update to all connected clients
  io.emit('products-update', products);
  io.emit('notification', {
    type: 'info',
    message: `Stock updated for ${product.name}`
  });
  res.json(product);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    connectedUsers: connectedUsers.size,
    products: products.length,
    orders: orders.length
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Real-time E-commerce server running on port ${PORT}`);
  console.log(`📊 Access the app at http://localhost:${PORT}`);
});

module.exports = { app, server, io };
