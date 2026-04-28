const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Modern DatePicker Bundle
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
      borderRadius: '8px',
      fontSize: size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease',
      outline: 'none'
    };
    
    const handleChange = (e) => onChange && onChange(e.target.value);
    
    return React.createElement('div', { style: { padding: '16px', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" } }, [
      React.createElement('label', { key: 'label', style: { display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: error ? '#dc2626' : '#1f2937' } },
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
      error && React.createElement('div', { key: 'error', style: { color: '#dc2626', fontSize: '12px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' } }, 
        React.createElement('span', {}, '⚠️'),
        React.createElement('span', {}, error)
      )
    ]);
  };
});`;

// Modern FileUpload Bundle with Beautiful UI
const fileuploadBundle = `(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithFileUpload = factory(root.React);
  }
})(this, function(React) {
  const { useState, useRef } = React;
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return '📎';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    if (fileType.includes('text')) return '📃';
    return '📎';
  };

  return function(props) {
    const { value = '', onChange, label = 'Upload File', accept = '.pdf,.jpg,.png,.docx', disabled = false, required = false, error = '', maxSize = 5242880 } = props;
    
    const [isDragging, setIsDragging] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
      if (file.size > maxSize) {
        alert('File size must be less than ' + formatFileSize(maxSize));
        return false;
      }
      return true;
    };

    const handleFile = (file) => {
      if (!file) return;
      if (!validateFile(file)) return;

      // Create preview for images
      if (file.type && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }

      if (onChange) {
        onChange({
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
          formattedSize: formatFileSize(file.size),
          icon: getFileIcon(file.type),
          lastModified: new Date(file.lastModified).toLocaleDateString()
        });
      }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      handleFile(file);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    };

    const removeFile = () => {
      if (onChange) {
        onChange(null);
      }
      setFilePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const containerStyle = {
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      maxWidth: '100%',
      width: '100%'
    };

    const labelStyle = {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      fontSize: '14px',
      color: error ? '#dc2626' : '#1f2937'
    };

    const dropzoneStyle = {
      border: '2px dashed ' + (isDragging ? '#3b82f6' : error ? '#dc2626' : '#d1d5db'),
      borderRadius: '12px',
      padding: '40px 24px',
      textAlign: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: isDragging ? '#eff6ff' : error ? '#fef2f2' : '#f9fafb',
      opacity: disabled ? 0.5 : 1
    };

    const uploadIconStyle = {
      fontSize: '48px',
      marginBottom: '16px',
      color: isDragging ? '#3b82f6' : '#6b7280'
    };

    const uploadTextStyle = {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '8px'
    };

    const browseTextStyle = {
      color: '#3b82f6',
      fontWeight: '500',
      cursor: 'pointer',
      textDecoration: 'underline'
    };

    const fileInfoStyle = {
      marginTop: '16px',
      padding: '12px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideIn 0.3s ease'
    };

    const fileDetailsStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1
    };

    const fileIconStyle = {
      fontSize: '28px'
    };

    const fileNameStyle = {
      fontWeight: '500',
      fontSize: '14px',
      color: '#1f2937',
      marginBottom: '4px'
    };

    const fileMetaStyle = {
      fontSize: '12px',
      color: '#6b7280'
    };

    const removeButtonStyle = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '20px',
      color: '#9ca3af',
      padding: '4px 8px',
      borderRadius: '4px',
      transition: 'color 0.2s'
    };

    const errorStyle = {
      marginTop: '8px',
      fontSize: '12px',
      color: '#dc2626',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    };

    const acceptedFormatsStyle = {
      marginTop: '12px',
      fontSize: '11px',
      color: '#9ca3af',
      textAlign: 'center'
    };

    return React.createElement('div', { style: containerStyle }, [
      React.createElement('style', { key: 'animations', dangerouslySetInnerHTML: { __html: \`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      \` } }),
      React.createElement('label', { key: 'label', style: labelStyle },
        label,
        required && React.createElement('span', { key: 'star', style: { color: '#dc2626', marginLeft: '4px' } }, '*')
      ),
      React.createElement('div', {
        key: 'dropzone',
        style: dropzoneStyle,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onClick: function() { if (!disabled && fileInputRef.current) fileInputRef.current.click(); }
      }, [
        React.createElement('div', { key: 'icon', style: uploadIconStyle }, isDragging ? '📂' : '📁'),
        React.createElement('div', { key: 'text', style: uploadTextStyle }, 
          isDragging ? 'Drop your file here' : 'Drag and drop your file here'
        ),
        React.createElement('div', { key: 'or', style: { fontSize: '12px', color: '#6b7280', marginBottom: '8px' } }, 'or'),
        React.createElement('span', { key: 'browse', style: browseTextStyle }, 'Browse files'),
        React.createElement('input', {
          key: 'input',
          ref: fileInputRef,
          type: 'file',
          accept: accept,
          onChange: handleFileChange,
          disabled: disabled,
          required: required,
          style: { display: 'none' }
        })
      ]),
      value && React.createElement('div', { key: 'fileInfo', style: fileInfoStyle }, [
        React.createElement('div', { key: 'details', style: fileDetailsStyle }, [
          React.createElement('span', { key: 'icon', style: fileIconStyle }, value.icon || '📎'),
          React.createElement('div', { key: 'info', style: { flex: 1 } }, [
            React.createElement('div', { key: 'name', style: fileNameStyle }, value.name),
            React.createElement('div', { key: 'meta', style: fileMetaStyle }, [
              value.formattedSize || formatFileSize(value.size),
              value.lastModified && ' • ' + value.lastModified
            ].filter(Boolean).join(''))
          ])
        ]),
        React.createElement('button', {
          key: 'remove',
          style: removeButtonStyle,
          onClick: removeFile,
          onMouseEnter: function(e) { e.target.style.color = '#dc2626'; },
          onMouseLeave: function(e) { e.target.style.color = '#9ca3af'; }
        }, '✕')
      ]),
      filePreview && React.createElement('div', { key: 'preview', style: { marginTop: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' } }, [
        React.createElement('img', { key: 'preview-img', src: filePreview, alt: 'Preview', style: { width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' } })
      ]),
      error && React.createElement('div', { key: 'error', style: errorStyle }, [
        React.createElement('span', { key: 'error-icon' }, '⚠️'),
        React.createElement('span', { key: 'error-text' }, error)
      ]),
      React.createElement('div', { key: 'formats', style: acceptedFormatsStyle },
        'Supported formats: ' + accept.split(',').map(f => f.replace('.', '').toUpperCase()).join(', ')
      )
    ]);
  };
});`;

// Modern LoanBadge Bundle
const loanbadgeBundle = `(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithLoanBadge = factory(root.React);
  }
})(this, function(React) {
  const statusColors = { 
    approved: '#10b981', 
    pending: '#f59e0b', 
    rejected: '#ef4444', 
    completed: '#3b82f6' 
  };
  
  return function(props) {
    const { status = 'pending', amount = 0, customerName = '', dueDate = '', onClick } = props;
    
    const cardStyle = {
      padding: '20px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: onClick ? 'pointer' : 'default',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    };
    
    const badgeStyle = {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: statusColors[status.toLowerCase()] || '#6b7280',
      color: 'white',
      textTransform: 'uppercase'
    };
    
    const amountStyle = {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '12px 0'
    };
    
    return React.createElement('div', { 
      style: cardStyle,
      onClick: function() { if (onClick) onClick({ status, amount, customerName, dueDate }); },
      onMouseEnter: function(e) { e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'; },
      onMouseLeave: function(e) { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }
    }, [
      React.createElement('div', { key: 'header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } }, [
        React.createElement('span', { key: 'name', style: { fontWeight: '600', color: '#6b7280', fontSize: '14px' } }, customerName || 'Customer'),
        React.createElement('span', { key: 'badge', style: badgeStyle }, status)
      ]),
      React.createElement('div', { key: 'amount', style: amountStyle }, '$' + amount.toLocaleString()),
      dueDate && React.createElement('div', { key: 'due', style: { fontSize: '12px', color: '#6b7280', marginTop: '12px' } }, 
        'Due: ' + new Date(dueDate).toLocaleDateString()
      )
    ]);
  };
});`;

// Write all bundles
fs.writeFileSync(path.join(distDir, 'datepicker-bundle.js'), datepickerBundle);
fs.writeFileSync(path.join(distDir, 'fileupload-bundle.js'), fileuploadBundle);
fs.writeFileSync(path.join(distDir, 'loanbadge-bundle.js'), loanbadgeBundle);

console.log('✓ All modern bundles created successfully!');
console.log('\n📦 Generated files:');
console.log(`  - ${path.join(distDir, 'datepicker-bundle.js')} (${(datepickerBundle.length / 1024).toFixed(2)} KB)`);
console.log(`  - ${path.join(distDir, 'fileupload-bundle.js')} (${(fileuploadBundle.length / 1024).toFixed(2)} KB)`);
console.log(`  - ${path.join(distDir, 'loanbadge-bundle.js')} (${(loanbadgeBundle.length / 1024).toFixed(2)} KB)`);
console.log('\n🎨 Modern UI Features:');
console.log('  • Drag & drop support');
console.log('  • File preview for images');
console.log('  • Beautiful animations');
console.log('  • File size formatting');
console.log('  • Professional color scheme');