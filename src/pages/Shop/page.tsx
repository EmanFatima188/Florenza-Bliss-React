import { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

type Category = 'all' | 'roses' | 'bouquets' | 'seasonal' | 'exotic' | 'plants';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

interface Product {
  name: string;
  category: Exclude<Category, 'all'>;
  price: number;
  image: string;
  alt: string;
  badge: string;
  badgeClass?: string;
  description: string;
}

interface Props {
  addToCart: (name: string, price: number) => void;
  cartCount: number;
}

const products: Product[] = [
  { name: 'Classic Red Roses',    category: 'roses',    price: 1800, image: '/images/rose-red.jpg',         alt: 'Classic Red Roses',    badge: 'Bestseller',      description: "12 premium red roses with baby's breath, wrapped in silk paper." },
  { name: 'Blush Garden Mix',     category: 'bouquets', price: 2400, image: '/images/blush-mix.jpg',        alt: 'Blush Garden Mix',     badge: 'New',             badgeClass: 'new-badge',      description: 'Peonies, ranunculus and lisianthus in a dreamy blush palette.' },
  { name: 'Sunflower Bundle',     category: 'seasonal', price: 1200, image: '/images/sunflower.jpg',        alt: 'Sunflower Bundle',     badge: 'Seasonal',        badgeClass: 'seasonal-badge', description: 'Bright sunflowers tied with jute twine — pure happiness.' },
  { name: 'White Lily Elegance',  category: 'bouquets', price: 2100, image: '/images/white-lilies.jpg',     alt: 'White Lily Elegance',  badge: 'Elegant',         description: 'Six pristine white lilies — timeless grace for every occasion.' },
  { name: 'Pink Tulip Dream',     category: 'roses',    price: 1600, image: '/images/tulip-pink.jpg',       alt: 'Pink Tulip Dream',     badge: 'Fan Favourite',   description: '15 soft pink tulips arranged in a classic round bouquet.' },
  { name: 'Orchid Luxe',          category: 'exotic',   price: 3200, image: '/images/orchid.jpg',           alt: 'Orchid Luxe',          badge: 'Exotic',          badgeClass: 'exotic-badge',   description: 'Rare purple orchids arranged in a modern architectural style.' },
  { name: 'Lavender Bunch',       category: 'seasonal', price: 900,  image: '/images/lavender.jpg',         alt: 'Lavender Bunch',       badge: 'Aromatic',        badgeClass: 'aromatic-badge', description: 'Fragrant lavender stems — calming, beautiful, and long-lasting.' },
  { name: 'Succulent Garden Box', category: 'plants',   price: 2800, image: '/images/succulent.jpg',        alt: 'Succulent Garden Box', badge: 'Low Maintenance', badgeClass: 'low-badge',      description: '6 assorted succulents in a rustic wooden box — a lasting gift.' },
  { name: 'Carnation Cascade',    category: 'bouquets', price: 1400, image: '/images/carnation.jpg',        alt: 'Carnation Cascade',    badge: 'Budget Pick',     description: '20 mixed carnations in a lush, overflowing hand-tied style.' },
  { name: 'Bird of Paradise',     category: 'exotic',   price: 3800, image: '/images/bird-of-paradise.jpg', alt: 'Bird of Paradise',     badge: 'Exotic',          badgeClass: 'sun-badge',      description: 'Dramatic tropical stems — a bold statement for any space.' },
  { name: 'Peace Lily Plant',     category: 'plants',   price: 1500, image: '/images/peace-lily.jpg',       alt: 'Peace Lily Plant',     badge: 'Air Purifying',   badgeClass: 'air-badge',      description: 'A graceful indoor plant with elegant white spathes.' },
  { name: 'Yellow Daisy Charm',   category: 'seasonal', price: 800,  image: '/images/daisy.jpg',            alt: 'Yellow Daisy Charm',   badge: 'Cheerful',        badgeClass: 'cheerful-badge', description: 'A cheerful bunch of golden daisies that brighten any room.' },
];

export default function Shop({ addToCart, cartCount }: Props) {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = activeFilter === 'all' || p.category === activeFilter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === 'price-asc')       list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeFilter, search, sort]);

  return (
    <>
      <Navbar cartCount={cartCount} />

      {/* PAGE BANNER */}
      <div className="page-banner" style={{ textAlign: 'center', padding: '48px 24px 0' }}>
        <h4>Browse Everything</h4>
        <h1>Our Flower Shop</h1>
        <p>Fresh blooms, handcrafted bouquets, and seasonal arrangements — all in one place.</p>
      </div>

      <main className="page">

        {/* FILTER BAR */}
        <div className="filter-bar">
          {(['all', 'roses', 'bouquets', 'seasonal', 'exotic', 'plants'] as Category[]).map((f) => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' active-filter' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <div className="search-wrap">
            <input
              type="text"
              id="search-input"
              placeholder="Search flowers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TOPBAR */}
        <div className="shop-topbar">
          <p id="product-count">Showing {filtered.length} products</p>
          <div className="sort-row">
            <label htmlFor="sort-select" className="sort-label">Sort by</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="card-container" id="product-grid">
          {filtered.map((p) => (
            <div className="card" key={p.name}>
              <img src={p.image} alt={p.alt} />
              <div className="card-body">
                <span className={`badge${p.badgeClass ? ` ${p.badgeClass}` : ''}`}>{p.badge}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="card-price-row">
                  <span className="price">Rs. {p.price.toLocaleString()}</span>
                  <button
                    className="sm-button"
                    onClick={() => addToCart(p.name, p.price)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="empty-state" id="empty-state">
            <div className="empty-state-icon">🌸</div>
            <h3>No flowers found</h3>
            <p>Try a different search or filter.</p>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
