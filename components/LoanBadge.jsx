import React from 'react';

const LoanBadge = ({ 
  status = 'pending',
  amount = 0,
  customerName = '',
  dueDate = '',
  onClick 
}) => {
  const statusColors = {
    approved: '#10b981',
    pending: '#f59e0b',
    rejected: '#ef4444',
    completed: '#3b82f6'
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: statusColors[status.toLowerCase()] || '#6b7280',
    color: 'white'
  };

  const containerStyle = {
    padding: '15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    cursor: onClick ? 'pointer' : 'default',
    backgroundColor: 'white',
    transition: 'box-shadow 0.2s'
  };

  const amountStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '10px 0'
  };

  return React.createElement('div', { 
    style: containerStyle,
    onClick: () => onClick && onClick({ status, amount, customerName, dueDate })
  }, [
    React.createElement('div', { key: 'header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } }, [
      React.createElement('span', { key: 'name', style: { fontWeight: 'bold', color: '#6b7280' } }, customerName || 'Customer'),
      React.createElement('span', { key: 'badge', style: badgeStyle }, status.toUpperCase())
    ]),
    React.createElement('div', { key: 'amount', style: amountStyle }, `$${amount.toLocaleString()}`),
    dueDate && React.createElement('div', { key: 'due', style: { fontSize: '12px', color: '#6b7280', marginTop: '10px' } }, 
      `Due: ${new Date(dueDate).toLocaleDateString()}`
    )
  ]);
};

export default LoanBadge;