import React, { useState, useRef } from 'react';

const FileUpload = ({ 
  value = null, 
  onChange, 
  label = 'Upload File',
  accept = '.pdf,.jpg,.png',
  disabled = false,
  required = false,
  error = '',
  helperText = 'Drag and drop or click to upload'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onChange) {
      onChange({ name: file.name, size: file.size, type: file.type, file });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file && onChange) {
      onChange({ name: file.name, size: file.size, type: file.type, file });
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const borderColor = error ? '#dc2626' : isDragging ? '#6366f1' : '#e2e8f0';
  const bgColor = isDragging ? '#eef2ff' : disabled ? '#f8fafc' : '#fafafa';

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', padding: '4px' }}>
      
      {/* LabeL */}
      <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: error ? '#dc2626' : '#374151' }}>
        {label}
        {required && <span style={{ color: '#dc2626', marginLeft: '3px' }}>*</span>}
      </label>

      {/* Drop Zone */}
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${borderColor}`,
          borderRadius: '10px',
          backgroundColor: bgColor,
          padding: '24px 16px',
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: disabled ? 0.6 : 1
        }}
      >
        {/* Upload Icon */}
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>
          {value ? '📄' : '☁️'}
        </div>

        {value ? (
          // File selected state
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
              {typeof value === 'object' ? value.name : value}
            </div>
            {typeof value === 'object' && value.size && (
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{formatSize(value.size)}</div>
            )}
            <div style={{ marginTop: '8px', fontSize: '11px', color: '#6366f1', fontWeight: '500' }}>
              Click to change file
            </div>
          </div>
        ) : (
          // Empty state
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
              Drop your file here, or{' '}
              <span style={{ color: '#6366f1', textDecoration: 'underline' }}>browse</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{helperText}</div>
          </div>
        )}
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        style={{ display: 'none' }}
      />

      {/* Error */}
      {error && (
        <div style={{ color: '#dc2626', fontSize: '11px', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;