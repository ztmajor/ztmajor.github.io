/**
 * 极轻量内联格式化：把文本里的 `code` 和 **bold** 转成 React 节点。
 * 只支持这两种，避免为详情页引入完整 markdown 依赖。
 */
export function inline(text) {
  if (typeof text !== 'string') return text;

  const parts = [];
  // 一次正则同时匹配 `code` 与 **bold**
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)/g;
  let last = 0;
  let m;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));

    if (m[1]) {
      parts.push(<code key={key++}>{m[1].slice(1, -1)}</code>);
    } else if (m[2]) {
      parts.push(<strong key={key++}>{m[2].slice(2, -2)}</strong>);
    }
    last = re.lastIndex;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

export default inline;
