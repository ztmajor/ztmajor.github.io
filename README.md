# MYInfoPage

个人信息展示站。React 18 + Vite 5，暗色 + 电光蓝，面向 PC 端。

## 运行

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # 产物在 dist/
npm run preview
```

用的是 `HashRouter` + `base: './'`，`dist/` 可以直接丢到任意静态托管（含 GitHub Pages 子路径），刷新子路由不会 404。

## 改文案：只动这三处

| 想改什么 | 改哪个文件 |
| --- | --- |
| 品牌、导航、Hero 大标题、打字机、Footer 状态与签名 | `src/config/site.config.js` |
| 头像、姓名、简介、联系方式、技能条 | `src/config/profile.config.js` |
| 颜色、字体、字重、间距、圆角、动效曲线 | `src/styles/tokens.css` |

## 昼夜模式

导航栏右上角的胶囊开关切换，主题写在 `<html data-theme="dark|light">`，配色全部由 `tokens.css` 的两组变量承担，组件 CSS 里不出现硬编码颜色。

首次访问跟随系统 `prefers-color-scheme`；手动切过之后记在 `localStorage`（键名 `myinfopage-theme`），并且不再被系统偏好覆盖。`index.html` 里有一段内联脚本在首次绘制前定好主题，避免刷新闪一下另一套配色。

改亮色配色只需动 `tokens.css` 里 `[data-theme='light']` 那一段。

技能条的 `value` 是 0-100，`type` 决定颜色：`hp` 电光蓝（核心技能）、`mp` 靛蓝紫（次要）、`exp` 琥珀金（兴趣）。

头像：把图片放进 `public/`，然后把 `profile.config.js` 的 `avatar` 写成 `'./avatar.png'`；留空则显示首字母占位。

## 新增一个 work

1. 在 `src/content/works/` 下新建 `<slug>.js`，照 `autolink.js` 的字段写
2. 图片放 `public/works/<slug>/`，路径写 `'./works/<slug>/xxx.png'`
3. 在 `src/content/works/index.js` 里 import 并加进 `works` 数组（数组顺序即展示顺序）

卡片、路由 `/works/<slug>`、上下篇导航都会自动生成，不用改组件。

### 作品数据字段

```js
{
  slug, title, eyebrow, year,
  summary,          // 卡片摘要
  tagline,          // 详情页大段介绍，缺省时回退到 summary
  tags: [],         // 技术标签
  cover,            // 卡片封面
  stats: [{ label, value }],        // 卡片与详情页的关键数据高亮
  links: [{ label, href, primary }],
  blocks: [],       // 详情页正文，见下
}
```

### blocks 支持的类型

| type | 字段 | 说明 |
| --- | --- | --- |
| `heading` / `subheading` | `text` | 章节标题 / 小标题 |
| `paragraph` | `text` | 段落 |
| `list` | `items: [{ term?, text }]` | 要点列表 |
| `gallery` | `items: [{ src, alt, caption }]`、`frame?` | 图片组；`frame` 是画框比例，默认 `'4 / 3'`，小图建议 `'16 / 5'` |
| `cards` | `items: [{ title, text }]` | 卡片组，适合「待解决的问题」 |
| `code` | `code`、`lang?` | 代码或目录树 |
| `flow` | `steps: []` | 横向流程链 |

`paragraph` / `list` / `cards` 的文本里可以用 `` `code` `` 和 `**加粗**`，由 `src/components/work/inline.jsx` 解析。

## 目录结构

```
src/
  config/          站点与个人信息配置（改文案只看这里）
  content/works/   每个作品一个数据文件 + 注册表
  components/
    layout/        Navbar（滚动后毛玻璃 + 昼夜开关）、Footer（终端状态条）
    sections/      Hero、ProfileSidebar、WorksFeed
    work/          WorkCard、BlockRenderer、inline
    ui/            RippleButton、SkillBar、CursorGlow、Typewriter、ThemeToggle、Icon
  hooks/           useCursorGlow / useScrollState / useReveal / useActiveSection / useTheme
  pages/           Home、WorkDetail、NotFound
  styles/          tokens.css（双主题设计变量）、base.css（全局）
public/works/      作品图片素材
```

## 实现要点

- 光标跟随：`useCursorGlow` 用 rAF 写 CSS 变量做惯性插值，不触发 React 重渲染；`prefers-reduced-motion` 和触屏下自动关闭
- SSR 出货闪光：`RippleButton` 点击时叠加涟漪扩散 + 高光斜扫 + 边框爆闪 + 四射星芒
- 导航栏：滚动 40px 后贴顶并加毛玻璃，同时用 IntersectionObserver 高亮当前 section
- 侧栏「智能吸附」：卡片不高于视口时正常吸在导航栏下方；高于视口时把 sticky 的 `top` 设成负值，让卡片底部贴住视口底部 —— 往下滚就能看完整张卡，不需要卡片内部再出现滚动条。高度由 ResizeObserver 实时重算
- 字体：英文数字 JetBrains Mono，中文 Noto Sans SC Light，走 Google Fonts CDN，离线时回退到系统等宽 / 苹方 / 微软雅黑

## 已知素材问题

- `public/works/autolink/diagram.jpg` 带 UNREGISTERED 水印（画图工具试用版留下的）
- `endless.jpg` 299×77、`fast.jpg` 157×86，是模式标签小图而非地图截图，所以那组图集用了 `frame: '16 / 5'`
