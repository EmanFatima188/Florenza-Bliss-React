import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';
import type { CartActions } from '../../App';

const COUPONS: Record<string, number> = {
  BLOOM10: 0.10,
  FLORENZA20: 0.20,
  SAVE15: 0.15,
};

const recommended = [
  { name: 'Classic Red Roses', price: 1800, image: '/images/rose-red.jpg' },
  { name: 'Lavender Bunch',    price: 900,  image: '/images/lavender.jpg' },
  { name: 'Blush Garden Mix',  price: 2400, image: '/images/blush-mix.jpg' },
];

export default function Cart({ cart, cartCount, addToCart, removeFromCart, updateQty, clearCart }: CartActions) {
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal     = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery     = subtotal >= 2500 ? 0 : 200;
  const discountAmt  = Math.round(subtotal * discount);
  const total        = subtotal - discountAmt + delivery;

  function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscount(COUPONS[code]);
      setCouponMsg(`✅ Coupon applied! ${COUPONS[code] * 100}% off`);
    } else {
      setDiscount(0);
      setCouponMsg('❌ Invalid coupon code.');
    }
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    clearCart();
    setCouponInput('');
    setDiscount(0);
    setCouponMsg('');
  }

  return (
    <>
      <Navbar cartCount={cartCount} />

      {/* BANNER */}
      <div className="page-banner" style={{ textAlign: 'center', padding: '40px 24px 0' }}>
        <h4>Your Selection</h4>
        <h1>Shopping Cart</h1>
        <p>Review your blooms before checkout.</p>
      </div>

      <main className="page">

        {/* ORDER PLACED SUCCESS */}
        {orderPlaced && (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px',
            background: 'var(--brand-third-color)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '32px',
            border: '1px solid var(--border-secondary-color)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌸</div>
            <h2>Order Placed Successfully!</h2>
            <p style={{ margin: '12px auto 28px', maxWidth: '400px' }}>
              Thank you for your order. Your beautiful blooms are on their way!
            </p>
            <button className="lg-button" onClick={() => { setOrderPlaced(false); navigate('/shop'); }}>
              Continue Shopping
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!orderPlaced && cart.length === 0 && (
          <div className="cart-empty" style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p style={{ margin: '12px auto 28px', maxWidth: '360px' }}>
              Looks like you haven't added any flowers yet. Explore our shop to find something beautiful!
            </p>
            <Link to="/shop"><button className="lg-button">Browse the Shop</button></Link>
          </div>
        )}

        {/* CART CONTENT */}
        {!orderPlaced && cart.length > 0 && (
          <div className="cart-layout">

            {/* LEFT: Cart Table */}
            <div className="cart-main">
              <div className="table-container">
                <table style={{ minWidth: '480px', maxWidth: '100%' }}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.name}>
                        <td className="cart-item-name"><strong>{item.name}</strong></td>
                        <td>Rs. {item.price.toLocaleString()}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              className="tiny-button border-button"
                              onClick={() => updateQty(item.name, item.qty - 1)}
                              aria-label="Decrease quantity"
                            >−</button>
                            <span>{item.qty}</span>
                            <button
                              className="tiny-button"
                              onClick={() => updateQty(item.name, item.qty + 1)}
                              aria-label="Increase quantity"
                            >+</button>
                          </div>
                        </td>
                        <td className="cart-item-subtotal">
                          Rs. {(item.price * item.qty).toLocaleString()}
                        </td>
                        <td>
                          <button
                            className="tiny-button border-button"
                            onClick={() => removeFromCart(item.name)}
                            aria-label={`Remove ${item.name}`}
                          >✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coupon row */}
              <div className="coupon-row">
                <input
                  type="text"
                  id="coupon-input"
                  placeholder="Coupon code (e.g. BLOOM10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                <button className="border-button sm-button" onClick={handleApplyCoupon}>
                  Apply Coupon
                </button>
                <button className="sm-button btn-clear-cart" onClick={clearCart}>
                  🗑 Clear Cart
                </button>
              </div>
              {couponMsg && (
                <p style={{ marginTop: '8px', fontSize: '0.88rem', color: couponMsg.startsWith('✅') ? 'var(--brand-accent-color)' : '#c0392b' }}>
                  {couponMsg}
                </p>
              )}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{delivery === 0 ? 'Free 🎉' : `Rs. ${delivery}`}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row" style={{ color: 'var(--brand-accent-color)' }}>
                  <span>Discount ({discount * 100}%)</span>
                  <span>− Rs. {discountAmt.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-row total-row">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              <p className="delivery-note">Free delivery on orders above Rs. 2,500</p>

              <button className="lg-button btn-checkout" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <Link to="/shop">
                <button className="border-button btn-continue">
                  ← Continue Shopping
                </button>
              </Link>

              <div className="payment-methods">
                <span className="payment-badge">💳 Card</span>
                <span className="payment-badge">📱 JazzCash</span>
                <span className="payment-badge">🏦 EasyPaisa</span>
                <span className="payment-badge">💵 COD</span>
              </div>
            </div>

          </div>
        )}

        {/* RECOMMENDED */}
        <section className="recommended-section">
          <div className="section-header">
            <h4>You Might Also Like</h4>
            <h2>More Fresh Blooms</h2>
          </div>
          <div className="card-container">
            {recommended.map((r) => (
              <div className="card" key={r.name}>
                <img src={r.image} alt={r.name} />
                <div className="rec-card-body">
                  <h3>{r.name}</h3>
                  <div className="rec-card-price-row">
                    <span className="price">Rs. {r.price.toLocaleString()}</span>
                    <button
                      className="tiny-button"
                      onClick={() => addToCart(r.name, r.price)}
                    >
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
