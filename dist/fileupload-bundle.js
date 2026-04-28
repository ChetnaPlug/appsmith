(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithFileUpload = factory(root.React);
  }
})(this, function(React) {
  return function(props) {
    const { value = null, onChange, label = 'Upload File', accept = '.pdf,.jpg,.png',
            disabled = false, required = false, error = '', helperText = 'Drag and drop or click to upload' } = props;

    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && onChange) onChange({ name: file.name, size: file.size, type: file.type });
    };

    const handleDrop = (e) => {
      e.preventDefault(); setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file && onChange) onChange({ name: file.name, size: file.size, type: file.type });
    };

    const formatSize = (b) => b < 1024 ? b + ' B' : b < 1048576 ? (b/1024).toFixed(1) + ' KB' : (b/1048576).toFixed(1) + ' MB';
    const borderColor = error ? '#dc2626' : isDragging ? '#6366f1' : '#e2e8f0';
    const bgColor = isDragging ? '#eef2ff' : disabled ? '#f8fafc' : '#fafafa';

    return React.createElement('div', { style: { fontFamily: 'Inter, Arial, sans-serif', padding: '4px' } }, [
      React.createElement('label', { key: 'lbl', style: { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: error ? '#dc2626' : '#374151' } },
        label, required && React.createElement('span', { key: 'star', style: { color: '#dc2626', marginLeft: '3px' } }, '*')
      ),
      React.createElement('div', {
        key: 'zone',
        onClick: () => !disabled && inputRef.current && inputRef.current.click(),
        onDragOver: (e) => { e.preventDefault(); if (!disabled) setIsDragging(true); },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
        style: { border: '2px dashed ' + borderColor, borderRadius: '10px', backgroundColor: bgColor,
                 padding: '24px 16px', textAlign: 'center', cursor: disabled ? 'not-allowed' : 'pointer',
                 transition: 'all 0.2s ease', opacity: disabled ? 0.6 : 1 }
      }, [
        React.createElement('div', { key: 'icon', style: { fontSize: '28px', marginBottom: '8px' } }, value ? '📄' : '☁️'),
        value
          ? React.createElement('div', { key: 'info' }, [
              React.createElement('div', { key: 'name', style: { fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' } },
                typeof value === 'object' ? value.name : value),
              value.size && React.createElement('div', { key: 'size', style: { fontSize: '11px', color: '#94a3b8' } }, formatSize(value.size)),
              React.createElement('div', { key: 'change', style: { marginTop: '8px', fontSize: '11px', color: '#6366f1', fontWeight: '500' } }, 'Click to change file')
            ])
          : React.createElement('div', { key: 'empty' }, [
              React.createElement('div', { key: 'txt', style: { fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' } },
                'Drop your file here, or ',
                React.createElement('span', { key: 'browse', style: { color: '#6366f1', textDecoration: 'underline' } }, 'browse')
              ),
              React.createElement('div', { key: 'helper', style: { fontSize: '11px', color: '#94a3b8' } }, helperText)
            ])
      ]),
      React.createElement('input', { key: 'input', ref: inputRef, type: 'file', accept: accept,
        onChange: handleFileChange, disabled: disabled, style: { display: 'none' } }),
      error && React.createElement('div', { key: 'err', style: { color: '#dc2626', fontSize: '11px', marginTop: '5px' } }, '⚠️ ' + error)
    ]);
  };
});