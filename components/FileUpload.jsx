import React, { useState, useRef } from 'react';

const FileUpload = ({ 
  value = '', 
  onChange, 
  label = 'Upload File',
  accept = '.pdf,.jpg,.png,.docx',
  disabled = false,
  required = false,
  error = '',
  maxSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('excel')) return '📊';
    return '📎';
  };

  const validateFile = (file) => {
    if (file.size > maxSize) {
      alert(`File size should be less than ${formatFileSize(maxSize)}`);
      return false;
    }
    return true;
  };

  const handleFile = (file) => {
    if (!file) return;
    
    if (!validateFile(file)) return;

    // Create preview for images
    if (file.type.startsWith('image/')) {
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

  // Modern container styles
  const containerStyle = {
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    maxWidth: '500px',
    width: '100%'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
    color: error ? '#dc2626' : '#1f2937'
  };

  const requiredStar = {
    color: '#dc2626',
    marginLeft: '4px'
  };

  const dropzoneStyle = {
    border: `2px dashed ${isDragging ? '#3b82f6' : error ? '#dc2626' : '#d1d5db'}`,
    borderRadius: '12px',
    padding: '32px 24px',
    textAlign: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isDragging ? '#eff6ff' : error ? '#fef2f2' : '#f9fafb',
    opacity: disabled ? 0.5 : 1
  };

  const uploadIconStyle = {
    fontSize: '48px',
    marginBottom: '12px',
    color: '#6b7280'
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
    fontSize: '24px'
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
    marginTop: '8px',
    fontSize: '11px',
    color: '#9ca3af'
  };

  return React.createElement('div', { style: containerStyle }, [
    // Label
    React.createElement('label', { key: 'label', style: labelStyle },
      label,
      required && React.createElement('span', { key: 'star', style: requiredStar }, '*')
    ),

    // Dropzone
    React.createElement('div', {
      key: 'dropzone',
      style: dropzoneStyle,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onClick: () => !disabled && fileInputRef.current?.click()
    }, [
      React.createElement('div', { key: 'icon', style: uploadIconStyle }, '📁'),
      React.createElement('div', { key: 'text', style: uploadTextStyle }, 
        isDragging ? 'Drop your file here' : 'Drag and drop your file here'
      ),
      React.createElement('div', { key: 'or', style: { ...uploadTextStyle, fontSize: '12px' } }, 'or'),
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

    // File info if file is selected
    value && React.createElement('div', { key: 'fileInfo', style: fileInfoStyle }, [
      React.createElement('div', { key: 'details', style: fileDetailsStyle }, [
        React.createElement('span', { key: 'icon', style: fileIconStyle }, value.icon || '📎'),
        React.createElement('div', { key: 'info', style: { flex: 1 } }, [
          React.createElement('div', { key: 'name', style: fileNameStyle }, value.name),
          React.createElement('div', { key: 'meta', style: fileMetaStyle }, [
            value.formattedSize || formatFileSize(value.size),
            value.lastModified && ` • Modified: ${value.lastModified}`
          ].filter(Boolean).join(''))
        ])
      ]),
      React.createElement('button', {
        key: 'remove',
        style: removeButtonStyle,
        onClick: removeFile,
        onMouseEnter: (e) => e.target.style.color = '#dc2626',
        onMouseLeave: (e) => e.target.style.color = '#9ca3af'
      }, '✕')
    ]),

    // Image preview for images
    filePreview && React.createElement('div', {
      key: 'preview',
      style: {
        marginTop: '12px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      }
    }, [
      React.createElement('img', {
        key: 'preview-img',
        src: filePreview,
        alt: 'Preview',
        style: { width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }
      })
    ]),

    // Error message
    error && React.createElement('div', { key: 'error', style: errorStyle }, [
      React.createElement('span', { key: 'error-icon' }, '⚠️'),
      React.createElement('span', { key: 'error-text' }, error)
    ]),

    // Accepted formats
    React.createElement('div', { key: 'formats', style: acceptedFormatsStyle },
      `Accepted formats: ${accept.replace(/\./g, '').toUpperCase()}`
    ),

    // CSS animations
    React.createElement('style', { key: 'styles', dangerouslySetInnerHTML: {
      __html: `
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
      `
    }})
  ]);
};

export default FileUpload;