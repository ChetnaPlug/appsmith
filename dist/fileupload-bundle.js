(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithFileUpload = factory(root.React);
  }
})(this, function(React) {
  return function(props) {
    const { value = '', onChange, label = 'Upload File', accept = '.pdf,.jpg,.png', disabled = false, required = false, error = '' } = props;
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && onChange) {
        onChange({ name: file.name, size: file.size, type: file.type });
      }
    };
    
    return React.createElement('div', { style: { padding: '10px', fontFamily: 'Arial, sans-serif' } }, [
      React.createElement('label', { key: 'label', style: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: error ? '#dc2626' : '#374151' } },
        label,
        required && React.createElement('span', { key: 'star', style: { color: '#dc2626', marginLeft: '4px' } }, '*')
      ),
      React.createElement('input', {
        key: 'input',
        type: 'file',
        accept: accept,
        onChange: handleFileChange,
        disabled: disabled,
        required: required,
        style: { width: '100%', padding: '8px', border: '1px solid ' + (error ? '#dc2626' : '#d1d5db'), borderRadius: '6px', boxSizing: 'border-box' }
      }),
      value && React.createElement('div', { key: 'info', style: { marginTop: '5px', fontSize: '12px', color: '#6b7280' } }, 
        'Selected: ' + (typeof value === 'object' ? value.name : value)
      ),
      error && React.createElement('div', { key: 'error', style: { color: '#dc2626', fontSize: '12px', marginTop: '5px' } }, error)
    ]);
  };
});