import React from 'react';

const UserChip = ({ name = 'User', role = '', size = 'md', badge, onClick }) => {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const avatarSize = size === 'lg' ? 40 : 32;
  const fontSize = size === 'lg' ? '15px' : '13px';

  return (
    <div
      onClick={() => onClick && onClick({ name, role })}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '6px 12px 6px 6px', borderRadius: '100px',
        border: '1px solid #e2e8f0', backgroundColor: '#f8fafc',
        cursor: onClick ? 'pointer' : 'default', fontFamily: 'Inter, Arial, sans-serif',
        width: 'fit-content'
      }}
    >
      {/* Avatar */}
      <div style={{
        width: avatarSize, height: avatarSize, borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size === 'lg' ? '14px' : '12px', fontWeight: '700', color: '#fff',
        flexShrink: 0, position: 'relative'
      }}>
        {initials}
        {badge && (
          <span style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: badge === 'online' ? '#10b981' : badge === 'busy' ? '#f59e0b' : '#6b7280',
            border: '2px solid white'
          }} />
        )}
      </div>

      {/* Text */}
      <div>
        <div style={{ fontSize, fontWeight: '600', color: '#1e293b', lineHeight: 1.2 }}>{name}</div>
        {role && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>{role}</div>}
      </div>
    </div>
  );
};

export default UserChip;