(function(root, factory) {
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
});