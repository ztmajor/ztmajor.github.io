import { useCallback, useEffect, useState } from 'react';

const KEY = 'myinfopage-theme';

/** 读取初始主题：本地记录优先，其次跟随系统 */
function readInitial() {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage?.getItem(KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * 昼夜模式。主题写在 <html data-theme>，配色切换由 tokens.css 承担。
 * @returns {[('dark'|'light'), () => void]} [当前主题, 切换函数]
 */
export function useTheme() {
  const [theme, setTheme] = useState(readInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage?.setItem(KEY, theme);
    } catch {
      /* 隐私模式下 localStorage 可能不可写，忽略 */
    }
  }, [theme]);

  // 用户没手动选过时，跟随系统切换
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!mq) return;
    const onChange = (e) => {
      if (window.localStorage?.getItem(KEY)) return;
      setTheme(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggle];
}

export default useTheme;
