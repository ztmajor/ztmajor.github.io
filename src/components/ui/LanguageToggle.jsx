import './LanguageToggle.css';
import useI18n from '../../hooks/useI18n.jsx';

/** 语言切换：中 / EN 胶囊开关，样式与 ThemeToggle 保持一致 */
export function LanguageToggle() {
  const { lang, toggle } = useI18n();
  const isEn = lang === 'en';

  return (
    <button
      type="button"
      className={`lt ${isEn ? 'is-en' : ''}`}
      onClick={toggle}
      role="switch"
      aria-checked={isEn}
      aria-label={isEn ? '切换到中文' : 'Switch to English'}
      title={isEn ? 'EN / 中文' : '中文 / EN'}
    >
      {/* 滑块 */}
      <span className="lt__knob" aria-hidden="true" />

      {/* 中 */}
      <span className="lt__label lt__label--zh" aria-hidden="true">
        中
      </span>

      {/* EN */}
      <span className="lt__label lt__label--en" aria-hidden="true">
        EN
      </span>
    </button>
  );
}

export default LanguageToggle;
