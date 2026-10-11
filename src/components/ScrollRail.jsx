import React, { useState, useEffect, useRef } from 'react';

/**
 * ScrollRail: Bespoke Right Draggable & Interactive Telemetry Scrollbar
 * Adheres strictly to antigravity.md:
 * - Hairline 1px borders
 * - Sharp 0px corners
 * - Tabular numbers
 * - Full drag scrub & quick chapter jump
 * - Custom BMW M pointer active throughout
 */
export const ScrollRail = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const railRef = useRef(null);

  const chapters = [
    { id: 'hero-sequence', label: '01' },
    { id: 'interstitial-aero', label: '02' },
    { id: 'doors-sequence', label: '03' },
    { id: 'interstitial-weight', label: '04' },
    { id: 'sweep-sequence', label: '05' },
    { id: 'interstitial-power', label: '06' },
    { id: 'revolve-sequence', label: '07' },
    { id: 'showroom-3d', label: '08' },
    { id: 'engineering-gallery', label: '09' },
    { id: 'spec-sheet', label: '10' },
  ];

  // Track page scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(window.scrollY / total);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  // Click or drag along the rail to scrub page
  const handleRailScrub = (clientY) => {
    if (!railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    const relativeY = Math.min(rect.height, Math.max(0, clientY - rect.top));
    const progress = relativeY / rect.height;
    setScrollProgress(progress);

    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: progress * totalScroll,
      behavior: 'auto',
    });
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    handleRailScrub(e.clientY);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      handleRailScrub(e.clientY);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="desktop-only"
      style={{
        position: 'fixed',
        right: '18px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
      }}
      aria-label="Interactive Chapter & Scroll Telemetry Rail"
    >
      {/* Top Telemetry Header */}
      <span
        className="label-micro"
        style={{
          fontSize: '11px',
          color: 'var(--text-dim)',
          marginBottom: '8px',
          letterSpacing: '0.1em',
        }}
      >
        TRACK
      </span>

      {/* Draggable Vertical Rail Container */}
      <div
        ref={railRef}
        onMouseDown={onMouseDown}
        style={{
          position: 'relative',
          width: '24px',
          height: 'clamp(280px, 45vh, 420px)',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'url(/assets/cursor/bmw_pointer_small.cur), url(/assets/cursor/bmw_pointer_22.png) 2 1, pointer !important',
        }}
      >
        {/* Background Vertical Hairline Rule */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'var(--line)',
          }}
        />

        {/* Chapter Tick Marks */}
        {chapters.map((ch, idx) => {
          const topPercent = (idx / (chapters.length - 1)) * 100;
          return (
            <button
              key={ch.id}
              onClick={(e) => {
                e.stopPropagation();
                scrollToId(ch.id);
              }}
              title={`Jump to Chapter ${ch.label}`}
              style={{
                position: 'absolute',
                top: `${topPercent}%`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                width: '6px',
                height: '6px',
                padding: 0,
                borderRadius: '0px',
                cursor: 'url(/assets/cursor/bmw_pointer_small.cur), url(/assets/cursor/bmw_pointer_22.png) 2 1, pointer !important',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.backgroundColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--line)';
                e.target.style.backgroundColor = 'var(--bg)';
              }}
            />
          );
        })}

        {/* Draggable Motorsport Thumb Indicator */}
        <div
          style={{
            position: 'absolute',
            top: `${scrollProgress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '24px',
            backgroundColor: isDragging ? 'var(--accent)' : 'var(--bg-raised)',
            border: `1px solid ${isDragging ? 'var(--accent)' : 'var(--text)'}`,
            borderRadius: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            transition: isDragging ? 'none' : 'top 0.05s ease-out',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {/* Subtle center grip notch */}
          <div
            style={{
              width: '8px',
              height: '2px',
              backgroundColor: isDragging ? '#0b0c0e' : 'var(--accent)',
            }}
          />
        </div>
      </div>

      {/* Numeric Percentage Telemetry */}
      <span
        className="font-mono"
        style={{
          fontSize: '11px',
          color: 'var(--accent)',
          marginTop: '8px',
          fontWeight: 700,
        }}
      >
        {String(Math.round(scrollProgress * 100)).padStart(2, '0')}%
      </span>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
};
