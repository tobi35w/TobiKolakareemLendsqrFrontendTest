import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../styles/UserDetails.scss';

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
        <div className="user-details__container">
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

          {/* --- TOP BORDERED SECTION --- */}
          <div className="user-details__card user-details__card--summary" style={{flexDirection: 'column', alignItems: 'stretch'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div className="user-details__summary-section user-details__summary-avatar">
                <div className="user-details__avatar">
                  <img src="/icons/avatar.png" alt="Avatar" />
                </div>
                <div>
                  <div className="user-details__name">{user.name}</div>
                  <div className="user-details__id">{user.id}</div>
                </div>
              </div>
              <div className="user-details__summary-section user-details__summary-tier" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <div className="user-details__tier-label">User’s Tier</div>
                <div className="user-details__tier-stars">
                  <img src="/icons/star1.png" alt="star" />
                  <img src="/icons/star2.png" alt="star" />
                  <img src="/icons/star3.png" alt="star" />
                </div>
              </div>
              <div className="user-details__summary-section user-details__summary-bank" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <div className="user-details__balance">₦200,000.00</div>
                <div className="user-details__bank-id">9912345678/Providus Bank</div>
              </div>
            </div>
            {/* Tabs section now beneath the summary row */}
            <div className="user-details__tabs">
              <span className="active">General Details</span>
              <span>Documents</span>
              <span>Bank Details</span>
              <span>Loans</span>
              <span>Savings</span>
              <span>App and System</span>
            </div>
          </div>
          {/* --- BOTTOM BORDERED SECTION --- */}
          <div className="user-details__section">
            <h4>Personal Information</h4>
            <div className="user-details__grid">
              <div><span>Full Name</span><p>{user.name}</p></div>
              <div><span>Phone Number</span><p>{user.phone}</p></div>
              <div><span>Email Address</span><p>{user.email}</p></div>
              <div><span>BVN</span><p>{user.bvn || '07060780922'}</p></div>
              <div><span>Gender</span><p>{user.gender || 'Female'}</p></div>
              <div><span>Marital Status</span><p>{user.maritalStatus || 'Single'}</p></div>
              <div><span>Children</span><p>{user.children || 'None'}</p></div>
              <div><span>Type of Residence</span><p>{user.residence || "Parent's Apartment"}</p></div>
            </div>
            <hr/>
            <h4>Education and Employment</h4>
            <div className="user-details__grid">
              <div><span>Level of Education</span><p>{user.education || 'B.Sc'}</p></div>
              <div><span>Employment Status</span><p>{user.employmentStatus || 'Employed'}</p></div>
              <div><span>Sector of Employment</span><p>{user.sector || 'Fintech'}</p></div>
              <div><span>Duration of Employment</span><p>{user.duration || '2 years'}</p></div>
              <div><span>Office Email</span><p>{user.officeEmail || 'grace@lendsqr.com'}</p></div>
              <div><span>Monthly Income</span><p>{user.monthlyIncome || '₦200,000.00 - ₦400,000.00'}</p></div>
              <div><span>Loan Repayment</span><p>{user.loanRepayment || '40,000'}</p></div>
            </div>
            <hr />
            <h4>Socials</h4>
            <div className="user-details__grid">
              <div><span>Twitter</span><p>@{user.twitter || 'grace_effiom'}</p></div>
              <div><span>Facebook</span><p>{user.facebook || 'Grace Effiom'}</p></div>
              <div><span>Instagram</span><p>@{user.instagram || 'grace_effiom'}</p></div>
            </div>
            <hr />
            <h4>Guarantor</h4>
            <div className="user-details__grid">
              <div><span>Full Name</span><p>{user.guarantor?.name || 'Debby Ogana'}</p></div>
              <div><span>Phone Number</span><p>{user.guarantor?.phone || '07060780922'}</p></div>
              <div><span>Email Address</span><p>{user.guarantor?.email || 'debby@gmail.com'}</p></div>
              <div><span>Relationship</span><p>{user.guarantor?.relationship || 'Sister'}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;