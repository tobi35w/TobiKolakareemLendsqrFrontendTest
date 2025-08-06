import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../styles/Dashboard.scss';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  status: string;
  organization: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/users.json')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => {/* handle error, e.g. set an error state */});
  }, []);

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleViewDetails = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  // Filter and sort users
  let filteredUsers = search.trim()
    ? users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  if (sortColumn) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === 'createdAt') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      if (sortColumn === 'phone') {
        aValue = (aValue as string).replace(/\D/g, '');
        bValue = (bValue as string).replace(/\D/g, '');
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Topbar search={search} onSearchChange={setSearch} />
        <div className="dashboard__content">
          <h2>Users</h2>
          
          <div className="dashboard__stats">
            <StatCard icon="/icons/users.png" label="USERS" value="2,453" />
            <StatCard icon="/icons/active-users.png" label="ACTIVE USERS" value="2,453" />
            <StatCard icon="/icons/loans.png" label="USERS WITH LOANS" value="12,453" />
            <StatCard icon="/icons/savings.png" label="USERS WITH SAVINGS" value="102,453" />
          </div>
          
          <table className="dashboard__table">
            <thead>
              <tr>
                <SortableTh label="ORGANIZATION" column="organization" onSort={handleSort} />
                <SortableTh label="USERNAME" column="name" onSort={handleSort} />
                <SortableTh label="EMAIL" column="email" onSort={handleSort} />
                <SortableTh label="PHONE NUMBER" column="phone" onSort={handleSort} />
                <SortableTh label="DATE JOINED" column="createdAt" onSort={handleSort} />
                <SortableTh label="STATUS" column="status" onSort={handleSort} />
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>Lendsqr</td>
                  <td>{user.name.split(' ')[0]}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.createdAt}</td>
                  <td style={{ position: 'relative' }}>
                    <span className={`status status--${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                    <span
                      style={{ float: 'right', fontSize: '1.2em', color: '#545f7d', cursor: 'pointer' }}
                      onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                    >
                      ⋮
                    </span>
                    {menuOpen === user.id && (
                      <UserMenu
                        onViewDetails={() => handleViewDetails(user.id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            usersPerPage={usersPerPage}
            setCurrentPage={setCurrentPage}
            setUsersPerPage={setUsersPerPage}
            totalUsers={totalUsers}
          />
        </div>
      </div>
    </div>
  );
};



interface StatCardProps {
  icon: string;
  label: string;
  value: string;
}
const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="dashboard__card">
    <span className="dashboard__icon">
      <img src={icon} alt={label} style={{ width: 32, height: 32 }} />
    </span>
    <p className="dashboard__label">{label}</p>
    <h3 className="dashboard__value">{value}</h3>
  </div>
);

interface SortableThProps {
  label: string;
  column: keyof User;
  onSort: (column: keyof User) => void;
}
const SortableTh: React.FC<SortableThProps> = ({ label, column, onSort }) => (
  <th>
    {label}
    <img
      src="/icons/filter.png"
      alt="Filter"
      style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
      onClick={() => onSort(column)}
    />
  </th>
);

interface UserMenuProps {
  onViewDetails: () => void;
}
const UserMenu: React.FC<UserMenuProps> = ({ onViewDetails }) => (
  <div
    style={{
      position: 'absolute',
      right: 0,
      top: '2.5rem',
      background: '#fff',
      boxShadow: '0 2px 8px #e3e3e3',
      borderRadius: 8,
      minWidth: 180,
      zIndex: 10,
      padding: '0.5rem 0'
    }}
  >
    <div
      style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 1.2rem', cursor: 'pointer', color: '#545f7d' }}
      onClick={onViewDetails}
    >
      <img src="/icons/view.png" alt="View" style={{ width: 20, marginRight: 10 }} />
      View Details
    </div>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 1.2rem', cursor: 'pointer', color: '#545f7d' }}>
      <img src="/icons/blacklist.png" alt="Blacklist" style={{ width: 20, marginRight: 10 }} />
      Blacklist User
    </div>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 1.2rem', cursor: 'pointer', color: '#545f7d' }}>
      <img src="/icons/activate.png" alt="Activate" style={{ width: 20, marginRight: 10 }} />
      Activate User
    </div>
  </div>
);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  usersPerPage: number;
  setCurrentPage: (page: number) => void;
  setUsersPerPage: (num: number) => void;
  totalUsers: number;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  usersPerPage,
  setCurrentPage,
  setUsersPerPage,
  totalUsers
}) => (
  <div className="dashboard__pagination">
    <span>
      Showing&nbsp;
      <select
        value={usersPerPage}
        onChange={e => {
          setUsersPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        style={{ padding: '0.2rem 0.7rem', borderRadius: 4, border: '1px solid #e4eaf1', marginRight: 4 }}
      >
        {[9, 15, 30, 50, 100].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      out of {totalUsers}
    </span>
    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(page =>
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 1)
      )
      .reduce((acc: (number | string)[], page, idx, arr) => {
        if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push('...');
        acc.push(page);
        return acc;
      }, [])
      .map((page, idx) =>
        page === '...' ? (
          <span key={idx} style={{ padding: '0 6px' }}>...</span>
        ) : (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => setCurrentPage(Number(page))}
          >
            {page}
          </button>
        )
      )}
    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
  </div>
);

export default Dashboard;