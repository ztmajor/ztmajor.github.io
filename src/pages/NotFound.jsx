import { Link } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  return (
    <section className="nf">
      <p className="nf__code">404</p>
      <h1 className="nf__title">这个页面不在索引里</h1>
      <p className="nf__text">
        <span className="nf__prompt">$</span> resource not found — 也许它还在开发中。
      </p>
      <Link to="/" className="nf__link">
        &larr; 回到首页
      </Link>
    </section>
  );
}

export default NotFound;
