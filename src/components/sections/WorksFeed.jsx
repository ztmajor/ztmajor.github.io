import './WorksFeed.css';
import { works } from '../../content/works/index.js';
import { useI18n } from '../../hooks/useI18n.jsx';
import WorkCard from '../work/WorkCard.jsx';

/**
 * 右侧内容流：作品列表。数据来自 works 注册表，新增作品无需改这里。
 */
export function WorksFeed() {
  const { t } = useI18n();
  return (
    <div className="feed">
      <header className="feed__head">
        <h2 className="feed__title">
          <span className="feed__title-zh">{t('works.titleMain')}</span>
          <span className="feed__title-en">{t('works.titleSub')}</span>
        </h2>
        <span className="feed__count mono-label">
          {String(works.length).padStart(2, '0')} {t('works.countSuffix')}
        </span>
      </header>

      <div className="feed__list">
        {works.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>

      {works.length === 0 && <p className="feed__empty">{t('works.empty')}</p>}

      <p className="feed__more mono-label">{t('works.more')}</p>
    </div>
  );
}

export default WorksFeed;
