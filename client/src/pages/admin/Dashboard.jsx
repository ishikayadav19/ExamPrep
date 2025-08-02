import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import {
  FaChalkboardTeacher, FaBook, FaUserGraduate, FaQuestionCircle,
  FaClipboardList, FaChartBar, FaSignOutAlt, FaBars,
  FaArrowLeft
} from 'react-icons/fa';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    window.location.href = '/adlogin';
    return null;
  }

  const navItems = [
    { to: '/admin/session', label: 'Add Session', icon: <FaChalkboardTeacher /> },
    { to: '/admin/subject', label: 'Subject', icon: <FaBook /> },
    { to: '/admin/examinee', label: 'Examinee', icon: <FaUserGraduate /> },
    { to: '/admin/question-bank', label: 'Question Bank', icon: <FaQuestionCircle /> },
    { to: '/admin/examination', label: 'Examination', icon: <FaClipboardList /> },
    { to: '/admin/result', label: 'Result', icon: <FaChartBar /> },
  ];

  return (
    <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #ffffffff;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 240px;
          background: #121212;
          background: linear-gradient(145deg, #0d1f25, #000000);
          color: white;
          padding: 20px 10px;
          transition: width 0.3s ease;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0);
          
          
        }

        .collapsed .sidebar {
          width: 80px;
        }

        .sidebar-header {
          font-size: 1.7rem;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 700;
          color: #ffffffff;
          letter-spacing: 1px;
        }

        .nav-links {
          list-style: none;
          padding: 0;
        }

        .nav-links li {
          margin: 18px 0;
        }

        .nav-links a {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 15px;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.25s ease-in-out;
        }

        .nav-links a:hover {
          background: rgba(252, 255, 255, 0.15);
          box-shadow: 0 0 10px #fcfdfd44;
          transform: translateX(5px);
        }

        .nav-links a.active {
          background: #f9fafa22;
          box-shadow: inset 2px 2px 5px #00f0ff33;
        }

        .collapsed .nav-links a span {
          display: none;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          padding: 15px 25px;
          color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .toggle-btn {
          background: #000000ff;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .toggle-btn:hover {
          background: black;
          color: white;
        }

        .content {
          padding: 0px;
          background: #f9f9f9;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
          }

          .collapsed .sidebar {
            width: 100%;
          }

          .nav-links {
            display: flex;
            flex-direction: row;
            gap: 10px;
          }

          .nav-links a {
            flex-direction: column;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebar-header">{!collapsed && 'Admin'}</div>
        <ul className="nav-links">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className={location.pathname === item.to ? 'active' : ''}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link onClick={() => {
              localStorage.removeItem('role');
              localStorage.removeItem('email');
              window.location.href = '/adlogin';
            }}>
              <FaSignOutAlt /> <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn">
            <FaArrowLeft />
          </button>
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
