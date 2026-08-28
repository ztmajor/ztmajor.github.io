import './BlockRenderer.css';
import inline from './inline.jsx';
import useReveal from '../../hooks/useReveal.js';

/**
 * 作品详情页的内容块渲染器。
 *
 * 支持的 block 类型：
 *   { type: 'heading',    text }                        章节标题
 *   { type: 'subheading', text }                        小标题
 *   { type: 'paragraph',  text }                        段落（支持 `code` / **bold**）
 *   { type: 'list',       items: [{term?, text}] }      要点列表
 *   { type: 'gallery',    items: [{src, alt, caption}] } 图片组（两列）
 *   { type: 'cards',      items: [{title, text}] }      卡片组（如「待解决的问题」）
 *   { type: 'code',       code, lang? }                 代码 / 目录树
 *   { type: 'flow',       steps: [] }                   横向流程链
 */
function Block({ block }) {
  const ref = useReveal({ threshold: 0.08 });

  switch (block.type) {
    case 'heading':
      return (
        <h2 className="blk-h2 reveal" ref={ref}>
          <span className="blk-h2__bar" aria-hidden="true" />
          {block.text}
        </h2>
      );

    case 'subheading':
      return (
        <h3 className="blk-h3 reveal" ref={ref}>
          {block.text}
        </h3>
      );

    case 'paragraph':
      return (
        <p className="blk-p reveal" ref={ref}>
          {inline(block.text)}
        </p>
      );

    case 'list':
      return (
        <ul className="blk-list reveal" ref={ref}>
          {block.items.map((item, i) => (
            <li key={i}>
              <span className="blk-list__marker" aria-hidden="true" />
              {item.term && <span className="blk-list__term">{item.term}</span>}
              <span className="blk-list__text">{inline(item.text)}</span>
            </li>
          ))}
        </ul>
      );

    case 'gallery':
      return (
        <div className="blk-gallery reveal" ref={ref}>
          {block.items.map((img, i) => (
            <figure key={i} className="blk-fig">
              {/* frame 控制画框比例，小图用扁画框可避免大片留白 */}
              <div className="blk-fig__frame" style={{ aspectRatio: block.frame ?? '4 / 3' }}>
                <img src={img.src} alt={img.alt ?? ''} loading="lazy" />
                <span className="blk-fig__corner" aria-hidden="true" />
              </div>
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );

    case 'cards':
      return (
        <div className="blk-cards reveal" ref={ref}>
          {block.items.map((c, i) => (
            <div key={i} className="blk-card">
              <span className="blk-card__idx mono-label">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="blk-card__title">{c.title}</h4>
              <p className="blk-card__text">{inline(c.text)}</p>
            </div>
          ))}
        </div>
      );

    case 'code':
      return (
        <div className="blk-code reveal" ref={ref}>
          <div className="blk-code__bar">
            <span className="blk-code__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="blk-code__lang mono-label">{block.lang ?? 'text'}</span>
          </div>
          <pre>
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case 'flow':
      return (
        <div className="blk-flow reveal" ref={ref}>
          {block.steps.map((s, i) => (
            <span key={i} className="blk-flow__step">
              <span className="blk-flow__idx">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </span>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function BlockRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  );
}

export default BlockRenderer;
