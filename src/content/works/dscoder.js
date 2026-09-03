/**
 * DSCoder 作品数据。
 */
const dscoder = {
  slug: 'dscoder',
  title: 'DSCoder',
  eyebrow: '创建者 / Creator',
  year: '2026',
  summary:
    'DeepSeek Harness 桌面版。通过插件开发内部其他功能。内置固定版本DSH Core。',
  tags: ['Tauri', 'DeepSeek Harness', '文件树', 'highlight.js', '本地git', '自动化看板'],
  cover: './works/dscoder/ui1.png',
  stats: [
    { label: '安装包', value: '74.2M' },
    { label: '启动', value: '<3s' },
    { label: '版本', value: '更新中' },
  ],
  links: [{ label: '查看 GitHub 仓库', href: 'https://github.com/ztmajor/DSCoder', primary: true }],

  tagline:
    'Tauri 桌面版 DeepSeek Harness —— 个人定制版。',

  blocks: [
    { type: 'heading', text: '项目简介' },
    {
      type: 'paragraph',
      text: '最近重度依赖 DSH（DeepSeek Harness），但每次都得在不同设备上先打开终端再敲命令的方式启动，实在麻烦。去社区找现成的桌面套壳方案，发现很多项目确实能用，但普遍集成了大量我用不上的插件，不够清爽。',
    },
    {
      type: 'paragraph',
      text: '其实我也试过 VS Code 里的 DSH 插件版——毕竟我是 VS Code 的重度用户——但恰巧我刚写完一个 Tauri 项目，手正热，想再拿 Tauri 练练手巩固一下，于是决定自己写一个。',
    },
    {
      type: 'paragraph',
      text: '最初的版本只是个纯套壳，能把官方 Web UI 装进桌面就行。后来越用越觉得，既然壳是我自己的，不如把真正顺手的功能加进去。于是陆陆续续集成并修改了几款插件：有些来自社区的优秀参考，有些是我自己想到的点子。经过逐步打磨，才有了现在这个刚刚好、不多不少的 DSCoder。',
    },
    {
      type: 'gallery',
      frame: '16 / 10',
      items: [
        { src: './works/dscoder/ui1.png', alt: 'DSCoder 对话界面', caption: '对话界面' },
        { src: './works/dscoder/ui2.png', alt: 'DSCoder 文件界面', caption: '文件界面' },
      ],
    },
    {
      type: 'gallery',
      items: [
        { src: './works/dscoder/highlight.png', alt: '代码高亮功能截图', caption: '代码高亮' },
        { src: './works/dscoder/version.png', alt: '本地版本管理功能截图', caption: '本地版本管理' },
      ],
    },

    { type: 'heading', text: '核心特性' },
    {
      type: 'list',
      items: [
        { term: '启动快', text: 'Tauri 桌面壳，直接复用 DeepSeek Harness 官方 Web UI 的完整能力。' },
        { term: '开箱即用', text: '安装包内嵌 Node + dsh 运行时，目标机器免装 Node、免联网即可运行。' },
        { term: '实用插件', text: '置文件树 / 标签页 / 终端、余额信息栏 / 本地版本管理 / 任务看板 等插件，首次启动自动装好' },
        { term: '自动更新', text: 'GitHub Releases 驱动，发现新版弹窗提示，一键更新并自动重启' },
        { term: '干净隔离', text: '运行时与数据全部收进独立目录，不碰安装的其他 dsh' },
        { term: '代码高亮', text: '使用 highlight.js 实现语法高亮，增强文本代码的可读性' },
        { term: '本地代码管理（BETA）', text: '构建 .dsh-git 文件，实现本地版本管理。方便回滚，无需把代码托管到云端' },
      ],
    },

    { type: 'heading', text: '工作原理' },
    {
      type: 'paragraph',
      text: 'DSCoder 把 DeepSeek Harness（dsh）作为 sidecar 子进程拉起，等待其就绪后，窗口直接导航到官方 Web UI（同源加载，天然通过 dsh 的鉴权栅栏）。Rust 侧只负责进程管理，不重复实现前端能力。',
    },
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
  ],
};

export default dscoder;
