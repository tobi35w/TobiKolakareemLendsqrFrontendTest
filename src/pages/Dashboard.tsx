import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../styles/Dashboard.scss';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/users.json')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  let filteredUsers = search.trim()
    ? users.filter((user: any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  if (sortColumn) {
    filteredUsers = [...filteredUsers].sort((a: any, b: any) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // For date, convert to Date object
      if (sortColumn === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      // For phone, remove non-numeric characters
      if (sortColumn === 'phone') {
        aValue = aValue.replace(/\D/g, '');
        bValue = bValue.replace(/\D/g, '');
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleViewDetails = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Topbar search={search} onSearchChange={setSearch} />
        <div className="dashboard__content">
          <h2>Users</h2>
          <div className="dashboard__stats">
            <div className="dashboard__card">
              <span className="dashboard__icon users">
                <img src="/icons/users.png" alt="Users" style={{ width: 32, height: 32 }} />
              </span>
              <p className="dashboard__label">USERS</p>
              <h3 className="dashboard__value">2,453</h3>
            </div>
            <div className="dashboard__card">
              <span className="dashboard__icon active">
                <img src="/icons/active-users.png" alt="Active Users" style={{ width: 32, height: 32 }} />
              </span>
              <p className="dashboard__label">ACTIVE USERS</p>
              <h3 className="dashboard__value">2,453</h3>
            </div>
            <div className="dashboard__card">
              <span className="dashboard__icon loans">
                <img src="/icons/loans.png" alt="Users with Loans" style={{ width: 32, height: 32 }} />
              </span>
              <p className="dashboard__label">USERS WITH LOANS</p>
              <h3 className="dashboard__value">12,453</h3>
            </div>
            <div className="dashboard__card">
              <span className="dashboard__icon savings">
                <img src="/icons/savings.png" alt="Users with Savings" style={{ width: 32, height: 32 }} />
              </span>
              <p className="dashboard__label">USERS WITH SAVINGS</p>
              <h3 className="dashboard__value">102,453</h3>
            </div>
          </div>
          <table className="dashboard__table">
            <thead>
              <tr>
                <th>
                  ORGANIZATION
                  <img
                    src="/icons/filter.png"
                    alt="Filter"
                    style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => handleSort('organization')}
                  />
                </th>
                <th>
                  USERNAME
                  <img
                    src="/icons/filter.png"
                    alt="Filter"
                    style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => handleSort('name')}
                  />
                </th>
                <th>
                  EMAIL
                  <img
                    src="/icons/filter.png"
                    alt="Filter"
                    style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => handleSort('email')}
                  />
                </th>
                <th>
                  PHONE NUMBER
                  <img
                    src="/icons/filter.png"
                    alt="Filter"
                    style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => handleSort('phone')}
                  />
                </th>
                <th>
                  DATE JOINED
                  <img
                    src="/icons/filter.png"
                    alt="Filter"
                    style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => handleSort('createdAt')}
                  />
                </th>
                <th>
                  STATUS
                  <img
                    src="/icons/filter.png"
                    alt="Filter"
                    style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => handleSort('status')}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any, idx: number) => (
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
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          // Show upward for last two users, downward for others
                          ...(idx >= filteredUsers.length - 2
                            ? { bottom: '2.5rem', top: 'auto' }
                            : { top: '2.5rem', bottom: 'auto' }),
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
                          onClick={() => handleViewDetails(user.id)}
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
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;