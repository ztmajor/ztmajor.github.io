import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import CursorGlow from './components/ui/CursorGlow.jsx';
import Home from './pages/Home.jsx';
import WorkDetail from './pages/WorkDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import siteConfig from './config/site.config.js';

/**
 * 应用外壳：全局光晕 + 导航 + 路由出口 + Footer。
 * 新增页面只需在 Routes 里加一条。
 */
export function App() {
  const { pathname } = useLocation();

  // 同步文档标题
  useEffect(() => {
    document.title = siteConfig.title;
  }, []);

  // 路由切换（非首页锚点跳转）时置顶
  useEffect(() => {
    if (pathname === '/') return;
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <CursorGlow />
      <Navbar />

      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works/:slug" element={<WorkDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
