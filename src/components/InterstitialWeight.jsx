import React, { useState } from 'react';
import { VERIFIED_SPECS } from '../data/specs';

/**
 * UI INTERSTITIAL 2: The 100 kg Weight-Savings Program
 * Redesigned with generous spacing, distinct editorial panels (no cramped "join-join" rows),
 * accurate 100.0 kg verified specs, and interactive chassis blueprint mass scanner.
 */
export const InterstitialWeight = () => {
  const [activeItem, setActiveItem] = useState(0);

  // Verified 7-part BMW M4 CSL weight reduction manifest (Exactly 100.0 kg)
  const weightItems = [
    {
      id: '01',
      zone: 'cabin-front',
      component: 'M Carbon Full Bucket Seats',
      deltaNum: 24.0,
      delta: '-24.0 KG',
      share: '24.0%',
      detail:
        'Pure carbon-fibre-reinforced plastic (CFRP) monocoque construction with removable headrest padding and six-point harness compatibility.',
      distribution: 'COCKPIT // CENTRAL MASS',
      impact: 'Lowers vertical center of gravity (CoG)',
    },
    {
      id: '02',
      zone: 'cabin-rear',
      component: 'Rear Bench & Seatbelts Deletion',
      deltaNum: 21.0,
      delta: '-21.0 KG',
      share: '21.0%',
      detail:
        'Rear seats and seatbelts deleted entirely, integrating an ultralight storage shelf for two track helmets and cargo netting.',
      distribution: 'REAR AXLE COMPARTMENT',
      impact: 'Reduces polar moment of inertia around yaw axis',
    },
    {
      id: '03',
      zone: 'insulation',
      component: 'Sound Insulation Optimization',
      deltaNum: 15.0,
      delta: '-15.0 KG',
      share: '15.0%',
      detail:
        'Targeted reduction of acoustic damping panels, transmission tunnel insulation, and bulkhead soundproofing.',
      distribution: 'ACOUSTIC SHELL & BULKHEAD',
      impact: 'Visceral transmission of S58 mechanical induction note',
    },
    {
      id: '04',
      zone: 'brakes',
      component: 'M Carbon Ceramic Brakes',
      deltaNum: 14.3,
      delta: '-14.3 KG',
      share: '14.3%',
      detail:
        '6-piston fixed front calipers with 400 mm ceramic rotors; single-piston floating rear with bespoke track compound pads.',
      distribution: 'UNSPRUNG MASS // 4 HUBS',
      impact: 'Significantly improves steering response and damper agility',
    },
    {
      id: '05',
      zone: 'body-panels',
      component: 'CFRP Body Panels & Bootlid',
      deltaNum: 11.0,
      delta: '-11.0 KG',
      share: '11.0%',
      detail:
        'Carbon fibre bonnet with unpainted indented channels, double-bubble carbon roof, and bootlid featuring integrated ducktail spoiler.',
      distribution: 'UPPER EXTREMITIES (FRONT & REAR)',
      impact: 'Minimizes roll moment in high-G cornering transitions',
    },
    {
      id: '06',
      zone: 'wheels',
      component: 'Forged Light-Alloy Wheels & Chassis Links',
      deltaNum: 10.4,
      delta: '-10.4 KG',
      share: '10.4%',
      detail:
        '19-inch front / 20-inch rear Star-spoke 827 M cross-spoke forged alloys; revised axle kinematics and stiffer chassis mounts.',
      distribution: 'ROTATIONAL MASS // 4 WHEELS',
      impact: 'Reduces rotational inertia for rapid acceleration & braking',
    },
    {
      id: '07',
      zone: 'exhaust-rear',
      component: 'Titanium Exhaust Rear Silencer',
      deltaNum: 4.3,
      delta: '-4.3 KG',
      share: '4.3%',
      detail:
        'Dual-branch titanium rear silencer with matte black quad tailpipe finishers, producing emotionally stirred motorsport acoustics.',
      distribution: 'REAR OVERHANG',
      impact: 'Reduces mass located behind the driven rear axle',
    },
  ];

  const currentItem = weightItems[activeItem];

  return (
    <section
      id="interstitial-weight"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        paddingTop: 'var(--space-80)',
        paddingBottom: 'var(--space-96)',
        position: 'relative',
      }}
    >
      <div className="container-grid">
        {/* Section Header: Spacious, un-jammed layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderBottom: '1px solid var(--line)',
            paddingBottom: 'var(--space-32)',
            marginBottom: 'var(--space-48)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-micro" style={{ color: 'var(--accent)' }}>
              CHAPTER 04 // MASS REDUCTION PROGRAM
            </span>
            <span className="label-micro">INTELLIGENT LIGHTWEIGHT ENGINEERING // MUNICH</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '32px',
            }}
          >
            <div>
              <span
                className="font-mono"
                style={{
                  fontSize: 'clamp(56px, 9vw, 110px)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: 'var(--text)',
                  display: 'block',
                  letterSpacing: '-0.04em',
                }}
              >
                -100 KG
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: 'var(--text-h2)',
                  color: 'var(--text)',
                  marginTop: '12px',
                  fontWeight: 800,
                }}
              >
                RADICAL DIET. PURE AGILITY.
              </h2>
            </div>

            {/* Quick Mass Summary Stats */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minWidth: '280px',
                borderLeft: '1px solid var(--line)',
                paddingLeft: 'var(--space-24)',
              }}
            >
              <div>
                <span className="label-micro">DIN KERB WEIGHT</span>
                <p
                  className="font-mono"
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginTop: '2px',
                  }}
                >
                  1,625 KG <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 500 }}>(-100 VS COMP)</span>
                </p>
              </div>

              <div>
                <span className="label-micro">WEIGHT-TO-POWER RATIO</span>
                <p
                  className="font-mono"
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    marginTop: '2px',
                  }}
                >
                  2.95 KG / HP
                </p>
              </div>

              <div>
                <span className="label-micro">AXLE LOAD DISTRIBUTION</span>
                <p
                  className="font-mono"
                  style={{
                    fontSize: 'var(--text-small)',
                    color: 'var(--text-dim)',
                    marginTop: '2px',
                  }}
                >
                  53.4% FRONT / 46.6% REAR
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Master Split Grid: Well-spaced panels (Left) & Localization Blueprint (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-32)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Individual, Distinct Editorial Panels (No cramped join-join rows) */}
          <div
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px', // Clear, visible spacing between each component panel!
            }}
            className="weight-table-col"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--line)',
                marginBottom: '4px',
              }}
            >
              <span className="label-micro">COMPONENT BREAKDOWN (7 AREAS)</span>
              <span className="label-micro">WEIGHT DELTA // CONTRIBUTION</span>
            </div>

            {weightItems.map((item, idx) => {
              const isSelected = activeItem === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(idx)}
                  onMouseEnter={() => setActiveItem(idx)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    border: '1px solid var(--line)',
                    borderLeft: isSelected ? '3px solid var(--accent)' : '1px solid var(--line)',
                    backgroundColor: isSelected ? 'rgba(255, 59, 29, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Left: Component & Editorial Spec */}
                  <div style={{ maxWidth: '440px', paddingRight: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '13px',
                          color: isSelected ? 'var(--accent)' : 'var(--text-dim)',
                          fontWeight: 700,
                        }}
                      >
                        {item.id}
                      </span>
                      <h3
                        className="font-display"
                        style={{
                          fontSize: '17px',
                          color: 'var(--text)',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.component}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-dim)',
                        marginTop: '6px',
                        paddingLeft: '25px',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.detail}
                    </p>

                    <div style={{ paddingLeft: '25px', marginTop: '6px' }}>
                      <span className="label-micro" style={{ fontSize: '9px', color: isSelected ? 'var(--accent)' : 'var(--text-dim)' }}>
                        {item.distribution}
                      </span>
                    </div>
                  </div>

                  {/* Right: Large Delta Numeral & Percentage */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 'clamp(24px, 2.5vw, 32px)',
                        fontWeight: 900,
                        color: isSelected ? 'var(--accent)' : 'var(--text)',
                        display: 'block',
                        lineHeight: 1,
                      }}
                    >
                      {item.delta}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        color: 'var(--text-dim)',
                        marginTop: '4px',
                        display: 'block',
                      }}
                    >
                      {item.share} OF 100 KG
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Chassis Mass Telemetry Scanner */}
          <div
            style={{
              gridColumn: 'span 5',
              position: 'sticky',
              top: '80px',
              border: '1px solid var(--line)',
              backgroundColor: 'rgba(16, 18, 22, 0.85)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
            className="weight-viz-col"
          >
            {/* Visualizer Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--line)',
                paddingBottom: '12px',
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
                  }}
                />
                <span className="label-micro" style={{ color: 'var(--text)', fontWeight: 700 }}>
                  CHASSIS MASS SCANNER
                </span>
              </div>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>
                {currentItem.delta}
              </span>
            </div>

            {/* Top-Down Chassis Wireframe Blueprint SVG */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(11, 12, 14, 0.9)',
                border: '1px solid var(--line)',
                overflow: 'hidden',
              }}
            >
              {/* Grid Background */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Chassis Silhouette & Dynamic Highlight Hotspots */}
              <svg
                width="160"
                height="220"
                viewBox="0 0 160 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'relative', zIndex: 2 }}
              >
                {/* Car Outer Outline (Top View) */}
                <path
                  d="M45 15 C55 10 105 10 115 15 C122 25 125 50 125 70 C125 110 125 160 123 185 C120 205 105 212 80 212 C55 212 40 205 37 185 C35 160 35 110 35 70 C35 50 38 25 45 15 Z"
                  stroke="var(--line)"
                  strokeWidth="1.5"
                  fill="rgba(255,255,255,0.02)"
                />

                {/* Windshield & Roof */}
                <path
                  d="M48 55 C60 52 100 52 112 55 L110 145 C95 148 65 148 50 145 Z"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  fill="none"
                />

                {/* Wheels & Brakes (Unsprung Mass Zones) */}
                <rect
                  x="24"
                  y="38"
                  width="12"
                  height="34"
                  fill={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}
                  stroke={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? '#ff3b1d' : 'var(--line)'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <rect
                  x="124"
                  y="38"
                  width="12"
                  height="34"
                  fill={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}
                  stroke={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? '#ff3b1d' : 'var(--line)'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <rect
                  x="24"
                  y="150"
                  width="12"
                  height="34"
                  fill={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}
                  stroke={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? '#ff3b1d' : 'var(--line)'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <rect
                  x="124"
                  y="150"
                  width="12"
                  height="34"
                  fill={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}
                  stroke={currentItem.zone === 'brakes' || currentItem.zone === 'wheels' ? '#ff3b1d' : 'var(--line)'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Zone 1: Cabin Front (M Carbon Bucket Seats) */}
                <rect
                  x="54"
                  y="75"
                  width="22"
                  height="28"
                  fill={currentItem.zone === 'cabin-front' ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}
                  stroke={currentItem.zone === 'cabin-front' ? '#ffffff' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <rect
                  x="84"
                  y="75"
                  width="22"
                  height="28"
                  fill={currentItem.zone === 'cabin-front' ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}
                  stroke={currentItem.zone === 'cabin-front' ? '#ffffff' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Zone 2: Cabin Rear (Deleted Seats & Helmet Storage) */}
                <rect
                  x="54"
                  y="110"
                  width="52"
                  height="26"
                  fill={currentItem.zone === 'cabin-rear' ? 'var(--accent)' : 'rgba(255,255,255,0.04)'}
                  stroke={currentItem.zone === 'cabin-rear' ? '#ffffff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth="1"
                  strokeDasharray={currentItem.zone === 'cabin-rear' ? 'none' : '3 3'}
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Zone 3: Sound Insulation (Floorpan / Tunnel) */}
                <line
                  x1="80"
                  y1="55"
                  x2="80"
                  y2="150"
                  stroke={currentItem.zone === 'insulation' ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={currentItem.zone === 'insulation' ? '4' : '2'}
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Zone 5: CFRP Bonnet & Ducktail Bootlid */}
                <path
                  d="M50 22 C65 18 95 18 110 22 L106 48 C90 46 70 46 54 48 Z"
                  fill={currentItem.zone === 'body-panels' ? 'var(--accent)' : 'none'}
                  stroke={currentItem.zone === 'body-panels' ? '#ffffff' : 'none'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <path
                  d="M50 195 C65 198 95 198 110 195 L112 208 C95 210 65 210 48 208 Z"
                  fill={currentItem.zone === 'body-panels' ? 'var(--accent)' : 'none'}
                  stroke={currentItem.zone === 'body-panels' ? '#ffffff' : 'none'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Zone 7: Titanium Exhaust Tailpipes */}
                <rect
                  x="65"
                  y="208"
                  width="30"
                  height="8"
                  fill={currentItem.zone === 'exhaust-rear' ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}
                  stroke={currentItem.zone === 'exhaust-rear' ? '#ffffff' : 'none'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Center of Gravity (CoG) Target Marker */}
                <circle cx="80" cy="100" r="4" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                <circle cx="80" cy="100" r="1.5" fill="var(--accent)" />
              </svg>

              {/* Active Zone Label Callout */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  backgroundColor: 'rgba(11, 12, 14, 0.95)',
                  padding: '4px 8px',
                  border: '1px solid var(--line)',
                  borderLeft: '2px solid var(--accent)',
                }}
              >
                <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text)' }}>
                  ACTIVE TARGET: <strong style={{ color: 'var(--accent)' }}>{currentItem.component}</strong>
                </span>
              </div>
            </div>

            {/* Dynamic Telemetry Specs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro">CHASSIS LOCATION</span>
                <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text)', fontWeight: 600 }}>
                  {currentItem.distribution}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="label-micro">DYNAMIC BENEFIT</span>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--accent)', textAlign: 'right', maxWidth: '60%' }}>
                  {currentItem.impact}
                </span>
              </div>
            </div>

            {/* Cumulative 100 kg Progress Meter (Strictly 100.0 KG) */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <span className="label-micro">TOTAL WEIGHT REMOVED</span>
                <span className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
                  -100.0 KG / 100.0 KG
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--line)', position: 'relative' }}>
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 0 8px rgba(255, 59, 29, 0.5)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note from Verified Specification */}
        <div
          style={{
            marginTop: 'var(--space-48)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--line)',
            paddingTop: 'var(--space-16)',
          }}
        >
          <span className="label-micro">BENCHMARK: M4 COMPETITION COUPE (1,725 KG DIN)</span>
          <span className="label-micro" style={{ color: 'var(--accent)', fontWeight: 700 }}>
            NET REDUCTION: 100.0 KG HOMOLOGATED
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .weight-table-col {
            grid-column: span 12 !important;
          }
          .weight-viz-col {
            grid-column: span 12 !important;
            position: static !important;
            margin-top: 24px;
          }
        }
      `}</style>
    </section>
  );
};
