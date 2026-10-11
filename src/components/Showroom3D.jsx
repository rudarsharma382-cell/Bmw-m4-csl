import React, { useState, Suspense, useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Html,
} from '@react-three/drei';
import * as THREE from 'three';

// 3D Model Specifications
const MODELS = [
  {
    id: 'widebody',
    name: 'CSL WIDEBODY TRACK SPEC',
    file: '/assets/bmw_m4_widebody__www.vecarz.com.glb',
    tag: 'WIDEBODY GT / EXTENDED TRACK',
    aero: 'Flared wheel arches, aggressive front canards, extended rear diffuser',
    mass: '1,610 kg',
    power: '550 hp',
  },
  {
    id: 'csl',
    name: 'FACTORY M4 CSL HOMOLOGATION',
    file: '/assets/bmw_m4_csl.glb',
    tag: 'FACTORY SPEC / 1,000 UNITS',
    aero: 'Standard G82 CSL carbon aero pack, ducktail bootlid, laser yellow DRL',
    mass: '1,625 kg',
    power: '550 hp',
  },
  {
    id: 'csl2023',
    name: '2023 CSL COMPETITION COUPE',
    file: '/assets/bmw_m4_csl_2023.glb',
    tag: 'CHASSIS LAB / 2023 ITERATION',
    aero: 'Revised suspension geometry, Star-spoke 827 M forged wheels',
    mass: '1,625 kg',
    power: '550 hp',
  },
];

/**
 * NormalizedCar: Keeps every model in a fixed position on a fixed central axis
 * - Normalizes physical bounding dimensions to exactly 4.7 units length
 * - Centers X and Z at 0, and anchors tire contact point at Y = 0
 * - Completely prevents random offsets, jumping, or scaling discrepancies
 */
function NormalizedCar({ file, wireframe }) {
  const { scene } = useGLTF(file);
  const groupRef = useRef();

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Reset transformations before measuring
    group.position.set(0, 0, 0);
    group.rotation.set(0, 0, 0);
    group.scale.set(1, 1, 1);
    group.updateMatrixWorld(true);

    // Measure exact world bounding box
    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Standardize every model to 4.7 units length
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const targetScale = 4.7 / maxDim;
      group.scale.setScalar(targetScale);

      // Anchor model at X=0, Z=0, and tire base at Y=0
      group.position.set(
        -center.x * targetScale,
        -box.min.y * targetScale,
        -center.z * targetScale
      );
    }

    // Configure materials
    group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.wireframe = wireframe;
          child.material.envMapIntensity = 1.3;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, wireframe]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

// 3D Loading Indicator
function LoaderFallback() {
  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(11, 12, 14, 0.95)',
          padding: '24px 32px',
          border: '1px solid var(--line)',
          whiteSpace: 'nowrap',
        }}
      >
        <span className="label-micro" style={{ color: 'var(--accent)' }}>
          STREAMING 3D MESH GEOMETRY
        </span>
        <span
          className="font-mono"
          style={{ fontSize: 'var(--text-small)', color: 'var(--text)' }}
        >
          NORMALIZING CHASSIS AXIS...
        </span>
      </div>
    </Html>
  );
}

export const Showroom3D = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [envPreset, setEnvPreset] = useState('studio');
  const controlsRef = useRef();

  const activeModel = MODELS[activeTab];

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section
      id="showroom-3d"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        paddingTop: 'var(--space-96)',
        paddingBottom: 'var(--space-96)',
        position: 'relative',
      }}
    >
      <div className="container-grid">
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderBottom: '1px solid var(--line)',
            paddingBottom: 'var(--space-32)',
            marginBottom: 'var(--space-32)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="label-micro" style={{ color: 'var(--accent)' }}>
              CHAPTER 08 // REAL-TIME 3D SHOWROOM
            </span>
            <span className="label-micro">WEBGL 2.0 // FIXED-AXIS INSPECTOR</span>
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
                  fontSize: 'var(--text-h1)',
                  color: 'var(--text)',
                }}
              >
                INTERACTIVE 3D LAB.
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-dim)',
                  marginTop: '8px',
                  maxWidth: '55ch',
                }}
              >
                Inspect chassis geometry on a calibrated, fixed turntable axis. Click and drag to
                rotate freely in 3D. The scroll wheel navigates the webpage smoothly without
                interruption.
              </p>
            </div>

            {/* Quick Controls HUD */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                style={{
                  background: autoRotate ? 'var(--bg-raised)' : 'transparent',
                  border: `1px solid ${autoRotate ? 'var(--accent)' : 'var(--line)'}`,
                  color: autoRotate ? 'var(--text)' : 'var(--text-dim)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  borderRadius: '0px',
                }}
              >
                AUTO-ROTATE: {autoRotate ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setWireframe(!wireframe)}
                style={{
                  background: wireframe ? 'var(--bg-raised)' : 'transparent',
                  border: `1px solid ${wireframe ? 'var(--accent)' : 'var(--line)'}`,
                  color: wireframe ? 'var(--text)' : 'var(--text-dim)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  borderRadius: '0px',
                }}
              >
                WIREFRAME: {wireframe ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setEnvPreset(envPreset === 'studio' ? 'city' : 'studio')}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: 'var(--text-dim)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  borderRadius: '0px',
                }}
              >
                LIGHTING: {envPreset.toUpperCase()}
              </button>

              <button
                onClick={resetCamera}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: 'var(--text-dim)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  borderRadius: '0px',
                }}
              >
                RESET CAMERA
              </button>
            </div>
          </div>
        </div>

        {/* Sleek Tabbed Model Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--line)',
            border: '1px solid var(--line)',
            marginBottom: 'var(--space-24)',
          }}
          className="model-tabs-grid"
        >
          {MODELS.map((model, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={model.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  background: isActive ? 'var(--bg-raised)' : 'var(--bg)',
                  border: 'none',
                  padding: 'var(--space-16) var(--space-24)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s ease',
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--accent)',
                    }}
                  />
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 'var(--text-label)',
                      color: isActive ? 'var(--accent)' : 'var(--text-dim)',
                    }}
                  >
                    SPEC {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="label-micro"
                    style={{
                      color: isActive ? 'var(--text)' : 'var(--text-dim)',
                    }}
                  >
                    {isActive ? '[ACTIVE]' : 'SELECT'}
                  </span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: 'var(--text-small)',
                    color: isActive ? 'var(--text)' : 'var(--text-dim)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {model.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* 3D Canvas Viewport */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(480px, 65vh, 750px)',
            backgroundColor: 'var(--bg-raised)',
            border: '1px solid var(--line)',
            overflow: 'hidden',
          }}
        >
          <Canvas
            shadows
            camera={{ position: [5.2, 1.8, 6.2], fov: 32 }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
            }}
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            {/* Automotive Studio Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 15, 10]}
              intensity={2.0}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />
            <directionalLight position={[-10, 10, -10]} intensity={1.2} color="#b0c4de" />
            <directionalLight position={[0, -5, 5]} intensity={0.3} />

            <Environment preset={envPreset} background={false} />

            <Suspense fallback={<LoaderFallback />}>
              {/* Normalized car: perfectly scaled and anchored at origin */}
              <NormalizedCar
                key={activeModel.id}
                file={activeModel.file}
                wireframe={wireframe}
              />

              {/* Floor Contact Shadows */}
              <ContactShadows
                position={[0, 0, 0]}
                opacity={0.8}
                scale={14}
                blur={2.0}
                far={4.5}
                color="#000000"
              />
            </Suspense>

            {/* Orbit Controls: Rotating around the car's fixed central axis */}
            <OrbitControls
              ref={controlsRef}
              makeDefault
              target={[0, 0.65, 0]}
              autoRotate={autoRotate}
              autoRotateSpeed={0.8}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.05}
              minPolarAngle={Math.PI / 6}
            />
          </Canvas>

          {/* Real-Time Telemetry HUD Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(11, 12, 14, 0.85)',
                padding: '12px 16px',
                border: '1px solid var(--line)',
                maxWidth: '400px',
              }}
            >
              <div className="label-micro" style={{ color: 'var(--accent)' }}>
                {activeModel.tag}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--text)',
                  marginTop: '4px',
                }}
              >
                {activeModel.aero}
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(11, 12, 14, 0.85)',
                padding: '12px 16px',
                border: '1px solid var(--line)',
                display: 'flex',
                gap: '24px',
              }}
            >
              <div>
                <span className="label-micro">CURB MASS</span>
                <p className="font-mono" style={{ color: 'var(--text)', fontWeight: 700 }}>
                  {activeModel.mass}
                </p>
              </div>
              <div>
                <span className="label-micro">OUTPUT</span>
                <p className="font-mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  {activeModel.power}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .model-tabs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
