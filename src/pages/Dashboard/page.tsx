import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

interface StockItem {
  id: number;
  name: string;
  category: string;
  qty: number;
  price: number;
}

const defaultStock: StockItem[] = [
  { id: 1, name: 'Classic Red Roses', category: 'Roses', qty: 45, price: 1800 },
  { id: 2, name: 'Blush Garden Mix', category: 'Bouquets', qty: 30, price: 2400 },
  { id: 3, name: 'Sunflower Bundle', category: 'Seasonal', qty: 60, price: 1200 },
  { id: 4, name: 'White Lily Elegance', category: 'Bouquets', qty: 8, price: 2100 },
  { id: 5, name: 'Orchid Luxe', category: 'Exotic', qty: 0, price: 3200 },
  { id: 6, name: 'Lavender Bunch', category: 'Seasonal', qty: 5, price: 900 },
  { id: 7, name: 'Succulent Garden Box', category: 'Plants', qty: 20, price: 2800 },
  { id: 8, name: 'Peace Lily Plant', category: 'Plants', qty: 0, price: 1500 },
];

function getStatus(qty: number) {
  if (qty === 0) return { label: 'Out of Stock', cls: 'status-out' };
  if (qty <= 10) return { label: 'Low Stock', cls: 'status-low' };
  return { label: 'In Stock', cls: 'status-in' };
}

export default function Dashboard({ cartCount }: { cartCount: number }) {
  const [stock, setStock] = useState<StockItem[]>(defaultStock);
  const [search, setSearch] = useState('');
  const [insertModal, setInsertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const [editSearchModal, setEditSearchModal] = useState(false);
  const [editSearchId, setEditSearchId] = useState('');
  const [editSearchError, setEditSearchError] = useState('');
  const [editItem, setEditItem] = useState<StockItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<StockItem | null>(null);

  // Insert form state
  const [insName, setInsName] = useState('');
  const [insCat, setInsCat] = useState('');
  const [insQty, setInsQty] = useState('');
  const [insPrice, setInsPrice] = useState('');

  const filtered = stock.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = stock.length;
  const inStock = stock.filter((s) => s.qty > 10).length;
  const lowStock = stock.filter((s) => s.qty > 0 && s.qty <= 10).length;
  const outOfStock = stock.filter((s) => s.qty === 0).length;
  const totalUnits = stock.reduce((a, s) => a + s.qty, 0);
  const totalValue = stock.reduce((a, s) => a + s.qty * s.price, 0);

  function handleInsert(e: React.FormEvent) {
    e.preventDefault();
    const newItem: StockItem = {
      id: stock.length ? Math.max(...stock.map((s) => s.id)) + 1 : 1,
      name: insName,
      category: insCat,
      qty: Number(insQty),
      price: Number(insPrice),
    };
    setStock([...stock, newItem]);
    setInsName(''); setInsCat(''); setInsQty(''); setInsPrice('');
    setInsertModal(false);
  }

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem) return;
    setStock(stock.map((s) => (s.id === editItem.id ? editItem : s)));
    setEditModal(false);
    setEditItem(null);
  }

  function handleDelete() {
    if (!deleteItem) return;
    setStock(stock.filter((s) => s.id !== deleteItem.id));
    setDeleteModal(false);
    setDeleteItem(null);
  }

  function handleClearAll() {
    setStock([]);
    setDeleteAllModal(false);
  }

  function handleExport() {
    const rows = ['ID,Name,Category,Qty,Price', ...stock.map((s) => `${s.id},${s.name},${s.category},${s.qty},${s.price}`)];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'stock.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Navbar cartCount={cartCount} />

      <div className="dash-layout">

        {/* SIDEBAR */}
        <aside className="dash-sidebar">
          <div className="dash-sidebar-logo">
            Florenza Bliss
            <span>Admin Dashboard</span>
          </div>

          <div className="dash-nav-group">
            <p className="dash-nav-label">Overview</p>
            <a href="#section-overview" className="dash-nav-link active"><span className="dash-nav-icon">📊</span> Overview</a>
            <a href="#section-stock" className="dash-nav-link"><span className="dash-nav-icon">🌸</span> Stock Manager</a>
            <a href="#section-orders" className="dash-nav-link"><span className="dash-nav-icon">📦</span> Recent Orders</a>
            <a href="#section-charts" className="dash-nav-link"><span className="dash-nav-icon">📈</span> Analytics</a>
          </div>

          <div className="dash-nav-group">
            <p className="dash-nav-label">Stock Actions</p>
            <a href="#" className="dash-nav-link" onClick={(e) => { e.preventDefault(); setInsertModal(true); }}><span className="dash-nav-icon">➕</span> Add New Stock</a>
            <a href="#" className="dash-nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('stock-search')?.focus(); }}><span className="dash-nav-icon">🔍</span> Search Stock</a>
            <a href="#" className="dash-nav-link" onClick={(e) => { e.preventDefault(); handleExport(); }}><span className="dash-nav-icon">📤</span> Export CSV</a>
          </div>

          <div className="dash-nav-group">
            <p className="dash-nav-label">Store</p>
            <a href="/shop" className="dash-nav-link"><span className="dash-nav-icon">🛍️</span> View Shop</a>
            <a href="/occasions" className="dash-nav-link"><span className="dash-nav-icon">🎀</span> Occasions</a>
            <a href="/cart" className="dash-nav-link"><span className="dash-nav-icon">🛒</span> Cart</a>
            <a href="/" className="dash-nav-link"><span className="dash-nav-icon">🏠</span> Home</a>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dash-main">

          {/* TOP BAR */}
          <div className="dash-topbar" id="section-overview">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back, Admin. Here is what is happening today.</p>
            </div>
            <span className="dash-date">{new Date().toDateString()}</span>
          </div>

          {/* QUICK LINKS */}
          <div className="dash-quick-links">
            <a href="#" className="dash-quick-link" onClick={(e) => { e.preventDefault(); setInsertModal(true); }}>➕ Add Stock</a>
            <a href="#" className="dash-quick-link" onClick={(e) => { e.preventDefault(); setDeleteAllModal(true); }}>🧹 Clear All</a>
            <a href="#" className="dash-quick-link" onClick={(e) => { e.preventDefault(); handleExport(); }}>📤 Export CSV</a>
            <a href="#" className="dash-quick-link" onClick={(e) => { e.preventDefault(); setStock(defaultStock); }}>🔄 Reset to Default</a>
            <a href="/shop" className="dash-quick-link">👁️ View Shop</a>
            <a href="/cart" className="dash-quick-link">🛒 View Cart</a>
            <a href="/occasions" className="dash-quick-link">🎀 Occasions</a>
            <a href="/login" className="dash-quick-link">🔐 Login Page</a>
          </div>

          {/* KPI STAT CARDS */}
          <div className="dash-stats">
            <div className="dash-stat-card">
              <div className="dash-stat-icon pink">🌸</div>
              <div className="dash-stat-info">
                <h3 id="stat-total">{totalProducts}</h3>
                <p>Total Products</p>
                <span className="dash-stat-trend up">↑ All items</span>
              </div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon green">✅</div>
              <div className="dash-stat-info">
                <h3 id="stat-instock">{inStock}</h3>
                <p>In Stock</p>
                <span className="dash-stat-trend up">↑ Available</span>
              </div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon amber">⚠️</div>
              <div className="dash-stat-info">
                <h3 id="stat-low">{lowStock}</h3>
                <p>Low Stock</p>
                <span className="dash-stat-trend down">↓ Needs restock</span>
              </div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon rose">❌</div>
              <div className="dash-stat-info">
                <h3 id="stat-out">{outOfStock}</h3>
                <p>Out of Stock</p>
                <span className="dash-stat-trend down">↓ Unavailable</span>
              </div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon blue">📦</div>
              <div className="dash-stat-info">
                <h3 id="stat-qty">{totalUnits}</h3>
                <p>Total Units</p>
                <span className="dash-stat-trend up">↑ In warehouse</span>
              </div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon purple">💰</div>
              <div className="dash-stat-info">
                <h3 id="stat-value">Rs. {totalValue.toLocaleString()}</h3>
                <p>Stock Value</p>
                <span className="dash-stat-trend up">↑ Total worth</span>
              </div>
            </div>
          </div>

          {/* STOCK ACTION CARDS */}
          <div className="section-header" id="section-actions">
            <h4>Stock Management</h4>
            <h2>Quick Actions</h2>
          </div>

          <div className="dash-actions">
            <a href="#section-stock" className="dash-action-card">
              <div className="dash-action-icon view">👁️</div>
              <h3>View All Stock</h3>
              <p>Browse the complete product inventory with status and pricing.</p>
            </a>
            <a href="#" className="dash-action-card" onClick={(e) => { e.preventDefault(); setInsertModal(true); }}>
              <div className="dash-action-icon add">➕</div>
              <h3>Insert New Stock</h3>
              <p>Add a new flower or product to the inventory database.</p>
            </a>
            <a href="#" className="dash-action-card" onClick={(e) => { e.preventDefault(); setEditSearchId(''); setEditSearchError(''); setEditSearchModal(true); }}>
              <div className="dash-action-icon edit">✏️</div>
              <h3>Update Stock</h3>
              <p>Edit product details, quantity, price or availability status.</p>
            </a>
            <a href="#" className="dash-action-card" onClick={(e) => { e.preventDefault(); setDeleteAllModal(true); }}>
              <div className="dash-action-icon delete">🗑️</div>
              <h3>Delete Stock</h3>
              <p>Remove products from inventory. Use the table rows to delete individually.</p>
            </a>
            <a href="#section-charts" className="dash-action-card">
              <div className="dash-action-icon report">📈</div>
              <h3>View Reports</h3>
              <p>Graphical breakdown of stock by category and availability.</p>
            </a>
            <a href="#" className="dash-action-card" onClick={(e) => { e.preventDefault(); handleExport(); }}>
              <div className="dash-action-icon export">📤</div>
              <h3>Export CSV</h3>
              <p>Download the full stock list as a CSV file for offline use.</p>
            </a>
          </div>

          {/* CHARTS ROW */}
          <div className="dash-grid-2" id="section-charts">

            {/* BAR CHART — Stock by Category */}
            <div className="dash-panel">
              <div className="dash-panel-header">
                <h3>📊 Stock by Category</h3>
                <a href="#">Refresh</a>
              </div>
              <div className="dash-chart" id="bar-chart">
                {(() => {
                  const categories = ['Roses', 'Bouquets', 'Seasonal', 'Exotic', 'Plants'];
                  const totals = categories.map((cat) =>
                    stock.filter((s) => s.category === cat).reduce((sum, s) => sum + s.qty, 0)
                  );
                  const maxVal = Math.max(...totals, 1);
                  return categories.map((cat, i) => (
                    <div className="dash-bar-wrap" key={cat}>
                      <span className="dash-bar-val">{totals[i]}</span>
                      <div
                        className={`dash-bar${i % 2 === 1 ? ' secondary' : ''}`}
                        style={{ height: `${Math.round((totals[i] / maxVal) * 100)}px` }}
                      >
                        <span className="dash-bar-label">{cat}</span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* DONUT CHART — Stock Status Breakdown */}
            <div className="dash-panel">
              <div className="dash-panel-header">
                <h3>🍩 Stock Status Breakdown</h3>
              </div>
              <div className="dash-donut-wrap">
                {(() => {
                  const categories = ['Roses', 'Bouquets', 'Plants', 'Seasonal', 'Exotic'];
                  const totals = categories.map((cat) =>
                    stock.filter((s) => s.category === cat).reduce((sum, s) => sum + s.qty, 0)
                  );
                  const grandTotal = totals.reduce((a, b) => a + b, 1);
                  const colors = [
                    'var(--brand-accent-color)',
                    'var(--brand-primary-color)',
                    '#66bb6a',
                    '#ffa726',
                    '#90caf9',
                  ];
                  // Build conic-gradient stops from live stock data
                  let cumulative = 0;
                  const stops = categories.map((_, i) => {
                    const pct = (totals[i] / grandTotal) * 100;
                    const start = cumulative;
                    cumulative += pct;
                    return `${colors[i]} ${start.toFixed(1)}% ${cumulative.toFixed(1)}%`;
                  });
                  return (
                    <>
                      <div
                        className="dash-donut"
                        style={{ background: `conic-gradient(${stops.join(', ')})` }}
                      />
                      <div className="dash-donut-legend">
                        {categories.map((cat, i) => (
                          <div className="dash-legend-item" key={cat}>
                            <div className="dash-legend-dot" style={{ background: colors[i] }} />
                            {cat}
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

          </div>

          {/* STOCK TABLE */}
          <div className="dash-panel" id="section-stock">
            <div className="dash-panel-header">
              <h3>🌸 Stock Inventory</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setInsertModal(true); }}>+ Add Item</a>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                id="stock-search"
                placeholder="Search by name or category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="stock-tbody">
                  {filtered.map((item) => {
                    const status = getStatus(item.qty);
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td style={{ whiteSpace: 'normal' }}>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.qty}</td>
                        <td>Rs. {item.price.toLocaleString()}</td>
                        <td><span className={`badge ${status.cls}`}>{status.label}</span></td>
                        <td>
                          <button
                            className="tiny-button"
                            style={{ marginRight: '6px' }}
                            onClick={() => { setEditItem({ ...item }); setEditModal(true); }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="tiny-button border-button"
                            onClick={() => { setDeleteItem(item); setDeleteModal(true); }}
                          >
                            🗑 Del
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="table-empty">No items found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT ORDERS + LOW STOCK ALERTS */}
          <div className="dash-grid-2" id="section-orders">
            <div className="dash-panel">
              <div className="dash-panel-header">
                <h3>📦 Recent Orders</h3>
                <a href="/cart">View Cart</a>
              </div>
              {[
                { icon: '🌹', name: 'Classic Red Roses × 2', customer: 'Ayesha R.', time: '2 mins ago', amount: 'Rs. 3,600' },
                { icon: '🌷', name: 'Blush Garden Mix × 1', customer: 'Sana M.', time: '18 mins ago', amount: 'Rs. 2,400' },
                { icon: '🌻', name: 'Sunflower Bundle × 3', customer: 'Hamza K.', time: '45 mins ago', amount: 'Rs. 3,600' },
                { icon: '🌺', name: 'Orchid Luxe × 1', customer: 'Fatima A.', time: '1 hr ago', amount: 'Rs. 3,200' },
                { icon: '🌿', name: 'Succulent Garden Box × 2', customer: 'Ali R.', time: '2 hrs ago', amount: 'Rs. 5,600' },
              ].map((o, i) => (
                <div className="dash-order-item" key={i}>
                  <div className="dash-order-avatar">{o.icon}</div>
                  <div className="dash-order-info">
                    <strong>{o.name}</strong>
                    <span>{o.customer} — {o.time}</span>
                  </div>
                  <span className="dash-order-amount">{o.amount}</span>
                </div>
              ))}
            </div>

            <div className="dash-panel">
              <div className="dash-panel-header">
                <h3>⚠️ Low Stock Alerts</h3>
                <a href="#" onClick={(e) => { e.preventDefault(); setInsertModal(true); }}>Restock</a>
              </div>
              <div id="low-stock-list">
                {stock.filter((s) => s.qty <= 10).map((s) => (
                  <div className="dash-order-item" key={s.id}>
                    <div className="dash-order-avatar">🌸</div>
                    <div className="dash-order-info">
                      <strong>{s.name}</strong>
                      <span>{s.category}</span>
                    </div>
                    <span className={`badge ${getStatus(s.qty).cls}`}>{s.qty} left</span>
                  </div>
                ))}
                {stock.filter((s) => s.qty <= 10).length === 0 && (
                  <p style={{ padding: '16px', color: 'var(--text-muted-color)' }}>All items are well stocked.</p>
                )}
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* MODAL — INSERT */}
      {insertModal && (
        <div className="dash-modal-overlay" id="modal-insert" style={{ display: 'flex' }}>
          <div className="dash-modal">
            <div className="dash-modal-header">
              <h3>➕ Insert New Stock</h3>
              <button className="dash-modal-close" onClick={() => setInsertModal(false)}>✕</button>
            </div>
            <form onSubmit={handleInsert}>
              <div>
                <label htmlFor="ins-name">Product Name</label>
                <input type="text" id="ins-name" placeholder="e.g. Rose Bouquet Deluxe" required value={insName} onChange={(e) => setInsName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="ins-category">Category</label>
                <select id="ins-category" required value={insCat} onChange={(e) => setInsCat(e.target.value)}>
                  <option value="">Select category…</option>
                  <option value="Roses">Roses</option>
                  <option value="Bouquets">Bouquets</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="Exotic">Exotic</option>
                  <option value="Plants">Plants</option>
                </select>
              </div>
              <div>
                <label htmlFor="ins-qty">Quantity</label>
                <input type="number" id="ins-qty" placeholder="e.g. 50" min="0" required value={insQty} onChange={(e) => setInsQty(e.target.value)} />
              </div>
              <div>
                <label htmlFor="ins-price">Price (Rs.)</label>
                <input type="number" id="ins-price" placeholder="e.g. 1500" min="1" required value={insPrice} onChange={(e) => setInsPrice(e.target.value)} />
              </div>
              <div className="dash-modal-footer">
                <button type="button" className="border-button sm-button" onClick={() => setInsertModal(false)}>Cancel</button>
                <button type="submit" className="sm-button">Add to Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL — EDIT SEARCH (find item first) */}
      {editSearchModal && (
        <div className="dash-modal-overlay" id="modal-edit-search" style={{ display: 'flex' }}>
          <div className="dash-modal">
            <div className="dash-modal-header">
              <h3>🔍 Find Item to Edit</h3>
              <button className="dash-modal-close" onClick={() => setEditSearchModal(false)}>✕</button>
            </div>
            <p>Enter the product ID or scroll the stock table and click Edit on any row.</p>
            <div style={{ marginTop: '16px' }}>
              <label htmlFor="edit-search-id">Product ID</label>
              <input
                type="number"
                id="edit-search-id"
                placeholder="e.g. 3"
                min="1"
                value={editSearchId}
                onChange={(e) => { setEditSearchId(e.target.value); setEditSearchError(''); }}
              />
              {editSearchError && (
                <p style={{ color: '#c0392b', fontSize: '0.82rem', marginTop: '6px' }}>{editSearchError}</p>
              )}
            </div>
            <div className="dash-modal-footer">
              <button className="border-button sm-button" onClick={() => setEditSearchModal(false)}>Cancel</button>
              <button
                className="sm-button"
                onClick={() => {
                  const found = stock.find((s) => s.id === Number(editSearchId));
                  if (!found) {
                    setEditSearchError(`No product found with ID ${editSearchId}.`);
                    return;
                  }
                  setEditItem({ ...found });
                  setEditSearchModal(false);
                  setEditModal(true);
                }}
              >
                Find &amp; Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL — EDIT */}
      {editModal && editItem && (
        <div className="dash-modal-overlay" id="modal-edit" style={{ display: 'flex' }}>
          <div className="dash-modal">
            <div className="dash-modal-header">
              <h3>✏️ Update Stock</h3>
              <button className="dash-modal-close" onClick={() => setEditModal(false)}>✕</button>
            </div>
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="edit-name">Product Name</label>
                <input type="text" id="edit-name" required value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="edit-category">Category</label>
                <select id="edit-category" required value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}>
                  <option value="Roses">Roses</option>
                  <option value="Bouquets">Bouquets</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="Exotic">Exotic</option>
                  <option value="Plants">Plants</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-qty">Quantity</label>
                <input type="number" id="edit-qty" min="0" required value={editItem.qty} onChange={(e) => setEditItem({ ...editItem, qty: Number(e.target.value) })} />
              </div>
              <div>
                <label htmlFor="edit-price">Price (Rs.)</label>
                <input type="number" id="edit-price" min="1" required value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })} />
              </div>
              <div className="dash-modal-footer">
                <button type="button" className="border-button sm-button" onClick={() => setEditModal(false)}>Cancel</button>
                <button type="submit" className="sm-button">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL — DELETE SINGLE */}
      {deleteModal && deleteItem && (
        <div className="dash-modal-overlay" id="modal-delete" style={{ display: 'flex' }}>
          <div className="dash-modal">
            <div className="dash-modal-header">
              <h3>🗑 Confirm Delete</h3>
              <button className="dash-modal-close" onClick={() => setDeleteModal(false)}>✕</button>
            </div>
            <p>Are you sure you want to remove <strong>{deleteItem.name}</strong> from stock? This cannot be undone.</p>
            <div className="dash-modal-footer">
              <button className="border-button sm-button" onClick={() => setDeleteModal(false)}>Cancel</button>
              <button className="sm-button" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL — DELETE ALL */}
      {deleteAllModal && (
        <div className="dash-modal-overlay" id="modal-delete-all" style={{ display: 'flex' }}>
          <div className="dash-modal">
            <div className="dash-modal-header">
              <h3>⚠️ Clear All Stock</h3>
              <button className="dash-modal-close" onClick={() => setDeleteAllModal(false)}>✕</button>
            </div>
            <p>This will remove <strong>all products</strong> from the inventory. This action cannot be undone. Use Reset to Default to restore the original data.</p>
            <div className="dash-modal-footer">
              <button className="border-button sm-button" onClick={() => setDeleteAllModal(false)}>Cancel</button>
              <button className="sm-button" onClick={handleClearAll}>Clear All</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
