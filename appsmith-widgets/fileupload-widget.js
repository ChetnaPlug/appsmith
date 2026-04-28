appsmith.onReady(() => {
  let rootElement = document.getElementById('root');
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Failed: ${src}`));
      document.head.appendChild(s);
    });
  }

  rootElement.innerHTML = '<div style="padding:20px;text-align:center">Loading FileUpload...</div>';

  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js'),
    loadScript('https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js')
  ])
    .then(() => new Promise(resolve => setTimeout(resolve, 100)))
    .then(() => loadScript('http://localhost:5500/fileupload-bundle.js')) // Change URL for production
    .then(() => {
      const Component = window.AppsmithFileUpload;
      if (!Component) throw new Error('Component not found');
      
      const model = appsmith.model || {};
      
      function Wrapper() {
        const [fileInfo, setFileInfo] = React.useState(model.value || null);
        
        return React.createElement(Component, {
          label: model.label || 'Upload Document',
          value: fileInfo,
          accept: model.accept || '.pdf,.jpg,.png',
          required: model.required || false,
          disabled: model.disabled || false,
          error: model.error || '',
          onChange: (fileData) => {
            setFileInfo(fileData);
            appsmith.updateModel({ value: fileData, fileName: fileData.name });
            appsmith.triggerEvent('onFileUpload');
          }
        });
      }
      
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(Wrapper));
      console.log('FileUpload rendered successfully');
    })
    .catch(err => {
      console.error(err);
      rootElement.innerHTML = `<div style="color:#dc2626;padding:20px;border:1px solid #dc2626;border-radius:8px;margin:10px">
        <strong>Error loading FileUpload:</strong><br>${err.message}
      </div>`;
    });
});