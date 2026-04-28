const fs = require('fs');
const path = require('path');

// DatePicker Bundle
const datepickerBundle = `(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithDatePicker = factory(root.React);
  }
})(this, function(React) {
  return function(props) {
    const { value = '', onChange, label = 'Date', placeholder = 'Select date', disabled = false, required = false, size = 'md', error = '' } = props;
    
    const inputStyle = {
      width: '100%',
      padding: size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px',
      border: '1px solid ' + (error ? '#dc2626' : '#d1d5db'),
      borderRadius: '6px',
      fontSize: size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px',
      boxSizing: 'border-box'
    };
    
    const handleChange = (e) => onChange && onChange(e.target.value);
    
    return React.createElement('div', { style: { padding: '10px', fontFamily: 'Arial, sans-serif' } }, [
      React.createElement('label', { key: 'label', style: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: error ? '#dc2626' : '#374151' } },
        label,
        required && React.createElement('span', { key: 'star', style: { color: '#dc2626', marginLeft: '4px' } }, '*')
      ),
      React.createElement('input', {
        key: 'input',
        type: 'date',
        value: value,
        onChange: handleChange,
        placeholder: placeholder,
        disabled: disabled,
        required: required,
        style: inputStyle
      }),
      error && React.createElement('div', { key: 'error', style: { color: '#dc2626', fontSize: '12px', marginTop: '5px' } }, error)
    ]);
  };
});`;

// FileUpload Bundle
const fileuploadBundle = `(function(root, factory) {
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
});`;

// LoanBadge Bundle
const loanbadgeBundle = `(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithLoanBadge = factory(root.React);
  }
})(this, function(React) {
  const statusColors = { approved: '#10b981', pending: '#f59e0b', rejected: '#ef4444', completed: '#3b82f6' };
  
  return function(props) {
    const { status = 'pending', amount = 0, customerName = '', dueDate = '', onClick } = props;
    
    return React.createElement('div', { 
      style: { padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px', fontFamily: 'Arial, sans-serif', cursor: onClick ? 'pointer' : 'default', backgroundColor: 'white' },
      onClick: () => onClick && onClick({ status, amount, customerName, dueDate })
    }, [
      React.createElement('div', { key: 'header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } }, [
        React.createElement('span', { key: 'name', style: { fontWeight: 'bold', color: '#6b7280' } }, customerName || 'Customer'),
        React.createElement('span', { key: 'badge', style: { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', backgroundColor: statusColors[status.toLowerCase()] || '#6b7280', color: 'white' } }, status.toUpperCase())
      ]),
      React.createElement('div', { key: 'amount', style: { fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '10px 0' } }, '$' + amount.toLocaleString()),
      dueDate && React.createElement('div', { key: 'due', style: { fontSize: '12px', color: '#6b7280', marginTop: '10px' } }, 'Due: ' + new Date(dueDate).toLocaleDateString())
    ]);
  };
});`;

// Write all bundles
fs.writeFileSync(path.join(__dirname, '../dist/datepicker-bundle.js'), datepickerBundle);
fs.writeFileSync(path.join(__dirname, '../dist/fileupload-bundle.js'), fileuploadBundle);
fs.writeFileSync(path.join(__dirname, '../dist/loanbadge-bundle.js'), loanbadgeBundle);

console.log('✓ All bundles created successfully!');
console.log('  - dist/datepicker-bundle.js');
console.log('  - dist/fileupload-bundle.js');
console.log('  - dist/loanbadge-bundle.js');