import React, { useState } from 'react';
import { Outlet ,Link} from 'react-router';


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
            <style>
                {`/* Dashboard.css */

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
  transition: all 0.3s ease;
}

.sidebar {
  width: 240px;
  background: linear-gradient(to bottom right, #007bff, #6610f2);
  color: white;
  padding: 20px 10px;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.nav-links {
  list-style: none;
  padding: 0;
}

.nav-links li {
  padding: 10px 15px;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav-links li:hover {
  background: rgba(255, 255, 255, 0.25);
}

.main {
  flex: 1;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: linear-gradient(to right, #6f42c1, #e83e8c);
  padding: 15px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-btn {
  background: white;
  color: #6f42c1;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-btn:hover {
  background: #e9ecef;
}

.content {
  padding: 20px;
}`}
            </style>
            <div className="sidebar">
                <div className="sidebar-header">
                    <h4>Admin</h4>
                </div>
                <ul className="nav-links">
                    <li ><Link to="/admin/session">Session</Link></li>
                    <li><Link to="/admin/subject">Subject</Link></li>
                    <li><Link to="/admin/examinee">Examinee</Link></li>
                    {/* <li><Link to="/admin/question-bank">Question Bank</Link></li>
                    <li><Link to="/admin/examination">Examination</Link></li>
                    <li><Link to="/admin/result">Result</Link></li>
                    <li><Link to="/admin/logout">Logout</Link></li> */}
                </ul>
            </div>


            <div className="main">
                <div className="topbar">
                    <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn">
                        {collapsed ? 'Expand' : 'Collapse'}
                    </button>
                    <h2>Admin Dashboard</h2>
                </div>

                <div className="content">
                  <Outlet />
                    <p>Welcome to the admin dashboard. Use the sidebar to navigate.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;