import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../styles/Users.scss';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    date: '',
    phone: '',
    status: ''
  });

  // Pagination state
  const [usersPerPage, setUsersPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phone: '',
      status: ''
    });
  };

  const handleFilterApply = () => {
    setShowFilter(false);
  };

  // Filtering
  const filteredUsers = users.filter((user: any) => {
    if (filters.organization && user.organization?.toLowerCase() !== filters.organization.toLowerCase()) {
      return false;
    }
    if (filters.username && !user.name?.toLowerCase().includes(filters.username.toLowerCase())) {
      return false;
    }
    if (filters.email && !user.email?.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }
    if (filters.date && !user.createdAt?.startsWith(filters.date)) {
      return false;
    }
    if (filters.phone && !user.phone?.includes(filters.phone)) {
      return false;
    }
    if (filters.status && user.status?.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }
    return true;
  });

  if (sortColumn) {
    filteredUsers.sort((a: any, b: any) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
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

  // Pagination logic
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
                <th style={{ position: 'relative' }}>
                  ORGANIZATION
                  <img
                    src="/icons/filter.png"
                    alt="Filter"
                    style={{ marginLeft: 8, width: 16, verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => setShowFilter(!showFilter)}
                  />
                  {showFilter && (
                    <div className="filter-panel">
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          handleFilterApply();
                        }}
                      >
                        <div>
                          <label>Organization</label>
                          <select
                            name="organization"
                            value={filters.organization}
                            onChange={handleFilterChange}
                          >
                            <option value="">Select</option>
                            <option value="Lendsqr">Lendsqr</option>
                          </select>
                        </div>
                        <div>
                          <label>Username</label>
                          <input
                            name="username"
                            placeholder="User"
                            value={filters.username}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div>
                          <label>Email</label>
                          <input
                            name="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div style={{ position: 'relative' }}>
                          <label>Date</label>
                          <input
                            name="date"
                            type="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            style={{ paddingRight: '2.5rem' }}
                          />
                          <img
                            src="/icons/calendar.png"
                            alt="Calendar"
                            style={{
                              position: 'absolute',
                              right: '1rem',
                              top: '60%', // moved down from 50% to 60%
                              transform: 'translateY(-50%)',
                              width: 20,
                              height: 20,
                              pointerEvents: 'auto',
                              cursor: 'pointer'
                            }}
                            onClick={e => {
                              // Focus the input when icon is clicked
                              (e.currentTarget.previousElementSibling as HTMLInputElement)?.focus();
                            }}
                          />
                        </div>
                        <div>
                          <label>Phone Number</label>
                          <input
                            name="phone"
                            placeholder="Phone Number"
                            value={filters.phone}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div>
                          <label>Status</label>
                          <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                          >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-panel__actions">
                          <button type="button" onClick={handleFilterReset}>
                            Reset
                          </button>
                          <button type="submit">
                            Filter
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
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
              {paginatedUsers.map((user: any, idx: number) => (
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
                          ...(idx >= paginatedUsers.length - 2
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
          {/* Pagination Controls */}
          <div className="dashboard__pagination">
            <span>
              Showing&nbsp;
              <select
                value={usersPerPage}
                onChange={e => {
                  setUsersPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[9, 15, 30, 50, 100].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              &nbsp;out of {totalUsers}
            </span>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>
            {/* Pagination numbers with ellipsis */}
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
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;