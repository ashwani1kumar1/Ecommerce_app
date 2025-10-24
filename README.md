# 🛒 Real-Time E-Commerce Application

A modern, real-time e-commerce application built with Node.js, Express, and Socket.IO. Features live inventory updates, real-time order tracking, and instant notifications.

## ✨ Features

### Real-Time Capabilities
- **Live Inventory Updates**: Stock levels update automatically across all connected clients
- **Real-Time Order Tracking**: Watch your order status change from pending → processing → shipped → delivered
- **Instant Notifications**: Get immediate feedback on all actions
- **WebSocket Connection**: Persistent connection for seamless real-time communication

### E-Commerce Features
- **Product Catalog**: Browse products with detailed information
- **Shopping Cart**: Add/remove items with real-time updates
- **Order Management**: Track all your orders with live status updates
- **Stock Management**: Visual indicators for stock levels (high, medium, low, out of stock)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ashwani1kumar1/Ecommerce_app.git
cd Ecommerce_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

## 🏗️ Architecture

### Backend (server.js)
- **Express Server**: REST API endpoints
- **Socket.IO**: Real-time WebSocket communication
- **In-Memory Storage**: Products, carts, and orders (easily upgradable to database)

### Frontend (public/)
- **index.html**: Main application structure
- **app.js**: Client-side logic and Socket.IO integration
- **styles.css**: Responsive, modern UI design

## 📡 Real-Time Events

### Client → Server
- `register-user`: Register user for personalized notifications
- `add-to-cart`: Add product to cart
- `place-order`: Place a new order

### Server → Client
- `products-update`: Broadcast product/inventory changes
- `cart-updated`: Update user's cart
- `order-placed`: Confirm order placement
- `order-status-update`: Real-time order status changes
- `notification`: Push notifications

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/admin/products/:id/stock` - Update product stock (admin)

### Orders
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/orders/:userId/:orderId` - Get specific order

### System
- `GET /api/health` - Health check and system status

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Live Status Indicator**: Shows connection status
- **Real-Time Notifications**: Toast notifications for all actions
- **Animated UI**: Smooth transitions and animations
- **Stock Indicators**: Color-coded stock levels
- **Order Status Tracking**: Visual status badges

## 🔧 Configuration

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Real-Time**: Socket.IO
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Icons**: Emoji (no external dependencies)

## 🔄 Real-Time Flow

1. **User connects** → Socket.IO establishes WebSocket connection
2. **User adds item** → Server validates stock → Broadcasts to user
3. **User places order** → Server processes → Updates stock → Broadcasts to all clients
4. **Order status updates** → Server simulates progression → Pushes updates to user
5. **Stock changes** → All connected clients receive instant updates

## 🌟 Demo Workflow

1. Open the app in multiple browser windows/tabs
2. Add items to cart in one window
3. Place an order
4. Watch real-time order status updates (pending → processing → shipped → delivered)
5. In another window, observe inventory updates happening in real-time
6. Try purchasing items to see stock decrease across all clients

## 🔐 Security Notes

This is a demonstration application. For production use, consider:
- Authentication and authorization
- Rate limiting
- Input validation and sanitization
- Database integration
- Payment gateway integration
- HTTPS/SSL
- Environment variable management

## 📝 Future Enhancements

- [ ] User authentication
- [ ] Product search and filters
- [ ] Payment integration
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics and reporting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Created as a demonstration of real-time web application development.