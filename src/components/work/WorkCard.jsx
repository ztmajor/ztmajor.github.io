import { Link } from 'react-router-dom';
import './WorkCard.css';
import Icon from '../ui/Icon.jsx';
import useReveal from '../../hooks/useReveal.js';

/**
 * 作品卡片。整卡可点，跳转到 /works/:slug。
 * @param {object} work  作品数据（见 src/content/works/*.js）
 * @param {number} index 序号，用于左上角编号与进场延迟
 */
export function WorkCard({ work, index = 0 }) {
  const revealRef = useReveal();

  return (
    <article
      ref={revealRef}
      className="wcard reveal"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <Link to={`/works/${work.slug}`} className="wcard__link" aria-label={`查看作品 ${work.title}`}>
        {/* --- 封面 --- */}
        <div className="wcard__cover">
          {work.cover ? (
            <img src={work.cover} alt="" loading="lazy" />
          ) : (
            <span className="wcard__cover-empty" aria-hidden="true">
              NO IMAGE
            </span>
          )}
          <span className="wcard__cover-veil" aria-hidden="true" />
          <span className="wcard__cover-scan" aria-hidden="true" />
          <span className="wcard__index mono-label" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* --- 内容 --- */}
        <div className="wcard__body">
          <div className="wcard__meta">
            <span className="wcard__eyebrow mono-label">{work.eyebrow}</span>
            {work.year && <span className="wcard__year">{work.year}</span>}
          </div>

          <h3 className="wcard__title">
            {work.title}
            <Icon name="arrow" size={17} className="wcard__arrow" />
          </h3>

          <p className="wcard__summary">{work.summary}</p>

          {/* --- 关键数据高亮 --- */}
          {work.stats?.length > 0 && (
            <dl className="wcard__stats">
              {work.stats.map((s) => (
                <div key={s.label} className="wcard__stat">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* --- 标签 --- */}
          <div className="wcard__tags">
            {work.tags?.map((t) => (
              <span key={t} className="wcard__tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <span className="wcard__glow" aria-hidden="true" />
      </Link>
    </article>
  );
}

export default WorkCard;
