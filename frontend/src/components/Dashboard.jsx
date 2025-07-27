import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, statsResponse] = await Promise.all([
        axios.get('/api/form/users'),
        axios.get('/api/email/stats')
      ]);

      setUsers(usersResponse.data.users);
      setStats(statsResponse.data.stats);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to fetch dashboard data'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, updates) => {
    try {
      const response = await axios.patch(`/api/form/users/${userId}/status`, updates);
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'User status updated successfully'
        });
        fetchData(); // Refresh data
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update user status'
      });
    }
  };

  const resendEmail = async (userId) => {
    try {
      const response = await axios.post(`/api/form/users/${userId}/resend-email`);
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'Email resent successfully'
        });
        fetchData(); // Refresh data
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to resend email'
      });
    }
  };

  const triggerAutomation = async () => {
    try {
      const response = await axios.post('/api/email/trigger-automation');
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'Email automation triggered successfully'
        });
        fetchData(); // Refresh data
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to trigger automation'
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { class: 'badge-info', text: 'Submitted' },
      email_sent: { class: 'badge-warning', text: 'Email Sent' },
      reminder_1: { class: 'badge-warning', text: 'Reminder 1' },
      reminder_2: { class: 'badge-warning', text: 'Reminder 2' },
      final_reminder: { class: 'badge-danger', text: 'Final Reminder' },
      completed: { class: 'badge-success', text: 'Completed' },
      stopped: { class: 'badge-danger', text: 'Stopped' }
    };

    const config = statusConfig[status] || { class: 'badge-info', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Manage cohort enrollment and email automation
        </p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div className="card">
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
            {stats.totalUsers || 0}
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Total Emails Sent</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            {stats.totalEmailsSent || 0}
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Completed Payments</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
            {stats.usersWithPayment || 0}
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Avg Emails/User</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
            {(stats.avgEmailsPerUser || 0).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={triggerAutomation}
          >
            🔄 Trigger Email Automation
          </button>
          <button 
            className="btn btn-secondary"
            onClick={fetchData}
          >
            📊 Refresh Data
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>
          User Management ({users.length} users)
        </h3>
        
        {users.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No users found. Submit the interest form to see data here.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Emails Sent</th>
                  <th>Email Opened</th>
                  <th>Link Clicked</th>
                  <th>Payment</th>
                  <th>Last Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>{user.emailCount}</td>
                    <td>
                      <span className={`badge ${user.emailOpened ? 'badge-success' : 'badge-danger'}`}>
                        {user.emailOpened ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.clickedLink ? 'badge-success' : 'badge-danger'}`}>
                        {user.clickedLink ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.paymentComplete ? 'badge-success' : 'badge-danger'}`}>
                        {user.paymentComplete ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>{formatDate(user.lastEmailSent)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => updateUserStatus(user._id, { emailOpened: !user.emailOpened })}
                        >
                          {user.emailOpened ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => updateUserStatus(user._id, { clickedLink: !user.clickedLink })}
                        >
                          {user.clickedLink ? 'Unclick' : 'Mark Clicked'}
                        </button>
                        <button
                          className="btn btn-success"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => updateUserStatus(user._id, { paymentComplete: true })}
                          disabled={user.paymentComplete}
                        >
                          Mark Paid
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => resendEmail(user._id)}
                        >
                          Resend Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 