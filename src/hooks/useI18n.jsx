import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { i18nConfig, translate } from '../config/i18n.config.js';

const KEY = 'myinfopage-lang';

const I18nContext = createContext(null);

/** 读取初始语言：本地记录优先，其次回退到 config 默认值 */
function readInitial() {
  if (typeof window === 'undefined') return i18nConfig.lang;
  const saved = window.localStorage?.getItem(KEY);
  return saved === 'zh' || saved === 'en' ? saved : i18nConfig.lang;
}

/**
 * 语言 Provider：持有当前语言，并把响应式的 `t` / `toggle` 下发到整棵组件树。
 * 切换语言时所有使用 useI18n 的组件会自动重渲染（实时切换）。
 */
export function I18nProvider({ children }) {
  const [lang, setLang] = useState(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage?.setItem(KEY, lang);
    } catch {
      /* 隐私模式下 localStorage 可能不可写，忽略 */
    }
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((l) => (l === 'zh' ? 'en' : 'zh'));
  }, []);

  const value = useMemo(
    () => ({
      lang,
      t: (key) => translate(lang, key),
      toggle,
    }),
    [lang, toggle],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** 在组件里取语言能力：`const { t, lang, toggle } = useI18n()` */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n 必须在 I18nProvider 内使用');
  return ctx;
}

export default useI18n;
