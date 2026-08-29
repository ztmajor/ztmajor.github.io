/**
 * 界面文案（i18n）配置。
 *
 * 把散落在组件里的 UI 标签（区块标题、按钮、aria 文案、占位文字等）集中到这里，
 * 方便之后做语言切换：改 `lang` 即可整站切换；后续接入切换 UI 时，把 `lang`
 * 变成 React 状态 / Context 即可实时切换，无需再改组件。
 *
 * 使用方式：应用根部用 `<I18nProvider>` 包裹（见 src/main.jsx）；组件里
 * `import { useI18n } from '../../hooks/useI18n.jsx'`，再 `const { t } = useI18n()`，
 * 然后点分路径取值，例如 `t('profile.contact')`。
 */

export const i18nConfig = {
  /** 默认语言：'zh' | 'en'；运行时语言由 useI18n 的 Provider 管理（localStorage 持久化） */
  lang: 'zh',

  messages: {
    zh: {
      nav: {
        aria: '主导航',
        home: '返回首页',
      },
      profile: {
        aria: '个人信息',
        online: '在线',
        contact: '联系方式',
        skills: '浓度',
      },
      works: {
        titleMain: '作品',
        titleSub: 'WORKS',
        countSuffix: '个项目',
        empty: '暂无作品。',
        more: '// 更多作品敬请期待',
      },
      workCard: {
        view: '查看作品',
        noImage: '暂无图片',
      },
      workDetail: {
        back: '返回作品集',
        navAria: '作品导航',
        prev: '上一篇',
        next: '下一篇',
        all: '全部作品',
      },
      footer: {
        status: '状态：',
        signature: '签名',
      },
      home: {
        introNum: '01 / 关于',
        about: '关于我',
        aboutSub: 'About',
      },
      notFound: {
        title: '这个页面不在索引里',
        text: 'resource not found — 也许它还在开发中。',
        back: '回到首页',
      },
    },

    en: {
      nav: {
        aria: 'Main navigation',
        home: 'Back to home',
      },
      profile: {
        aria: 'Personal info',
        online: 'Online',
        contact: 'Contact',
        skills: 'Concentration',
      },
      works: {
        titleSub: '作品',
        titleMain: 'WORKS',
        countSuffix: 'PROJECTS',
        empty: 'No works yet.',
        more: '// more coming soon',
      },
      workCard: {
        view: 'View work',
        noImage: 'NO IMAGE',
      },
      workDetail: {
        back: 'BACK TO WORKS',
        navAria: 'Work navigation',
        prev: 'PREV',
        next: 'NEXT',
        all: 'All works',
      },
      footer: {
        status: 'Status:',
        signature: 'Signature',
      },
      home: {
        introNum: '01 / PROFILE',
        about: 'ABOUT',
        aboutSub: '关于我',
      },
      notFound: {
        title: 'This page is not in the index',
        text: 'resource not found — maybe it is still under development.',
        back: 'Back to home',
      },
    },
  },
};

/** 纯函数：按指定语言取文案。键名用点分路径，如 translate('zh', 'profile.contact')；缺失时回退为键名本身 */
export function translate(lang, key) {
  const keys = key.split('.');
  let value = i18nConfig.messages[lang];
  for (const k of keys) {
    if (value == null) break;
    value = value[k];
  }
  return value ?? key;
}

export default i18nConfig;
