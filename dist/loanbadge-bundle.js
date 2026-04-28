(function(root, factory) {
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
});