import React, { useState } from 'react';
import axios from 'axios';

const examples = [
  `John meets expectations in most areas. He is a reliable team member who completes tasks assigned to him. John could benefit from taking more initiative and demonstrating leadership qualities. His communication with stakeholders needs improvement.`,
  `Sarah consistently exceeds expectations. She has demonstrated exceptional leadership and has been instrumental in driving key projects. We look forward to seeing her take on greater responsibilities in the coming year.`,
  `David has shown improvement this quarter but still has areas that require significant development. His attention to detail and time management need to be addressed urgently. We will be monitoring his progress closely.`
];

const ReviewDecoder = () => {
  const [review, setReview] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyse = async () => {
    if (!review.trim()) return;
    setLoading(true);
    setAnalysis('');
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/review/analyse-review', {
        review
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
      } else if (line.includes('🟢') || line.includes('🟡') || line.includes('🔴')) {
        return <p key={i} style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginTop: '16px', marginBottom: '8px', padding: '12px', backgroundColor: '#0f1117', borderRadius: '8px' }}>{line}</p>;
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
          Performance Review Decoder
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Paste your performance review. We'll tell you what it really means, your actual standing, and exactly what to do next.
        </p>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '10px' }}>Try an example:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setReview(ex)}
              style={{
                backgroundColor: '#1a1d27',
                border: '1px solid #2a2d3e',
                borderRadius: '20px',
                padding: '6px 14px',
                color: '#9ca3af',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Example {i + 1} — {['Meets Expectations', 'Exceeds Expectations', 'Needs Improvement'][i]}
            </button>
          ))}
        </div>
      </div>

      {/* Text area */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Paste your full performance review here..."
        rows={8}
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
        disabled={!review.trim() || loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: !review.trim() || loading ? '#2a2d3e' : '#6366f1',
          color: !review.trim() || loading ? '#6b7280' : '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: !review.trim() || loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '32px'
        }}
      >
        {loading ? '🔍 Decoding your review...' : 'Decode Review'}
      </button>

      {analysis && (
        <div style={{
          backgroundColor: '#1a1d27',
          border: '1px solid #2a2d3e',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>
            🔍 Review Analysis
          </h2>
          <div>{formatAnalysis(analysis)}</div>
        </div>
      )}
    </div>
  );
};

export default ReviewDecoder;