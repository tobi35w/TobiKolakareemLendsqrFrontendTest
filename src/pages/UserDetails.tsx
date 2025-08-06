import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../styles/UserDetails.scss';
import '../styles/UserDetailsSummary.scss';
import "../styles/UserDetailsInfo.scss";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/users.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((u: any) => String(u.id) === id);
        setUser(found);
      });
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Topbar />
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span style={{fontSize: "1.2rem", lineHeight: 1}}>&larr;</span> Back to Users
        </button>
        <div className="user-details__header">
          <h2>User Details</h2>
          <div>
            <button className="blacklist-btn">BLACKLIST USER</button>
            <button className="activate-btn">ACTIVATE USER</button>
          </div>
        </div>

        {/* --- REPLACE SUMMARY AND TABS BORDER WITH NEW DESIGN --- */}
        <div className="summary-container">
          <div className="summary-row">
            <div className="summary-avatar">
              <img
                src="/icons/avatar.png"
                alt="Avatar"
              />
              <div>
                <div className="summary-name">{user.name}</div>
                <div className="summary-id">{user.id}</div>
              </div>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-tier">
              <div className="summary-tier-label">User’s Tier</div>
              <div className="summary-tier-stars">
                <img src="/icons/star1.png" alt="star" />
                <img src="/icons/star2.png" alt="star"  />
                <img src="/icons/star3.png" alt="star"  />
              </div>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-balance">
              <div className="summary-balance-amount">₦200,000.00</div>
              <div className="summary-bank-id">9912345678/Providus Bank</div>
            </div>
          </div>
          <div className="summary-tabs">
            <span className="active">General Details</span>
            <span>Documents</span>
            <span>Bank Details</span>
            <span>Loans</span>
            <span>Savings</span>
            <span>App and System</span>
          </div>
        </div>
        {/* --- USER INFO SECTION --- */}
        <div className="user-details__section">
          <h4>Personal Information</h4>
          <div className="user-details__grid">
            <div><span>Full Name</span><p>{user.name || 'N/A'}</p></div>
            <div><span>Phone Number</span><p>{user.phone || 'N/A'}</p></div>
            <div><span>Email Address</span><p>{user.email || 'N/A'}</p></div>
            <div><span>BVN</span><p>{user.BVN || 'N/A'}</p></div>
            <div><span>Gender</span><p>{user.gender || 'N/A'}</p></div>
            <div><span>Marital Status</span><p>{user.marital_status || 'N/A'}</p></div>
            <div><span>Children</span><p>{user.children || 'N/A'}</p></div>
            <div><span>Type of Residence</span><p>{user.type_of_residence || 'N/A'}</p></div>
          </div>
          <hr/>
          <h4>Education and Employment</h4>
          <div className="user-details__grid">
            <div><span>Level of Education</span><p>{user.level_of_education || 'N/A'}</p></div>
            <div><span>Employment Status</span><p>{user.employment_status || 'N/A'}</p></div>
            <div><span>Sector of Employment</span><p>{user.sector_of_employment || 'N/A'}</p></div>
            <div><span>Duration of Employment</span><p>{user.duration_of_employment || 'N/A'}</p></div>
            <div><span>Office Email</span><p>{user.office_email || 'N/A'}</p></div>
            <div><span>Monthly Income</span><p>{user.monthly_income || 'N/A'}</p></div>
            <div><span>Loan Repayment</span><p>{user.loan_repayment || 'N/A'}</p></div>
          </div>
          <hr />
          <h4>Socials</h4>
          <div className="user-details__grid">
            <div><span>Twitter</span><p>{user.twitter || 'N/A'}</p></div>
            <div><span>Facebook</span><p>{user.facebook || 'N/A'}</p></div>
            <div><span>Instagram</span><p>{user.instagram || 'N/A'}</p></div>
          </div>
          <hr />
          <h4>Guarantors</h4>
          {Array.isArray(user.guarantors) && user.guarantors.length > 0 ? (
            <>
              <div className="user-details__grid">
                <div><span>Full Name</span><p>{user.guarantors[0]?.full_name || 'N/A'}</p></div>
                <div><span>Phone Number</span><p>{user.guarantors[0]?.phone || 'N/A'}</p></div>
                <div><span>Email Address</span><p>{user.guarantors[0]?.email || 'N/A'}</p></div>
                <div><span>Relationship</span><p>{user.guarantors[0]?.relationship || 'N/A'}</p></div>
              </div>
              {user.guarantors[1] && (
                <>
                  <br />
                  <div className="user-details__grid">
                    <div><span>Full Name</span><p>{user.guarantors[1]?.full_name || 'N/A'}</p></div>
                    <div><span>Phone Number</span><p>{user.guarantors[1]?.phone || 'N/A'}</p></div>
                    <div><span>Email Address</span><p>{user.guarantors[1]?.email || 'N/A'}</p></div>
                    <div><span>Relationship</span><p>{user.guarantors[1]?.relationship || 'N/A'}</p></div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="user-details__grid">
              <div><span>Full Name</span><p>N/A</p></div>
              <div><span>Phone Number</span><p>N/A</p></div>
              <div><span>Email Address</span><p>N/A</p></div>
              <div><span>Relationship</span><p>N/A</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;