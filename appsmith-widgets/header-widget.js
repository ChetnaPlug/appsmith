appsmith.onReady(() => {
  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src; s.onload = resolve;
      s.onerror = () => reject(new Error(`Failed: ${src}`));
      document.head.appendChild(s);
    });
  }

  root.innerHTML = '<div style="padding:12px;color:#666;">Loading Header...</div>';

  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.development.js'),
    loadScript('https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.development.js')
  ])
    .then(() => new Promise(r => setTimeout(r, 100)))
    .then(() => loadScript('https://cdn.jsdelivr.net/gh/ChetnaPlug/appsmith@v1.0.3/dist/header-bundle.js'))
    .then(() => {
      const Component = window.AppsmithHeader;
      if (!Component) throw new Error('Header component not found');

      function Wrapper() {
        const user = appsmith.model?.isLoggedIn
          ? { name: appsmith.model?.userName || 'User' }
          : null;

        return React.createElement(Component, {
          appName: appsmith.model?.appName || 'Acme',
          user: user,
          onLogin: () => {
            appsmith.triggerEvent('onLogin');
          },
          onLogout: () => {
            appsmith.updateModel({ isLoggedIn: false, userName: '' });
            appsmith.triggerEvent('onLogout');
          },
          onCreateAccount: () => {
            appsmith.triggerEvent('onCreateAccount');
          }
        });
      }

      ReactDOM.render(React.createElement(Wrapper), root);
      console.log('Header loaded successfully');
    })
    .catch(err => {
      root.innerHTML = `<div style="color:#dc2626;padding:12px;border:1px solid #fca5a5;
        border-radius:8px;background:#fee2e2;font-family:sans-serif;">
        <strong>⚠️ Error:</strong> ${err.message}</div>`;
    });
});