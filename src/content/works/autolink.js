/**
 * AutoLink 作品数据。
 * blocks 支持的类型见 src/components/work/BlockRenderer.jsx。
 */
const autolink = {
  slug: 'autolink',
  title: 'AutoLink',
  eyebrow: 'OPEN SOURCE / COMPUTER VISION',
  year: '2024',
  /** 卡片与列表页用的一句话摘要 */
  summary:
    '基于图像识别与深度学习的连连看自动操作器。截图识别地图，算法求解可消去方块对，再模拟点击自动通关。',
  tags: ['Python', 'PyTorch', 'OpenCV', 'Win32 API'],
  /** 卡片封面图（public 下的相对路径） */
  cover: './works/autolink/cover.png',
  /** 卡片上的关键数据高亮 */
  stats: [
    { label: 'MODULES', value: '6' },
    { label: 'MAP SIZE', value: '11×8' },
    { label: 'MODE', value: 'AUTO' },
  ],
  links: [{ label: '查看 GitHub 仓库', href: 'https://github.com/ztmajor/AutoLink', primary: true }],

  tagline:
    '基于图像识别与深度学习的连连看自动操作器。通过截图识别游戏地图，用算法求解可消去的方块对，再模拟鼠标点击完成整局自动通关。',

  blocks: [
    { type: 'heading', text: '项目简介' },
    {
      type: 'paragraph',
      text: 'AutoLink 面向 Windows 平台的单机连连看游戏（运行在雷电模拟器中），实现了从截图、识图、求解到模拟点击的完整自动化闭环，目标是无人值守地持续通关。',
    },
    {
      type: 'gallery',
      items: [
        { src: './works/autolink/cover.png', alt: 'AutoLink 主菜单界面', caption: '游戏主菜单界面' },
        { src: './works/autolink/diagram.jpg', alt: 'AutoLink 类图', caption: '核心模块类图' },
      ],
    },

    { type: 'heading', text: '实现思路' },
    { type: 'paragraph', text: '整套流程由六个模块协作完成：' },
    {
      type: 'list',
      items: [
        { term: '图像获取器', text: '截取模拟器窗口画面，供后续识别使用' },
        {
          term: '图像处理器',
          text: '用模板匹配定位按钮，按格切分游戏区域，用 CNN 识别每格图案，生成数字矩阵；再验证消除条件、求解可消去的方块对',
        },
        { term: '输出模拟器', text: '模拟鼠标点击识别到的按钮位置与待消除的方块坐标' },
        { term: '数据集生成器', text: '对原始截图重命名、循环平移，扩充 CNN 训练数据' },
        { term: '神经网络训练测试器', text: '基于 PyTorch 训练并测试方块分类模型' },
        { term: '日志生成器', text: '记录运行过程，便于排查问题' },
      ],
    },
    {
      type: 'flow',
      steps: ['识别并点击进入模式', '截图切块生成矩阵', '求解', '模拟点击消除', '检测下一关提示', '循环'],
    },

    { type: 'heading', text: '特殊情况处理' },
    { type: 'paragraph', text: '连连看的几种变体地图都需要特别应对：' },
    {
      type: 'list',
      items: [
        {
          term: '地图规格变化',
          text: '无尽模式为 7×6，极速模式为 11×8，通过调整 `ROW_NUM` / `COL_NUM` 适配',
        },
        { term: '消除后重排', text: '部分地图每消去一对方块会改变剩余布局，无解时游戏会自动重排' },
        { term: '刷新新方块', text: '地狱模式会在消去若干对后刷出新方块' },
      ],
    },
    {
      type: 'paragraph',
      text: '以上情况统一采用**单对解生成**策略：每次只求解一对可消除的方块并立即执行，避免因布局变化导致的批量误判。',
    },
    {
      type: 'gallery',
      // 这两张素材是很小的模式标签图（299×77 / 157×86），用扁画框避免留白
      frame: '16 / 5',
      items: [
        { src: './works/autolink/endless.jpg', alt: '无尽模式截图', caption: '无尽模式（7×6）' },
        { src: './works/autolink/fast.jpg', alt: '极速模式截图', caption: '极速模式（11×8）' },
      ],
    },

    { type: 'heading', text: '待解决的问题' },
    {
      type: 'cards',
      items: [
        {
          title: '连击特效遮挡识别',
          text: '连续消除成功会出现“连击数”字样遮挡地图，若等待特效消失再截图会拖慢速度，不等待则可能影响图像识别准确率。计划通过扩充带遮挡样本的数据集来缓解。',
        },
        {
          title: '依赖绝对屏幕坐标',
          text: '当前点击基于屏幕绝对坐标，要求模拟器窗口固定停靠在屏幕左上角，尚未实现基于窗口相对位置的点击。',
        },
      ],
    },
  ],
};

export default autolink;
