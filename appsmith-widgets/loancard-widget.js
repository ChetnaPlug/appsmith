appsmith.onReady(() => {
  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src; s.onload = resolve;
      s.onerror = () => reject(new Error(`Failed: ${src}`));
      document.head.appendChild(s);
    });
  }

  root.innerHTML = '<div style="padding:20px;text-align:center;color:#666;">Loading LoanCard...</div>';

  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js'),
    loadScript('https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js')
  ])
    .then(() => new Promise(r => setTimeout(r, 100)))
    .then(() => loadScript('https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.client.development.js'))
    .then(() => new Promise(r => setTimeout(r, 100)))
    .then(() => loadScript('https://cdn.jsdelivr.net/gh/ChetnaPlug/appsmith@v1.0.2/dist/loancard-bundle.js'))
    .then(() => {
      const Component = window.AppsmithLoanCard;
      if (!Component) throw new Error('LoanCard component not found');

      function Wrapper() {
        return React.createElement(Component, {
          loanId:       appsmith.model?.loanId       || 'LN-2024-001',
          customerName: appsmith.model?.customerName || 'Rajesh Kumar',
          loanType:     appsmith.model?.loanType     || 'Personal Loan',
          amount:       appsmith.model?.amount       || 400000,
          currency:     appsmith.model?.currency     || '₹',
          status:       appsmith.model?.status       || 'draft',
          date:         appsmith.model?.date         || '2024-01-01',
          cibilScore:   appsmith.model?.cibilScore   || 600,
          officer:      appsmith.model?.officer      || 'Neha Gupta',
          selected:     appsmith.model?.selected     || false,
          onClick: (data) => {
            appsmith.updateModel({ clickedLoan: data });
            appsmith.triggerEvent('onCardClick');
          },
          onActionClick: (data) => {
            appsmith.updateModel({ actionLoan: data });
            appsmith.triggerEvent('onActionClick');
          }
        });
      }

      const reactRoot = ReactDOM.createRoot(root);
      reactRoot.render(React.createElement(Wrapper));
      console.log('LoanCard loaded successfully');
    })
    .catch(err => {
      root.innerHTML = `<div style="color:#dc2626;padding:16px;border:1px solid #dc2626;border-radius:8px;">
        <strong>⚠️ Error:</strong> ${err.message}</div>`;
    });
});