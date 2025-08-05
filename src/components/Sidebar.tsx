import React, { useState } from 'react';
import '../styles/Sidebar.scss';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src="/assets/logo.png" alt="Lendsqr Logo" />
      </div>
      <nav className="sidebar__nav">
        <ul>
          {/* Item before Switch Organization */}
          <li className="sidebar__switch" style={{ cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
            <span>
              <img src="/icons/home.png" alt="" style={{ width: 18, marginRight: 8 }} />
              Switch Organization
              <img src="/icons/arrow-down.png" alt="" style={{ width: 10, marginLeft: 8, transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </span>
          </li>
          {/* Item after Switch Organization */}
          
          {menuOpen && (
            <>
              <li><a href="/dashboard"><img src="/icons/dashboard.png" alt="" style={{ width: 18, marginRight: 8 }} />Dashboard</a></li>
              <li className="sidebar__section">CUSTOMERS</li>
              <li><a href="/users"><img src="/icons/user.png" alt="" style={{ width: 18, marginRight: 8 }} />Users</a></li>
              <li><a href="#"><img src="/icons/guarantor.png" alt="" style={{ width: 18, marginRight: 8 }} />Guarantors</a></li>
              <li><a href="#"><img src="/icons/loan.png" alt="" style={{ width: 18, marginRight: 8 }} />Loans</a></li>
              <li><a href="#"><img src="/icons/agreement.png" alt="" style={{ width: 18, marginRight: 8 }} />Decision Models</a></li>
              <li><a href="#"><img src="/icons/saving.png" alt="" style={{ width: 18, marginRight: 8 }} />Savings</a></li>
              <li><a href="#"><img src="/icons/loan-requests.png" alt="" style={{ width: 18, marginRight: 8 }} />Loan Requests</a></li>
              <li><a href="#"><img src="/icons/whitelist.png" alt="" style={{ width: 18, marginRight: 8 }} />Whitelist</a></li>
              <li><a href="#"><img src="/icons/karma.png" alt="" style={{ width: 18, marginRight: 8 }} />Karma</a></li>
              <li className="sidebar__section">BUSINESSES</li>
              <li><a href="#"><img src="/icons/org.png" alt="" style={{ width: 18, marginRight: 8 }} />Organization</a></li>
              <li><a href="#"><img src="/icons/loan-products.png" alt="" style={{ width: 18, marginRight: 8 }} />Loan Products</a></li>
              <li><a href="#"><img src="/icons/savings-products.png" alt="" style={{ width: 18, marginRight: 8 }} />Savings Products</a></li>
              <li><a href="#"><img src="/icons/fees-charges.png" alt="" style={{ width: 18, marginRight: 8 }} />Fees and Charges</a></li>
              <li><a href="#"><img src="/icons/transactions.png" alt="" style={{ width: 18, marginRight: 8 }} />Transactions</a></li>
              <li><a href="#"><img src="/icons/services.png" alt="" style={{ width: 18, marginRight: 8 }} />Services</a></li>
              <li><a href="#"><img src="/icons/service-account.png" alt="" style={{ width: 18, marginRight: 8 }} />Service Account</a></li>
              <li><a href="#"><img src="/icons/settlements.png" alt="" style={{ width: 18, marginRight: 8 }} />Settlements</a></li>
              <li><a href="#"><img src="/icons/reports.png" alt="" style={{ width: 18, marginRight: 8 }} />Reports</a></li>
              <li className="sidebar__section">SETTINGS</li>
              <li><a href="#"><img src="/icons/preferences.png" alt="" style={{ width: 18, marginRight: 8 }} />Preferences</a></li>
              <li><a href="#"><img src="/icons/fees-pricing.png" alt="" style={{ width: 18, marginRight: 8 }} />Fees and Pricing</a></li>
              <li><a href="#"><img src="/icons/audit-logs.png" alt="" style={{ width: 18, marginRight: 8 }} />Audit Logs</a></li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
