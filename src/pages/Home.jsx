import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import Hero from '../components/sections/Hero.jsx';
import ProfileSidebar from '../components/sections/ProfileSidebar.jsx';
import WorksFeed from '../components/sections/WorksFeed.jsx';
import profileConfig from '../config/profile.config.js';
import { useI18n } from '../hooks/useI18n.jsx';
import useReveal from '../hooks/useReveal.js';

export function Home() {
  const { t } = useI18n();
  const location = useLocation();
  const introRef = useReveal();

  // 从详情页点导航返回首页时，滚到对应锚点
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    // 等一帧，确保 DOM 已挂载
    const raf = requestAnimationFrame(() => {
      if (target === 'hero') {
        window.scrollTo({ top: 0 });
        return;
      }
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [location.state]);

  return (
    <>
      <Hero />

      {/* --- 关于我：分节带，同时作为 #profile 锚点 --- */}
      <section className="intro" id="profile">
        <div className="intro__inner" ref={introRef}>
          <span className="intro__num mono-label">{t('home.introNum')}</span>
          <h2 className="intro__title">
            {t('home.about')}<span className="intro__slash">/</span>
            <span className="intro__title-en">{t('home.aboutSub')}</span>
          </h2>
          <p className="intro__text">{profileConfig.bio[0]}</p>
        </div>
      </section>

      {/* --- 双列：左侧固定信息栏 + 右侧作品流 --- */}
      <div className="split">
        <div className="split__inner">
          <ProfileSidebar />
          <main className="split__content" id="works">
            <WorksFeed />
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
