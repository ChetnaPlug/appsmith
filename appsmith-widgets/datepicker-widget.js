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

  rootElement.innerHTML = '<div style="padding:20px;text-align:center">Loading DatePicker...</div>';

  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js'),
    loadScript('https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js')
  ])
    .then(() => new Promise(resolve => setTimeout(resolve, 100)))
    // .then(() => loadScript('http://localhost:5500/datepicker-bundle.js')) // Change URL for production
    .then(() => loadScript('https://cdn.jsdelivr.net/gh/ChetnaPlug/storybookcomp@main/dist/datepicker-bundle.js')) // Change URL for production
    .then(() => {
      const Component = window.AppsmithDatePicker;
      if (!Component) throw new Error('Component not found');
      
      const model = appsmith.model || {};
      
      function Wrapper() {
        const [value, setValue] = React.useState(model.value || '');
        
        return React.createElement(Component, {
          label: model.label || 'Application Date',
          value: value,
          placeholder: model.placeholder || 'YYYY-MM-DD',
          required: model.required || false,
          size: model.size || 'md',
          disabled: model.disabled || false,
          error: model.error || '',
          onChange: (newVal) => {
            setValue(newVal);
            appsmith.updateModel({ value: newVal, selectedDate: newVal });
            appsmith.triggerEvent('onDateChange');
          }
        });
      }
      
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(Wrapper));
      console.log('DatePicker rendered successfully');
    })
    .catch(err => {
      console.error(err);
      rootElement.innerHTML = `<div style="color:#dc2626;padding:20px;border:1px solid #dc2626;border-radius:8px;margin:10px">
        <strong>Error loading DatePicker:</strong><br>${err.message}
      </div>`;
    });
});