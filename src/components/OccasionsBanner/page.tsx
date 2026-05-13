import { Link } from 'react-router-dom';

export default function OccasionsBanner() {
  return (
    <section className="occasions-banner">
      <div className="page">
        <h4>Shop by Moment</h4>
        <h2>Perfect Flowers for Every Occasion</h2>
        <p>
          From birthdays to weddings, graduations to condolences — we have
          the perfect arrangement for every chapter of life.
        </p>

        <div className="occasions-btn-row">
          <Link to="/occasions"><button className="sm-button border-button">🎂 Birthday</button></Link>
          <Link to="/occasions"><button className="sm-button border-button">💍 Wedding</button></Link>
          <Link to="/occasions"><button className="sm-button border-button">❤️ Anniversary</button></Link>
          <Link to="/occasions"><button className="sm-button border-button">🕊️ Sympathy</button></Link>
          <Link to="/occasions"><button className="sm-button border-button">🎓 Graduation</button></Link>
        </div>
      </div>
    </section>
  );
}
