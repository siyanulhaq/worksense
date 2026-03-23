import React, { useState } from 'react';
import axios from 'axios';

const ContractAnalyser = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f) => {
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
    } else {
      setError('Please upload a PDF file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyse = async () => {
    if (!file) return;
    setLoading(true);
    setAnalysis('');
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/api/contract/analyse-contract', formData);
      setAnalysis(res.data.analysis);
    } catch (err) {
      setError('Something went wrong. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const formatAnalysis = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('###')) {
        return <h3 key={i} style={{ color: '#6366f1', marginTop: '20px', marginBottom: '8px', fontSize: '16px' }}>{line.replace(/###/g, '').trim()}</h3>;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} style={{ fontWeight: '700', color: '#fff', marginBottom: '6px' }}>{line.replace(/\*\*/g, '')}</p>;
      } else if (line.startsWith('*') || line.startsWith('-')) {
        return <li key={i} style={{ marginLeft: '20px', marginBottom: '6px', color: '#d1d5db', lineHeight: '1.6' }}>{line.replace(/^\*|-/, '').trim()}</li>;
      } else if (line.trim() === '') {
        return <br key={i} />;
      } else {
        return <p key={i} style={{ marginBottom: '6px', color: '#d1d5db', lineHeight: '1.6' }}>{line}</p>;
      }
    });
  };

  return (
    <div style={{ maxWidth: '860px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
          Contract Analyser
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Upload your employment contract or offer letter. We'll flag unfair clauses, missing terms, and tell you exactly what to negotiate.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => document.getElementById('fileInput').click()}
        style={{
          border: `2px dashed ${dragOver ? '#6366f1' : file ? '#22c55e' : '#2a2d3e'}`,
          borderRadius: '12px',
          padding: '48px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: dragOver ? '#1e1f2e' : '#1a1d27',
          transition: 'all 0.2s',
          marginBottom: '20px'
        }}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
        {file ? (
          <p style={{ color: '#22c55e', fontWeight: '600' }}>✓ {file.name}</p>
        ) : (
          <>
            <p style={{ color: '#9ca3af', marginBottom: '4px' }}>Drag & drop your PDF here</p>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>or click to browse</p>
          </>
        )}
      </div>

      {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px' }}>{error}</p>}

      <button
        onClick={handleAnalyse}
        disabled={!file || loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: !file || loading ? '#2a2d3e' : '#6366f1',
          color: !file || loading ? '#6b7280' : '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: !file || loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '32px'
        }}
      >
        {loading ? '🔍 Analysing your contract...' : 'Analyse Contract'}
      </button>

      {/* Results */}
      {analysis && (
        <div style={{
          backgroundColor: '#1a1d27',
          border: '1px solid #2a2d3e',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>
            📋 Analysis Results
          </h2>
          <div>{formatAnalysis(analysis)}</div>
        </div>
      )}
    </div>
  );
};

export default ContractAnalyser;