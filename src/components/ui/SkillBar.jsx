import { useEffect, useRef, useState } from 'react';
import './SkillBar.css';

/**
 * 游戏血条/蓝条风格的技能熟练度条。
 * 进入视口后才从 0 涨到目标值，并附带分段刻度与流光。
 *
 * @param {string} name  中文技能名
 * @param {string} label 等宽字体英文标签
 * @param {number} value 0-100
 * @param {'hp'|'mp'|'exp'} type 配色
 * @param {number} delay 动画延迟（ms），用于逐条依次填充
 */
export function SkillBar({ name, label, value = 0, type = 'hp', delay = 0 }) {
  const [fill, setFill] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setFill(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const timer = window.setTimeout(() => setFill(value), delay);
        el.dataset.timer = String(timer);
        io.unobserve(entry.target);
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (el.dataset.timer) window.clearTimeout(Number(el.dataset.timer));
    };
  }, [value, delay]);

  return (
    <div className={`skill skill--${type}`} ref={ref}>
      <div className="skill__head">
        <span className="skill__name">{name}</span>
        <span className="skill__value">{String(fill).padStart(2, '0')}</span>
      </div>

      <div
        className="skill__track"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={name}
      >
        <span className="skill__ticks" aria-hidden="true" />
        <span className="skill__fill" style={{ width: `${fill}%` }}>
          <span className="skill__shine" />
          <span className="skill__cap" />
        </span>
      </div>

      <span className="skill__label mono-label">{label}</span>
    </div>
  );
}

export default SkillBar;
