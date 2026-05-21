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

// LoanCard Bundle
const loancardBundle = `(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithLoanCard = factory(root.React);
  }
})(this, function(React) {
  const statusConfig = {
    draft:    { color: '#6b7280', bg: '#f3f4f6', label: 'Draft' },
    pending:  { color: '#d97706', bg: '#fef3c7', label: 'Pending' },
    approved: { color: '#059669', bg: '#d1fae5', label: 'Approved' },
    rejected: { color: '#dc2626', bg: '#fee2e2', label: 'Rejected' },
    active:   { color: '#2563eb', bg: '#dbeafe', label: 'Active' },
    closed:   { color: '#7c3aed', bg: '#ede9fe', label: 'Closed' },
  };

  return function(props) {
    const { loanId='LN-2024-001', customerName='Rajesh Kumar', loanType='Personal Loan',
            amount=400000, currency='₹', status='draft', date='2024-01-01',
            cibilScore=600, officer='Neha Gupta', selected=false, onClick, onActionClick } = props;

    const [hovered, setHovered] = React.useState(false);
    const st = statusConfig[status.toLowerCase()] || statusConfig.draft;
    const cibilColor = cibilScore >= 750 ? '#059669' : cibilScore >= 650 ? '#d97706' : '#dc2626';
    const formatAmount = (n) => currency + Number(n).toLocaleString('en-IN');

    return React.createElement('div', {
      onClick: () => onClick && onClick({ loanId, customerName, status, amount }),
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: { fontFamily: 'Inter, Arial, sans-serif', border: selected ? '2px solid #2563eb' : '1px solid ' + (hovered ? '#cbd5e1' : '#e2e8f0'),
               borderRadius: '12px', padding: '16px', backgroundColor: selected ? '#eff6ff' : '#ffffff',
               cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s ease',
               boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
               maxWidth: '380px', boxSizing: 'border-box' }
    }, [
      React.createElement('div', { key: 'top', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' } }, [
        React.createElement('div', { key: 'left', style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          React.createElement('span', { key: 'id', style: { fontSize: '12px', fontWeight: '600', color: '#2563eb' } }, loanId),
          React.createElement('span', { key: 'badge', style: { fontSize: '11px', fontWeight: '500', padding: '2px 8px', borderRadius: '20px', backgroundColor: st.bg, color: st.color } }, '• ' + st.label)
        ]),
        React.createElement('div', { key: 'right', style: { textAlign: 'right' } }, [
          React.createElement('div', { key: 'amt', style: { fontSize: '18px', fontWeight: '700', color: '#1e293b' } }, formatAmount(amount)),
          React.createElement('div', { key: 'date', style: { fontSize: '11px', color: '#94a3b8', marginTop: '2px' } }, date)
        ])
      ]),
      React.createElement('div', { key: 'customer', style: { marginBottom: '14px' } }, [
        React.createElement('div', { key: 'name', style: { fontSize: '15px', fontWeight: '700', color: '#1e293b' } }, customerName),
        React.createElement('div', { key: 'type', style: { fontSize: '12px', color: '#64748b', marginTop: '2px' } }, loanType)
      ]),
      React.createElement('div', { key: 'divider', style: { height: '1px', backgroundColor: '#f1f5f9', marginBottom: '12px' } }),
      React.createElement('div', { key: 'bottom', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        React.createElement('div', { key: 'meta', style: { display: 'flex', gap: '20px' } }, [
          React.createElement('div', { key: 'cibil' }, [
            React.createElement('div', { key: 'cl', style: { fontSize: '10px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '2px' } }, 'CIBIL'),
            React.createElement('div', { key: 'cv', style: { fontSize: '14px', fontWeight: '700', color: cibilColor } }, String(cibilScore))
          ]),
          React.createElement('div', { key: 'officer' }, [
            React.createElement('div', { key: 'ol', style: { fontSize: '10px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '2px' } }, 'OFFICER'),
            React.createElement('div', { key: 'ov', style: { fontSize: '13px', fontWeight: '500', color: '#374151' } }, officer)
          ])
        ]),
        React.createElement('button', {
          key: 'action',
          onClick: (e) => { e.stopPropagation(); onActionClick && onActionClick({ loanId, customerName, status }); },
          style: { background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#64748b', fontSize: '16px', lineHeight: 1 }
        }, '···')
      ])
    ]);
  };
});`;

// Header Bundle
const headerBundle = `(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithHeader = factory(root.React);
  }
})(this, function(React) {
  return function(props) {
    const { appName='Acme', user=null, onLogin, onLogout, onCreateAccount } = props;
    const [hoveredBtn, setHoveredBtn] = React.useState(null);

    return React.createElement('header', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
               padding: '12px 20px', borderBottom: '1px solid #e2e8f0',
               backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif',
               boxSizing: 'border-box', width: '100%' }
    }, [

      // Left: Logo + Name
      React.createElement('div', { key: 'left',
        style: { display: 'flex', alignItems: 'center', gap: '10px' }
      }, [
        React.createElement('div', { key: 'logo',
          style: { width: '32px', height: '32px', borderRadius: '8px',
                   background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   fontSize: '16px' }
        }, '🧊'),
        React.createElement('span', { key: 'name',
          style: { fontSize: '18px', fontWeight: '700', color: '#1e293b' }
        }, appName)
      ]),

      // Right: Auth buttons
      React.createElement('div', { key: 'right',
        style: { display: 'flex', alignItems: 'center', gap: '12px' }
      }, user ? [
        React.createElement('span', { key: 'welcome',
          style: { fontSize: '14px', color: '#475569' }
        }, [
          'Welcome, ',
          React.createElement('strong', { key: 'uname', style: { color: '#1e293b' } }, user.name),
          '!'
        ]),
        React.createElement('button', {
          key: 'logout',
          onClick: onLogout,
          style: { padding: '7px 16px', fontSize: '13px', fontWeight: '500',
                   border: '1px solid #cbd5e1', borderRadius: '6px',
                   backgroundColor: hoveredBtn === 'logout' ? '#f8fafc' : '#ffffff',
                   color: '#374151', cursor: 'pointer', transition: 'all 0.15s ease' },
          onMouseEnter: () => setHoveredBtn('logout'),
          onMouseLeave: () => setHoveredBtn(null)
        }, 'Log out')
      ] : [
        React.createElement('button', {
          key: 'login',
          onClick: onLogin,
          style: { padding: '7px 16px', fontSize: '13px', fontWeight: '500',
                   border: '1px solid #cbd5e1', borderRadius: '6px',
                   backgroundColor: hoveredBtn === 'login' ? '#f8fafc' : '#ffffff',
                   color: '#374151', cursor: 'pointer' },
          onMouseEnter: () => setHoveredBtn('login'),
          onMouseLeave: () => setHoveredBtn(null)
        }, 'Log in'),
        React.createElement('button', {
          key: 'signup',
          onClick: onCreateAccount,
          style: { padding: '7px 16px', fontSize: '13px', fontWeight: '600',
                   border: 'none', borderRadius: '6px',
                   backgroundColor: hoveredBtn === 'signup' ? '#4f46e5' : '#6366f1',
                   color: '#ffffff', cursor: 'pointer', transition: 'all 0.15s ease' },
          onMouseEnter: () => setHoveredBtn('signup'),
          onMouseLeave: () => setHoveredBtn(null)
        }, 'Sign up')
      ])
    ]);
  };
});`;

// UserChip Bundle
const userchipBundle = `(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.AppsmithUserChip = factory(root.React);
  }
})(this, function(React) {
  return function(props) {
    const { name = 'User', role = '', size = 'md', badge, onClick } = props;
    const initials = name.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0, 2);
    const avatarSize = size === 'lg' ? 40 : 32;
    const fontSize = size === 'lg' ? '15px' : '13px';

    return React.createElement('div', {
      onClick: function(){ onClick && onClick({ name, role }); },
      style: { display: 'inline-flex', alignItems: 'center', gap: '10px',
               padding: '6px 12px 6px 6px', borderRadius: '100px',
               border: '1px solid #e2e8f0', backgroundColor: '#f8fafc',
               cursor: onClick ? 'pointer' : 'default', fontFamily: 'Inter, Arial, sans-serif',
               width: 'fit-content' }
    }, [
      React.createElement('div', { key: 'avatar',
        style: { width: avatarSize, height: avatarSize, borderRadius: '50%',
                 background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 fontSize: size === 'lg' ? '14px' : '12px', fontWeight: '700', color: '#fff',
                 flexShrink: 0, position: 'relative' }
      }, [
        initials,
        badge && React.createElement('span', { key: 'dot',
          style: { position: 'absolute', bottom: 0, right: 0,
                   width: '10px', height: '10px', borderRadius: '50%',
                   backgroundColor: badge === 'online' ? '#10b981' : badge === 'busy' ? '#f59e0b' : '#6b7280',
                   border: '2px solid white' }
        })
      ]),
      React.createElement('div', { key: 'text' }, [
        React.createElement('div', { key: 'name',
          style: { fontSize: fontSize, fontWeight: '600', color: '#1e293b', lineHeight: 1.2 }
        }, name),
        role && React.createElement('div', { key: 'role',
          style: { fontSize: '11px', color: '#64748b', marginTop: '1px' }
        }, role)
      ])
    ]);
  };
});`;

// Write all bundles
fs.writeFileSync(path.join(__dirname, '../dist/datepicker-bundle.js'), datepickerBundle);
fs.writeFileSync(path.join(__dirname, '../dist/fileupload-bundle.js'), fileuploadBundle);
fs.writeFileSync(path.join(__dirname, '../dist/loanbadge-bundle.js'), loanbadgeBundle);
fs.writeFileSync(path.join(__dirname, '../dist/loancard-bundle.js'), loancardBundle);
fs.writeFileSync(path.join(__dirname, '../dist/header-bundle.js'), headerBundle);
fs.writeFileSync(path.join(__dirname, '../dist/userchip-bundle.js'), userchipBundle);
// console.log('  - dist/header-bundle.js');

console.log('✓ All bundles created successfully!');
console.log('  - dist/datepicker-bundle.js');
console.log('  - dist/fileupload-bundle.js');
console.log('  - dist/loanbadge-bundle.js');
console.log('  - dist/userchip-bundle.js');