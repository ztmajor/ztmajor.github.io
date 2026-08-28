import './WorksFeed.css';
import { works } from '../../content/works/index.js';
import WorkCard from '../work/WorkCard.jsx';

/**
 * 右侧内容流：作品列表。数据来自 works 注册表，新增作品无需改这里。
 */
export function WorksFeed() {
  return (
    <div className="feed">
      <header className="feed__head">
        <h2 className="feed__title">
          <span className="feed__title-en">WORKS</span>
          <span className="feed__title-zh">作品</span>
        </h2>
        <span className="feed__count mono-label">
          {String(works.length).padStart(2, '0')} PROJECTS
        </span>
      </header>

      <div className="feed__list">
        {works.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>

      {works.length === 0 && <p className="feed__empty">暂无作品。</p>}

      <p className="feed__more mono-label">// more coming soon</p>
    </div>
  );
}

export default WorksFeed;
