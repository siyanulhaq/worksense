import React, { useState } from 'react';
import axios from 'axios';

const sliders = [
  { name: 'workload', label: 'Workload', low: 'Overwhelming', high: 'Manageable' },
  { name: 'sleep_quality', label: 'Sleep Quality', low: 'Terrible', high: 'Excellent' },
  { name: 'mood', label: 'Mood', low: 'Very Low', high: 'Very High' },
  { name: 'control', label: 'Control Over Work', low: 'No Control', high: 'Full Control' },
  { name: 'recognition', label: 'Recognition', low: 'Unrecognised', high: 'Fully Valued' },
];

const BurnoutTracker = () => {
  const [scores, setScores] = useState({
    workload: 5,
    sleep_quality: 5,
    mood: 5,
    control: 5,
    recognition: 5,
  });
  const [note, setNote] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSlider = (name, value) => {
    setScores({ ...scores, [name]: parseInt(value) });
  };

  const getSliderColor = (value) => {
    if (value <= 3) return '#ef4444';
    if (value <= 6) return '#f59e0b';
    return '#22c55e';
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAnalysis('');
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/burnout/check-burnout', {
        ...scores,
        personal_note: note,
      });
      setAnalysis(res.data.analysis);
    } catch (err) {
      setError('Something went wrong. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
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
      } else if (line.includes('🟢') || line.includes('🟡') || line.includes('🟠') || line.includes('🔴')) {
        return <p key={i} style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginTop: '16px', marginBottom: '8px', padding: '12px', backgroundColor: '#0f1117', borderRadius: '8px' }}>{line}</p>;
      } else if (line.trim() === '') {
        return <br key={i} />;
      } else {
        return <p key={i} style={{ marginBottom: '6px', color: '#d1d5db', lineHeight: '1.6' }}>{line}</p>;
      }
    });
  };

  const avgScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5);

  return (
    <div style={{ maxWidth: '860px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
          Burnout Tracker
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Weekly check-in. Rate how you're feeling across 5 dimensions and get an honest burnout risk assessment.
        </p>
      </div>

      {/* Overall score indicator */}
      <div style={{
        backgroundColor: '#1a1d27',
        border: '1px solid #2a2d3e',
        borderRadius: '12px',
        padding: '20px 28px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ color: '#9ca3af', fontSize: '14px' }}>Overall Wellbeing Score</span>
        <span style={{
          fontSize: '32px',
          fontWeight: '800',
          color: getSliderColor(avgScore)
        }}>{avgScore}/10</span>
      </div>

      {/* Sliders */}
      <div style={{
        backgroundColor: '#1a1d27',
        border: '1px solid #2a2d3e',
        borderRadius: '12px',
        padding: '28px',
        marginBottom: '24px'
      }}>
        {sliders.map(slider => (
          <div key={slider.name} style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{slider.label}</span>
              <span style={{
                color: getSliderColor(scores[slider.name]),
                fontWeight: '700',
                fontSize: '16px'
              }}>{scores[slider.name]}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={scores[slider.name]}
              onChange={(e) => handleSlider(slider.name, e.target.value)}
              style={{ width: '100%', accentColor: getSliderColor(scores[slider.name]), cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ color: '#6b7280', fontSize: '11px' }}>{slider.low}</span>
              <span style={{ color: '#6b7280', fontSize: '11px' }}>{slider.high}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Personal note */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
          Anything specific on your mind this week? (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Had a difficult review, feeling overwhelmed with deadlines..."
          rows={3}
          style={{
            width: '100%',
            backgroundColor: '#1a1d27',
            border: '1px solid #2a2d3e',
            borderRadius: '10px',
            padding: '14px',
            color: '#e0e0e0',
            fontSize: '14px',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
            lineHeight: '1.6'
          }}
        />
      </div>

      {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px' }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: loading ? '#2a2d3e' : '#6366f1',
          color: loading ? '#6b7280' : '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '32px'
        }}
      >
        {loading ? '🔍 Analysing your wellbeing...' : 'Check My Burnout Risk'}
      </button>

      {analysis && (
        <div style={{
          backgroundColor: '#1a1d27',
          border: '1px solid #2a2d3e',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>
            🧠 Burnout Analysis
          </h2>
          <div>{formatAnalysis(analysis)}</div>
        </div>
      )}
    </div>
  );
};

export default BurnoutTracker;