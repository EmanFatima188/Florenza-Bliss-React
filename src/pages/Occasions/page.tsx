import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

type Filter = 'all' | 'birthday' | 'wedding' | 'anniversary' | 'sympathy' | 'graduation' | 'newborn';

interface Props {
  addToCart: (name: string, price: number) => void;
  cartCount: number;
}

export default function Occasions({ addToCart, cartCount }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const visible = (section: Filter) => activeFilter === 'all' || activeFilter === section;

  return (
    <>
      <Navbar cartCount={cartCount} />

      {/* BANNER */}
      <div className="occasion-banner" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <h4>Shop by Moment</h4>
        <h1>Flowers for Every Occasion</h1>
        <p>Life is full of beautiful moments. We help you celebrate each one with the perfect bloom.</p>
      </div>

      <main className="page">

        {/* TAB STRIP */}
        <div className="tab-strip">
          {(['all', 'birthday', 'wedding', 'anniversary', 'sympathy', 'graduation', 'newborn'] as Filter[]).map((f) => (
            <button
              key={f}
              className={`tab-btn${activeFilter === f ? ' active-filter' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all'         && '🌸 All'}
              {f === 'birthday'    && '🎂 Birthday'}
              {f === 'wedding'     && '💍 Wedding'}
              {f === 'anniversary' && '❤️ Anniversary'}
              {f === 'sympathy'    && '🕊️ Sympathy'}
              {f === 'graduation'  && '🎓 Graduation'}
              {f === 'newborn'     && '👶 New Baby'}
            </button>
          ))}
        </div>

        {/* BIRTHDAY */}
        {visible('birthday') && (
          <div className="occasion-section" id="section-birthday">
            <div className="occasion-section-title"><span>🎂</span><h2>Birthday</h2></div>
            <div className="card-container">
              <div className="card occasion-card">
                <img src="/images/birthday-roses.jpg" alt="Birthday Roses" />
                <div className="card-inner">
                  <span className="badge">Top Pick</span>
                  <h3>Grand Birthday Bouquets</h3>
                  <p>Elegant, hand-tied arrangements for an unforgettable celebration.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 2,200</span>
                    <button className="sm-button" onClick={() => addToCart('Grand Birthday Bouquets', 2200)}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="card occasion-card">
                <img src="/images/birthday-tulips.jpg" alt="Tulip Tower" />
                <div className="card-inner">
                  <span className="badge">Cheerful</span>
                  <h3>Rainbow Tulip Tower</h3>
                  <p>A colourful mix of tulips in 5 shades — a joyful birthday surprise.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 1,800</span>
                    <button className="sm-button" onClick={() => addToCart('Rainbow Tulip Tower', 1800)}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="card occasion-card">
                <img src="/images/birthday-sunflower.jpg" alt="Sunshine Birthday" />
                <div className="card-inner">
                  <span className="badge cheerful-badge">Sunny</span>
                  <h3>Sunshine Birthday</h3>
                  <p>Big sunflowers with a handwritten birthday card included.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 1,400</span>
                    <button className="sm-button" onClick={() => addToCart('Sunshine Birthday', 1400)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WEDDING */}
        {visible('wedding') && (
          <div className="occasion-section" id="section-wedding">
            <div className="occasion-section-title"><span>💍</span><h2>Wedding</h2></div>
            <div className="card-container">
              <div className="card occasion-card">
                <img src="/images/wedding-bridal.jpg" alt="Bridal Bouquet" />
                <div className="card-inner">
                  <span className="badge">Bridal</span>
                  <h3>Ivory Rose Bridal</h3>
                  <p>Classic ivory roses and baby's breath in a cascading bridal style.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 5,500</span>
                    <button className="sm-button" onClick={() => addToCart('Ivory Rose Bridal', 5500)}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="card occasion-card">
                <img src="/images/wedding-centrepiece.jpg" alt="Table Centrepiece" />
                <div className="card-inner">
                  <span className="badge">Centrepiece</span>
                  <h3>Blush Table Centrepiece</h3>
                  <p>An overflowing blush arrangement perfect for wedding tables.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 4,200</span>
                    <button className="sm-button" onClick={() => addToCart('Blush Table Centrepiece', 4200)}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="card occasion-card">
                <img src="/images/wedding-arch.jpg" alt="Floral Arch" />
                <div className="card-inner">
                  <span className="badge custom-badge">Custom</span>
                  <h3>Ceremony Arch Blooms</h3>
                  <p>Custom floral arch decorations — contact us for a quote.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 12,000+</span>
                    <button className="sm-button border-button">Enquire</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANNIVERSARY */}
        {visible('anniversary') && (
          <div className="occasion-section" id="section-anniversary">
            <div className="occasion-section-title"><span>❤️</span><h2>Anniversary</h2></div>
            <div className="card-container">
              <div className="card occasion-card">
                <img src="/images/anniversary-red.jpg" alt="Red Rose Romance" />
                <div className="card-inner">
                  <span className="badge">Romantic</span>
                  <h3>Red Rose Romance</h3>
                  <p>24 deep red roses with a personalised card — love in full bloom.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 3,600</span>
                    <button className="sm-button" onClick={() => addToCart('Red Rose Romance', 3600)}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="card occasion-card">
                <img src="/images/anniversary-mixed.jpg" alt="Forever Bouquet" />
                <div className="card-inner">
                  <span className="badge">Forever</span>
                  <h3>Forever Bouquet</h3>
                  <p>Roses, lilies and peonies — a timeless mix for a timeless love.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 2,900</span>
                    <button className="sm-button" onClick={() => addToCart('Forever Bouquet', 2900)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SYMPATHY */}
        {visible('sympathy') && (
          <div className="occasion-section" id="section-sympathy">
            <div className="occasion-section-title"><span>🕊️</span><h2>Sympathy</h2></div>
            <div className="card-container">
              <div className="card occasion-card">
                <img src="/images/sympathy-white.jpg" alt="White Rose Bouquet" />
                <div className="card-inner">
                  <span className="badge gentle-badge">Gentle</span>
                  <h3>Soft Rose Tribute</h3>
                  <p>A calming arrangement of soft white roses paired with delicate greenery.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 3,000</span>
                    <button className="sm-button" onClick={() => addToCart('Soft Rose Tribute', 3000)}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="card occasion-card">
                <img src="/images/sympathy-lilies.jpg" alt="White Tulip Arrangement" />
                <div className="card-inner">
                  <span className="badge gentle-badge">Peaceful</span>
                  <h3>Peaceful Tulip Arrangement</h3>
                  <p>A soothing arrangement of white tulips expressing sympathy and remembrance.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 2,500</span>
                    <button className="sm-button" onClick={() => addToCart('Peaceful Tulip Arrangement', 2500)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GRADUATION */}
        {visible('graduation') && (
          <div className="occasion-section" id="section-graduation">
            <div className="occasion-section-title"><span>🎓</span><h2>Graduation</h2></div>
            <div className="card-container">
              <div className="card occasion-card">
                <img src="/images/grad-bouquet.jpg" alt="Grad Bouquet" />
                <div className="card-inner">
                  <span className="badge low-badge">Congrats!</span>
                  <h3>Graduate's Glory</h3>
                  <p>A bold mix of bright flowers to celebrate a huge achievement.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 2,000</span>
                    <button className="sm-button" onClick={() => addToCart("Graduate's Glory", 2000)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEW BABY */}
        {visible('newborn') && (
          <div className="occasion-section" id="section-newborn">
            <div className="occasion-section-title"><span>👶</span><h2>New Baby</h2></div>
            <div className="card-container">
              <div className="card occasion-card">
                <img src="/images/baby-pink.jpg" alt="Baby Girl Blooms" />
                <div className="card-inner">
                  <span className="badge">Baby Girl</span>
                  <h3>Baby Girl Blooms</h3>
                  <p>Soft pink roses and carnations to welcome a new little girl.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 1,900</span>
                    <button className="sm-button" onClick={() => addToCart('Baby Girl Blooms', 1900)}>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="card occasion-card">
                <img src="/images/baby-blue.jpg" alt="Baby Boy Bundle" />
                <div className="card-inner">
                  <span className="badge baby-boy-badge">Baby Boy</span>
                  <h3>Baby Boy Bundle</h3>
                  <p>Cool blue hydrangeas and white daisies for a newborn boy.</p>
                  <div className="card-price-row">
                    <span className="price">Rs. 1,900</span>
                    <button className="sm-button" onClick={() => addToCart('Baby Boy Bundle', 1900)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
