// AppsmithFileUpload.jsx
import React from 'react';

// Simple FileUpload Component (No external dependencies)
const FileUpload = ({ 
    label = 'Upload documents', 
    helperText = 'Drag and drop or click to upload',
    onFiles,
    multiple = false,
    disabled = false,
    accept = '*',
    error = ''
}) => {
    const [dragActive, setDragActive] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const fileInputRef = React.useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const uploadedFiles = Array.from(e.dataTransfer.files);
            setFiles(uploadedFiles);
            if (onFiles) onFiles(uploadedFiles);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const uploadedFiles = Array.from(e.target.files);
            setFiles(uploadedFiles);
            if (onFiles) onFiles(uploadedFiles);
        }
    };

    const onButtonClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return React.createElement('div', { style: { width: '100%', fontFamily: 'system-ui, sans-serif' } },
        // Label
        label && React.createElement('label', { 
            style: { display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: error ? '#dc2626' : '#374151' }
        }, label, error && React.createElement('span', { style: { color: '#dc2626', marginLeft: '8px' } }, error)),
        
        // Drop Zone
        React.createElement('div', {
            style: {
                border: `2px ${dragActive ? 'solid' : 'dashed'} ${error ? '#dc2626' : (dragActive ? '#3b82f6' : '#d1d5db')}`,
                borderRadius: '8px',
                padding: '32px 20px',
                textAlign: 'center',
                backgroundColor: dragActive ? '#eff6ff' : (disabled ? '#f9fafb' : '#ffffff'),
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: disabled ? 0.6 : 1
            },
            onDragEnter: !disabled ? handleDrag : undefined,
            onDragLeave: !disabled ? handleDrag : undefined,
            onDragOver: !disabled ? handleDrag : undefined,
            onDrop: !disabled ? handleDrop : undefined,
            onClick: !disabled ? onButtonClick : undefined
        },
            // Upload Icon
            React.createElement('div', { style: { fontSize: '48px', marginBottom: '12px' } }, '📁'),
            
            // Title
            React.createElement('div', { style: { fontWeight: '500', marginBottom: '8px' } }, 
                files.length > 0 ? `${files.length} file(s) selected` : (helperText || 'Drag and drop or click to upload')
            ),
            
            // File names
            files.length > 0 && React.createElement('div', { style: { fontSize: '12px', color: '#6b7280', marginTop: '8px' } },
                files.map(f => React.createElement('div', { key: f.name }, `${f.name} (${formatFileSize(f.size)})`))
            ),
            
            // Hidden input
            React.createElement('input', {
                ref: fileInputRef,
                type: 'file',
                multiple: multiple,
                accept: accept,
                onChange: handleChange,
                style: { display: 'none' },
                disabled: disabled
            })
        )
    );
};

const AppsmithFileUpload = (props) => {
    const {
        label = 'Upload documents',
        helperText = 'Drag and drop or click to upload',
        onFiles,
        multiple = false,
        disabled = false,
        accept = 'application/pdf,image/*',
        error = ''
    } = props;

    return React.createElement(FileUpload, {
        label,
        helperText,
        onFiles,
        multiple,
        disabled,
        accept,
        error
    });
};

export default AppsmithFileUpload;