(function(root, factory) {
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
});