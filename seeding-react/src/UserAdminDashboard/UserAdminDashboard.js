import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const UserAdminDashboard = () => {
  const location = useLocation();



      // useEffect(() => {
      //     const handler = () => {
      //         if(location.state.DashFlag){
      //             window.history.pushState(null,document.title,window.location.href)
      //         }
  
      //     }
      //     window.addEventListener('popstate', handler)
  
      // },[location])
    return (
         <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">My<span>App</span></div>
        <div className="nav">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
        </div>
        <div className="logout">Logout</div>
      </div>

      {/* Main content */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="profile">
            <div className="avatar">Hamza Abbas</div>
            <button className="logout-btn">Logout</button>
          </div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card success">
            <h3>Profile Completion</h3>
            <div className="value">80%</div>
          </div>
          <div className="card warning">
            <h3>Notifications</h3>
            <div className="value">3</div>
          </div>
        </div>

        {/* Simple user info table */}
        <div className="table-card">
          <h3>Recent Activities</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026-01-05</td>
                <td>Logged in</td>
                <td><span className="status active">Success</span></td>
              </tr>
              <tr>
                <td>2026-01-04</td>
                <td>Updated profile</td>
                <td><span className="status active">Success</span></td>
              </tr>
              <tr>
                <td>2026-01-03</td>
                <td>Password change</td>
                <td><span className="status blocked">Failed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}

export default UserAdminDashboard;