/**
 * 个人信息侧栏配置：头像、简介、联系方式、技能条、标签。
 * 技能条参考游戏血条/蓝条：value 为 0-100。
 */

export const profileConfig = {
  /** 头像：放到 public/ 下然后写相对路径，如 './avatar.png'；留空则显示首字母占位 */
  avatar: './mm2.jfif',
  /** 头像占位文字（avatar 为空时显示） */
  avatarFallback: 'M',

  name: 'ztmajor',
  /** 英文名 / handle，等宽字体显示 */
  handle: '@ztmajor',
  role: 'AI Engineer',

  /** 简介，逐段渲染 */
  bio: [
    '专注 AI 应用落地：从模型训练、推理优化到把它包装成人能用的产品。',
    '白天训模型、写推理管线，晚上把它们塞进游戏、二次元和各种奇怪的小玩意里。',
    '喜欢游戏和二次元，所以我的项目一半是生产力工具，一半是拿 AI 玩游戏。',
  ],

  /** 侧栏顶部的状态标签 */
  badges: ['AI Application', 'Computer Vision', 'ACG'],

  /** 联系方式：icon 支持 github / mail / blog / bilibili / x / link */
  contacts: [
    { icon: 'github', label: 'GitHub', value: 'ztmajor', href: 'https://github.com/ztmajor' },
    // { icon: 'bilibili', label: 'Bilibili', value: 'space/xxxx', href: 'https://space.bilibili.com' },
  ],

  /**
   * 技能条。type 决定颜色：
   *   hp   → 电光蓝（用于核心技能）
   *   mp   → 靛蓝紫（次要技能）
   *   exp  → 琥珀金（兴趣 / 加分项）
   */
  skills: [
    { name: 'Python', label: 'PYTHON', value: 99, type: 'hp' },
    { name: 'PyTorch', label: 'PYTORCH', value: 99, type: 'hp' },
    { name: 'Computer Vision', label: 'CV', value: 80, type: 'hp' },
    { name: 'Natural Language Processing', label: 'NLP', value: 75, type: 'hp' },
    { name: 'Graph Neural Network', label: 'GNN', value: 65, type: 'hp' },
    { name: 'Reinforcement Learning', label: 'RL', value: 30, type: 'hp' },
    { name: 'C', label: 'C', value: 72, type: 'mp' },
    { name: '应用开发', label: 'APPS', value: 88, type: 'mp' },
    { name: 'Web 前端', label: 'FRONTEND', value: 70, type: 'mp' },
    { name: 'Vibe Coding', label: 'Vibe Coding', value: 91, type: 'exp' },
    { name: '游戏与二次元', label: 'ACG LV.', value: 89, type: 'exp' },
  ],

  /** 侧栏底部的一句签名 */
  motto: 'Make AI fun again.',
};

export default profileConfig;
