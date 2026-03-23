import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

const links = [
  { path: '/', label: 'Contract Analyser' },
  { path: '/situation', label: 'Situation Advisor' },
  { path: '/review', label: 'Review Decoder' },
  { path: '/salary', label: 'Salary Intelligence' },
  { path: '/burnout', label: 'Burnout Tracker' },
];

  return (
    <nav style={{
      backgroundColor: '#1a1d27',
      padding: '16px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #2a2d3e',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px',
          backgroundColor: '#6366f1',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', fontSize: '16px'
        }}>W</div>
        <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>WorkSense</span>
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? '#6366f1' : '#9ca3af',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: location.pathname === link.path ? '#1e1f2e' : 'transparent'
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;