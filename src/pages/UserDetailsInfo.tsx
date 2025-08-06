
import "../styles/UserDetailsInfo.scss";

const UserDetailsInfo = ({ user }: { user: any }) => (
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
    <h4>Guarantor</h4>
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
);

export default UserDetailsInfo;