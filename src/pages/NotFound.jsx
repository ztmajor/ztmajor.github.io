import { Link } from 'react-router-dom';
import './NotFound.css';
import { useI18n } from '../hooks/useI18n.jsx';

export function NotFound() {
  const { t } = useI18n();
  return (
    <section className="nf">
      <p className="nf__code">404</p>
      <h1 className="nf__title">{t('notFound.title')}</h1>
      <p className="nf__text">
        <span className="nf__prompt">$</span> {t('notFound.text')}
      </p>
      <Link to="/" className="nf__link">
        &larr; {t('notFound.back')}
      </Link>
    </section>
  );
}

export default NotFound;
