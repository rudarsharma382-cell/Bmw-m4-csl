import React from 'react';

export const Preloader = ({ progress, isReady, onEnter }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0b0c0e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 5vw, 64px)',
        pointerEvents: isReady ? 'none' : 'auto',
        opacity: isReady ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top Header Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '16px',
        }}
      >
        <span className="label-micro">BMW M G82 // TELEMETRY BUFFER</span>
        <span className="label-micro">SPEC: COMPETITION SPORT LIGHTWEIGHT</span>
      </div>

      {/* Center Numeric Telemetry */}
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 'clamp(64px, 14vw, 180px)',
              fontWeight: 800,
              lineHeight: 0.9,
              color: 'var(--text)',
            }}
          >
            {String(Math.min(100, Math.round(progress))).padStart(3, '0')}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 600,
              color: 'var(--accent)',
            }}
          >
            %
          </span>
        </div>

        {/* Minimal Hairline Progress Gauge with M Tricolor Accent */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--line)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, progress)}%`,
              backgroundColor: 'var(--text)',
              transition: 'width 0.2s ease-out',
            }}
          />
        </div>

        {/* M Tricolor Micro Bar Detail (3px) */}
        <div
          style={{
            display: 'flex',
            height: '3px',
            width: '48px',
            marginTop: '12px',
          }}
        >
          <div style={{ flex: 1, backgroundColor: 'var(--m-blue-light)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--m-blue-dark)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--m-red)' }} />
        </div>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--text-dim)',
              letterSpacing: '0.04em',
            }}
          >
            LOADING HIGH-RESOLUTION FRAME BUFFERS (30 FPS)
          </p>

          {progress >= 100 && (
            <button
              onClick={onEnter}
              style={{
                background: 'transparent',
                border: '1px solid var(--text)',
                color: 'var(--text)',
                padding: '12px 24px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-label)',
                letterSpacing: '0.14em',
                cursor: 'pointer',
                borderRadius: '0px',
                textTransform: 'uppercase',
              }}
            >
              INITIALIZE SCROLL
            </button>
          )}
        </div>
      </div>

      {/* Bottom Telemetry Details */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--line)',
          paddingTop: '16px',
        }}
      >
        <span className="label-micro">LIMITED RUN // 1,000 UNITS</span>
        <span className="label-micro">S58 3.0L BI-TURBO // 550 HP</span>
      </div>
    </div>
  );
};
