import React, { useState, useMemo } from 'react';

/**
 * TelemetryHUD: Context-Aware Motorsport HUD & Technical Scanner
 * Positioned in the lower-right area to seamlessly and impeccably mask video watermarks:
 * - Video 1 (frames_studio): Studio Diagnostics & Homologation Scanner (Static display specs, dimensions, voltage)
 * - Video 2 (frames_doors): Cockpit Cell & Cabin Ergonomics Scanner (Door aperture, carbon bucket recline, mass delta)
 * - Video 3 & 4 (frames_drone_sweep, frames_drone_revolve): Pro Track Telemetry (Dynamic speed, gear, boost, G-meter)
 * - 100% Opaque Carbon Weave backdrop, 0px radius, hairline borders, BMW M tricolor livery
 */
export const TelemetryHUD = ({ scrollProgress = 0, chapter = '01', folder = 'frames_studio' }) => {
  const [activeTab, setActiveTab] = useState(0);

  const isStudio = folder === 'frames_studio';
  const isCockpit = folder === 'frames_doors';
  const isTrackMotion = folder === 'frames_drone_sweep' || folder === 'frames_drone_revolve';

  // Dynamic calculations mapped to scrub progress
  const telemetryData = useMemo(() => {
    const p = Math.min(1, Math.max(0, scrollProgress));

    // Dynamic track metrics (for Video 3 & 4 where car is running)
    const speed = Math.round(145 + p * 162); // 145 to 307 km/h on track
    const rpm = Math.round(4200 + p * 3000); // 4,200 to 7,200 RPM
    let gear = 'M4';
    if (speed > 265) gear = 'M7';
    else if (speed > 215) gear = 'M6';
    else if (speed > 175) gear = 'M5';

    const boost = (1.4 + p * 0.7).toFixed(2); // up to 2.10 bar
    const lateralG = (1.1 + Math.sin(p * Math.PI * 3) * 0.45).toFixed(2);
    const gDotX = Math.sin(p * Math.PI * 3) * 16;
    const gDotY = -Math.cos(p * Math.PI * 2) * 12;

    const throttle = Math.round(75 + Math.sin(p * Math.PI * 4) * 25);
    const brake = Math.round(Math.max(0, -Math.sin(p * Math.PI * 4) * 35));

    // Studio scan progress & voltage
    const scanAngle = Math.round(p * 360);
    const batteryVolts = (12.7 + Math.sin(p * Math.PI) * 0.2).toFixed(1);

    // Shift LEDs
    const rpmFraction = (rpm - 4200) / 3000;
    const activeLeds = Math.round(rpmFraction * 12);

    return {
      speed,
      rpm,
      gear,
      boost,
      lateralG,
      gDotX,
      gDotY,
      throttle,
      brake,
      scanAngle,
      batteryVolts,
      activeLeds,
    };
  }, [scrollProgress]);

  return (
    <div
      className={`telemetry-hud-root ${isStudio ? 'hud-studio' : ''}`}
      style={{
        position: 'absolute',
        bottom: isStudio ? 'clamp(46px, 5.5vh, 60px)' : 'clamp(56px, 8vh, 80px)',
        right: isStudio ? 'clamp(14px, 2vw, 32px)' : 'clamp(16px, 3.5vw, 60px)',
        zIndex: 28,
        width: isStudio ? 'clamp(260px, 19vw, 290px)' : 'clamp(310px, 26vw, 380px)',
        backgroundColor: '#0b0c0e',
        backgroundImage:
          'radial-gradient(ellipse at top left, rgba(255, 59, 29, 0.08) 0%, transparent 60%), linear-gradient(135deg, rgba(20, 22, 28, 0.98) 0%, rgba(11, 12, 14, 0.99) 100%)',
        border: '1px solid var(--line)',
        borderLeft: '2px solid var(--accent)',
        padding: isStudio ? '10px 14px' : '14px 18px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.85), 0 0 1px rgba(255, 255, 255, 0.1)',
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      {/* =========================================================================
          CASE A: VIDEO 1 — STUDIO SPECIFICATION & HARDWARE SCANNER
          (Stationary studio vehicle: dimensions, chassis #, monocoque, voltage)
          ========================================================================= */}
      {isStudio && (
        <div>
          {/* Header & Tricolor */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '6px',
              marginBottom: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  display: 'inline-block',
                  animation: 'pulse 1.4s infinite',
                }}
              />
              <span
                className="label-micro"
                style={{ color: 'var(--text)', letterSpacing: '0.12em', fontWeight: 700, fontSize: '9.5px' }}
              >
                M STUDIO RIG // G82 SPEC
              </span>
            </div>

            <div style={{ display: 'flex', height: '2.5px', width: '32px' }}>
              <div style={{ flex: 1, backgroundColor: 'var(--m-blue-light)' }} />
              <div style={{ flex: 1, backgroundColor: 'var(--m-blue-dark)' }} />
              <div style={{ flex: 1, backgroundColor: 'var(--m-red)' }} />
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              marginBottom: '8px',
            }}
          >
            {['DIMENSIONS', 'HOMOLOGATION', 'SYSTEMS'].map((tabLabel, idx) => {
              const isCurrent = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    background: isCurrent ? 'rgba(255, 59, 29, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isCurrent ? '1px solid var(--accent)' : '1px solid var(--line)',
                    color: isCurrent ? 'var(--text)' : 'var(--text-dim)',
                    fontSize: '8.5px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    padding: '3px 0',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>

          {/* Tab 0: Dimensions */}
          {activeTab === 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro" style={{ fontSize: '9px' }}>VEHICLE LENGTH</span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  4,794 <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>MM</span>
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                  marginTop: '6px',
                }}
              >
                <div style={{ border: '1px solid var(--line)', padding: '4px 6px' }}>
                  <span className="label-micro" style={{ fontSize: '8.5px' }}>BODY WIDTH</span>
                  <div className="font-mono" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text)', marginTop: '1px' }}>
                    1,921 MM
                  </div>
                </div>
                <div style={{ border: '1px solid var(--line)', padding: '4px 6px' }}>
                  <span className="label-micro" style={{ fontSize: '8.5px' }}>HEIGHT</span>
                  <div className="font-mono" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text)', marginTop: '1px' }}>
                    1,386 MM
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Homologation */}
          {activeTab === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro" style={{ fontSize: '8.5px' }}>LIMITED SERIES</span>
                <span className="font-mono" style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent)' }}>
                  1 OF 1,000 UNITS
                </span>
              </div>
              <div style={{ border: '1px solid var(--line)', padding: '4px 6px' }}>
                <span className="label-micro" style={{ fontSize: '8.5px' }}>BODY FINISH</span>
                <div className="font-mono" style={{ fontSize: '10.5px', color: 'var(--text)', marginTop: '1px' }}>
                  FROZEN BROOKLYN GREY METALLIC
                </div>
              </div>
              <div style={{ border: '1px solid var(--line)', padding: '4px 6px' }}>
                <span className="label-micro" style={{ fontSize: '8.5px' }}>STRIPING LIVERY</span>
                <div className="font-mono" style={{ fontSize: '10.5px', color: 'var(--text-dim)', marginTop: '1px' }}>
                  EXPOSED CFRP W/ RED PINSTRIPES
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Systems */}
          {activeTab === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro" style={{ fontSize: '8.5px' }}>RIG STATUS</span>
                <span className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: '#00e676' }}>
                  STATIC STAGE II // OPTIMAL
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ border: '1px solid var(--line)', padding: '4px 6px' }}>
                  <span className="label-micro" style={{ fontSize: '8.5px' }}>BATTERY</span>
                  <div className="font-mono" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text)', marginTop: '1px' }}>
                    {telemetryData.batteryVolts} V (LITHIUM)
                  </div>
                </div>
                <div style={{ border: '1px solid var(--line)', padding: '4px 6px' }}>
                  <span className="label-micro" style={{ fontSize: '8.5px' }}>TURNTABLE</span>
                  <div className="font-mono" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--accent)', marginTop: '1px' }}>
                    {telemetryData.scanAngle}° ANGLE
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Studio Ticker */}
          <div
            style={{
              marginTop: '8px',
              borderTop: '1px solid var(--line)',
              paddingTop: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className="label-micro" style={{ fontSize: '8.5px', color: 'var(--text-dim)' }}>
              IGNITION: STUDIO DIAGNOSTICS
            </span>
            <span className="label-micro" style={{ fontSize: '8.5px', color: 'var(--accent)', fontWeight: 700 }}>
              G82 VALIDATED
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          CASE B: VIDEO 2 — COCKPIT & CABIN ERGONOMICS SCANNER
          (Garage door opening sequence: carbon buckets, removed rear seats, harness)
          ========================================================================= */}
      {isCockpit && (
        <div>
          {/* Header & Tricolor */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '8px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  display: 'inline-block',
                  animation: 'pulse 1.4s infinite',
                }}
              />
              <span
                className="label-micro"
                style={{ color: 'var(--text)', letterSpacing: '0.12em', fontWeight: 700 }}
              >
                M COCKPIT CELL // ERGONOMICS
              </span>
            </div>

            <div style={{ display: 'flex', height: '3px', width: '36px' }}>
              <div style={{ flex: 1, backgroundColor: 'var(--m-blue-light)' }} />
              <div style={{ flex: 1, backgroundColor: 'var(--m-blue-dark)' }} />
              <div style={{ flex: 1, backgroundColor: 'var(--m-red)' }} />
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              marginBottom: '10px',
            }}
          >
            {['SEATS', 'REAR DELETION', 'MATERIALS'].map((tabLabel, idx) => {
              const isCurrent = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    background: isCurrent ? 'rgba(255, 59, 29, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isCurrent ? '1px solid var(--accent)' : '1px solid var(--line)',
                    color: isCurrent ? 'var(--text)' : 'var(--text-dim)',
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '4px 0',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>

          {/* Tab 0: Carbon Bucket Seats */}
          {activeTab === 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro">BUCKET SEAT SAVINGS</span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(28px, 3vw, 36px)',
                    fontWeight: 900,
                    color: 'var(--accent)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  -24.0 <span style={{ fontSize: '12px', color: 'var(--text)' }}>KG</span>
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginTop: '8px',
                }}
              >
                <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                  <span className="label-micro">BACKREST ANGLE</span>
                  <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                    FIXED 23° RECLINE
                  </div>
                </div>
                <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                  <span className="label-micro">HARNESS</span>
                  <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                    6-POINT PREPARED
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Rear Deletion */}
          {activeTab === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro">REAR BENCH PURGE</span>
                <span className="font-mono" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent)' }}>
                  -21.0 KG SAVED
                </span>
              </div>
              <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                <span className="label-micro">CONFIGURATION</span>
                <div className="font-mono" style={{ fontSize: '12px', color: 'var(--text)', marginTop: '2px' }}>
                  DELETED REAR BENCH + PARTITION BULKHEAD
                </div>
              </div>
              <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                <span className="label-micro">TRACK STORAGE</span>
                <div className="font-mono" style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '2px' }}>
                  2× FULL-FACE HELMET CARGO NETS
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Materials */}
          {activeTab === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro">CENTRE CONSOLE</span>
                <span className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
                  SOLID CFRP MONOCOQUE
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                  <span className="label-micro">STEERING WHEEL</span>
                  <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                    ALCANTARA M RIM
                  </div>
                </div>
                <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                  <span className="label-micro">UPHOLSTERY</span>
                  <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                    BLACK MERINO LEATHER
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Cockpit Ticker */}
          <div
            style={{
              marginTop: '10px',
              borderTop: '1px solid var(--line)',
              paddingTop: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className="label-micro" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
              PORTAL: COUPE DOORS OPEN
            </span>
            <span className="label-micro" style={{ fontSize: '9px', color: 'var(--accent)', fontWeight: 700 }}>
              DRIVER CELL SECURED
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          CASE C: VIDEO 3 & 4 — PRO ON-TRACK TELEMETRY
          (Car running at track speed: dynamic speed, RPM, gear, boost, G-meter)
          ========================================================================= */}
      {isTrackMotion && (
        <div>
          {/* LED Shift Light Array */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '4px',
              marginBottom: '10px',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const isActive = i < telemetryData.activeLeds;
              let color = '#00e676';
              if (i >= 5 && i < 9) color = '#ffeb3b';
              if (i >= 9) color = '#ff3b1d';

              return (
                <div
                  key={i}
                  style={{
                    height: '4px',
                    backgroundColor: isActive ? color : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive ? `0 0 6px ${color}` : 'none',
                    transition: 'background-color 0.08s ease, box-shadow 0.08s ease',
                  }}
                />
              );
            })}
          </div>

          {/* Header & Tricolor */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'var(--accent)',
                  display: 'inline-block',
                  animation: 'pulse 1.2s infinite',
                }}
              />
              <span
                className="label-micro"
                style={{ color: 'var(--text)', letterSpacing: '0.12em', fontWeight: 700 }}
              >
                M LAPTRIGGER // PRO TRACK DATA
              </span>
            </div>

            <div style={{ display: 'flex', height: '3px', width: '36px' }}>
              <div style={{ flex: 1, backgroundColor: 'var(--m-blue-light)' }} />
              <div style={{ flex: 1, backgroundColor: 'var(--m-blue-dark)' }} />
              <div style={{ flex: 1, backgroundColor: 'var(--m-red)' }} />
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              marginBottom: '10px',
            }}
          >
            {['TRACK', 'S58 ENGINE', 'CHASSIS'].map((tabLabel, idx) => {
              const isCurrent = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    background: isCurrent ? 'rgba(255, 59, 29, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isCurrent ? '1px solid var(--accent)' : '1px solid var(--line)',
                    color: isCurrent ? 'var(--text)' : 'var(--text-dim)',
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '4px 0',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>

          {/* Track Tab */}
          {activeTab === 0 && (
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '12px',
                  alignItems: 'center',
                }}
              >
                {/* Speed & Gear */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 'clamp(34px, 3.6vw, 44px)',
                        fontWeight: 900,
                        lineHeight: 1,
                        color: 'var(--text)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {telemetryData.speed}
                    </span>
                    <span className="label-micro" style={{ color: 'var(--text-dim)', fontSize: '10px' }}>
                      KM/H
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '6px',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        backgroundColor: 'rgba(255, 59, 29, 0.12)',
                        padding: '2px 6px',
                        border: '1px solid rgba(255, 59, 29, 0.3)',
                      }}
                    >
                      {telemetryData.gear}
                    </span>

                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                      {telemetryData.rpm} <span style={{ color: 'var(--text)' }}>RPM</span>
                    </span>
                  </div>
                </div>

                {/* G-Vector Scope */}
                <div
                  style={{
                    borderLeft: '1px solid var(--line)',
                    paddingLeft: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '1px solid var(--line)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                    <div
                      style={{
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                        transform: `translate(${telemetryData.gDotX}px, ${telemetryData.gDotY}px)`,
                        transition: 'transform 0.1s ease-out',
                        boxShadow: '0 0 6px var(--accent)',
                      }}
                    />
                  </div>

                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>
                    {telemetryData.lateralG}G LATERAL
                  </span>
                </div>
              </div>

              {/* Throttle & Brake Pedals */}
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-dim)', width: '38px' }}>
                    THR
                  </span>
                  <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--line)' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${telemetryData.throttle}%`,
                        backgroundColor: '#00e676',
                        transition: 'width 0.1s ease',
                      }}
                    />
                  </div>
                  <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text)', width: '28px', textAlign: 'right' }}>
                    {telemetryData.throttle}%
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-dim)', width: '38px' }}>
                    BRK
                  </span>
                  <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--line)' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${telemetryData.brake}%`,
                        backgroundColor: 'var(--accent)',
                        transition: 'width 0.1s ease',
                      }}
                    />
                  </div>
                  <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text)', width: '28px', textAlign: 'right' }}>
                    {telemetryData.brake}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* S58 Engine Tab */}
          {activeTab === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="label-micro">BOOST PRESSURE</span>
                  <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>
                    {telemetryData.boost} / 2.10 BAR
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--line)', marginTop: '4px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(parseFloat(telemetryData.boost) / 2.1) * 100}%`,
                      backgroundColor: 'var(--accent)',
                      transition: 'width 0.1s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                  <span className="label-micro">OIL TEMP</span>
                  <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                    104 °C
                  </div>
                </div>
                <div style={{ border: '1px solid var(--line)', padding: '6px 8px' }}>
                  <span className="label-micro">COOLANT</span>
                  <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                    92 °C
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chassis Tab */}
          {activeTab === 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="label-micro">MICHELIN CUP 2 R</span>
                <span className="label-micro" style={{ color: 'var(--accent)' }}>TRACK PRESSURE</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ border: '1px solid var(--line)', padding: '6px', textAlign: 'center' }}>
                  <span className="label-micro" style={{ fontSize: '9px' }}>FRONT LEFT</span>
                  <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>
                    2.2 BAR · 84°C
                  </div>
                </div>
                <div style={{ border: '1px solid var(--line)', padding: '6px', textAlign: 'center' }}>
                  <span className="label-micro" style={{ fontSize: '9px' }}>FRONT RIGHT</span>
                  <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>
                    2.2 BAR · 86°C
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Track Ticker */}
          <div
            style={{
              marginTop: '10px',
              borderTop: '1px solid var(--line)',
              paddingTop: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className="label-micro" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
              DIFF: ACTIVE M TRACK LOCK
            </span>
            <span className="label-micro" style={{ fontSize: '9px', color: 'var(--accent)', fontWeight: 700 }}>
              STAGE 10 M TRACTION
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          .telemetry-hud-root {
            width: 285px !important;
            bottom: 52px !important;
            right: 12px !important;
            padding: 10px 12px !important;
          }
          .telemetry-hud-root.hud-studio {
            width: 255px !important;
            bottom: 42px !important;
            right: 10px !important;
            padding: 8px 10px !important;
          }
        }
      `}</style>
    </div>
  );
};
