import React, { useState } from 'react';
import axios from 'axios';

const examples = [
  "My manager took credit for my work in front of senior leadership.",
  "I was passed over for promotion twice despite good reviews. No explanation given.",
  "HR is pressuring me to resign instead of formally terminating me.",
  "My salary has not been credited for 2 months and my manager keeps saying it will come soon.",
];

const SituationAdvisor = () => {
  const [situation, setSituation] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyse = async () => {
    if (!situation.trim()) return;
    setLoading(true);
    setAnalysis('');
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/situation/analyse-situation', {
        situation
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
          Workplace Situation Advisor
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Describe any situation you're facing at work. Get your rights, an action plan, and exact words to use.
        </p>
      </div>

      {/* Example situations */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '10px' }}>Try an example:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setSituation(ex)}
              style={{
                backgroundColor: '#1a1d27',
                border: '1px solid #2a2d3e',
                borderRadius: '20px',
                padding: '6px 14px',
                color: '#9ca3af',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {ex.length > 50 ? ex.substring(0, 50) + '...' : ex}
            </button>
          ))}
        </div>
      </div>

      {/* Text area */}
      <textarea
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        placeholder="Describe your situation in detail. The more specific you are, the better the advice..."
        rows={6}
        style={{
          width: '100%',
          backgroundColor: '#1a1d27',
          border: '1px solid #2a2d3e',
          borderRadius: '10px',
          padding: '16px',
          color: '#e0e0e0',
          fontSize: '15px',
          resize: 'vertical',
          outline: 'none',
          marginBottom: '16px',
          fontFamily: 'inherit',
          lineHeight: '1.6'
        }}
      />

      {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px' }}>{error}</p>}

      <button
        onClick={handleAnalyse}
        disabled={!situation.trim() || loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: !situation.trim() || loading ? '#2a2d3e' : '#6366f1',
          color: !situation.trim() || loading ? '#6b7280' : '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: !situation.trim() || loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '32px'
        }}
      >
        {loading ? '🔍 Analysing your situation...' : 'Get Advice'}
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
            💡 Situation Analysis
          </h2>
          <div>{formatAnalysis(analysis)}</div>
        </div>
      )}
    </div>
  );
};

export default SituationAdvisor;