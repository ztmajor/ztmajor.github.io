import { useEffect, useState } from 'react';
import './Footer.css';
import siteConfig from '../../config/site.config.js';
import { useI18n } from '../../hooks/useI18n.jsx';

/**
 * 极窄 Footer：左侧终端状态（在配置的状态间循环切换），右侧颜文字签名。
 */
export function Footer() {
  const { statusStates, copyright, signature } = siteConfig.footer;
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (statusStates.length < 2) return;
    const timer = window.setInterval(() => {
      setIdx((i) => (i + 1) % statusStates.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [statusStates.length]);

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__status">
          <span className="footer__dot" aria-hidden="true" />
          <span className="footer__prompt" aria-hidden="true">
            $
          </span>
          <span className="footer__label">{t('footer.status')}</span>
          <span key={idx} className="footer__state">
            {statusStates[idx]}
          </span>
          <span className="footer__caret" aria-hidden="true" />
        </div>

        <div className="footer__copy">{copyright.replace('{year}', String(year))}</div>

        <div className="footer__sign" aria-label={t('footer.signature')}>
          {signature}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
