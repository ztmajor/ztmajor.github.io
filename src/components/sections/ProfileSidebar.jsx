import { useEffect, useRef } from 'react';
import './ProfileSidebar.css';
import profileConfig from '../../config/profile.config.js';
import { useI18n } from '../../hooks/useI18n.jsx';
import SkillBar from '../ui/SkillBar.jsx';
import Icon from '../ui/Icon.jsx';

/**
 * 左侧个人信息栏：头像 / 简介 / 联系方式 / 技能条。
 * sticky 定位由 .profile 自身承担，随右侧内容滚动而悬停。
 */
export function ProfileSidebar() {
  const { avatar, avatarFallback, name, handle, role, bio, badges, contacts, skills, motto } =
    profileConfig;
  const { t } = useI18n();

  const asideRef = useRef(null);
  const cardRef = useRef(null);

  /**
   * 智能吸附：卡片不高于视口时，正常吸附在导航栏下方；
   * 高于视口时把 sticky 的 top 设为负值，让卡片底部贴住视口底部 ——
   * 这样往下滚的过程中能看完整张卡，不需要卡片内部再出现滚动条。
   */
  useEffect(() => {
    const aside = asideRef.current;
    const card = cardRef.current;
    if (!aside || !card) return;

    const TOP_GAP = 26; // 导航栏下方留白
    const BOTTOM_GAP = 20; // 视口底部留白
    const NAV_H = 54; // 实体态导航栏高度

    const apply = () => {
      const cardH = card.offsetHeight;
      const avail = window.innerHeight - NAV_H - TOP_GAP - BOTTOM_GAP;
      const top =
        cardH > avail ? window.innerHeight - cardH - BOTTOM_GAP : NAV_H + TOP_GAP;
      aside.style.setProperty('--profile-top', `${Math.round(top)}px`);
    };

    apply();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null;
    ro?.observe(card);
    window.addEventListener('resize', apply);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  return (
    <aside className="profile" aria-label={t('profile.aria')} ref={asideRef}>
      <div className="profile__card" ref={cardRef}>
        {/* --- 头部：左头像，右姓名 / 句柄 / 角色 --- */}
        <div className="profile__head">
          <div className="profile__avatar-wrap">
            <div className="profile__avatar">
              {avatar ? (
                <img src={avatar} alt={`${name} 的头像`} />
              ) : (
                <span className="profile__avatar-fallback">{avatarFallback}</span>
              )}
              <span className="profile__avatar-ring" aria-hidden="true" />
            </div>
            <span className="profile__status-dot" title={t('profile.online')} aria-hidden="true" />
          </div>

          <div className="profile__identity">
            <h2 className="profile__name">{name}</h2>
            <p className="profile__handle">{handle}</p>
            <p className="profile__role mono-label">{role}</p>
          </div>
        </div>

        <span className="profile__divider" aria-hidden="true" />

        {/* --- 简介 --- */}
        <div className="profile__bio">
          {bio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <span className="profile__divider" aria-hidden="true" />

        {/* --- 标签 --- */}
        <div className="profile__badges">
          {badges.map((b) => (
            <span key={b} className="profile__badge">
              {b}
            </span>
          ))}
        </div>

        <span className="profile__divider" aria-hidden="true" />

        {/* --- 联系方式（放在技能前，保证关键信息不被折叠） --- */}
        <div className="profile__block">
          <h3 className="profile__block-title mono-label">{t('profile.contact')}</h3>
          <ul className="profile__contacts">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="profile__contact"
                >
                  <Icon name={c.icon} size={13} className="profile__contact-icon" />
                  <span className="profile__contact-label">{c.label}</span>
                  <span className="profile__contact-value">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span className="profile__divider" aria-hidden="true" />

        {/* --- 技能条 --- */}
        <div className="profile__block">
          <h3 className="profile__block-title mono-label">
            {t('profile.skills')}
            <span className="profile__block-count">{skills.length}</span>
          </h3>
          <div className="profile__skills">
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                label={skill.label}
                value={skill.value}
                type={skill.type}
                delay={i * 110}
              />
            ))}
          </div>
        </div>

        {motto && <p className="profile__motto">// {motto}</p>}
      </div>
    </aside>
  );
}

export default ProfileSidebar;
