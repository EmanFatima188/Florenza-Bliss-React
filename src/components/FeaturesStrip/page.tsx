export default function FeaturesStrip() {
  return (
    <section className="features-strip">
      <div className="features-strip-inner">

        <div className="feature-item">
          <span className="feature-item-icon">🚚</span>
          <div>
            <h4>Free Delivery</h4>
            <p>Orders above Rs. 2,500</p>
          </div>
        </div>

        <div className="feature-item">
          <span className="feature-item-icon">🌿</span>
          <div>
            <h4>Farm Fresh</h4>
            <p>Sourced daily for freshness</p>
          </div>
        </div>

        <div className="feature-item">
          <span className="feature-item-icon">🎀</span>
          <div>
            <h4>Custom Bouquets</h4>
            <p>Personalised just for you</p>
          </div>
        </div>

        <div className="feature-item">
          <span className="feature-item-icon">💳</span>
          <div>
            <h4>Secure Payment</h4>
            <p>Safe &amp; easy checkout</p>
          </div>
        </div>

      </div>
    </section>
  );
}
