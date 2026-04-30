(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithHeader = factory(root.React);
  }
})(this, function(React) {
  return function(props) {
    const { appName='Acme', user=null, onLogin, onLogout, onCreateAccount } = props;
    const [hoveredBtn, setHoveredBtn] = React.useState(null);

    return React.createElement('header', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
               padding: '12px 20px', borderBottom: '1px solid #e2e8f0',
               backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif',
               boxSizing: 'border-box', width: '100%' }
    }, [

      // Left: Logo + Name
      React.createElement('div', { key: 'left',
        style: { display: 'flex', alignItems: 'center', gap: '10px' }
      }, [
        React.createElement('div', { key: 'logo',
          style: { width: '32px', height: '32px', borderRadius: '8px',
                   background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   fontSize: '16px' }
        }, '🧊'),
        React.createElement('span', { key: 'name',
          style: { fontSize: '18px', fontWeight: '700', color: '#1e293b' }
        }, appName)
      ]),

      // Right: Auth buttons
      React.createElement('div', { key: 'right',
        style: { display: 'flex', alignItems: 'center', gap: '12px' }
      }, user ? [
        React.createElement('span', { key: 'welcome',
          style: { fontSize: '14px', color: '#475569' }
        }, [
          'Welcome, ',
          React.createElement('strong', { key: 'uname', style: { color: '#1e293b' } }, user.name),
          '!'
        ]),
        React.createElement('button', {
          key: 'logout',
          onClick: onLogout,
          style: { padding: '7px 16px', fontSize: '13px', fontWeight: '500',
                   border: '1px solid #cbd5e1', borderRadius: '6px',
                   backgroundColor: hoveredBtn === 'logout' ? '#f8fafc' : '#ffffff',
                   color: '#374151', cursor: 'pointer', transition: 'all 0.15s ease' },
          onMouseEnter: () => setHoveredBtn('logout'),
          onMouseLeave: () => setHoveredBtn(null)
        }, 'Log out')
      ] : [
        React.createElement('button', {
          key: 'login',
          onClick: onLogin,
          style: { padding: '7px 16px', fontSize: '13px', fontWeight: '500',
                   border: '1px solid #cbd5e1', borderRadius: '6px',
                   backgroundColor: hoveredBtn === 'login' ? '#f8fafc' : '#ffffff',
                   color: '#374151', cursor: 'pointer' },
          onMouseEnter: () => setHoveredBtn('login'),
          onMouseLeave: () => setHoveredBtn(null)
        }, 'Log in'),
        React.createElement('button', {
          key: 'signup',
          onClick: onCreateAccount,
          style: { padding: '7px 16px', fontSize: '13px', fontWeight: '600',
                   border: 'none', borderRadius: '6px',
                   backgroundColor: hoveredBtn === 'signup' ? '#4f46e5' : '#6366f1',
                   color: '#ffffff', cursor: 'pointer', transition: 'all 0.15s ease' },
          onMouseEnter: () => setHoveredBtn('signup'),
          onMouseLeave: () => setHoveredBtn(null)
        }, 'Sign up')
      ])
    ]);
  };
});