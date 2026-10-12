import React, { useState, useEffect, useRef } from 'react';

export const Navigation = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const CHAPTERS = [
    { id: 'hero-sequence', num: '01', title: 'REVEAL' },
    { id: 'interstitial-aero', num: '02', title: 'AERO' },
    { id: 'doors-sequence', num: '03', title: 'COCKPIT' },
    { id: 'interstitial-weight', num: '04', title: 'WEIGHT' },
    { id: 'sweep-sequence', num: '05', title: 'SWEEP' },
    { id: 'interstitial-power', num: '06', title: 'S58' },
    { id: 'revolve-sequence', num: '07', title: '360°' },
    { id: 'showroom-3d', num: '08', title: '3D LAB' },
    { id: 'engineering-gallery', num: '09', title: 'GALLERY' },
    { id: 'spec-sheet', num: '10', title: 'SPECS' },
  ];

  // Track page scroll and active chapter dynamically
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollPercent(Math.round(progress));
      }

      // Detect active chapter based on viewport position
      const midScreen = window.innerHeight * 0.45;
      let currentIdx = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= midScreen) {
            currentIdx = i;
          }
        }
      }
      setActiveIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollTo(CHAPTERS[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < CHAPTERS.length - 1) {
      scrollTo(CHAPTERS[activeIndex + 1].id);
    }
  };

  // Authentic BMW Sound playback from assets/sound/bmw.mp3
  const handleBootSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/sound/bmw.mp3');
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  // M shift-light progression (01-03: cyan, 04-06: dark blue, 07-10: red)
  const getSegmentColor = (idx) => {
    if (idx < 3) return '#008ac9';
    if (idx < 6) return '#2e51a2';
    return '#ff3b1d';
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        backgroundColor: 'rgba(11, 12, 14, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
        userSelect: 'none',
      }}
    >
      {/* Top Hairline Scroll Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollPercent}%`,
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 8px rgba(255, 59, 29, 0.8)',
            transition: 'width 0.08s linear',
          }}
        />
      </div>

      <div
        className="container-grid"
        style={{
          height: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* =========================================================================
            LEFT BRAND SECTION (PRESERVED LOGOS & NAMES AS REQUIRED)
            BMW Roundel + BMW M Logo + M4 CSL Wordmark + 1 OF 1,000 // G82 Badge
            ========================================================================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
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
              padding: '4px 6px',
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
              className="label-micro brand-badge-desktop"
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

        {/* =========================================================================
            CENTER: LOOSENED MOTORSPORT CHAPTER TRACK (01 - 10)
            Clean, airy, perfectly spaced motorsport tachometer progression
            ========================================================================= */}
        <nav
          className="cockpit-track-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeIndex === idx;
            const segColor = getSegmentColor(idx);

            return (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  padding: isActive ? '6px 12px' : '6px 8px',
                  color: isActive ? '#ffffff' : 'var(--text-dim)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderBottom = `2px solid ${segColor}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-dim)';
                    e.currentTarget.style.borderBottom = '2px solid transparent';
                  }
                }}
                title={`Jump to Chapter ${ch.num}: ${ch.title}`}
              >
                {/* Active status micro-diode */}
                {isActive && (
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      backgroundColor: 'var(--accent)',
                      display: 'inline-block',
                    }}
                  />
                )}

                {/* Chapter Number */}
                <span
                  style={{
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? '#ffffff' : undefined,
                  }}
                >
                  {ch.num}
                </span>

                {/* Loosened Active Label Expansion */}
                {isActive && (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '12px',
                      letterSpacing: '0.05em',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                    }}
                  >
                    {ch.title}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile/Tablet Compact Stage Indicator */}
        <div
          className="cockpit-track-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              color: activeIndex === 0 ? 'rgba(255,255,255,0.2)' : 'var(--text)',
              padding: '4px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              cursor: activeIndex === 0 ? 'default' : 'pointer',
            }}
          >
            ◀
          </button>
          <div
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--line)',
              padding: '4px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>●</span>
            <span>{CHAPTERS[activeIndex].num}</span>
            <span style={{ color: 'var(--text-dim)' }}>//</span>
            <span>{CHAPTERS[activeIndex].title}</span>
          </div>
          <button
            onClick={handleNext}
            disabled={activeIndex === CHAPTERS.length - 1}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              color:
                activeIndex === CHAPTERS.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--text)',
              padding: '4px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              cursor: activeIndex === CHAPTERS.length - 1 ? 'default' : 'pointer',
            }}
          >
            ▶
          </button>
        </div>

        {/* =========================================================================
            RIGHT SECTION: TELEMETRY SCRUB, BOOT SOUND FX & 3D SHOWROOM
            ========================================================================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {/* Live Telemetry Scrub Readout */}
          <div
            className="telemetry-scrub-box"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '5px 10px',
            }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '8px' }}>●</span>
            <span style={{ color: 'var(--text-dim)', letterSpacing: '0.08em' }}>SCRUB:</span>
            <span
              style={{
                minWidth: '32px',
                textAlign: 'right',
                color: '#ffffff',
                fontWeight: 700,
              }}
            >
              {String(scrollPercent).padStart(3, '0')}%
            </span>
          </div>

          {/* Authentic BMW Sound Trigger (/assets/sound/bmw.mp3) */}
          <button
            onClick={handleBootSound}
            title={isPlaying ? 'Pause BMW Sound' : 'Play BMW Sound (/assets/sound/bmw.mp3)'}
            style={{
              background: isPlaying ? 'rgba(255, 59, 29, 0.12)' : 'transparent',
              border: `1px solid ${isPlaying ? 'var(--accent)' : 'var(--line)'}`,
              color: isPlaying ? 'var(--accent)' : 'var(--text)',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isPlaying) {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isPlaying) {
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.color = 'var(--text)';
              }
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: isPlaying ? 'var(--accent)' : 'var(--text-dim)',
                display: 'inline-block',
                boxShadow: isPlaying ? '0 0 6px var(--accent)' : 'none',
              }}
            />
            <span style={{ fontWeight: 800 }}>BOOT</span>
            <span
              className="sound-tag-text"
              style={{
                color: isPlaying ? 'var(--accent)' : 'var(--text-dim)',
                fontSize: '10px',
              }}
            >
              {isPlaying ? '// PLAYING' : '// SOUND'}
            </span>
          </button>

          {/* 3D Showroom Action Button */}
          <button
            onClick={() => scrollTo('showroom-3d')}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              color: 'var(--text)',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.backgroundColor = 'var(--bg-raised)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text)';
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--accent)',
                display: 'inline-block',
              }}
            />
            <span className="showroom-btn-text">3D SHOWROOM</span>
          </button>
        </div>
      </div>

      {/* Micro BMW M Tricolor Ribbon at Bottom Right Corner */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 'var(--site-margin-desktop, 64px)',
          display: 'flex',
          height: '2px',
          width: '36px',
        }}
      >
        <span style={{ flex: 1, backgroundColor: '#008ac9' }} />
        <span style={{ flex: 1, backgroundColor: '#20356c' }} />
        <span style={{ flex: 1, backgroundColor: '#ff3b1d' }} />
      </div>

      <style>{`
        .cockpit-track-mobile {
          display: none;
        }

        @media (max-width: 1240px) {
          .cockpit-track-desktop {
            display: none !important;
          }
          .cockpit-track-mobile {
            display: flex !important;
          }
          .brand-badge-desktop {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .telemetry-scrub-box {
            display: none !important;
          }
          .sound-tag-text {
            display: none !important;
          }
          .showroom-btn-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
