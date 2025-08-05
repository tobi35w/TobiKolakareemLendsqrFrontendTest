import React from 'react';

interface TopbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({ search = '', onSearchChange }) => (
  <div className="topbar">
    <div className="topbar__search">
      <input
        type="text"
        placeholder="Search for anything"
        value={search}
        onChange={e => onSearchChange && onSearchChange(e.target.value)}
      />
      <button>
        <img src="/icons/search.png" alt="Search" style={{ width: 18 }} />
      </button>
    </div>
    <div className="topbar__right">
      <a href="#" className="topbar__docs">Docs</a>
      <img src="/icons/bell.png" alt="Notifications" className="topbar__icon" style={{ width: 22, margin: '0 16px' }} />
      <div className="topbar__profile">
        <img src="/icons/profile.png" alt="Profile" className="topbar__avatar" style={{ width: 32, borderRadius: '50%' }} />
        <span className="topbar__name">Adedeji</span>
        <img src="/icons/arrow.png" alt="Dropdown" style={{ width: 12, marginLeft: 6 }} />
      </div>
    </div>
  </div>
);

export default Topbar;