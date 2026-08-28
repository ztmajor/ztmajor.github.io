import { useCallback, useRef, useState } from 'react';
import './RippleButton.css';

let uid = 0;

/**
 * 带「SSR 出货闪光」点击特效的按钮。
 * 点击时同时播放：以点击点为圆心的涟漪扩散 + 全按钮高光扫过 + 边框爆闪 + 四射星芒。
 *
 * @param {'primary'|'ghost'|'bare'} variant 视觉样式
 * @param {'a'|'button'|'link'} as          渲染成什么标签（link 由外部包 Link 时用 'bare'）
 */
export function RippleButton({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  onClick,
  href,
  target,
  rel,
  ...rest
}) {
  const [bursts, setBursts] = useState([]);
  const nodeRef = useRef(null);

  const spawn = useCallback((e) => {
    const el = nodeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // 键盘触发（clientX 为 0）时从中心扩散
    const cx = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const cy = e.clientY ? e.clientY - rect.top : rect.height / 2;
    // 半径取到最远角，保证涟漪铺满
    const radius = Math.hypot(Math.max(cx, rect.width - cx), Math.max(cy, rect.height - cy));

    const id = ++uid;
    setBursts((prev) => [...prev, { id, cx, cy, radius }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 900);
  }, []);

  const handleClick = (e) => {
    spawn(e);
    onClick?.(e);
  };

  const Tag = as === 'a' ? 'a' : as === 'bare' ? 'span' : 'button';

  return (
    <Tag
      ref={nodeRef}
      className={`rb rb--${variant} ${className}`}
      onClick={handleClick}
      {...(Tag === 'a' ? { href, target, rel } : {})}
      {...(Tag === 'button' ? { type: 'button' } : {})}
      {...rest}
    >
      <span className="rb__label">{children}</span>

      {bursts.map((b) => (
        <span key={b.id} className="rb__burst" aria-hidden="true">
          {/* 涟漪 */}
          <span
            className="rb__ripple"
            style={{ left: b.cx, top: b.cy, width: b.radius * 2, height: b.radius * 2 }}
          />
          {/* 高光扫过 */}
          <span className="rb__sheen" />
          {/* 边框爆闪 */}
          <span className="rb__flash" />
          {/* 四射星芒 */}
          <span className="rb__spark" style={{ left: b.cx, top: b.cy }}>
            <i style={{ '--a': '0deg' }} />
            <i style={{ '--a': '90deg' }} />
            <i style={{ '--a': '45deg' }} />
            <i style={{ '--a': '135deg' }} />
          </span>
        </span>
      ))}
    </Tag>
  );
}

export default RippleButton;
