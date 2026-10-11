import React, { useState, useEffect } from 'react';

export const Navigation = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('01 REVEAL');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollPercent(Math.round(progress));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(11, 12, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="container-grid"
        style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Monogram: BMW Roundel, ///M Badge, M4 CSL Wordmark & Aerodynamic Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => scrollTo('hero-sequence')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '4px 8px',
              transition: 'opacity 0.2s ease',
            }}
            title="BMW M4 CSL (G82) - Return to Top"
          >
            {/* Official BMW Roundel Emblem from assets/logos/BMW.svg.webp */}
            <img
              src="/assets/logos/BMW.svg.webp"
              alt="BMW"
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'contain',
                flexShrink: 0,
                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.7))',
              }}
            />

            {/* Official BMW ///M Logo & Bold M4 CSL Wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src="/assets/logos/bmw_m_logo_clean.png"
                alt="BMW M"
                style={{
                  height: '18px',
                  width: 'auto',
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'block',
                }}
              />

              {/* Bold M4 CSL Wordmark */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                }}
              >
                M4 CSL
              </span>
            </div>

            <span
              style={{
                display: 'inline-block',
                width: '1px',
                height: '18px',
                backgroundColor: 'var(--line)',
                marginLeft: '2px',
              }}
            />
            <span
              className="label-micro"
              style={{
                color: 'var(--text-dim)',
                letterSpacing: '0.14em',
                fontSize: '10px',
              }}
            >
              1 OF 1,000 // G82
            </span>
          </button>
        </div>

        {/* Desktop Quick Nav Links — 21st.dev minimal motorsport layout */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          {[
            { id: 'hero-sequence', label: '01 REVEAL' },
            { id: 'interstitial-aero', label: '02 AERO' },
            { id: 'doors-sequence', label: '03 COCKPIT' },
            { id: 'interstitial-weight', label: '04 WEIGHT' },
            { id: 'sweep-sequence', label: '05 SWEEP' },
            { id: 'interstitial-power', label: '06 S58' },
            { id: 'revolve-sequence', label: '07 360°' },
            { id: 'showroom-3d', label: '08 3D LAB' },
            { id: 'engineering-gallery', label: '09 GALLERY' },
            { id: 'spec-sheet', label: '10 SPECS' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-label)',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dim)')}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Live Scroll Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-label)',
              color: 'var(--text)',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>●</span>
            <span>SCRUB:</span>
            <span style={{ minWidth: '32px', textAlign: 'right' }}>
              {String(scrollPercent).padStart(3, '0')}%
            </span>
          </div>

          <button
            onClick={() => scrollTo('showroom-3d')}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              color: 'var(--text)',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-label)',
              letterSpacing: '0.12em',
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
            3D SHOWROOM
          </button>
        </div>
      </div>

      {/* Top Hairline Scroll Progress Meter */}
      <div
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'transparent',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollPercent}%`,
            backgroundColor: 'var(--accent)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
