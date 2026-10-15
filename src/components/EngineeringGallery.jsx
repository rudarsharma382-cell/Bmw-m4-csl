import React from 'react';
import FlexCarousel from './FlexCarousel';
import { ErrorBoundary } from './ErrorBoundary';

export const CSL_GALLERY_ITEMS = [
  {
    src: '/assets/gallery/csl_01.jpg',
    alt: 'CSL Kidney Grille with motorsport yellow laser DRLs and red contour pinstripe',
    title: 'LASER DRL & RED CONTOUR GRILLE',
    subtitle: 'GT3 RACING ILLUMINATION // AERO INDUCTION',
  },
  {
    src: '/assets/gallery/csl_02.jpg',
    alt: 'CFRP Front Splitter with carbon dive planes and canards',
    title: 'CFRP FRONT SPLITTER & CANARDS',
    subtitle: 'HIGH-PRESSURE AIRFLOW DIVERSION // +28 KG DOWNFORCE',
  },
  {
    src: '/assets/gallery/csl_03.jpg',
    alt: 'Star-spoke 827 M Forged Alloys with M Carbon Ceramic Brakes',
    title: '19\" / 20\" STAR-SPOKE 827 M FORGED WHEELS',
    subtitle: 'M CARBON CERAMIC BRAKES // 400 MM ROTORS',
  },
  {
    src: '/assets/gallery/csl_04.jpg',
    alt: 'Integrated Ducktail bootlid and motorsport rear wing',
    title: 'AERODYNAMIC DUCKTAIL & REAR WING',
    subtitle: 'E46 M3 CSL HOMAGE // ZERO-LIFT REAR AXLE',
  },
  {
    src: '/assets/gallery/csl_05.jpg',
    alt: 'M Alcantara Steering Wheel with red 12 o clock marker',
    title: 'M ALCANTARA RACING STEERING WHEEL',
    subtitle: '12 O\'CLOCK RED CENTRE STRIPE // CARBON PADDLES',
  },
  {
    src: '/assets/gallery/csl_06.jpg',
    alt: 'M Carbon Full Bucket Seats in Merino leather with red contrast stitching',
    title: 'M CARBON FULL BUCKET SEATS',
    subtitle: 'PURE CFRP MONOCOQUE // -24.0 KG NET SAVING',
  },
  {
    src: '/assets/gallery/csl_07.jpg',
    alt: 'Digital M Instrument Cluster with CSL startup graphics',
    title: 'CSL DIGITAL TRACK COCKPIT',
    subtitle: 'BESPOKE M CLUSTER // LAPTRIGGER TELEMETRY',
  },
  {
    src: '/assets/gallery/csl_08.jpg',
    alt: 'Solid carbon fibre centre console with M Steptronic gear selector',
    title: 'CFRP SOLID CENTRE CONSOLE',
    subtitle: '8-SPEED M STEPTRONIC // DRIVELOGIC SELECTOR',
  },
  {
    src: '/assets/gallery/csl_09.jpg',
    alt: 'S58 3.0L M TwinPower Turbo Inline-6 engine with cast aluminium strut brace',
    title: 'S58 3.0L BI-TURBO // 550 HP',
    subtitle: 'CAST ALUMINIUM TOPOLOGY STRUT BRACE // 2.1 BAR BOOST',
  },
  {
    src: '/assets/gallery/csl_10.jpg',
    alt: 'Lightweight door cards with carbon inserts',
    title: 'LIGHTWEIGHT DOOR ARCHITECTURE',
    subtitle: 'ACOUSTIC MASS REDUCTION // RAW WEAVE CARBON',
  },
  {
    src: '/assets/gallery/csl_11.jpg',
    alt: 'Titanium rear silencer with matte black quad tailpipes',
    title: 'TITANIUM REAR EXHAUST SILENCER',
    subtitle: 'WEIGHT SAVINGS -4.3 KG // MOTORSPORT ACOUSTICS',
  },
  {
    src: '/assets/gallery/csl_12.jpg',
    alt: 'Matte carbon fibre dashboard trim with laser engraved CSL badge',
    title: 'MATTE CARBON FIBRE DASHBOARD',
    subtitle: 'SERIES HOMOLOGATION EMBLEM // 1 OF 1,000',
  },
];

/**
 * EngineeringGallery: Interactive WebGL FlexCarousel powered by ogl
 * Showcases the 12 verified engineering detail photographs with liquid lens distortion.
 */
export const EngineeringGallery = () => {
  return (
    <section
      id="engineering-gallery"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        paddingTop: 'var(--space-80)',
        paddingBottom: 'var(--space-80)',
        position: 'relative',
        overflow: 'hidden',
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
            marginBottom: 'var(--space-32)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-micro" style={{ color: 'var(--accent)' }}>
              CHAPTER 08 // MOTORSPORT DETAIL GALLERY
            </span>
            <span className="label-micro">WEBGL LIQUID LENS // DRAG TO INSPECT</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
            }}
          >
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: 'var(--text-h2)',
                  color: 'var(--text)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                12 ENGINEERING TOUCHPOINTS.
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--text-dim)',
                  marginTop: '8px',
                  maxWidth: '56ch',
                  lineHeight: 1.5,
                }}
              >
                Direct tactile inspection of bespoke carbon monocoque architecture, endurance racing
                optics, and lightweight titanium dynamics. Drag or scroll horizontally to flex the lens.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="label-micro" style={{ color: 'var(--text-dim)' }}>INTERACTION:</span>
              <span className="label-micro" style={{ color: 'var(--accent)', border: '1px solid var(--line)', padding: '4px 8px' }}>
                CLICK TO EXPAND // SCROLL TO GLIDE
              </span>
            </div>
          </div>
        </div>

        {/* FlexCarousel WebGL Liquid Canvas Container */}
        <div
          style={{
            width: '100%',
            height: 'clamp(480px, 60vh, 620px)',
            position: 'relative',
            border: '1px solid var(--line)',
            backgroundColor: 'rgba(11, 12, 14, 0.95)',
          }}
        >
          <ErrorBoundary
            name="MOTORSPORT DETAIL GALLERY"
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  overflowX: 'auto',
                  display: 'flex',
                  gap: '16px',
                  padding: '24px',
                  alignItems: 'center',
                }}
              >
                {CSL_GALLERY_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      flex: '0 0 320px',
                      height: '80%',
                      border: '1px solid var(--line)',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(11, 12, 14, 0.85)',
                        padding: '12px',
                      }}
                    >
                      <span className="label-micro" style={{ color: 'var(--text)' }}>
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <FlexCarousel
              items={CSL_GALLERY_ITEMS}
              preset="liquid"
              intro="bloom"
              cardHeight={0.54}
              gap={14}
              radius={0}
              squeeze={0.18}
              focusOnClick
              captions
              autoplay
              interval={4}
            />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};
