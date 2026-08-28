import { useEffect, useState } from 'react';

/**
 * 追踪当前处于视口中的 section，用于导航栏高亮。
 * @param {string[]} ids 需要追踪的 section id 列表
 */
export function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return;

    const visible = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        if (visible.size === 0) return;
        // 取可见比例最大的那个
        const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
        setActive(top);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-15% 0px -35% 0px' },
    );

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [ids.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}

export default useActiveSection;
