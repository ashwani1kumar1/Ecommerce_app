import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HEADPHONE_PLACEHOLDER } from '../lib/imageOverrides';

const bestSellerProducts = [
  {
    id: 'rockerz-650',
    name: 'boAt Rockerz 650',
    price: 149,
    image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495',
    link: '/product/rockerz-650',
    badge: 'New Launch'
  },
  {
    id: 'rockerz-412',
    name: 'boAt Rockerz 412',
    price: 119,
    image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/412.png?v=1752740230',
    link: '/product/rockerz-412',
    badge: 'Limited Edition'
  },
  {
    id: 'rockerz-naruto',
    name: 'boAt x Naruto Edition',
    price: 199,
    image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_x_Naruto_psb-min.png?v=1751366366',
    link: '/product/rockerz-naruto',
    badge: 'Collab Drop'
  },
  {
    id: 'lunar-480',
    name: 'boAt Lunar 480',
    price: 169,
    image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/LR_480.png?v=1733741345',
    link: '/product/lunar-480',
    badge: 'Bestseller'
  },
  {
    id: 'immortal-400',
    name: 'boAt Immortal 400',
    price: 139,
    image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/IM_400.gif?v=1691387449',
    link: '/product/immortal-400',
    badge: 'Pro Gaming'
  }
];
import { AiOutlineStar, AiFillStar, AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsLightning, BsStars, BsEye } from 'react-icons/bs';
import { HiSparkles } from 'react-icons/hi';

const TopPicks = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const topProducts = [
    {
      id: 1,
  name: 'boAt Rockerz 650',
      category: 'Wireless Headphones',
      price: 129,
      oldPrice: 199,
      rating: 4.5,
      reviews: 2847,
      image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495',
      fallbackImage: HEADPHONE_PLACEHOLDER,
      badge: 'Best Seller',
      features: ['40H Playtime', 'Bluetooth 5.0', 'Dual Mode']
    },
    {
      id: 2,
  name: 'boAt Rockerz 412',
  category: 'On-Ear Headphones',
      price: 89,
      oldPrice: 149,
      rating: 4.3,
      reviews: 1923,
      image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/412.png?v=1752740230',
      fallbackImage: HEADPHONE_PLACEHOLDER,
      badge: 'Hot Deal',
      features: ['IPX5', 'Touch Controls', 'Voice Assistant']
    },
    {
      id: 3,
      name: 'boAt Nirvana Ion ANC',
      category: 'ANC Headphones',
      price: 179,
      oldPrice: 299,
      rating: 4.7,
      reviews: 3201,
      image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_x_Naruto_psb-min.png?v=1751366366',
      fallbackImage: HEADPHONE_PLACEHOLDER,
      badge: 'Premium',
      features: ['32dB ANC', 'Spatial Audio', 'ASAP Charge']
    },
    {
      id: 4,
  name: 'boAt Lunar Rider 480',
  category: 'Over-Ear Headphones',
      price: 169,
      oldPrice: 239,
      rating: 4.6,
      reviews: 2114,
      image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/LR_480.png?v=1733741345',
      fallbackImage: HEADPHONE_PLACEHOLDER,
      badge: 'Trending',
      features: ['50mm Drivers', 'Dual Pairing', 'AUX Mode']
    },
    {
      id: 5,
      name: 'boAt Immortal 400',
      category: 'Gaming Headset',
      price: 139,
      oldPrice: 189,
      rating: 4.4,
      reviews: 1875,
      image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/IM_400.gif?v=1691387449',
      fallbackImage: HEADPHONE_PLACEHOLDER,
      badge: 'Pro Gaming',
      features: ['RGB Lights', 'Low Latency', 'Dual Mic']
    }
  ];

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="star-icon" />);
    }
    if (hasHalfStar) {
      stars.push(<AiFillStar key="half" className="star-icon half" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} className="star-icon empty" />);
    }
    return stars;
  };

  // Local-first products list
  const products = topProducts;

  return (
    <div className="top-picks-section modern-picks">
      {/* Animated Background Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="top-picks-header modern-header">
        <div className="header-content">
          <div className="badge-container">
            <span className="header-badge modern-badge">
              <HiSparkles className="sparkle-icon" />
              <span className="badge-text">Limited Time Offers</span>
              <div className="badge-glow"></div>
            </span>
          </div>
          <h2 className="section-title modern-title">
            <span className="title-word">Top</span>
            <span className="title-word">Picks</span>
            <span className="title-word">For</span>
            <span className="title-word">You</span>
            <BsStars className="title-icon" />
          </h2>
          <p className="section-subtitle modern-subtitle">
            Handpicked premium audio gear at unbeatable prices
          </p>
        </div>
      </div>

      <div className="top-picks-grid modern-grid">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`top-pick-card modern-card ${hoveredCard === product.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(product.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ '--card-index': index }}
          >
            {/* Animated Border Gradient */}
            <div className="card-border-gradient"></div>
            
            {/* Shine Effect */}
            <div className="card-shine"></div>

            {/* Badge with Modern Design */}
            <div className={`product-badge modern-badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
              <BsLightning className="badge-icon" />
              <span>{product.badge}</span>
            </div>

            {/* Wishlist Button with Animation */}
            <button 
              className={`wishlist-btn-pick modern-wishlist ${wishlist.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
            >
              {wishlist.includes(product.id) ? (
                <AiFillHeart className="heart-icon filled" />
              ) : (
                <AiOutlineHeart className="heart-icon" />
              )}
              <div className="wishlist-ripple"></div>
            </button>

            {/* Image Container with Modern Effects */}
            <div className="product-image-container modern-image-container">
              <div className="image-glow"></div>
              <Image
                src={product.image}
                alt={product.name}
                className="product-image-pick modern-image"
                width={500}
                height={500}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (product.fallbackImage && target.getAttribute('src') !== product.fallbackImage) {
                    target.setAttribute('src', product.fallbackImage);
                  }
                }}
              />
              <div className="image-overlay modern-overlay">
                <div className="overlay-content">
                  <Link href={`/product/demo-${product.id}`}>
                    <button className="quick-view-btn modern-quick-view">
                      <BsEye className="eye-icon" />
                      <span>Quick View</span>
                      <div className="btn-glow"></div>
                    </button>
                  </Link>
                </div>
              </div>
              {/* Particle Effects */}
              <div className="image-particles">
                <span className="particle"></span>
                <span className="particle"></span>
                <span className="particle"></span>
              </div>
            </div>

            {/* Product Info with Modern Styling */}
            <div className="product-info-pick modern-info">
              <span className="product-category modern-category">
                <span className="category-dot"></span>
                {product.category}
              </span>
              <h3 className="product-name-pick modern-name">{product.name}</h3>

              {/* Features with Glassmorphism */}
              <div className="product-features modern-features">
                {product.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag modern-tag">
                    <span className="tag-shine"></span>
                    {feature}
                  </span>
                ))}
              </div>

              {/* Rating with Animation */}
              <div className="product-rating modern-rating">
                <div className="stars modern-stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text modern-rating-text">
                  <strong>{product.rating}</strong>
                  <span className="reviews-count">({product.reviews.toLocaleString()} reviews)</span>
                </span>
              </div>

              {/* Price with Modern Design */}
              <div className="product-price-section modern-price-section">
                <div className="price-group modern-price-group">
                  <span className="current-price modern-current-price">
                    <span className="currency">$</span>
                    <span className="amount">{product.price}</span>
                  </span>
                  <span className="old-price-pick modern-old-price">${product.oldPrice}</span>
                </div>
                <div className="discount-badge-pick modern-discount">
                  <BsLightning className="discount-icon" />
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </div>
              </div>

              {/* Action Button with Modern Effects */}
              <button className="add-to-cart-btn-pick modern-cart-btn">
                <span className="btn-content">
                  <AiOutlineShoppingCart className="cart-icon" />
                  <span className="btn-text">Add to Cart</span>
                </span>
                <span className="btn-hover-effect"></span>
                <span className="btn-shine"></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="best-sellers-strip">
        <div className="strip-header">
          <span className="strip-badge">🔥 Best Sellers</span>
          <h3>Trending On boAt</h3>
          <p>Limited-run drops with bold aesthetics and immersive sound.</p>
        </div>
        <div className="strip-marquee" role="list">
          <div className="marquee-track">
            {[...bestSellerProducts, ...bestSellerProducts].map((item, idx) => (
              <Link href={item.link} className="strip-card" key={`${item.id}-${idx}`} role="listitem">
                <div className="strip-card-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={260}
                    height={160}
                    sizes="(max-width: 600px) 80vw, 260px"
                    priority={idx < bestSellerProducts.length}
                    className="strip-image"
                  />
                  <span className="strip-card-badge">{item.badge}</span>
                </div>
                <div className="strip-card-info">
                  <h4>{item.name}</h4>
                  <span className="strip-card-price">${item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* View All Button with Modern Design */}
      <div className="view-all-section modern-view-all">
        <Link href="/products">
          <button className="view-all-btn modern-view-btn">
            <span className="btn-bg"></span>
            <span className="btn-content">
              <span className="btn-text">Explore All Products</span>
              <HiSparkles className="btn-sparkle" />
            </span>
            <span className="btn-glow-ring"></span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopPicks;
