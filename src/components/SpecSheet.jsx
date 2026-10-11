import React from 'react';
import { VERIFIED_SPECS } from '../data/specs';

/**
 * SpecSheet: Full Editorial Technical Specification Data Sheet
 * Strictly adheres to Section 6, 8 & 9 of antigravity.md:
 * - Editorial data rows with hairline rules (1px solid var(--line))
 * - Tabular numbers
 * - Zero generic AI card tiles
 * - Verified specs only
 */
export const SpecSheet = () => {
  const specSections = [
    {
      category: '01 // POWERTRAIN & OUTPUT',
      rows: [
        { label: 'Engine Designation', value: VERIFIED_SPECS.powertrain.engine },
        { label: 'Induction System', value: VERIFIED_SPECS.powertrain.aspiration },
        { label: 'Maximum Power Output', value: VERIFIED_SPECS.powertrain.power },
        { label: 'Peak Torque', value: VERIFIED_SPECS.powertrain.torque },
        { label: 'Engine Redline', value: VERIFIED_SPECS.powertrain.redline },
        { label: 'Transmission', value: VERIFIED_SPECS.powertrain.transmission },
        { label: 'Drive Configuration', value: VERIFIED_SPECS.powertrain.drive },
      ],
    },
    {
      category: '02 // BENCHMARK PERFORMANCE',
      rows: [
        { label: 'Acceleration 0–100 km/h', value: VERIFIED_SPECS.performance.accel0to100 },
        { label: 'Acceleration 0–200 km/h', value: VERIFIED_SPECS.performance.accel0to200 },
        { label: 'Maximum Velocity', value: VERIFIED_SPECS.performance.topSpeed },
        {
          label: 'Nürburgring Nordschleife (20.832 km)',
          value: VERIFIED_SPECS.performance.nurburgringLap,
        },
        {
          label: 'Nürburgring Nordschleife (20.600 km)',
          value: VERIFIED_SPECS.performance.nurburgringLapShort,
        },
        { label: 'Power-to-Weight Ratio', value: VERIFIED_SPECS.performance.powerToWeight },
      ],
    },
    {
      category: '03 // CHASSIS & MASS METROLOGY',
      rows: [
        { label: 'DIN Kerb Weight', value: VERIFIED_SPECS.curbWeightDIN },
        { label: 'Weight Reduction Delta', value: VERIFIED_SPECS.weightDelta },
        { label: 'Axle Weight Distribution', value: VERIFIED_SPECS.weightDistribution },
        { label: 'Chassis & Damper Setup', value: VERIFIED_SPECS.chassis.suspension },
        { label: 'Front-End Bracing', value: VERIFIED_SPECS.chassis.bracing },
        { label: 'Homologation Tyres', value: VERIFIED_SPECS.chassis.tyres },
        { label: 'Production Volume', value: VERIFIED_SPECS.production },
      ],
    },
  ];

  return (
    <section
      id="spec-sheet"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        paddingTop: 'var(--space-96)',
        paddingBottom: 'var(--space-96)',
      }}
    >
      <div className="container-grid">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderBottom: '1px solid var(--line)',
            paddingBottom: 'var(--space-32)',
            marginBottom: 'var(--space-64)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-micro" style={{ color: 'var(--accent)' }}>
              CHAPTER 09 // COMPLETE HOMOLOGATION DOSSIER
            </span>
            <span className="label-micro">VERIFIED PRESS ARCHIVE // G82 CSL</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text)',
            }}
          >
            TECHNICAL SPECIFICATIONS.
          </h2>

          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-dim)',
              maxWidth: '55ch',
            }}
          >
            Full manufacturer homologation metrics compiled in accordance with BMW M GmbH official
            press documentation. All figures verified for production chassis G82.
          </p>
        </div>

        {/* Spec Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-64)' }}>
          {specSections.map((sec, sIdx) => (
            <div key={sIdx}>
              {/* Category Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1px solid var(--line)',
                  paddingBottom: '12px',
                  marginBottom: '8px',
                }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: 'var(--text-h3)',
                    color: 'var(--accent)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {sec.category}
                </span>
                <span className="label-micro">TELEMETRY ROW 0{sIdx + 1}</span>
              </div>

              {/* Rows */}
              <div>
                {sec.rows.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '16px 0',
                      borderBottom: '1px solid var(--line)',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-small)',
                        color: 'var(--text-dim)',
                        letterSpacing: '0.02em',
                        minWidth: '240px',
                      }}
                    >
                      {row.label}
                    </span>

                    <span
                      className="font-mono"
                      style={{
                        fontSize: 'var(--text-body)',
                        fontWeight: 600,
                        color: 'var(--text)',
                        textAlign: 'right',
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
