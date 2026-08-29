import { useEffect, useState } from 'react';
import './Lightbox.css';
import Icon from './Icon.jsx';

/**
 * 图片灯箱：点击作品图片后放大预览。
 * 支持左右切换、Esc 关闭、点击遮罩关闭，打开时锁定背景滚动。
 *
 * @param {Array}    items      [{ src, alt?, caption? }]
 * @param {number}   startIndex 初始展示的图片下标
 * @param {Function} onClose    关闭回调
 */
export function Lightbox({ items = [], startIndex = 0, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const total = items.length;
  const item = items[current];

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // 键盘：Esc 关闭、← → 切换
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (total > 1 && e.key === 'ArrowLeft') {
        prev();
      } else if (total > 1 && e.key === 'ArrowRight') {
        next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // 打开时锁定背景滚动
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!item) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? item.alt ?? '图片预览'}
      onClick={(e) => {
        // 仅点击遮罩空白处关闭，避免点按钮/图片时误触发
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="lightbox__btn lightbox__close"
        onClick={onClose}
        aria-label="关闭"
        autoFocus
      >
        <Icon name="x" size={20} />
      </button>

      {total > 1 && (
        <button
          type="button"
          className="lightbox__btn lightbox__nav lightbox__nav--prev"
          onClick={prev}
          aria-label="上一张"
        >
          <Icon name="back" size={20} />
        </button>
      )}

      {total > 1 && (
        <button
          type="button"
          className="lightbox__btn lightbox__nav lightbox__nav--next"
          onClick={next}
          aria-label="下一张"
        >
          <Icon name="arrow" size={20} />
        </button>
      )}

      <figure className="lightbox__fig">
        <img className="lightbox__img" src={item.src} alt={item.alt ?? ''} />
        {item.caption && <figcaption className="lightbox__caption">{item.caption}</figcaption>}
      </figure>

      {total > 1 && (
        <span className="lightbox__count mono-label">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      )}
    </div>
  );
}

export default Lightbox;
