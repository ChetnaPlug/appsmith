(function(root, factory) {
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
});