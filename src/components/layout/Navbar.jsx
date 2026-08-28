import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import siteConfig from '../../config/site.config.js';
import useScrollState from '../../hooks/useScrollState.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import ThemeToggle from '../ui/ThemeToggle.jsx';

/**
 * 顶部导航。Hero 区几乎全透明，滚动后贴顶并加毛玻璃。
 * 在作品详情页（非首页）默认保持实体态，并把导航项指回首页锚点。
 */
export function Navbar() {
  const scrolled = useScrollState(40);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  const ids = siteConfig.nav.map((n) => n.id);
  const active = useActiveSection(isHome ? ids : []);
  const solid = scrolled || !isHome;

  const go = (e, id) => {
    e.preventDefault();
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="返回首页">
          <span className="nav__brand-mark">{siteConfig.brand}</span>
          <span className="nav__brand-dot" aria-hidden="true" />
        </Link>

        <div className="nav__right">
          <nav className="nav__links" aria-label="主导航">
            {siteConfig.nav.map((item, i) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className={`nav__link ${isHome && active === item.id ? 'is-active' : ''}`}
                onClick={(e) => go(e, item.id)}
              >
                <span className="nav__link-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav__link-text">{item.label}</span>
                <span className="nav__link-zh">{item.zh}</span>
              </a>
            ))}
          </nav>

          <span className="nav__sep" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
      <span className="nav__hairline" aria-hidden="true" />
    </header>
  );
}

export default Navbar;
