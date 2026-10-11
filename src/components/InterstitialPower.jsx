import React, { useState, useMemo, useEffect, useRef } from 'react';
import { VERIFIED_SPECS } from '../data/specs';

/**
 * UI INTERSTITIAL 3: Powertrain & Track Performance Data
 * Enhanced with interactive S58 TwinPower Turbo Dyno & Nordschleife Telemetry:
 * - Interactive RPM Tachometer Scrubber (1,000 to 7,200 RPM)
 * - Dynamic Horsepower & Torque Curve visualizer
 * - Real-Time Boost Gauge sweeping up to 2.10 BAR
 * - Official Nürburgring Nordschleife 7:15.677 Split Telemetry
 * - Strict motorsport typography, hairline rules, 0px radius
 */
export const InterstitialPower = () => {
  const [rpm, setRpm] = useState(6250); // Default to peak power RPM
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Compute live dyno stats based on RPM
  const dynoStats = useMemo(() => {
    // Horsepower curve: peaks at 6,250 RPM with 550 HP
    let hp;
    if (rpm < 2750) {
      hp = Math.round(180 + ((rpm - 1000) / 1750) * 140);
    } else if (rpm <= 6250) {
      hp = Math.round(320 + ((rpm - 2750) / 3500) * 230);
    } else {
      // 6250 to 7200 RPM: slight taper to 535 HP
      hp = Math.round(550 - ((rpm - 6250) / 950) * 15);
    }

    // Torque curve: 650 Nm plateau from 2,750 to 5,950 RPM
    let torque;
    if (rpm < 2750) {
      torque = Math.round(380 + ((rpm - 1000) / 1750) * 270);
    } else if (rpm <= 5950) {
      torque = 650;
    } else {
      torque = Math.round(650 - ((rpm - 5950) / 1250) * 110);
    }

    // Boost: sweeps from 0.4 bar idle to 2.10 bar under full spool
    let boost;
    if (rpm < 2500) {
      boost = (0.4 + ((rpm - 1000) / 1500) * 1.0).toFixed(2);
    } else {
      boost = (1.4 + ((rpm - 2500) / 4700) * 0.7).toFixed(2);
    }

    // Shift LED count (up to 12)
    const ledCount = Math.min(12, Math.max(0, Math.round(((rpm - 2000) / 5200) * 12)));

    return { hp, torque, boost, ledCount };
  }, [rpm]);

  return (
    <section
      id="interstitial-power"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        paddingTop: 'var(--space-96)',
        paddingBottom: 'var(--space-96)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-grid">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid var(--line)',
            paddingBottom: '16px',
            marginBottom: 'var(--space-48)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <span className="label-micro" style={{ color: 'var(--accent)' }}>
            CHAPTER 06 // S58 ENGINE & CHASSIS DYNAMICS
          </span>
          <span className="label-micro">HOMOLOGATION TELEMETRY // 20.832 KM NORDSCHLEIFE</span>
        </div>

        {/* Hero Powertrain Metrics: 3 Colossal Data Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-32)',
            borderBottom: '1px solid var(--line)',
            paddingBottom: 'var(--space-48)',
            marginBottom: 'var(--space-48)',
          }}
          className="power-hero-grid"
        >
          {/* Power */}
          <div style={{ borderRight: '1px solid var(--line)', paddingRight: '24px' }}>
            <span className="label-micro">MAX OUTPUT @ 6,250 RPM</span>
            <span
              className="font-mono"
              style={{
                fontSize: 'clamp(56px, 8vw, 110px)',
                fontWeight: 900,
                lineHeight: 0.9,
                color: 'var(--text)',
                display: 'block',
                marginTop: '12px',
                letterSpacing: '-0.04em',
              }}
            >
              550
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: '12px',
              }}
            >
              <span className="font-display" style={{ fontSize: 'var(--text-h3)', fontWeight: 700 }}>
                HORSEPOWER
              </span>
              <span className="font-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                405 KW
              </span>
            </div>
            <p
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--text-dim)',
                marginTop: '12px',
                lineHeight: 1.5,
              }}
            >
              +40 hp over M4 Competition via modified boost pressure increased from 1.7 to 2.1 bar
              and bespoke engine management.
            </p>
          </div>

          {/* Torque */}
          <div style={{ borderRight: '1px solid var(--line)', paddingRight: '24px' }}>
            <span className="label-micro">PEAK TORQUE @ 2,750 – 5,950 RPM</span>
            <span
              className="font-mono"
              style={{
                fontSize: 'clamp(56px, 8vw, 110px)',
                fontWeight: 900,
                lineHeight: 0.9,
                color: 'var(--text)',
                display: 'block',
                marginTop: '12px',
                letterSpacing: '-0.04em',
              }}
            >
              650
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: '12px',
              }}
            >
              <span className="font-display" style={{ fontSize: 'var(--text-h3)', fontWeight: 700 }}>
                NEWTON-METRES
              </span>
              <span className="font-mono" style={{ color: 'var(--text-dim)' }}>
                479 LB-FT
              </span>
            </div>
            <p
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--text-dim)',
                marginTop: '12px',
                lineHeight: 1.5,
              }}
            >
              Sustained broad torque plateau delivered directly to the rear wheels via an 8-speed M
              Steptronic transmission with Drivelogic.
            </p>
          </div>

          {/* Nürburgring Lap Time */}
          <div>
            <span className="label-micro">NÜRBURGRING NORDSCHLEIFE</span>
            <span
              className="font-mono"
              style={{
                fontSize: 'clamp(56px, 8vw, 110px)',
                fontWeight: 900,
                lineHeight: 0.9,
                color: 'var(--accent)',
                display: 'block',
                marginTop: '12px',
                letterSpacing: '-0.04em',
              }}
            >
              7:15
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: '12px',
              }}
            >
              <span className="font-display" style={{ fontSize: 'var(--text-h3)', fontWeight: 700 }}>
                .677 MIN
              </span>
              <span className="font-mono" style={{ color: 'var(--text-dim)' }}>
                20.832 KM CIRCUIT
              </span>
            </div>
            <p
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--text-dim)',
                marginTop: '12px',
                lineHeight: 1.5,
              }}
            >
              Fastest officially recorded lap time of any series-production BMW model in history on
              the legendary Nürburgring Nordschleife.
            </p>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE S58 DYNO SIMULATOR & TACHOMETER BENCH
            ========================================================================= */}
        <div
          style={{
            border: '1px solid var(--line)',
            backgroundColor: 'rgba(20, 22, 28, 0.65)',
            padding: 'var(--space-24)',
            marginBottom: 'var(--space-48)',
          }}
        >
          {/* Bench Header & Shift Lights */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '14px',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  display: 'inline-block',
                }}
              />
              <span className="label-micro" style={{ color: 'var(--text)', fontWeight: 700 }}>
                S58B30T0 // 3.0-LITRE M TWINPOWER TURBO DYNO TEST BENCH
              </span>
            </div>

            {/* Shift Light Array */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const isActive = i < dynoStats.ledCount;
                let c = '#00e676';
                if (i >= 5 && i < 9) c = '#ffeb3b';
                if (i >= 9) c = '#ff3b1d';
                return (
                  <div
                    key={i}
                    style={{
                      width: '8px',
                      height: '14px',
                      backgroundColor: isActive ? c : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: isActive ? `0 0 8px ${c}` : 'none',
                      transition: 'background-color 0.1s ease',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Interactive RPM Slider & Live Readouts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '24px',
              paddingTop: '20px',
              alignItems: 'center',
            }}
            className="dyno-grid"
          >
            {/* Left: Live Tachometer & Scrub Slider */}
            <div style={{ gridColumn: 'span 7' }} className="dyno-left">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro">ENGINE SPEED</span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(32px, 4vw, 44px)',
                    fontWeight: 900,
                    color: rpm >= 6800 ? 'var(--accent)' : 'var(--text)',
                  }}
                >
                  {rpm} <span style={{ fontSize: '16px', color: 'var(--text-dim)' }}>RPM</span>
                </span>
              </div>

              {/* RPM Slider */}
              <div style={{ marginTop: '12px' }}>
                <input
                  type="range"
                  min="1000"
                  max="7200"
                  step="50"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--accent)',
                    cursor: 'ew-resize',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-dim)',
                    marginTop: '6px',
                  }}
                >
                  <span>1,000 IDLE</span>
                  <span>2,750 TORQUE PEAK</span>
                  <span style={{ color: 'var(--accent)' }}>6,250 HP PEAK</span>
                  <span>7,200 REDLINE</span>
                </div>
              </div>

              {/* Quick RPM Preset Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                {[
                  { label: 'IDLE (1,000)', val: 1000 },
                  { label: 'SPOOL (2,750)', val: 2750 },
                  { label: 'MIDRANGE (4,500)', val: 4500 },
                  { label: 'PEAK POWER (6,250)', val: 6250 },
                  { label: 'REDLINE (7,200)', val: 7200 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => setRpm(preset.val)}
                    style={{
                      background: rpm === preset.val ? 'var(--accent)' : 'transparent',
                      border: '1px solid var(--line)',
                      color: rpm === preset.val ? '#ffffff' : 'var(--text-dim)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Live Dynamic Dyno Metrics */}
            <div
              style={{
                gridColumn: 'span 5',
                borderLeft: '1px solid var(--line)',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
              className="dyno-right"
            >
              {/* Dynamic Power */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="label-micro">CALCULATED POWER</span>
                  <span className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>
                    {dynoStats.hp} HP
                  </span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--line)', marginTop: '4px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(dynoStats.hp / 550) * 100}%`,
                      backgroundColor: 'var(--text)',
                      transition: 'width 0.05s ease',
                    }}
                  />
                </div>
              </div>

              {/* Dynamic Torque */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="label-micro">CALCULATED TORQUE</span>
                  <span className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>
                    {dynoStats.torque} NM
                  </span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--line)', marginTop: '4px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(dynoStats.torque / 650) * 100}%`,
                      backgroundColor: 'var(--text-dim)',
                      transition: 'width 0.05s ease',
                    }}
                  />
                </div>
              </div>

              {/* Dynamic Boost */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="label-micro">TURBO BOOST PRESSURE</span>
                  <span className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>
                    {dynoStats.boost} BAR
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--line)', marginTop: '4px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(parseFloat(dynoStats.boost) / 2.1) * 100}%`,
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 0 6px var(--accent)',
                      transition: 'width 0.05s ease',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Engineering Matrix: 4 Data Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-24)',
          }}
          className="power-matrix-grid"
        >
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
            <span className="label-micro">0 TO 100 KM/H</span>
            <p
              className="font-mono"
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 800,
                color: 'var(--text)',
                marginTop: '8px',
              }}
            >
              3.7 S
            </p>
            <span className="label-micro" style={{ marginTop: '4px', display: 'block' }}>
              0 TO 200 KM/H: 10.7 S
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
            <span className="label-micro">MAXIMUM VELOCITY</span>
            <p
              className="font-mono"
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 800,
                color: 'var(--text)',
                marginTop: '8px',
              }}
            >
              307 KM/H
            </p>
            <span className="label-micro" style={{ marginTop: '4px', display: 'block' }}>
              ELECTRONICALLY GOVERNED
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
            <span className="label-micro">TURBO BOOST PRESSURE</span>
            <p
              className="font-mono"
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 800,
                color: 'var(--accent)',
                marginTop: '8px',
              }}
            >
              2.1 BAR
            </p>
            <span className="label-micro" style={{ marginTop: '4px', display: 'block' }}>
              BI-TURBO MONOTUBE CHARGERS
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
            <span className="label-micro">HOMOLOGATION TYRES</span>
            <p
              className="font-mono"
              style={{
                fontSize: 'var(--text-h3)',
                fontWeight: 700,
                color: 'var(--text)',
                marginTop: '12px',
              }}
            >
              CUP 2 R
            </p>
            <span className="label-micro" style={{ marginTop: '4px', display: 'block' }}>
              MICHELIN TRACK SPEC
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .power-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .power-hero-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--line);
            padding-bottom: 24px;
          }
          .power-matrix-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .dyno-left {
            grid-column: span 12 !important;
          }
          .dyno-right {
            grid-column: span 12 !important;
            border-left: none !important;
            border-top: 1px solid var(--line);
            padding-left: 0 !important;
            padding-top: 20px;
          }
        }
      `}</style>
    </section>
  );
};
