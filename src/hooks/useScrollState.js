import { useEffect, useState } from 'react';

/**
 * 返回页面是否已滚动超过阈值，用于导航栏从透明切到毛玻璃。
 * @param {number} threshold 触发阈值（px）
 */
export function useScrollState(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return scrolled;
}

export default useScrollState;
