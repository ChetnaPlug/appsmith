import React from 'react';

const DatePicker = ({ 
  value = '', 
  onChange, 
  label = 'Date', 
  placeholder = 'Select date',
  disabled = false, 
  required = false, 
  size = 'md', 
  error = '' 
}) => {
  const inputStyle = {
    width: '100%',
    padding: size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px',
    border: `1px solid ${error ? '#dc2626' : '#d1d5db'}`,
    borderRadius: '6px',
    fontSize: size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: error ? '#dc2626' : '#374151'
  };

  return React.createElement('div', { style: { padding: '10px', fontFamily: 'Arial, sans-serif' } }, [
    React.createElement('label', { key: 'label', style: labelStyle }, 
      label, 
      required && React.createElement('span', { key: 'star', style: { color: '#dc2626', marginLeft: '4px' } }, '*')
    ),
    React.createElement('input', {
      key: 'input',
      type: 'date',
      value: value,
      onChange: (e) => onChange && onChange(e.target.value),
      placeholder: placeholder,
      disabled: disabled,
      required: required,
      style: inputStyle
    }),
    error && React.createElement('div', { key: 'error', style: { color: '#dc2626', fontSize: '12px', marginTop: '5px' } }, error)
  ]);
};

export default DatePicker;