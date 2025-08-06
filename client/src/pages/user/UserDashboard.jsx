import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  FaUserCircle,
  FaGraduationCap,
  FaClipboardCheck,
  FaCalendarAlt,
  FaChartLine,
  FaKey,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";

// Sidebar gradient and styling colors
const sidebarGradient = "linear-gradient(145deg, #0d1f25, #000000)";
const inactiveLinkBg = "none";
const activeLinkBg = " #f9fafa22";
const activeLinkShadow = "inset 2px 2px 5px #00f0ff33";
const role = localStorage.getItem('userRole');

  if (role === 'user') {
    var Email = localStorage.getItem('userEmail');
  }
  else{
    window.location.href = '/';
  }

// Navigation items array
const navItems = [
  { to: "/user", label: "Profile", icon: <FaUserCircle /> },
  { to: "/user/scheduled", label: "Scheduled Exams", icon: <FaCalendarAlt /> },
  { to: "/user/myexams", label: "My Exams", icon: <FaClipboardCheck /> },
  { to: "/user/result", label: "Result", icon: <FaChartLine /> },
  { to: "/user/changePassword", label: "Change Password", icon: <FaKey /> },
];

// Helper function to fix active link issue
function isLinkActive(itemPath, currentPath) {
  if (itemPath === "/user") {
    // Profile active only on exact '/user' route, not subpaths
    return currentPath === "/user";
  }
  // For other routes, active if current path starts with the nav path
  return currentPath.startsWith(itemPath);
}

export default function UserDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Style Section 
  const styles = `
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #a3f2f8c4, #ffffffff, #a3f2f8c4);
      font-family: 'Segoe UI', sans-serif;
    }
    .ex-dashboard-container {
      display: flex;
      min-height: 100vh;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #a3f2f8c4, #ffffffff, #a3f2f8c4);
    }
    .ex-sidebar {
      width: 240px;
      background: ${sidebarGradient};
      color: white;
      padding: 20px 10px;
      transition: width 0.3s ease;
      box-shadow: 4px 0 15px rgba(0,0,0,0.1);
      position: relative;
      display: flex;
      flex-direction: column;
      z-index: 2;
    }
    .collapsed .ex-sidebar {
      width: 80px;
    }
    .ex-sidebar-header {
      font-size: 1.7rem;
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 1px;
      transition: opacity 0.2s;
    }
    .collapsed .ex-sidebar-header {
      opacity: 0;
      height: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    .ex-nav-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .ex-nav-links li {
      margin: 18px 0;
    }
    .ex-nav-links a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 15px;
      color: white;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.25s ease-in-out;
      background: ${inactiveLinkBg};
      cursor: pointer;
    }
    .ex-nav-links a.active {
      background: ${activeLinkBg};
      box-shadow: ${activeLinkShadow};
    }
    .ex-nav-links a:hover {
      background: rgba(252, 255, 255, 0.15);
      box-shadow: 0 0 10px #fcfdfd44;
      transform: translateX(5px);
    }
    .collapsed .ex-nav-links a span {
      display: none;
    }
    .ex-main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .ex-topbar {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      padding: 15px 25px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      z-index: 1;
    }
    .ex-toggle-btn {
      background: #000000ff;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .ex-content {
      padding: 0px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-height: 100vh;
      background: linear-gradient(135deg, #a3f2f8c4, #ffffffff, #a3f2f8c4);
    }
    @media (max-width: 768px) {
      .ex-dashboard-container { flex-direction: column; }
      .ex-sidebar, .collapsed .ex-sidebar { width: 100%; flex-direction: row; overflow-x: auto;}
      .ex-nav-links { display: flex; flex-direction: row; gap: 10px;}
      .ex-nav-links a { flex-direction: column; font-size: 13px; }
      .ex-main { min-height: 0; }
      .ex-content { padding: 15px 2vw;}
    }
  `;

  function handleLogout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  }

  // You might want to fetch user info for greeting/profile!
  const userInitial = "E";
  const greeting = "Good Afternoon, Examinee!";

  return (
    <div className={`ex-dashboard-container${collapsed ? " collapsed" : ""}`}>
      <style>{styles}</style>

      <div className="ex-sidebar">
        <div className="ex-sidebar-header">{!collapsed && "Examinee"}</div>
        <ul className="ex-nav-links">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className={isLinkActive(item.to, location.pathname) ? "active" : ""}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <a onClick={handleLogout} style={{ color: "#fff" }}>
              <FaSignOutAlt /> <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="ex-main">
        <div className="ex-topbar">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="ex-toggle-btn"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FaArrowLeft
              style={{
                transform: collapsed ? "rotate(180deg)" : undefined,
                transition: "0.3s",
              }}
            />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#0b1b20",
                marginRight: 14,
              }}
            >
              {greeting}
            </span>
            <span
              style={{
                height: 44,
                width: 44,
                background: "linear-gradient(135deg,#2c5364, #0b1b20, #2c5364)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1.3rem",
                color: "#fff",
              }}
            >
              {userInitial}
            </span>
          </div>
        </div>
        {/* Main Dashboard Content */}
        <div className="ex-content">
         {/* <DashboardWidgets />
          <ExamsTable /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
function DashboardWidgets() {
  return (
    <div style={{
      display: "flex",
      gap: "25px",
      margin: "20px",
    }}>
      <div style={{
        flex: 1,
        background: "linear-gradient(145deg, #0d1f25, #000000)",
        borderRadius: "18px",
        padding: "30px",
        boxShadow: "inset 5px 5px 100px 20px #00f0ff33",
        color: "#aeefff",
        textAlign: "center",
        fontSize: "1.1rem",
      }}>
        <div style={{ fontSize: "2.2rem", marginBottom: "7px" }}>3</div>
        Upcoming Exams
      </div>
      <div style={{
        flex: 1,
        background: "linear-gradient(145deg, #0d1f25, #000000)",
        borderRadius: "18px",
        padding: "30px",
        boxShadow: "inset 5px 5px 100px 20px #00f0ff33",
        color: "#aeefff",
        textAlign: "center",
        fontSize: "1.1rem",
      }}>
        <div style={{ fontSize: "2.2rem", marginBottom: "7px" }}>87%</div>
        Average Score
      </div>
    </div>
  );
}

function ExamsTable() {
  const rows = [
    { sn: 1, name: "Maths Test", marks: 45, total: 50, status: "Passed" },
    { sn: 2, name: "Science Quiz", marks: 35, total: 50, status: "Pending" },
    { sn: 3, name: "English Test", marks: 40, total: 50, status: "Passed" },
  ];
  return (
    <div style={{
      background: "linear-gradient(145deg, #0d1f25, #000000)",
      borderRadius: "18px",
      padding: "26px 24px",
      boxShadow: "inset 5px 5px 100px 20px #00f0ff33",
      overflowX: "auto",
      margin: "20px",
    }}>
      <table style={{
        width: "100%",
        color: "#d3f2ff",
        borderCollapse: "collapse",
        fontSize: "1.05rem",
        background: "none",
      }}>
        <thead>
          <tr>
            <th style={{
              background: "rgba(30,60,80,0.7)",
              padding: "14px",
              fontWeight: "600",
              fontSize: "1.15rem",
              textAlign: "left",
              borderBottom: "2px solid #29c6f6",
            }}>S.N</th>
            <th style={{
              background: "rgba(30,60,80,0.7)",
              padding: "14px",
              fontWeight: "600",
              fontSize: "1.15rem",
              textAlign: "left",
              borderBottom: "2px solid #29c6f6",
            }}>Exams</th>
            <th style={{
              background: "rgba(30,60,80,0.7)",
              padding: "14px",
              fontWeight: "600",
              fontSize: "1.15rem",
              textAlign: "left",
              borderBottom: "2px solid #29c6f6",
            }}>Marks</th>
            <th style={{
              background: "rgba(30,60,80,0.7)",
              padding: "14px",
              fontWeight: "600",
              fontSize: "1.15rem",
              textAlign: "left",
              borderBottom: "2px solid #29c6f6",
            }}>Total M</th>
            <th style={{
              background: "rgba(30,60,80,0.7)",
              padding: "14px",
              fontWeight: "600",
              fontSize: "1.15rem",
              textAlign: "left",
              borderBottom: "2px solid #29c6f6",
            }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.sn}>
              <td style={{
                padding: "13px 10px",
                borderBottom: "1px solid #1e3f58",
                textAlign: "left",
              }}>{r.sn}</td>
              <td style={{
                padding: "13px 10px",
                borderBottom: "1px solid #1e3f58",
                textAlign: "left",
              }}>{r.name}</td>
              <td style={{
                padding: "13px 10px",
                borderBottom: "1px solid #1e3f58",
                textAlign: "left",
              }}>{r.marks}</td>
              <td style={{
                padding: "13px 10px",
                borderBottom: "1px solid #1e3f58",
                textAlign: "left",
              }}>{r.total}</td>
              <td style={{
                padding: "13px 10px",
                borderBottom: "1px solid #1e3f58",
                textAlign: "left",
              }}>
                <span style={{
                  color: r.status === "Passed" ? "#25ff85" : "#f6bc41"
                }}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}