import React, { useState, useEffect, useRef } from 'react';
import { VERIFIED_SPECS } from '../data/specs';

/**
 * UI INTERSTITIAL 1: Design & Aerodynamic Architecture
 * Enhanced with interactive wind-tunnel aerodynamic flow visualizer:
 * - Dynamic SVG airflow streamlines
 * - Interactive highlight of front splitter, ducktail, laser DRLs, and laser threads
 * - Fluid transitions and verified aerodynamic telemetry
 */
export const InterstitialAero = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
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

  const aeroFeatures = [
    {
      id: '01',
      name: 'CFRP FRONT SPLITTER & RED CONTOURS',
      metric: 'HIGH-PRESSURE AIRFLOW DIVERSION',
      downforceMetric: '+28 KG LIFT REDUCTION @ 200 KM/H',
      focusArea: 'front-splitter',
      detail:
        'Constructed from visible carbon-fibre-reinforced plastic with bespoke red contour striping. Directs underbody laminar flow into dual carbon air channels to minimize aerodynamic lift at high track speeds.',
      spec: 'CFRP / DUAL-CHANNEL / RED PINSTRIPE ACCENT',
    },
    {
      id: '02',
      name: 'INTEGRATED CSL DUCKTAIL BOOTLID',
      metric: 'AERODYNAMIC REAR BALANCE',
      downforceMetric: '+34 KG REAR DOWNFORCE @ 200 KM/H',
      focusArea: 'rear-ducktail',
      detail:
        'Molded directly into the CFRP luggage compartment lid as an homage to the legendary 2003 E46 M3 CSL. Generates crucial downforce on the rear axle without the drag penalty of a freestanding pedestal wing.',
      spec: 'CFRP MONOCOQUE LID / INTEGRATED SPOILER LIP',
    },
    {
      id: '03',
      name: 'BMW LASERLIGHT // GT3 RACING SIGNATURE',
      metric: 'YELLOW ENDURANCE LIGHTING',
      downforceMetric: '650M RANGE // 5800K YELLOW ACCENT',
      focusArea: 'headlights',
      detail:
        'When the vehicle is unlocked and low/high beam headlights are activated, the angular daytime driving light tubes illuminate in intense racing yellow rather than standard white, invoking GT3 endurance champions.',
      spec: 'LASER HIGH-BEAM / YELLOW DRL TUBES',
    },
    {
      id: '04',
      name: 'LASER REAR LIGHTS WITH GLASS FIBER THREADS',
      metric: 'INTRICATE LIGHT SCULPTURE',
      downforceMetric: 'FILIGREE GLASS FIBER ILLUMINATION',
      focusArea: 'taillights',
      detail:
        'Rear light clusters incorporate ultra-precise laser diode technology illuminating filigree glass fiber threads woven inside the light covers, producing an unmistakable high-tech nocturnal light graphic.',
      spec: 'LASER DIODE / FILIGREE GLASS FIBER CORES',
    },
  ];

  const current = aeroFeatures[selectedFeature];

  return (
    <section
      id="interstitial-aero"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        paddingTop: 'var(--space-64)',
        paddingBottom: 'var(--space-80)',
        position: 'relative',
      }}
    >
      <div className="container-grid">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderBottom: '1px solid var(--line)',
            paddingBottom: 'var(--space-24)',
            marginBottom: 'var(--space-40)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-micro" style={{ color: 'var(--accent)' }}>
              CHAPTER 02 // AERO & SURFACE MORPHOLOGY
            </span>
            <span className="label-micro">WIND TUNNEL OPTIMIZATION // MUNICH</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text)',
              maxWidth: '20ch',
            }}
          >
            SCULPTED FOR DOWNFORCE.
          </h2>

          <p
            className="font-body"
            style={{
              color: 'var(--text-dim)',
              fontSize: 'var(--text-body)',
              maxWidth: '55ch',
            }}
          >
            Every surface element of the M4 CSL serves an explicit thermodynamic or aerodynamic
            function. Airflow is channeled over carbon surfaces to stabilize the chassis at high
            longitudinal speeds while cooling high-stress powertrain components.
          </p>
        </div>

        {/* Master Split Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-32)',
          }}
        >
          {/* Left Column: Interactive Telemetry List */}
          <div
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
            }}
            className="aero-left-col"
          >
            {aeroFeatures.map((item, index) => {
              const isSelected = selectedFeature === index;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFeature(index)}
                  style={{
                    borderTop: index === 0 ? '1px solid var(--line)' : 'none',
                    borderBottom: '1px solid var(--line)',
                    padding: 'var(--space-24) 0',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    backgroundColor: isSelected ? 'rgba(255, 59, 29, 0.04)' : 'transparent',
                    borderLeft: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
                    paddingLeft: isSelected ? '16px' : '0px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 'var(--text-label)',
                          color: isSelected ? 'var(--accent)' : 'var(--text-dim)',
                          fontWeight: 700,
                        }}
                      >
                        {item.id}
                      </span>
                      <h3
                        className="font-display"
                        style={{
                          fontSize: 'var(--text-h3)',
                          color: isSelected ? 'var(--text)' : 'var(--text-dim)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {item.name}
                      </h3>
                    </div>

                    <span
                      className="font-mono"
                      style={{
                        fontSize: 'var(--text-label)',
                        color: isSelected ? 'var(--accent)' : 'var(--text-dim)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {isSelected ? '[ACTIVE]' : '[INSPECT]'}
                    </span>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        paddingLeft: '32px',
                        marginTop: '12px',
                        animation: 'fadeIn 0.35s ease',
                      }}
                    >
                      <p
                        style={{
                          fontSize: 'var(--text-body)',
                          color: 'var(--text)',
                          lineHeight: 1.6,
                          marginBottom: '12px',
                        }}
                      >
                        {item.detail}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          gap: '12px',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          className="label-micro"
                          style={{
                            color: 'var(--accent)',
                            padding: '6px 12px',
                            border: '1px solid var(--line)',
                            display: 'inline-block',
                          }}
                        >
                          SPEC: {item.spec}
                        </div>
                        <div
                          className="font-mono"
                          style={{
                            fontSize: '12px',
                            color: 'var(--text)',
                            fontWeight: 600,
                          }}
                        >
                          {item.downforceMetric}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Wind-Tunnel Flow Simulator */}
          <div
            style={{
              gridColumn: 'span 5',
              border: '1px solid var(--line)',
              padding: 'var(--space-32)',
              backgroundColor: 'var(--bg-raised)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            className="aero-right-col"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--line)',
                  paddingBottom: '12px',
                  marginBottom: 'var(--space-24)',
                }}
              >
                <span className="label-micro">WIND TUNNEL SIMULATOR</span>
                <span className="label-micro" style={{ color: 'var(--accent)' }}>
                  AERO TELEMETRY // 200 KM/H
                </span>
              </div>

              {/* Interactive Vector Aerodynamic Silhouette Wireframe */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '160px',
                  backgroundColor: 'rgba(11, 12, 14, 0.7)',
                  border: '1px solid var(--line)',
                  marginBottom: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  viewBox="0 0 500 160"
                  style={{ width: '100%', height: '100%' }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid Lines */}
                  <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Flow Streamlines (Animated Wind Tunnel Particles) */}
                  <path
                    d="M 20 40 Q 150 35 240 55 T 450 65"
                    stroke={selectedFeature === 0 ? '#ff3b1d' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                  <path
                    d="M 10 90 Q 140 85 220 100 T 480 110"
                    stroke={selectedFeature === 1 ? '#ff3b1d' : 'rgba(255,255,255,0.25)'}
                    strokeWidth="1.5"
                    strokeDasharray="8 6"
                  />
                  <path
                    d="M 30 125 L 140 125 Q 260 123 480 125"
                    stroke="rgba(0, 138, 201, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="10 4"
                  />

                  {/* Sleek BMW M4 CSL Profile Silhouette Wireframe */}
                  {/* Underbody & Front Splitter */}
                  <path
                    d="M 80 128 L 60 128 L 50 125 L 55 118 L 85 116 L 145 105 L 190 75 L 290 68 L 360 72 L 420 95 L 435 90 L 440 98 L 445 125 L 425 128 L 390 128"
                    stroke="#eceae4"
                    strokeWidth="2"
                  />
                  {/* Wheels */}
                  <circle cx="120" cy="125" r="16" stroke="#a3a29c" strokeWidth="2" fill="#0b0c0e" />
                  <circle cx="370" cy="125" r="16" stroke="#a3a29c" strokeWidth="2" fill="#0b0c0e" />

                  {/* Highlight 01: Front Splitter (x: 45 to 80) */}
                  {selectedFeature === 0 && (
                    <g>
                      <path d="M 45 128 L 75 128" stroke="#ff3b1d" strokeWidth="4" />
                      <circle cx="60" cy="128" r="6" fill="#ff3b1d" />
                      <text x="60" y="148" fill="#ff3b1d" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        SPLITTER DOWNFORCE
                      </text>
                    </g>
                  )}

                  {/* Highlight 02: Ducktail Bootlid (x: 415 to 445) */}
                  {selectedFeature === 1 && (
                    <g>
                      <path d="M 415 95 L 438 88" stroke="#ff3b1d" strokeWidth="4" />
                      <circle cx="435" cy="90" r="6" fill="#ff3b1d" />
                      <text x="420" y="75" fill="#ff3b1d" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        DUCKTAIL KICK
                      </text>
                    </g>
                  )}

                  {/* Highlight 03: Laser Yellow DRLs (x: 65 to 85) */}
                  {selectedFeature === 2 && (
                    <g>
                      <circle cx="85" cy="112" r="7" fill="#fbbf24" />
                      <path d="M 85 112 L 20 100" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="70" y="98" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                        GT3 YELLOW DRL
                      </text>
                    </g>
                  )}

                  {/* Highlight 04: Laser Rear Threads (x: 420 to 440) */}
                  {selectedFeature === 3 && (
                    <g>
                      <circle cx="430" cy="104" r="7" fill="#ff3b1d" />
                      <path d="M 430 104 L 480 104" stroke="#ff3b1d" strokeWidth="2" />
                      <text x="430" y="122" fill="#ff3b1d" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        GLASS FIBER THREADS
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Active Metric Callout */}
              <span
                className="font-mono"
                style={{
                  fontSize: 'clamp(44px, 5.5vw, 76px)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  color: 'var(--text)',
                  display: 'block',
                }}
              >
                {current.id}
              </span>

              <h4
                className="font-display"
                style={{
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text)',
                  marginTop: '12px',
                  marginBottom: '8px',
                }}
              >
                {current.metric}
              </h4>

              <p
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--text-dim)',
                  lineHeight: 1.6,
                }}
              >
                {current.detail}
              </p>
            </div>

            <div
              style={{
                marginTop: 'var(--space-24)',
                borderTop: '1px solid var(--line)',
                paddingTop: 'var(--space-16)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span className="label-micro">AERODYNAMIC VECTOR</span>
              <span
                className="font-mono"
                style={{ color: 'var(--accent)', fontWeight: 700 }}
              >
                {current.downforceMetric}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .aero-left-col {
            grid-column: span 12 !important;
          }
          .aero-right-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};
