import { Link } from 'react-router-dom';

interface Props {
  addToCart: (name: string, price: number) => void;
}

const featured = [
  { name: 'Classic Rose Bouquet', price: 1800, image: '/images/rose-bouquet.jpg', alt: 'Classic Rose Bouquet', badge: 'Bestseller',  badgeClass: '',         desc: '12 velvety red roses wrapped in soft tissue and satin ribbon.' },
  { name: 'Blush Garden Mix',     price: 2400, image: '/images/blush-mix.jpg',    alt: 'Blush Mix',           badge: 'New Arrival',  badgeClass: 'new-badge', desc: 'A dreamy blend of peonies, ranunculus and soft pink lisianthus.' },
  { name: 'Sunflower Bundle',     price: 1200, image: '/images/sunflower.jpg',    alt: 'Sunflower Bundle',    badge: 'Cheerful Pick', badgeClass: '',         desc: 'Bright sunflowers tied with jute twine — pure happiness delivered.' },
  { name: 'White Lily Elegance',  price: 2100, image: '/images/white-lilies.jpg', alt: 'White Lily Elegance', badge: 'Elegant',       badgeClass: '',         desc: 'Six pristine white lilies — timeless grace for every occasion.' },
];

export default function FeaturedProducts({ addToCart }: Props) {
  return (
    <section className="page">
      <div className="section-header">
        <h4>Our Collection</h4>
        <h2>Featured Blooms</h2>
        <p>Handpicked arrangements crafted to express what words cannot.</p>
      </div>

      <div className="card-container">
        {featured.map((item) => (
          <div className="card" key={item.name}>
            <img src={item.image} alt={item.alt} />
            <div className="card-body-pad">
              <span className={`badge${item.badgeClass ? ` ${item.badgeClass}` : ''}`}>{item.badge}</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="card-price-row">
                <span className="price">Rs. {item.price.toLocaleString()}</span>
                <button
                  className="sm-button"
                  onClick={() => addToCart(item.name, item.price)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-shop-row">
        <Link to="/shop"><button className="border-button">View Full Shop</button></Link>
      </div>
    </section>
  );
}
