import { useEffect } from 'react';

/**
 * 光标跟随光晕。
 * 用 rAF 节流 + 直接写 CSS 变量（不触发 React 重渲染），并做线性插值让光晕带一点惯性。
 */
export function useCursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // 惯性跟随：每帧向目标移动 12%
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      root.style.setProperty('--cursor-x', `${x.toFixed(1)}px`);
      root.style.setProperty('--cursor-y', `${y.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default useCursorGlow;
