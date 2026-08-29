/**
 * 内联 SVG 图标集（统一 1.4px 细描边，与整站细字重呼应）。
 * 新增图标：在 paths 里加一个 key，然后在配置里用这个 key。
 */
const paths = {
  github:
    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 4.8a4.9 4.9 0 0 0-.1-3.6s-1.2-.4-4 1.5a12.3 12.3 0 0 0-6.4 0C5.7.8 4.5 1.2 4.5 1.2A4.9 4.9 0 0 0 4.4 4.8 5.2 5.2 0 0 0 3 8.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22',
  mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.3 6.4 12 13l8.7-6.6',
  blog: 'M4 4h11l5 5v11H4V4zM15 4v5h5M8 13h8M8 17h5',
  bilibili:
    'M6.5 3.5 9 6h6l2.5-2.5M4 6h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM8 11v3M16 11v3',
  csdn: 'M5.37 19.73c-4.00-5.57-1.09-14.75 5.54-16.80 2.78-0.89 6.16-0.40 8.23 1.74 1.14 1.01 0.03 2.40-0.58 3.32-1.92-1.46-4.20-3.35-6.79-2.39C7.11 7.27 5.44 13.90 7.93 17.92c3.00 3.31 8.39 2.21 11.45-0.48 1.01 0.87 2.08 2.63 0.58 3.61-4.28 2.83-11.12 2.81-14.59-1.32z',
  x: 'M4 4l16 16M20 4L4 20',
  link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 18l-6-6 6-6',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
};

export function Icon({ name, size = 14, className = '' }) {
  const d = paths[name] ?? paths.link;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

export default Icon;
