/**
 * pvz3d 作品数据。
 * blocks 支持的类型见 src/components/work/BlockRenderer.jsx。
 */
const pvz3d = {
  slug: 'pvz3d',
  title: 'PVZ3D',
  eyebrow: '创建者 / Creator',
  year: '2024',
  /** 卡片与列表页用的一句话摘要 */
  summary:
    '植物大战僵尸, PvZ · But 3D。blender建模，UE5游戏开发体验。',
  tags: ['Blender', 'UE5', 'PVZ'],
  /** 卡片封面图（public 下的相对路径） */
  cover: './works/pvz3d/mainbattle.png',
  /** 卡片上的关键数据高亮 */
  stats: [
    { label: '游戏', value: '经典复刻' },
    { label: '版本', value: 'BETA' },
  ],
  links: [],

  tagline:
    '植物大战僵尸, PvZ · But 3D',

  blocks: [
    { type: 'heading', text: '项目背景' },
    {
      type: 'paragraph',
      text: '小时候在4399玩PVZ玩到废寝忘食，长大了一上头：能不能用3D视角重新玩一遍？于是打开Blender和UE5，说干就干。',
    },
    
    { type: 'heading', text: 'Blender捏模型' },
    {
      type: 'paragraph',
      text: '捏了模型还做了骨架，后面在UE里还做了简单的动画。',
    },
    {
      type: 'gallery',
      frame: '3 / 4',
      items: [
        { src: './works/pvz3d/xrk.png', alt: 'blenderimg', caption: '向日葵' },
        { src: './works/pvz3d/wdss.png', alt: 'blenderimg', caption: '豌豆射手' },
        // { src: './works/pvz3d/wdss.png', alt: 'blenderimg', caption: '双发射手' },
        { src: './works/pvz3d/hbss.png', alt: 'blenderimg', caption: '寒冰射手' },
        { src: './works/pvz3d/jgq.png', alt: 'blenderimg', caption: '坚果墙' },
        { src: './works/pvz3d/yg.png', alt: 'blenderimg', caption: '阳光' },
      ],
    },

    { type: 'heading', text: 'UE5搭场景' },
    {
      type: 'gallery',
      frame: '16 / 9',
      items: [
        { src: './works/pvz3d/mainbattle.png', alt: 'ue5', caption: '主场景' },
        { src: './works/pvz3d/mainbattle1.png', alt: 'ue5', caption: '对战测试' },
      ],
    },

    { type: 'heading', text: '蓝图写逻辑' },
    {
      type: 'gallery',
      frame: '16 / 9',
      items: [
        { src: './works/pvz3d/blueprint1.png', alt: 'blueprint', caption: 'BPC_EnemyBase' },
        { src: './works/pvz3d/blueprint2.png', alt: 'blueprint', caption: '僵尸停下来攻击' },
      ],
    },
    
    { type: 'heading', text: '项目现状' },
    {
      type: 'paragraph',
      text: '从零到一搓出一个可玩的3D塔防。体验了blender建模，UE5游戏开发。我和我的朋友玩的很开心！',
    },
  ],
};

export default pvz3d;
