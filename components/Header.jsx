import React, { useState } from 'react';

const Header = ({
  appName = 'Acme',
  user = null,
  onLogin,
  onLogout,
  onCreateAccount,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 20px', borderBottom: '1px solid #e2e8f0',
      backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif',
      boxSizing: 'border-box', width: '100%'
    }}>

      {/* Left: Logo + App Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px'
        }}>🧊</div>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
          {appName}
        </span>
      </div>

      {/* Right: Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            <span style={{ fontSize: '14px', color: '#475569' }}>
              Welcome, <strong style={{ color: '#1e293b' }}>{user.name}</strong>!
            </span>
            <button
              onClick={onLogout}
              style={{
                padding: '7px 16px', fontSize: '13px', fontWeight: '500',
                border: '1px solid #cbd5e1', borderRadius: '6px',
                backgroundColor: '#ffffff', color: '#374151',
                cursor: 'pointer', transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#f8fafc'}
              onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLogin}
              style={{
                padding: '7px 16px', fontSize: '13px', fontWeight: '500',
                border: '1px solid #cbd5e1', borderRadius: '6px',
                backgroundColor: '#ffffff', color: '#374151',
                cursor: 'pointer'
              }}
            >
              Log in
            </button>
            <button
              onClick={onCreateAccount}
              style={{
                padding: '7px 16px', fontSize: '13px', fontWeight: '600',
                border: 'none', borderRadius: '6px',
                backgroundColor: '#6366f1', color: '#ffffff',
                cursor: 'pointer', transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#4f46e5'}
              onMouseLeave={e => e.target.style.backgroundColor = '#6366f1'}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;