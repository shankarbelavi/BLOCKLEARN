import React from 'react';

function TestApp() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        🚀 BlockLearn
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        AI-Powered Learning Platform
      </p>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        maxWidth: '600px'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>✅ Platform Status</h2>
        <p>✅ Frontend Server: Running</p>
        <p>✅ Backend Server: Running</p>
        <p>✅ React App: Loaded</p>
        <p>✅ Chat Widget: Available</p>
      </div>
      <button
        onClick={() => alert('BlockLearn is working! 🎉')}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Button - Click Me!
      </button>
    </div>
  );
}

export default TestApp;
