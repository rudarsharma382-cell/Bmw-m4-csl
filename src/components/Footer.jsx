import React from 'react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        paddingTop: 'var(--space-64)',
        paddingBottom: 'var(--space-64)',
      }}
    >
      <div className="container-grid">
        {/* BMW M Tricolor Micro Bar Detail (Strictly 3px high, once in footer) */}
        <div
          style={{
            display: 'flex',
            height: '3px',
            width: '64px',
            marginBottom: 'var(--space-32)',
          }}
        >
          <div style={{ flex: 1, backgroundColor: 'var(--m-blue-light)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--m-blue-dark)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--m-red)' }} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '32px',
            borderBottom: '1px solid var(--line)',
            paddingBottom: 'var(--space-48)',
            marginBottom: 'var(--space-32)',
          }}
        >
          <div>
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 900,
                color: 'var(--text)',
                display: 'block',
              }}
            >
              BMW M4 CSL (G82)
            </span>
            <p
              className="font-mono"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--text-dim)',
                marginTop: '8px',
                letterSpacing: '0.04em',
              }}
            >
              COMPETITION SPORT LIGHTWEIGHT // 1,000 UNITS WORLDWIDE
            </p>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              color: 'var(--text)',
              padding: '12px 24px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-label)',
              letterSpacing: '0.14em',
              cursor: 'pointer',
              borderRadius: '0px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--text)';
              e.target.style.backgroundColor = 'var(--bg-raised)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--line)';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            RETURN TO SUMMIT [▲]
          </button>
        </div>

        {/* Legal Disclaimer Mandated by Section 5 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--text-dim)',
              lineHeight: 1.5,
              maxWidth: '80ch',
            }}
          >
            Unofficial fan project. BMW, M and CSL are registered trademarks of BMW AG. This
            cinematic digital experience is developed for creative and editorial demonstration
            purposes only.
          </p>

          <span className="label-micro">CINEMATIC SCROLL ARCHITECTURE // 2026</span>
        </div>
      </div>
    </footer>
  );
};
