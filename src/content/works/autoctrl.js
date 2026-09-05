/**
 * AutoCTRL 作品数据。
 * blocks 支持的类型见 src/components/work/BlockRenderer.jsx。
 */
const autoctrl = {
  slug: 'autoctrl',
  title: 'AutoCTRL',
  eyebrow: '创建者 / Creator',
  year: '2026',
  /** 卡片与列表页用的一句话摘要 */
  summary:
    '一套客户端‑服务器分离的分布式自动化系统，实现“感知 → 决策 → 执行”完整闭环.已稳定投入实际运行，覆盖 PC（Windows）与 Android 移动端。',
  tags: ['YOLO', 'OCR', 'OpenCV', 'Flask', 'Tauri + Rust', 'Java + XML', 'TFLite'],
  /** 卡片封面图（public 下的相对路径） */
  cover: '',
  /** 卡片上的关键数据高亮 */
  stats: [
    { label: '架构', value: '模块解耦' },
    { label: '操作', value: '半自动' },
    { label: '版本', value: '稳定' },
  ],
  links: [],

  tagline:
    'AutoCTRL 实现了在`Windows`/ `Android`上，半自动运行软件。这里的半自动是指需要人先打开特定软件，然后在客户端选择特定模式，然后点击开始。实现了从截图、识图、求解到模拟点击的完整自动化闭环。',

  blocks: [
    { type: 'heading', text: '项目背景' },
    {
      type: 'paragraph',
      text: '事情的起点，得从一次“被鸽”说起。',
    },
    {
      type: 'paragraph',
      text: '某天，一位朋友兴奋地找到我，说他对某个软件的功能特别着迷，想让我复刻一个，还拉我一起搞。我挺感兴趣，于是又叫上另外几位技术伙伴，团队初具雏形。',
    },
    {
      type: 'paragraph',
      text: '结果开工没两个月，那位发起人朋友因为个人原因（据说是忙着拯救世界？）就“消失”了，留下一脸懵的我们。',
    },
    {
      type: 'paragraph',
      text: '人是我拉来的，活儿也开了个头，总不能就地解散吧？可继续做那个复刻软件又觉得少了点灵魂。这时候我想到了压箱底的 Autolink 代码，突然冒出一个念头：',
    },
    {
      type: 'paragraph',
      text: '**都什么时代了，为什么不让它“自己操作自己”呢？**',
    },
    {
      type: 'paragraph',
      text: '于是我们把原本纯功能的复刻项目，增加了一套“感知→决策→执行”的自动化闭环。结合我近些年学习到了AI知识。从最初简单的点击模拟，一步步迭代成支持多端、复杂策略的分布式控制系统。',
    },
    {
      type: 'paragraph',
      text: '回头看，要不是那位朋友跑得快，可能也就没有今天这个落地项目了——某种意义上，得感谢他的“临阵脱逃”。',
    },

    { type: 'heading', text: '项目流程' },
    {
      type: 'flow',
      steps: ['屏幕截图', 'YOLO+OCR', 'Snapshot JSON', '决策引擎', 'Action JSON', '客户端执行'],
    },
    
    { type: 'heading', text: '核心模块' },
    {
      type: 'cards',
      items: [
        {
          title: '感知模块（Perception）',
        },
        {
          title: '决策模块（Decision）',
        },
        {
          title: '后台管理系统',
        },
        {
          title: '客户端（AutoScreen）',
        },
        {
          title: '前端展示模块',
        },
      ],
    },
    { type: 'subheading', text: '感知模块（Perception）' },
    {
      type: 'list',
      items: [
        { text: '通过屏幕截图 + YOLO 目标检测与分类 + OCR，将图像信息结构化，输出标准化 JSON 格式，为决策提供环境感知输入。' },
        { text: '移动端使用 TFLite 部署轻量化模型，保证实时性。' },
      ],
    },
    { type: 'subheading', text: '决策模块（Decision）' },
    {
      type: 'list',
      items: [
        { text: '基于感知模块输出的 JSON 数据，采用 DP（动态规划）、MCTS（蒙特卡洛树搜索）、Random（随机策略） 等多策略融合进行动作决策。' },
        { text: '使用 Python 模拟软件运行环境，并实现决策过程的可视化展示。' },
      ],
    },
    { type: 'subheading', text: '后台管理系统' },
    {
      type: 'list',
      items: [
        { text: '项目管理' },
        { text: '订单管理' },
        { text: '成员管理' },
      ],
    },
    { type: 'subheading', text: '客户端（AutoScreen））' },
    {
      type: 'list',
      items: [
        { text: 'AutoScreen 模块接收决策模块下发的 Action JSON，解析后精准模拟键鼠操作，实现跨机器的自动化控制。' }
      ],
    },
    { type: 'subheading', text: '前端展示模块' },
    {
      type: 'list',
      items: [
        { term: 'PC 端', text: '使用 Tauri + Rust 构建信息展示可视化界面。' },
        { term: '移动端', text: '使用 Java + XML 构建原生界面。' },
      ],
    },
    
    { type: 'heading', text: '项目现状' },
    {
      type: 'list',
      items: [
        { text: '系统已投入实际生产环境运行。' },
        { text: '同时支持 Windows PC 端与 Android 移动端。' },
        { text: '截至目前已经稳定运行**6**个月。' },
      ],
    },
  ],
};

export default autoctrl;
