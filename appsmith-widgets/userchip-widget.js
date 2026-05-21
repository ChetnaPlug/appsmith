appsmith.onReady(() => {
  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = resolve;
    s.onerror = () => reject(new Error(`Failed: ${src}`));
    document.head.appendChild(s);
  });

  root.innerHTML = '<div style="padding:20px;text-align:center;color:#666;">Loading UserChip...</div>';

  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js'),
    loadScript('https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js')
  ])
    .then(() => new Promise(r => setTimeout(r, 100)))
    .then(() => loadScript('https://cdn.jsdelivr.net/gh/ChetnaPlug/appsmith@v1.1.0/dist/userchip-bundle.js'))
    .then(() => {
      const Component = window.AppsmithUserChip;
      if (!Component) throw new Error('UserChip not found');

      function Wrapper() {
        const model = appsmith.model || {};
        return React.createElement(Component, {
          name: model.name || 'Neha Gupta',
          role: model.role || 'Senior Officer',
          size: model.size || 'md',
          badge: model.badge || undefined,
          onClick: (data) => appsmith.triggerEvent('onChipClick', data)
        });
      }

      const reactRoot = ReactDOM.createRoot(root);
      reactRoot.render(React.createElement(Wrapper));
    })
    .catch(err => {
      root.innerHTML = `<div style="color:#dc2626;padding:20px;border:1px solid #dc2626;border-radius:8px;background:#fee2e2;">
        <strong>⚠️ Error:</strong> ${err.message}</div>`;
    });
});