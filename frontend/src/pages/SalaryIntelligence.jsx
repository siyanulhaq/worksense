import React, { useState } from 'react';
import axios from 'axios';

const companySizes = [
  'Startup (1-50 employees)',
  'Small (51-200 employees)',
  'Mid-size (201-1000 employees)',
  'Large (1000-5000 employees)',
  'Enterprise (5000+ employees)',
];

const SalaryIntelligence = () => {
  const [form, setForm] = useState({
    role: '',
    experience: '',
    location: '',
    current_salary: '',
    skills: '',
    company_size: companySizes[0],
  });
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = form.role && form.experience && form.location && form.current_salary && form.skills;

  const handleAnalyse = async () => {
    if (!isValid) return;
    setLoading(true);
    setAnalysis('');
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/salary/analyse-salary', {
        role: form.role,
        experience: parseInt(form.experience),
        location: form.location,
        current_salary: parseFloat(form.current_salary),
        skills: form.skills,
        company_size: form.company_size,
      });
      setAnalysis(res.data.analysis);
    } catch (err) {
      setError('Something went wrong. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#1a1d27',
    border: '1px solid #2a2d3e',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#e0e0e0',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const labelStyle = {
    display: 'block',
    color: '#9ca3af',
    fontSize: '13px',
    marginBottom: '6px',
    fontWeight: '500',
  };

  const formatAnalysis = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('###') || line.startsWith('##')) {
        return <h3 key={i} style={{ color: '#6366f1', marginTop: '24px', marginBottom: '8px', fontSize: '16px' }}>{line.replace(/##/g, '').trim()}</h3>;
      } else if (line.match(/^\*\*.*\*\*$/)) {
        return <p key={i} style={{ fontWeight: '700', color: '#fff', marginBottom: '6px' }}>{line.replace(/\*\*/g, '')}</p>;
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={i} style={{ marginLeft: '20px', marginBottom: '6px', color: '#d1d5db', lineHeight: '1.6' }}>{line.replace(/^\* |- /, '').trim()}</li>;
      } else if (line.match(/^\d\./)) {
        return <li key={i} style={{ marginLeft: '20px', marginBottom: '8px', color: '#d1d5db', lineHeight: '1.6', listStyleType: 'decimal' }}>{line.replace(/^\d\./, '').trim()}</li>;
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
          Salary Intelligence Engine
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Find out if you're being underpaid, what you should be earning, and exactly how to negotiate your next raise.
        </p>
      </div>

      <div style={{
        backgroundColor: '#1a1d27',
        border: '1px solid #2a2d3e',
        borderRadius: '12px',
        padding: '28px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Job Role / Title</label>
            <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Data Scientist" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Years of Experience</label>
            <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 3" type="number" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore, Mumbai" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Current Salary (LPA)</label>
            <input name="current_salary" value={form.current_salary} onChange={handleChange} placeholder="e.g. 8.5" type="number" style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Key Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} placeholder="e.g. Python, Machine Learning, SQL, TensorFlow" style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Company Size</label>
          <select name="company_size" value={form.company_size} onChange={handleChange} style={inputStyle}>
            {companySizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px' }}>{error}</p>}

      <button
        onClick={handleAnalyse}
        disabled={!isValid || loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: !isValid || loading ? '#2a2d3e' : '#6366f1',
          color: !isValid || loading ? '#6b7280' : '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: !isValid || loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '32px'
        }}
      >
        {loading ? '🔍 Analysing your salary...' : 'Analyse My Salary'}
      </button>

      {analysis && (
        <div style={{
          backgroundColor: '#1a1d27',
          border: '1px solid #2a2d3e',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>
            💰 Salary Analysis
          </h2>
          <div>{formatAnalysis(analysis)}</div>
        </div>
      )}
    </div>
  );
};

export default SalaryIntelligence;