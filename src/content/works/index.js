/**
 * 作品注册表。
 *
 * 新增作品的步骤：
 *   1. 在 src/content/works/ 下新建 <slug>.js，参考 autolink.js 的字段结构
 *   2. 图片放到 public/works/<slug>/ 下，路径写 './works/<slug>/xxx.png'
 *   3. 在下面 import 并加入 works 数组（数组顺序即页面展示顺序）
 * 其余（列表卡片、详情页路由、上下篇导航）全部自动生成。
 */
import autolink from './autolink.js';
import dscoder from './dscoder.js';

export const works = [dscoder, autolink];

/** 按 slug 取单个作品 */
export const getWorkBySlug = (slug) => works.find((w) => w.slug === slug);

/** 取上一个 / 下一个作品，用于详情页底部导航 */
export const getWorkNeighbors = (slug) => {
  const i = works.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? works[i - 1] : null,
    next: i < works.length - 1 ? works[i + 1] : null,
  };
};

export default works;
