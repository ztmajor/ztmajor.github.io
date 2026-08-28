/**
 * DSCoder 作品数据。
 */
const dscoder = {
  slug: 'dscoder',
  title: 'DSCoder',
  eyebrow: 'DESKTOP APP / AI CODING',
  year: '2025',
  summary:
    '干净的 AI 编码壳 —— 基于 Tauri 2 的 DeepSeek Harness 桌面版。不自绘臃肿前端，直接复用官方 Web UI 的完整能力。',
  tags: ['Tauri 2', 'Rust', 'DeepSeek Harness'],
  cover: './works/dscoder/ui1.png',
  stats: [
    { label: 'STARTUP', value: '<1s' },
    { label: 'RUNTIME', value: 'EMBED' },
    { label: 'UPDATE', value: 'AUTO' },
  ],
  links: [{ label: '查看 GitHub 仓库', href: 'https://github.com/ztmajor/DSCoder', primary: true }],

  tagline:
    '干净的 AI 编码壳 —— 基于 Tauri 2 的 DeepSeek Harness 桌面版。不重做臃肿的自绘前端，直接复用官方 Web UI 的完整能力，专注做好一个轻量、稳定的壳。',

  blocks: [
    { type: 'heading', text: '项目简介' },
    {
      type: 'paragraph',
      text: 'DSCoder 把 DeepSeek Harness（dsh）作为 sidecar 子进程拉起，等待其就绪后，窗口直接导航到官方 Web UI（同源加载，天然通过 dsh 的鉴权栅栏）。Rust 侧只负责进程管理，不重复实现前端能力。',
    },
    {
      type: 'gallery',
      // 两张素材均为 1282×832，画框贴合原比例
      frame: '16 / 10',
      items: [
        { src: './works/dscoder/ui1.png', alt: 'DSCoder 主界面', caption: '主界面' },
        { src: './works/dscoder/ui2.png', alt: 'DSCoder 主界面 2', caption: '主界面（另一视图）' },
      ],
    },

    { type: 'heading', text: '核心特性' },
    {
      type: 'list',
      items: [
        { term: '秒级启动', text: 'Tauri 2 桌面壳，直接复用 dsh 官方 Web UI 的完整能力' },
        { term: '内置终端', text: '真实 PTY（`Ctrl` + 反引号 呼出），终端优先的编码体验' },
        { term: 'DeepSeek 驱动', text: '模型、会话、工作区、工具、审批等能力全部由 dsh 提供' },
        {
          term: '开箱即用',
          text: '内置文件树、标签页、终端、余额信息栏、本地版本管理插件，首次启动自动装好',
        },
        { term: '自包含', text: '安装包内嵌 Node + dsh 运行时，目标机器免装 Node、免联网即可运行' },
        { term: '自动更新', text: 'GitHub Releases 驱动，发现新版弹窗提示，一键更新并自动重启' },
        { term: '干净隔离', text: '运行时与数据收进独立目录，不影响全局的 dsh 环境' },
      ],
    },
    {
      type: 'gallery',
      items: [
        { src: './works/dscoder/highlight.png', alt: '代码高亮功能截图', caption: '代码高亮' },
        { src: './works/dscoder/version.png', alt: '本地版本管理功能截图', caption: '本地版本管理' },
      ],
    },

    { type: 'heading', text: '工作原理' },
    { type: 'paragraph', text: 'Rust 侧承担四类职责，其余交由 dsh 官方能力完成：' },
    {
      type: 'list',
      items: [
        {
          term: '运行时自动供给',
          text: '安装包内嵌 `@deepseek-ai/dsh`（锁定版本），首次启动解压到应用数据目录；仅开发态才联网下载',
        },
        { term: '进程监督', text: '端口发现、健康探活、崩溃退避重启、退出联动' },
        { term: '配置与凭证', text: '完全交给官方 UI，写入 `$DSH_HOME` 下的配置与凭证文件' },
        { term: '自动更新', text: '后台检查 GitHub Releases，原生对话框确认后下载安装并重启' },
      ],
    },
    { type: 'subheading', text: '项目结构' },
    {
      type: 'code',
      lang: 'text',
      code: `src-tauri/
  src/                 Rust 后端（进程监督、供给、代理、路径解析）
  resources/           内置 dsh 插件（存在即注册）
    dsh-tabs-terminal/
    dsh-bottom-info-bar/
    dsh-local-git/
    dsh-ui-tweaks/
  tauri.conf.json      Tauri 配置
dist/                  启动占位页（内核就绪后跳转到官方 UI）
docs/                  设计与分析文档
scripts/               构建/发布脚本（预置运行时、生成 updater 清单）`,
    },
  ],
};

export default dscoder;
