import './ThemeToggle.css';
import useTheme from '../../hooks/useTheme.js';

/** 昼夜模式切换：胶囊滑块 + 日/月图标 */
export function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={`tt ${isLight ? 'is-light' : ''}`}
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? '切换到暗色模式' : '切换到亮色模式'}
      title={isLight ? 'LIGHT / 亮色' : 'DARK / 暗色'}
    >
      {/* 滑块 */}
      <span className="tt__knob" aria-hidden="true" />

      {/* 月 */}
      <span className="tt__icon tt__icon--moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
        </svg>
      </span>

      {/* 日 */}
      <span className="tt__icon tt__icon--sun" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
        </svg>
      </span>
    </button>
  );
}

export default ThemeToggle;
