/**
 * 站点级配置：品牌、导航、Hero、Footer。
 * 只改这里就能改动首页大部分文案，不需要碰组件代码。
 */

export const siteConfig = {
  /** 浏览器标签页标题 */
  title: 'AI Engineer · Portfolio',

  /** 左上角品牌标记（建议 2-4 个字符） */
  brand: 'Info/ztmajor',

  /** 导航项：id 需与首页 section 的 id 对应，用于滚动定位与高亮 */
  nav: [
    { id: 'hero', label: 'HOME', zh: '首页' },
    { id: 'profile', label: 'PROFILE', zh: '关于' },
    { id: 'works', label: 'WORKS', zh: '作品' },
  ],

  hero: {
    /** 标题上方的小字（等宽字体，字距拉开） */
    eyebrow: '人工智能工程师 / AI ENGINEER',
    /** 大标题，逐行渲染。accent: true 的行使用电光蓝 */
    titleLines: [
      { text: 'Curious.', accent: false },
      { text: 'Systematic.', accent: true },
      { text: 'Playful.', accent: false },
    ],
    /** 副标题（中文细体） */
    subtitle:
      '做 AI 应用的工程师。白天训模型、写推理管线，晚上把它们塞进游戏、二次元和各种奇怪的小玩意里。',
    /** 终端打字机效果依次播放的行 */
    typewriter: [
      'initializing neural runtime...',
      'loading anime_taste.weights ✓',
      'ready. 欢迎来到我的主页。',
    ],
    /** 主/次按钮，href 支持 #anchor（页内滚动）或外链 */
    actions: [
      { label: '查看作品', href: '#works', variant: 'primary' },
      { label: '查看个人信息', href: '#profile', variant: 'ghost' },
    ],
    /** 底部滚动提示 */
    scrollHint: '下滑 / SCROLL',
  },

  footer: {
    /** 左侧终端状态：在 statusStates 之间循环切换 */
    statusStates: ['Online', '正在深度思考中', 'Compiling dreams', '摸鱼中'],
    /** 版权信息，{year} 会替换为当前年份 */
    copyright: '© {year} · Built with React + Vite',
    /** 右侧 ASCII / 颜文字签名 */
    signature: '(^-^*)/',
  },
};

export default siteConfig;
