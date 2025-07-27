import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link to="/" style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              🎓 gradnext
            </Link>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                Interest Form
              </Link>
              <Link to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main style={{ padding: '40px 0' }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>

      <footer style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px 0',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <div className="container">
          <p style={{ color: '#666', margin: 0 }}>
            © 2024 gradnext. Cohort Enrollment Automation System.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App; 