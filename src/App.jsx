import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

const asset = {
  logo: '/assets/xtroxian-spartan-helmet-logo.png',
  neonLogo: '/assets/xtroxian-neon-logo.png',
  emblem: '/assets/white-spartan-helmet-emblem.png',
  limit: '/assets/limit-dca.webp',
  copy: '/assets/copy-trading.webp',
  sniper: '/assets/auto-sniper.webp',
  trenches: '/assets/solana-trenches.webp',
  feed: '/assets/price-feed.webp',
  rewards: '/assets/rewards.webp',
};
const features = [
  { title: 'Limit & DCA Orders', tag: 'PRECISION', copy: 'Build your entry in steps. Place limit orders and automate your average without leaving Telegram.', image: asset.limit },
  { title: 'Copy Trading', tag: 'FOLLOW THE EDGE', copy: 'Mirror the wallets you trust and stay in control of every position, size, and setting.', image: asset.copy },
  { title: 'Auto-Sniper', tag: 'BE FIRST', copy: 'Prepare your filters ahead of launch and move when the market opens—not after the crowd.', image: asset.sniper },
  { title: 'Solana Trenches', tag: 'ONCHAIN INTEL', copy: 'Follow fresh launches and live token activity with the information you need close at hand.', image: asset.trenches },
  { title: 'Live Price Feed', tag: 'STAY IN SYNC', copy: 'Keep an eye on price action and positions in real time, wherever the next move happens.', image: asset.feed },
  { title: 'Rewards & Ranks', tag: 'LEVEL UP', copy: 'Track your progress, unlock community recognition, and celebrate the wins along the way.', image: asset.rewards },
];
const faqs = [
  ['What is a Telegram trading bot?', 'It is a trading interface inside Telegram that can help you discover tokens, manage orders, and monitor positions. Xtroxian is designed to make those tools quick to reach while keeping your wallet under your control.'],
  ['Is Xtroxian custodial?', 'Xtroxian is designed around self-managed wallets. Always review wallet permissions, transaction details, and the official product documentation before trading.'],
  ['What can I trade with Xtroxian?', 'The reference site focuses on Solana tokens and on-chain trading tools. Availability can vary by market and by feature.'],
  ['How do I get started?', 'Use the “Launch app” link to visit the bot, or open the signup page to register your interest in this preview.'],
  ['Does this preview collect my information?', 'No. The signup form in this recreation runs only in your browser and does not send or store submitted information.'],
];

function Arrow({ down = false }) { return <span aria-hidden="true" className="arrow">{down ? '↓' : '↗'}</span>; }

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="nav-wrap">
      <Link to="/" className="brand" aria-label="Xtroxian home"><img src={asset.logo} alt="Xtroxian" /></Link>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span></span><span></span></button>
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <Link to="/#features">Product</Link><Link to="/stadion">Stadion</Link><Link to="/blog">Blog</Link><Link to="/#faq">FAQs</Link>
        <Link to="/privacy" className="mobile-only">Privacy</Link>
        <a className="nav-launch" href="https://Xtroxianonsolana.com/links" target="_blank" rel="noreferrer">Launch app <Arrow /></a>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-main">
    <div className="footer-brand"><Link to="/" aria-label="Xtroxian home"><img src={asset.neonLogo} alt="Xtroxian neon wordmark" /></Link><p>Trade with clarity. Move with conviction.</p></div>
    <div className="footer-col"><strong>Explore</strong><Link to="/#features">Product</Link><Link to="/stadion">The Stadion</Link><Link to="/blog">Blog</Link></div>
    <div className="footer-col"><strong>Get started</strong><Link to="/signup">Sign up</Link><a href="https://Xtroxianonsolana.com/links" target="_blank" rel="noreferrer">Launch app <Arrow /></a><Link to="/#faq">FAQs</Link></div>
    <div className="footer-col"><strong>Information</strong><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms of use</Link></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Xtroxian. Built for the trenches.</span><span className="footer-status"><i /> Preview experience</span></div></footer>;
}

function Layout({ children }) { return <><Header />{children}<Footer /></>; }

function Reveal({ children, className = '', ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('revealed'); observer.unobserve(node); }
    }, { threshold: 0.12 });
    observer.observe(node); return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} {...props}>{children}</div>;
}

function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return <div className={`section-heading align-${align}`}><span className="eyebrow"><i />{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function PhonePreview() {
  return <div className="phone-preview" aria-label="Illustrative Xtroxian trading interface">
    <div className="phone-camera" />
    <div className="phone-status"><span>9:41</span><span>●●● ◉ ▰</span></div>
    <div className="phone-appbar"><span>‹</span><b>XTROXIAN</b><i>•••</i></div>
    <div className="phone-screen-body">
      <div className="phone-greeting"><small>YOUR WORKSPACE</small><b>Market overview</b></div>
      <div className="phone-token"><span className="token-icon">◎</span><span><b>Solana</b><small>SOL / USD</small></span><em>DEMO</em></div>
      <div className="phone-balance"><small>WALLET SNAPSHOT</small><strong>— SOL</strong><span>Self-managed · ready to review</span></div>
      <div className="phone-chart-label"><span>MARKET ACTIVITY</span><b>LIVE VIEW <i /></b></div>
      <div className="phone-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="phone-action-grid"><b>Buy</b><b>Sell</b><b>Positions</b><b>Limit</b><b>DCA</b><b>Sniper</b></div>
      <div className="phone-bottom-nav"><span>⌂ Home</span><span>◈ Wallet</span><span>◷ Activity</span></div>
    </div>
  </div>;
}

function Home() {
  const rail = useRef(null);
  const moveRail = (direction) => rail.current?.scrollBy({ left: direction * 390, behavior: 'smooth' });
  return <Layout><main>
    <section className="hero section-shell" id="top">
      <div className="hero-copy"><div className="hero-kicker"><span className="live-dot" /> BUILT FOR SOLANA. READY FOR THE TRENCHES.</div>
        <h1>Your complete<br /><span>onchain trading toolkit.</span></h1>
        <p className="hero-lead">A fast, secure terminal for discovering tokens, managing positions, and using automated trading tools—while keeping control of your wallet.</p>
        <div className="hero-actions"><a className="button button-primary" href="https://Xtroxianonsolana.com/links" target="_blank" rel="noreferrer">Launch Xtroxian <Arrow /></a><a className="button button-quiet" href="#features">Explore the toolkit <Arrow down /></a></div>
        <div className="hero-note"><span className="mini-shield">✳</span> Self-managed wallets <b>·</b> Built for Solana <b>·</b> Always in your hands</div>
      </div>
      <div className="hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-glow" /><PhonePreview /><div className="floating-card floating-top"><span className="pulse-dot" /> LIVE ON SOLANA <b>●</b></div><div className="floating-card floating-bottom"><span className="signal-bars">▂▄▆</span><span><b>Built for the moment</b><small>Tools at your fingertips</small></span></div></div>
      <a className="scroll-cue" href="#stats"><span>SCROLL TO EXPLORE</span><i>↓</i></a>
    </section>
    <section className="stats-section section-shell" id="stats"><div className="stats-intro"><span className="eyebrow"><i /> ONE HUB. MADE BY TRADERS.</span><p>Made by traders,<br />for traders.</p></div><div className="stat"><strong>$25<span>B</span></strong><small>Trade volume</small></div><div className="stat"><strong>2<span>M</span></strong><small>Lifetime users</small></div><div className="stat"><strong>140<span>M</span></strong><small>Executed trades</small></div><div className="stat"><strong>24<span>/7</span></strong><small>Online support</small></div></section>
    <section className="features-section section-shell" id="features"><div className="feature-top"><SectionHeading eyebrow="THE TOOLKIT" title={<>All that you need<br />to leave the trenches.</>} text="A complete suite of on-chain tools, built to bring discovery, execution, and automation into one place." align="left"/><div className="rail-controls"><button aria-label="Previous features" onClick={() => moveRail(-1)}>←</button><button aria-label="Next features" onClick={() => moveRail(1)}>→</button></div></div>
      <div className="feature-rail" ref={rail}>{features.map((feature, index) => <Reveal className="feature-card" key={feature.title}><div className="feature-image"><img src={feature.image} alt={`${feature.title} interface`} loading="lazy" /><span className="feature-index">0{index + 1}</span></div><div className="feature-card-copy"><span className="feature-tag">{feature.tag}</span><h3>{feature.title}</h3><p>{feature.copy}</p><Link to="/signup" className="text-link">Get started <Arrow /></Link></div></Reveal>)}</div>
    </section>
    <section className="control-section section-shell"><div className="control-copy"><span className="eyebrow"><i /> CONTROL IS THE ADVANTAGE</span><h2>Self-managed<br /><span>core systems.</span></h2><p>Self-managed wallets and core systems put you in the driver’s seat. Keep your assets under your control, with clear tools and systems designed for confidence.</p><div className="assurance-list"><div><b>01</b><span><strong>Trusted hardware</strong><small>Designed with protection in mind.</small></span><i>↗</i></div><div><b>02</b><span><strong>Non-custodial</strong><small>Your wallet remains yours.</small></span><i>↗</i></div><div><b>03</b><span><strong>Enterprise-grade</strong><small>Robust systems for active trading.</small></span><i>↗</i></div><div><b>04</b><span><strong>Fully verifiable</strong><small>Clear, checkable activity.</small></span><i>↗</i></div></div><Link to="/stadion" className="button button-outline">Explore THE Stadion <Arrow /></Link></div><div className="control-art"><div className="control-hex"><div className="hex-inner"><span className="ring ring-a"/><span className="ring ring-b"/><img src={asset.emblem} alt="White Spartan helmet emblem" /></div></div><div className="control-caption"><span className="live-dot" /> YOUR WALLET. YOUR RULES.</div></div></section>
    <section className="community-section section-shell" id="partners"><SectionHeading eyebrow="THE COMMUNITY" title="Better moves are made together." text="A growing Solana community building, trading, and learning side by side."/><div className="community-grid"><div className="community-feature"><span className="community-number">01 / COMMUNITY</span><h3>One hub.<br /><em>More signal.</em></h3><p>Meet traders, share what you’re watching, and keep the conversation moving with the market.</p><a href="https://Xtroxianonsolana.com/links" target="_blank" rel="noreferrer" className="text-link">Find your community <Arrow /></a><div className="community-lines" /></div><div className="community-tile tile-blue"><span>01</span><b>RESEARCH<br />TOGETHER</b><small>Ideas move markets.</small><div className="tile-orbit" /></div><div className="community-tile tile-violet"><span>02</span><b>TRADE<br />YOUR WAY</b><small>Your strategy stays yours.</small><div className="tile-orbit" /></div></div></section>
    <section className="testimonials-section section-shell" id="pnls"><div className="testimonial-head"><SectionHeading eyebrow="FROM THE TRENCHES" title="Every win has a story." text="The people behind the positions. The proof behind the conviction." align="left"/><Link to="/blog" className="text-link">Read the blog <Arrow /></Link></div><div className="testimonial-track">{[
      ['Maya R.', '“The interface puts everything I need right in front of me. Clean, quick, and built for the way I trade.”', 'SOLANA TRADER'],
      ['Jonah K.', '“The automation tools help me stay focused on the setup instead of repeating the same steps.”', 'COMMUNITY MEMBER'],
      ['Alex T.', '“I came for the speed and stayed for the community. It feels built by people who actually trade.”', 'ONCHAIN BUILDER'],
    ].map(([name, quote, label]) => <article className="quote-card" key={name}><div className="quote-mark">“</div><p>{quote}</p><div className="quote-by"><span className="avatar">{name[0]}</span><span><b>{name}</b><small>{label}</small></span><span className="quote-stars">✦ ✦ ✦</span></div></article>)}</div><p className="testimonial-note">Community quotes shown as illustrative preview content.</p></section>
    <section className="faq-section section-shell" id="faq"><div className="faq-intro"><SectionHeading eyebrow="GOOD TO KNOW" title="Questions?" text="A few things to know before you get in the trenches." align="left"/><a className="text-link" href="https://Xtroxianonsolana.com/links" target="_blank" rel="noreferrer">More in the docs <Arrow /></a></div><div className="faq-list">{faqs.map(([q, a], i) => <details key={q} className="faq-item"><summary><span>{String(i + 1).padStart(2, '0')}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</div></section>
    <section className="closing-cta section-shell"><div className="cta-glow"/><span className="eyebrow"><i /> READY WHEN YOU ARE</span><h2>Blockchain belongs<br /><span>to everyone.</span></h2><p>We make trading better—with fast tools built around the people who use them.</p><div className="hero-actions"><Link to="/signup" className="button button-primary">Create your account <Arrow /></Link><a href="https://Xtroxianonsolana.com/links" className="button button-quiet" target="_blank" rel="noreferrer">Open the bot <Arrow /></a></div></section>
  </main></Layout>;
}

const privacySections = [
  ['1. About this preview', 'This Xtroxian recreation is a front-end demonstration built from supplied website materials. It is not the live trading service and does not connect to wallets, Telegram, or a trading backend.'],
  ['2. Information you enter', 'The signup form in this preview processes your input only in your browser to show a confirmation state. It does not transmit the information to a server, create an account, or persist it after you leave the page.'],
  ['3. Cookies and analytics', 'This demonstration does not intentionally set advertising or analytics cookies. Your browser or the platform hosting the preview may process basic technical data to deliver the page.'],
  ['4. External links', 'Links to Telegram, project documentation, or third-party services leave this preview. Those services operate under their own privacy terms and practices.'],
  ['5. Security and trading', 'Never share recovery phrases or private keys. This site preview does not request a wallet connection and should not be treated as financial or security advice.'],
  ['6. Contact', 'For the live product’s current privacy terms, consult its official website and documentation before using any service.'],
];
function LegalPage({ terms = false }) {
  const data = terms ? [
    ['1. Preview status', 'This recreation is a visual and interaction preview only. It is not the live Xtroxian trading service and does not execute transactions, connect to wallets, or create accounts.'],
    ['2. No financial advice', 'Nothing on this page is an offer, recommendation, or financial, investment, tax, or legal advice. Digital assets are volatile and trading can result in the loss of your entire position. Make independent decisions and seek qualified advice where appropriate.'],
    ['3. Use of the preview', 'You may browse the site and try its front-end interactions. Do not submit sensitive personal information, wallet credentials, recovery phrases, or private keys. The signup form is demonstrative and has no backend.'],
    ['4. Third-party services', 'Links to external products and services are provided for reference. Xtroxian does not control their content, availability, or terms. Review each provider’s terms before use.'],
    ['5. Availability and changes', 'The preview is provided for inspection and may change or become unavailable without notice. Features shown here may not be present in any live product.'],
    ['6. Limitation', 'To the fullest extent permitted by law, this non-production preview is provided “as is” without guarantees of accuracy, availability, or fitness for a particular purpose.'],
  ] : privacySections;
  return <Layout><main className="subpage"><section className="subpage-hero"><span className="eyebrow"><i /> XTROXIAN / {terms ? 'TERMS' : 'PRIVACY'}</span><h1>{terms ? 'Terms of use.' : 'Privacy, plainly.'}</h1><p>{terms ? 'The ground rules for this preview experience.' : 'A clear view of what this preview does—and does not—do with your information.'}</p><small>Preview draft · Updated November 2026</small></section><div className="legal-layout"><aside><span>ON THIS PAGE</span>{data.map(([heading]) => <a key={heading} href={`#${heading.split('.')[0]}`}>{heading.split('.').slice(1).join('.').trim()}</a>)}</aside><article className="legal-copy">{data.map(([heading, text], i) => <section id={String(i + 1)} key={heading}><h2>{heading}</h2><p>{text}</p></section>)}<div className="preview-disclaimer"><b>Important</b><p>This page is draft preview copy, not a substitute for official legal terms. Review the live product’s current policies before using it.</p></div></article></div></main></Layout>;
}

function Stadion() {
  return <Layout><main className="subpage stadion-page"><section className="stadion-hero"><span className="eyebrow"><i /> THE XTROXIAN COMMUNITY</span><div className="stadion-title"><div><h1>THE<br /><span>STADION</span></h1><p>Where every move earns its place.</p></div><div className="stadion-symbol"><div className="symbol-ring"><img src={asset.emblem} alt="White Spartan helmet emblem" /></div><span>HONOR • PROGRESS • COMMUNITY</span></div></div><div className="stadion-bottom"><span>01 — A PLACE FOR THE PEOPLE IN THE TRENCHES</span><span>SEASON 01 / PREVIEW</span></div></section><section className="stadion-intro"><div><span className="eyebrow"><i /> BUILT AROUND YOUR JOURNEY</span><h2>More than a leaderboard.<br /><span>A shared arena.</span></h2></div><p>The Stadion is a community-first space to celebrate progress, recognize great calls, and give traders a reason to keep showing up. Explore the concept in this site preview.</p></section><section className="stadion-cards">{[['01', 'The leaderboard', 'A clear view of the people making their mark across the community.'], ['02', 'The honors', 'A place to recognize consistency, creativity, and standout moments.'], ['03', 'The rewards', 'Community milestones designed to make every season worth remembering.']].map(([n, h, p]) => <article className="stadion-card" key={n}><span>{n} / STADION</span><div className="stadion-card-mark">✳</div><h3>{h}</h3><p>{p}</p><i>↗</i></article>)}</section><section className="stadion-cta"><span className="eyebrow"><i /> YOUR SEAT IS WAITING</span><h2>Make your next move<br /><span>count.</span></h2><Link to="/signup" className="button button-primary">Join the community <Arrow /></Link></section></main></Layout>;
}

const articles = [
  { tag: 'PRODUCT', date: 'FIELD NOTES · 04 MIN', title: 'A faster toolkit for on-chain decisions', copy: 'How a single workspace can help you move from discovery to execution without losing focus.', color: 'blog-blue', icon: '↗' },
  { tag: 'COMMUNITY', date: 'FROM THE TRENCHES · 06 MIN', title: 'What makes a trading community work?', copy: 'The best edge is not always a chart. It can be the people you learn and build alongside.', color: 'blog-violet', icon: '✳' },
  { tag: 'GUIDES', date: 'START HERE · 05 MIN', title: 'Build a trading routine that is yours', copy: 'A thoughtful checklist for preparing your plan before the market starts moving.', color: 'blog-cyan', icon: '⌁' },
];
function Blog() {
  const [filter, setFilter] = useState('All stories');
  const categories = ['All stories', 'Product', 'Community', 'Guides'];
  const visibleArticles = filter === 'All stories' ? articles : articles.filter((article) => article.tag.toLowerCase() === filter.toLowerCase());
  return <Layout><main className="subpage blog-page"><section className="blog-hero"><span className="eyebrow"><i /> NOTES FROM THE TRENCHES</span><h1>Ideas move<br /><span>with the market.</span></h1><p>Field notes, product updates, and perspectives from the Xtroxian community.</p><div className="blog-filter">{categories.map((category) => <button key={category} className={filter === category ? 'active' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}{category === 'All stories' && <span>03</span>}</button>)}</div></section><section className="blog-grid">{visibleArticles.map((article) => <article className={`blog-card ${article.color}`} key={article.title}><div className="blog-art"><span className="blog-count">0{articles.indexOf(article) + 1}</span><span className="blog-art-mark">{article.icon}</span><span className="blog-art-word">XTROXIAN</span></div><div className="blog-meta"><span>{article.tag}</span><span>{article.date}</span></div><h2>{article.title}</h2><p>{article.copy}</p><span className="text-link blog-read">Preview story <Arrow /></span></article>)}</section><div className="blog-note">These sample story cards are preview content. No blog articles were included in the supplied archive.</div></main></Layout>;
}

function Signup() {
  const [mode, setMode] = useState('signup');
  const [notice, setNotice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', platform: 'X', username: '' });
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  function submit(event) { event.preventDefault(); setSubmitted(true); setNotice(mode === 'signup' ? 'Signup preview complete — no account was created or data sent.' : 'Login preview only — authentication is not connected.'); }
  return <Layout><main className="auth-page"><section className="auth-card" aria-label="Xtroxian account access">
    <Link to="/" className="auth-close" aria-label="Close">×</Link>
    <img className="auth-logo" src={asset.emblem} alt="Xtroxian Spartan emblem" />
    <h1>{mode === 'signup' ? 'Create your Xtroxian account' : 'Welcome back to Xtroxian'}</h1>
    <p className="auth-subtitle">{mode === 'signup' ? 'Join the community and connect your profile.' : 'Choose a sign-in method or continue with email.'}</p>
    {submitted ? <div className="auth-notice" role="status">{notice}<button type="button" onClick={() => setSubmitted(false)}>Back to form</button></div> : <>
      <div className="social-auth"><button type="button" onClick={() => setNotice('Google sign-in is shown as a preview; OAuth is not configured.')}>G&nbsp; Continue with Google</button><button type="button" onClick={() => setNotice('X sign-in is shown as a preview; OAuth is not configured.')}>𝕏&nbsp; Continue with X</button><button type="button" onClick={() => setNotice('Telegram sign-in is shown as a preview; OAuth is not configured.')}>✈&nbsp; Continue with Telegram</button></div>
      {notice && <div className="auth-inline-notice" role="status">{notice}</div>}
      <div className="auth-divider"><span>OR CONTINUE WITH EMAIL</span></div>
      <form className="auth-form" onSubmit={submit}>
        {mode === 'signup' && <><label htmlFor="auth-full-name">Full name</label><input id="auth-full-name" autoComplete="name" required value={form.fullName} onChange={update('fullName')} placeholder="Your full name" /></>}
        <label htmlFor="auth-email">Email</label><input id="auth-email" type="email" autoComplete="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
        <label htmlFor="auth-password">Password</label><input id="auth-password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength="8" required value={form.password} onChange={update('password')} placeholder="At least 8 characters" />
        {mode === 'signup' && <><label htmlFor="auth-platform">Platform</label><select id="auth-platform" value={form.platform} onChange={update('platform')}><option>X</option><option>Telegram</option><option>Discord</option><option>Instagram</option><option>TikTok</option><option>Other</option></select><label htmlFor="auth-username">Username</label><input id="auth-username" required value={form.username} onChange={update('username')} placeholder="Your username on that platform" /></>}
        <button className="button button-primary auth-submit" type="submit">{mode === 'signup' ? 'Create account' : 'Log in'} <Arrow /></button>
      </form>
      <p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to Xtroxian?'} <button type="button" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setNotice(''); setSubmitted(false); }}>{mode === 'signup' ? 'Log in' : 'Sign up'}</button></p>
      <p className="auth-legal">By continuing, you agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>. Preview only—nothing is sent or stored.</p>
    </>}
  </section></main></Layout>;
}

function NotFound() { return <Layout><main className="not-found"><span className="eyebrow"><i /> 404 / OFF THE MAP</span><h1>This route is<br /><span>still undiscovered.</span></h1><Link className="button button-primary" to="/">Back to base <Arrow /></Link></main></Layout>; }

function TelegramBotPage() {
  return <iframe className="exact-homepage-frame" src="/telegram-bot.html?v=20261122-0901" title="Xtroxian Telegram trading bot" />;
}

function ReferenceHomepage() {
  return <iframe className="exact-homepage-frame" src="/homepage-reference.html" title="Xtroxian homepage" />;
}

function SitePreloader() {
  return <div className="site-preloader" role="status" aria-label="Loading Xtroxian">
    <div className="preloader-mark"><svg viewBox="0 0 100 100" aria-hidden="true"><circle className="preloader-orbit orbit-cyan" cx="50" cy="50" r="43"/><circle className="preloader-orbit orbit-violet" cx="50" cy="50" r="36"/></svg><img src={asset.emblem} alt="" /></div>
    <div className="preloader-wordmark">XTROXIAN</div><div className="preloader-caption">ON SOLANA</div>
  </div>;
}

export default function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let done = false;
    const started = Date.now();
    let finishTimer;
    const finish = () => {
      if (done) return; done = true;
      finishTimer = window.setTimeout(() => setLoading(false), Math.max(0, 2200 - (Date.now() - started)));
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const failsafe = window.setTimeout(() => setLoading(false), 6000);
    return () => { window.removeEventListener('load', finish); window.clearTimeout(failsafe); window.clearTimeout(finishTimer); };
  }, []);
  useEffect(() => {
    const titles = { '/': 'Xtroxian — Trade at the speed of the trenches', '/privacy': 'Privacy — Xtroxian', '/terms': 'Terms — Xtroxian', '/stadion': 'The Stadion — Xtroxian', '/arena': 'Arena — Xtroxian', '/blog': 'Blog — Xtroxian', '/signup': 'Sign up — Xtroxian' };
    document.title = titles[pathname] || 'Xtroxian';
  }, [pathname]);
  return <><Routes><Route path="/" element={<ReferenceHomepage />} /><Route path="/privacy" element={<LegalPage />} /><Route path="/terms" element={<LegalPage terms />} /><Route path="/stadion" element={<Stadion />} /><Route path="/telegram-bot" element={<TelegramBotPage />} /><Route path="/arena" element={<Navigate to="/stadion" replace />} /><Route path="/blog" element={<Blog />} /><Route path="/signup" element={<Signup />} /><Route path="*" element={<NotFound />} /></Routes>{loading && <SitePreloader />}</>;
}
