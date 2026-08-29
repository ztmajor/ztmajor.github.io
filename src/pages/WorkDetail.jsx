import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './WorkDetail.css';
import { getWorkBySlug, getWorkNeighbors } from '../content/works/index.js';
import { useI18n } from '../hooks/useI18n.jsx';
import BlockRenderer from '../components/work/BlockRenderer.jsx';
import RippleButton from '../components/ui/RippleButton.jsx';
import Icon from '../components/ui/Icon.jsx';
import NotFound from './NotFound.jsx';

export function WorkDetail() {
  const { t } = useI18n();
  const { slug } = useParams();
  const work = getWorkBySlug(slug);
  const { prev, next } = getWorkNeighbors(slug);

  // 切换作品时回到顶部
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!work) return <NotFound />;

  return (
    <article className="wd">
      {/* ---------------- 详情页 Hero ---------------- */}
      <header className="wd__hero">
        <div className="wd__hero-bg" aria-hidden="true">
          <span className="wd__hero-grid" />
          <span className="wd__hero-blob" />
          <span className="wd__hero-fade" />
        </div>

        <div className="wd__hero-inner">
          <Link to="/" state={{ scrollTo: 'works' }} className="wd__back">
            <Icon name="back" size={13} />
            {t('workDetail.back')}
          </Link>

          <p className="wd__eyebrow mono-label">{work.eyebrow}</p>

          <h1 className="wd__title">{work.title}</h1>

          <p className="wd__tagline">{work.tagline ?? work.summary}</p>

          <div className="wd__meta">
            {work.links?.map((link) => (
              <RippleButton
                key={link.href}
                as="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variant={link.primary ? 'primary' : 'ghost'}
              >
                {link.label}
                <Icon name="external" size={13} />
              </RippleButton>
            ))}

            <div className="wd__tags">
              {work.tags?.map((t) => (
                <span key={t} className="wd__tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {work.stats?.length > 0 && (
            <dl className="wd__stats">
              {work.stats.map((s) => (
                <div key={s.label} className="wd__stat">
                  <dt className="mono-label">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      {/* ---------------- 正文 ---------------- */}
      <div className="wd__body">
        <BlockRenderer blocks={work.blocks} />

        {/* ---------------- 上下篇导航 ---------------- */}
        <nav className="wd__nav" aria-label={t('workDetail.navAria')}>
          {prev ? (
            <Link to={`/works/${prev.slug}`} className="wd__nav-item wd__nav-item--prev">
              <span className="mono-label">{t('workDetail.prev')}</span>
              <span className="wd__nav-title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}

          <Link to="/" state={{ scrollTo: 'works' }} className="wd__nav-all">
            {t('workDetail.all')}
          </Link>

          {next ? (
            <Link to={`/works/${next.slug}`} className="wd__nav-item wd__nav-item--next">
              <span className="mono-label">{t('workDetail.next')}</span>
              <span className="wd__nav-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}

export default WorkDetail;
