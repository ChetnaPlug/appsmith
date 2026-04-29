import React, { useState } from 'react';

const statusConfig = {
  draft:     { color: '#6b7280', bg: '#f3f4f6', label: 'Draft' },
  pending:   { color: '#d97706', bg: '#fef3c7', label: 'Pending' },
  approved:  { color: '#059669', bg: '#d1fae5', label: 'Approved' },
  rejected:  { color: '#dc2626', bg: '#fee2e2', label: 'Rejected' },
  active:    { color: '#2563eb', bg: '#dbeafe', label: 'Active' },
  closed:    { color: '#7c3aed', bg: '#ede9fe', label: 'Closed' },
};

const LoanCard = ({
  loanId = 'LN-2024-001',
  customerName = 'Rajesh Kumar',
  loanType = 'Personal Loan',
  amount = 400000,
  currency = '₹',
  status = 'draft',
  date = '2024-01-01',
  cibilScore = 600,
  officer = 'Neha Gupta',
  selected = false,
  onClick,
  onActionClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const st = statusConfig[status.toLowerCase()] || statusConfig.draft;

  const cibilColor = cibilScore >= 750 ? '#059669'
    : cibilScore >= 650 ? '#d97706' : '#dc2626';

  const formatAmount = (n) =>
    currency + Number(n).toLocaleString('en-IN');

  return (
    <div
      onClick={() => onClick && onClick({ loanId, customerName, status, amount })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'Inter, Arial, sans-serif',
        border: selected ? '2px solid #2563eb' : `1px solid ${hovered ? '#cbd5e1' : '#e2e8f0'}`,
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: selected ? '#eff6ff' : '#ffffff',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
        maxWidth: '380px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Row: Loan ID + Status + Amount */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#2563eb' }}>{loanId}</span>
          <span style={{
            fontSize: '11px', fontWeight: '500', padding: '2px 8px',
            borderRadius: '20px', backgroundColor: st.bg, color: st.color
          }}>
            • {st.label}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
            {formatAmount(amount)}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{date}</div>
        </div>
      </div>

      {/* Customer Name + Loan Type */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{customerName}</div>
        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{loanType}</div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: '#f1f5f9', marginBottom: '12px' }} />

      {/* Bottom Row: CIBIL + Officer + Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '2px' }}>CIBIL</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: cibilColor }}>{cibilScore}</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '2px' }}>OFFICER</div>
            <div style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>{officer}</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onActionClick && onActionClick({ loanId, customerName, status }); }}
          style={{
            background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px',
            padding: '4px 8px', cursor: 'pointer', color: '#64748b', fontSize: '16px',
            lineHeight: 1
          }}
        >
          ···
        </button>
      </div>
    </div>
  );
};

export default LoanCard;