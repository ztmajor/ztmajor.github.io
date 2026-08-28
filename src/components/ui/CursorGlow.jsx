import './CursorGlow.css';
import useCursorGlow from '../../hooks/useCursorGlow.js';

/**
 * 全局光标跟随层：一个大范围径向渐变 + 一个更小的几何光晕环。
 * 位置由 useCursorGlow 写入的 --cursor-x / --cursor-y 驱动。
 */
export function CursorGlow() {
  useCursorGlow();

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="cursor-layer__radial" />
      <div className="cursor-layer__ring" />
    </div>
  );
}

export default CursorGlow;
