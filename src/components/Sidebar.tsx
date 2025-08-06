
import { useState } from 'react';
import '../styles/Sidebar.scss';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login'); // This will redirect to login.tsx
  };

  return (
    <aside className="sidebar" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="sidebar__logo">
          <img src="/assets/logo.png" alt="Lendsqr Logo" />
        </div>
        <nav className="sidebar__nav">
          <ul>
            <li className="sidebar__switch" style={{ cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
              <span>
                <img src="/icons/home.png" alt="" style={{ width: 18, marginRight: 8 }} />
                Switch Organization
                <img src="/icons/arrow-down.png" alt="" style={{ width: 10, marginLeft: 8, transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </span>
            </li>
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
                <li><a href="#"><img src="/icons/home.png" alt="" style={{ width: 18, marginRight: 8 }} />Organization</a></li>
                <li><a href="#"><img src="/icons/loan products.png" alt="" style={{ width: 18, marginRight: 8 }} />Loan Products</a></li>
                <li><a href="#"><img src="/icons/bank.png" alt="" style={{ width: 18, marginRight: 8 }} />Savings Products</a></li>
                <li><a href="#"><img src="/icons/coins.png" alt="" style={{ width: 18, marginRight: 8 }} />Fees and Charges</a></li>
                <li><a href="#"><img src="/icons/transactions.png" alt="" style={{ width: 18, marginRight: 8 }} />Transactions</a></li>
                <li><a href="#"><img src="/icons/services.png" alt="" style={{ width: 18, marginRight: 8 }} />Services</a></li>
                <li><a href="#"><img src="/icons/service-account.png" alt="" style={{ width: 18, marginRight: 8 }} />Service Account</a></li>
                <li><a href="#"><img src="/icons/settlements.png" alt="" style={{ width: 18, marginRight: 8 }} />Settlements</a></li>
                <li><a href="#"><img src="/icons/report.png" alt="" style={{ width: 18, marginRight: 8 }} />Reports</a></li>
                <li className="sidebar__section">SETTINGS</li>
                <li><a href="#"><img src="/icons/preferences.png" alt="" style={{ width: 18, marginRight: 8 }} />Preferences</a></li>
                <li><a href="#"><img src="/icons/pricing.png" alt="" style={{ width: 18, marginRight: 8 }} />Fees and Pricing</a></li>
                <li><a href="#"><img src="/icons/audit-logs.png" alt="" style={{ width: 18, marginRight: 8 }} />Audit Logs</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="sidebar-logout">
        <button className="sidebar-logout__btn" onClick={handleLogout}>
          <img src="/icons/logout.png" alt="Logout" style={{ width: 18, marginRight: 8 }} />
          Logout
        </button>
        <div className="sidebar-logout__version">
          <img src="/icons/version.png" alt="Version" style={{ width: 48, opacity: 0.7 }} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
