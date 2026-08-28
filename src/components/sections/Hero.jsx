import './Hero.css';
import siteConfig from '../../config/site.config.js';
import RippleButton from '../ui/RippleButton.jsx';
import Typewriter from '../ui/Typewriter.jsx';

/**
 * 全屏 Hero。背景由网格、两团柔光、扫描线组成，全部为装饰层。
 */
export function Hero() {
  const { eyebrow, titleLines, subtitle, typewriter, actions, scrollHint } = siteConfig.hero;

  const handleAction = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="hero">
      {/* --- 装饰背景 --- */}
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid" />
        <span className="hero__blob hero__blob--a" />
        <span className="hero__blob hero__blob--b" />
        <span className="hero__scan" />
        <span className="hero__vignette" />
      </div>

      {/* --- 四角 HUD 装饰 --- */}
      <span className="hero__corner hero__corner--tl" aria-hidden="true" />
      <span className="hero__corner hero__corner--br" aria-hidden="true" />

      <div className="hero__inner">
        <p className="hero__eyebrow mono-label">
          <span className="hero__eyebrow-bar" aria-hidden="true" />
          {eyebrow}
        </p>

        <h1 className="hero__title">
          {titleLines.map((line, i) => (
            <span
              key={i}
              className={`hero__title-line ${line.accent ? 'is-accent' : ''}`}
              style={{ animationDelay: `${0.12 + i * 0.11}s` }}
              data-text={line.text}
            >
              {line.text}
            </span>
          ))}
        </h1>

        <p className="hero__subtitle">{subtitle}</p>

        <div className="hero__terminal">
          <Typewriter lines={typewriter} />
        </div>

        <div className="hero__actions">
          {actions.map((action) => {
            const external = /^https?:\/\//.test(action.href);
            return (
              <RippleButton
                key={action.label}
                as="a"
                href={action.href}
                variant={action.variant === 'primary' ? 'primary' : 'ghost'}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onClick={(e) => handleAction(e, action.href)}
              >
                {action.label}
              </RippleButton>
            );
          })}
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-text">{scrollHint}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
