import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <span className="badge">✦ Handcrafted with Love</span>

      <h1>
        Where Every Bloom<br /><em>Tells a Story</em>
      </h1>

      <p>
        Discover fresh, thoughtfully arranged flowers for every moment — from
        quiet everyday joy to life's most beautiful celebrations.
      </p>

      <div className="hero-cta">
        <Link to="/shop"><button className="lg-button">Shop Now</button></Link>
        <Link to="/occasions"><button className="lg-button border-button">Browse Occasions</button></Link>
      </div>

      {/* Floating petal decorations */}
      <div className="petal-1">🌸</div>
      <div className="petal-2">🌷</div>
      <div className="petal-3">🌺</div>
      <div className="petal-4">🌹</div>
    </section>
  );
}
