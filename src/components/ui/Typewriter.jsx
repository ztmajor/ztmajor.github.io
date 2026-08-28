import { useEffect, useState } from 'react';
import './Typewriter.css';

/**
 * 终端打字机：逐字打出 lines 中每一行，打完全部后停在最后一行。
 * @param {string[]} lines 依次播放的行
 * @param {number} speed  每字间隔（ms）
 * @param {number} hold   行间停顿（ms）
 */
export function Typewriter({ lines = [], speed = 42, hold = 620 }) {
  const [done, setDone] = useState([]);
  const [current, setCurrent] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];

    // 当前行打完 → 收进 done，进入下一行
    if (charIdx > line.length) {
      const timer = window.setTimeout(() => {
        setDone((d) => [...d, line]);
        setCurrent('');
        setCharIdx(0);
        setLineIdx((i) => i + 1);
      }, hold);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setCurrent(line.slice(0, charIdx));
      setCharIdx((c) => c + 1);
    }, speed);
    return () => window.clearTimeout(timer);
  }, [lineIdx, charIdx, lines, speed, hold]);

  const finished = lineIdx >= lines.length;
  // 全部打完后，把最后一行留在屏幕上
  const visible = finished ? done.slice(0, -1) : done;
  const activeText = finished ? done[done.length - 1] : current;

  return (
    <div className="tw" aria-live="polite">
      {visible.map((line, i) => (
        <div key={i} className="tw__line tw__line--past">
          <span className="tw__prompt">&gt;</span>
          <span>{line}</span>
        </div>
      ))}
      <div className="tw__line">
        <span className="tw__prompt">&gt;</span>
        <span>{activeText}</span>
        <span className="tw__caret" aria-hidden="true" />
      </div>
    </div>
  );
}

export default Typewriter;
