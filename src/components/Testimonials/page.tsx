export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="page">
        <div className="section-header">
          <h4>Happy Customers</h4>
          <h2>What People Are Saying</h2>
        </div>

        <div className="card-container">

          <div className="card testimonial-card">
            <p>
              "The most beautiful bouquet I have ever received. Every single
              flower was fresh and the packaging was gorgeous!"
            </p>
            <h4>— Ayesha R.</h4>
            <span>★★★★★</span>
          </div>

          <div className="card testimonial-card">
            <p>
              "Ordered a custom bouquet for my sister's wedding. Florenza
              Bliss delivered beyond expectations. Highly recommend!"
            </p>
            <h4>— Sana M.</h4>
            <span>★★★★★</span>
          </div>

          <div className="card testimonial-card">
            <p>
              "Same-day delivery was a lifesaver for my mom's birthday
              surprise. Flowers were stunning and she loved them!"
            </p>
            <h4>— Hamza K.</h4>
            <span>★★★★★</span>
          </div>

        </div>
      </div>
    </section>
  );
}
