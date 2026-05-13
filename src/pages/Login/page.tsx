import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';
import { Link, useNavigate } from 'react-router-dom';

type Tab = 'login' | 'signup' | 'forgot';

// Simple in-memory user store (persists for the session)
// Pre-loaded with a demo account so Sign In works immediately
const registeredUsers: { email: string; password: string; name: string }[] = [
  { email: 'demo@florenza.pk', password: 'demo123', name: 'Demo User' },
];

export default function Login({ cartCount }: { cartCount: number }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('login');

  // ── Login state ──
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError]       = useState('');
  const [loginSuccess, setLoginSuccess]   = useState('');
  const [showLoginPwd, setShowLoginPwd]   = useState(false);

  // ── Sign Up state ──
  const [fname, setFname]               = useState('');
  const [lname, setLname]               = useState('');
  const [signupEmail, setSignupEmail]   = useState('');
  const [signupPhone, setSignupPhone]   = useState('');
  const [signupPwd, setSignupPwd]       = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [agreeTerms, setAgreeTerms]     = useState(false);
  const [signupError, setSignupError]   = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [showSignupPwd, setShowSignupPwd]   = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  // ── Forgot state ──
  const [forgotEmail, setForgotEmail]     = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // ── Password strength ──
  function getStrength(pwd: string): { label: string; width: string; color: string } {
    if (!pwd) return { label: '', width: '0%', color: 'transparent' };
    let score = 0;
    if (pwd.length >= 8)          score++;
    if (/[A-Z]/.test(pwd))        score++;
    if (/[0-9]/.test(pwd))        score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
      { label: 'Very Weak', width: '20%',  color: '#e74c3c' },
      { label: 'Weak',      width: '40%',  color: '#e67e22' },
      { label: 'Fair',      width: '60%',  color: '#f1c40f' },
      { label: 'Strong',    width: '80%',  color: '#2ecc71' },
      { label: 'Very Strong', width: '100%', color: '#27ae60' },
    ];
    return map[score] ?? map[0];
  }
  const strength = getStrength(signupPwd);

  // ── Handlers ──
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(''); setLoginSuccess('');
    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all fields.'); return;
    }
    const user = registeredUsers.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );
    if (!user) {
      setLoginError('Invalid email or password. Please try again.'); return;
    }
    setLoginSuccess(`Welcome back, ${user.name}! Redirecting…`);
    setTimeout(() => navigate('/'), 1500);
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupError(''); setSignupSuccess('');
    if (!fname || !lname || !signupEmail || !signupPhone || !signupPwd || !signupConfirm) {
      setSignupError('Please fill in all fields.'); return;
    }
    if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      setSignupError('Please enter a valid email address.'); return;
    }
    if (signupPwd.length < 6) {
      setSignupError('Password must be at least 6 characters.'); return;
    }
    if (signupPwd !== signupConfirm) {
      setSignupError('Passwords do not match.'); return;
    }
    if (!agreeTerms) {
      setSignupError('Please agree to the Terms & Conditions.'); return;
    }
    if (registeredUsers.find((u) => u.email === signupEmail)) {
      setSignupError('An account with this email already exists.'); return;
    }
    registeredUsers.push({ email: signupEmail, password: signupPwd, name: `${fname} ${lname}` });
    setSignupSuccess(`Account created! Welcome, ${fname}. You can now sign in.`);
    setFname(''); setLname(''); setSignupEmail(''); setSignupPhone('');
    setSignupPwd(''); setSignupConfirm(''); setAgreeTerms(false);
    setTimeout(() => { setSignupSuccess(''); setActiveTab('login'); }, 2000);
  }

  function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(`Reset link sent to ${forgotEmail}. Check your inbox!`);
    setForgotEmail('');
  }

  return (
    <>
      <Navbar cartCount={cartCount} />

      <div className="login-page">

        {/* LEFT DECORATIVE PANEL */}
        <div className="login-panel">
          <div className="panel-content">
            <Link to="/" className="panel-brand-link">Florenza Bliss</Link>
            <div className="panel-flowers">🌸🌷🌺</div>
            <p className="panel-quote">
              "Where every bloom tells a story, and every delivery is made with love."
            </p>
            <p>Join thousands of happy customers across Pakistan.</p>
            <ul className="panel-features">
              <li><span>🚚</span> Same-day delivery in Gujrat &amp; nearby areas</li>
              <li><span>🎀</span> Custom bouquets crafted just for your occasion</li>
              <li><span>🌿</span> Farm-fresh flowers sourced every morning</li>
              <li><span>💌</span> Handwritten gift cards with every order</li>
              <li><span>🔒</span> Secure checkout — Card, JazzCash, EasyPaisa &amp; COD</li>
            </ul>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="login-form-side">
          <h2>Welcome Back 🌸</h2>
          <p>Sign in to your account or create a new one.</p>

          {/* Tab Switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab${activeTab === 'login' ? ' active' : ''}`}
              onClick={() => { setActiveTab('login'); setLoginError(''); setLoginSuccess(''); }}
            >Login</button>
            <button
              className={`auth-tab${activeTab === 'signup' ? ' active' : ''}`}
              onClick={() => { setActiveTab('signup'); setSignupError(''); setSignupSuccess(''); }}
            >Sign Up</button>
          </div>

          {/* ── LOGIN FORM ── */}
          {activeTab === 'login' && (
            <div className="form-panel active" id="panel-login">
              {loginError   && <div className="form-error"   style={{ display: 'block' }}>{loginError}</div>}
              {loginSuccess && <div className="form-success" style={{ display: 'block' }}>{loginSuccess}</div>}

              <form onSubmit={handleLogin} noValidate>
                <div>
                  <label htmlFor="login-email">Email Address</label>
                  <input
                    type="email" id="login-email" placeholder="you@example.com"
                    autoComplete="email" value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="login-password">Password</label>
                  <div className="password-wrap">
                    <input
                      type={showLoginPwd ? 'text' : 'password'}
                      id="login-password" placeholder="Enter your password"
                      autoComplete="current-password" value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      className="eye-btn" type="button" aria-label="Toggle password visibility"
                      onClick={() => setShowLoginPwd((v) => !v)}
                    >{showLoginPwd ? '🙈' : '👁'}</button>
                  </div>
                </div>
                <div className="form-meta">
                  <label><input type="checkbox" /> Remember me</label>
                  <button type="button" className="link-button" onClick={() => setActiveTab('forgot')}>
                    Forgot password?
                  </button>
                </div>
                <button type="submit" className="btn-full">Sign In</button>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted-color)', marginTop: '8px', textAlign: 'center' }}>
                  Demo: <strong>demo@florenza.pk</strong> / <strong>demo123</strong>
                </p>
              </form>

              <div className="divider">or continue with</div>
              <button className="social-btn border-button" type="button">
                <img src="https://www.google.com/favicon.ico" alt="Google" />
                Continue with Google
              </button>
              <button className="social-btn border-button" type="button">
                <span>📘</span> Continue with Facebook
              </button>
              <p className="form-switch-text">
                Don't have an account?{' '}
                <button className="link-button" type="button" onClick={() => setActiveTab('signup')}>Create one →</button>
              </p>
            </div>
          )}

          {/* ── SIGN UP FORM ── */}
          {activeTab === 'signup' && (
            <div className="form-panel active" id="panel-signup">
              {signupError   && <div className="form-error"   style={{ display: 'block' }}>{signupError}</div>}
              {signupSuccess && <div className="form-success" style={{ display: 'block' }}>{signupSuccess}</div>}

              <form onSubmit={handleSignup} noValidate>
                <div className="name-row">
                  <div>
                    <label htmlFor="signup-fname">First Name</label>
                    <input type="text" id="signup-fname" placeholder="Ayesha" autoComplete="given-name"
                      value={fname} onChange={(e) => setFname(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="signup-lname">Last Name</label>
                    <input type="text" id="signup-lname" placeholder="Khan" autoComplete="family-name"
                      value={lname} onChange={(e) => setLname(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="signup-email">Email Address</label>
                  <input type="email" id="signup-email" placeholder="you@example.com" autoComplete="email"
                    value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="signup-phone">Phone Number</label>
                  <input type="tel" id="signup-phone" placeholder="0300 000 0000" autoComplete="tel"
                    value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="signup-password">Password</label>
                  <div className="password-wrap">
                    <input
                      type={showSignupPwd ? 'text' : 'password'}
                      id="signup-password" placeholder="Create a strong password" autoComplete="new-password"
                      value={signupPwd} onChange={(e) => setSignupPwd(e.target.value)}
                    />
                    <button className="eye-btn" type="button" aria-label="Toggle password visibility"
                      onClick={() => setShowSignupPwd((v) => !v)}>{showSignupPwd ? '🙈' : '👁'}</button>
                  </div>
                  {signupPwd && (
                    <>
                      <div className="strength-bar">
                        <div className="strength-fill" style={{ width: strength.width, background: strength.color, height: '100%', borderRadius: 'inherit', transition: 'width 0.3s' }}></div>
                      </div>
                      <p id="strength-label" style={{ fontSize: '0.78rem', color: strength.color, marginTop: '4px' }}>{strength.label}</p>
                    </>
                  )}
                </div>
                <div>
                  <label htmlFor="signup-confirm">Confirm Password</label>
                  <div className="password-wrap">
                    <input
                      type={showConfirmPwd ? 'text' : 'password'}
                      id="signup-confirm" placeholder="Re-enter your password" autoComplete="new-password"
                      value={signupConfirm} onChange={(e) => setSignupConfirm(e.target.value)}
                    />
                    <button className="eye-btn" type="button" aria-label="Toggle password visibility"
                      onClick={() => setShowConfirmPwd((v) => !v)}>{showConfirmPwd ? '🙈' : '👁'}</button>
                  </div>
                </div>
                <div className="terms-wrap">
                  <label className="terms-label">
                    <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                    {' '}I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>
                  </label>
                </div>
                <button type="submit" className="btn-full">Create Account</button>
              </form>

              <p className="form-switch-text">
                Already have an account?{' '}
                <button className="link-button" type="button" onClick={() => setActiveTab('login')}>Sign in →</button>
              </p>
            </div>
          )}

          {/* ── FORGOT PASSWORD ── */}
          {activeTab === 'forgot' && (
            <div className="form-panel active" id="panel-forgot">
              {forgotSuccess && <div className="form-success" style={{ display: 'block' }}>{forgotSuccess}</div>}
              <p>Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleForgot} noValidate>
                <div>
                  <label htmlFor="forgot-email">Email Address</label>
                  <input type="email" id="forgot-email" placeholder="you@example.com"
                    value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn-full">Send Reset Link</button>
              </form>
              <p className="form-switch-text">
                <button className="link-button" type="button" onClick={() => setActiveTab('login')}>← Back to Login</button>
              </p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}
