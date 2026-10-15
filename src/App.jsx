import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { CanvasScroller } from './components/CanvasScroller';
import { InterstitialAero } from './components/InterstitialAero';
import { InterstitialWeight } from './components/InterstitialWeight';
import { InterstitialPower } from './components/InterstitialPower';
import { Showroom3D } from './components/Showroom3D';
import { EngineeringGallery } from './components/EngineeringGallery';
import { SpecSheet } from './components/SpecSheet';
import { Footer } from './components/Footer';
import { ScrollRail } from './components/ScrollRail';
import { ErrorBoundary } from './components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Initialize Lenis with calibrated, controlled wheel dynamics
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7, // Deliberate, smooth wheel pacing prevents jumping
      touchMultiplier: 1.0,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Preload initial frames across ALL 4 sequences so every video scrubs instantly
  useEffect(() => {
    const sequences = [
      { folder: 'frames_studio', count: 30 },
      { folder: 'frames_doors', count: 20 },
      { folder: 'frames_drone_sweep', count: 20 },
      { folder: 'frames_drone_revolve', count: 20 },
    ];

    let totalToLoad = sequences.reduce((sum, s) => sum + s.count, 0);
    let totalLoaded = 0;
    let isMounted = true;

    // Safety fallback timer: Ensure site becomes ready within 4s even under network congestion
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setLoaderProgress(100);
        setIsReady(true);
        ScrollTrigger.refresh();
      }
    }, 4000);

    sequences.forEach(({ folder, count }) => {
      for (let i = 1; i <= count; i++) {
        const img = new Image();
        img.src = `/assets/${folder}/frame_${String(i).padStart(4, '0')}.jpg`;
        const onDone = () => {
          if (!isMounted) return;
          totalLoaded++;
          const pct = Math.min(100, Math.round((totalLoaded / totalToLoad) * 100));
          setLoaderProgress(pct);
          if (totalLoaded >= totalToLoad) {
            clearTimeout(safetyTimer);
            setTimeout(() => {
              if (isMounted) {
                setIsReady(true);
                ScrollTrigger.refresh();
              }
            }, 300);
          }
        };
        img.onload = onDone;
        img.onerror = onDone;
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <ErrorBoundary name="BMW M4 CSL EXPERIENCE">
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
      {/* Designed Minimal Preloader */}
      <Preloader
        progress={loaderProgress}
        isReady={isReady}
        onEnter={() => {
          setIsReady(true);
          ScrollTrigger.refresh();
        }}
      />

      {/* Engineering Navigation Header HUD */}
      <Navigation />

      {/* Interactive Right Telemetry Scroll Rail */}
      <ScrollRail />

      <main>
        {/* =========================================================================
            1. HERO SEQUENCE: Canvas scroll animation using assets/frames_studio
            Initial car reveal — 650vh identical scrub distance
            ========================================================================= */}
        <CanvasScroller
          id="hero-sequence"
          folder="frames_studio"
          frameCount={300}
          scrollDistance="650vh"
          isReady={isReady}
          chapterTag="01 // CINEMATIC STUDIO REVEAL"
          title="BMW M4 CSL (G82)"
          subtitle="COMPETITION SPORT LIGHTWEIGHT // 1,000 UNITS WORLDWIDE"
          telemetry={[
            { label: 'CHASSIS CODE', value: 'G82 COUPE' },
            { label: 'OUTPUT', value: '550 HP / 405 KW' },
            { label: 'KERB WEIGHT', value: '1,625 KG DIN' },
            { label: 'RING TIME', value: '7:15.677 MIN' },
          ]}
          overlays={[
            {
              range: [0.12, 0.42],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              tag: 'MOTORSPORT LINEAGE',
              heading: '50 YEARS OF M PRECISION',
              copy: 'Constructed to celebrate half a century of BMW M GmbH. The fastest series-production BMW ever built on the Nürburgring Nordschleife.',
            },
            {
              range: [0.55, 0.88],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              maxWidth: '440px',
              tag: 'AERO MORPHOLOGY',
              heading: 'CARBON FIBRE SCULPTURE',
              copy: 'Exposed carbon fibre bonnet indentations bordered by precision red contour lines optimize downforce and engine thermal evacuation.',
            },
          ]}
        />

        {/* =========================================================================
            2. UI INTERSTITIAL 1: Design / Aero stats using 21st.dev components
            ========================================================================= */}
        <InterstitialAero />

        {/* =========================================================================
            3. DOORS SEQUENCE: Canvas scroll animation using assets/frames_doors
            Cockpit reveal & lightweight interior architecture — 650vh identical scrub distance
            ========================================================================= */}
        <CanvasScroller
          id="doors-sequence"
          folder="frames_doors"
          frameCount={299}
          scrollDistance="650vh"
          isReady={isReady}
          chapterTag="03 // COCKPIT & STRIPPED CABIN"
          title="CARBON BUCKET COCKPIT"
          subtitle="M CARBON FULL BUCKET SEATS // -24 KG NET SAVINGS"
          telemetry={[
            { label: 'SEAT STRUCTURE', value: 'PURE CFRP MONOCOQUE' },
            { label: 'REAR BENCH', value: 'DELETED (-21.0 KG)' },
            { label: 'CENTRE CONSOLE', value: 'SOLID CFRP STRUCTURE' },
            { label: 'HARNESS MOUNTS', value: 'SIX-POINT READY' },
          ]}
          overlays={[
            {
              range: [0.15, 0.45],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              tag: 'TRACK ERGONOMICS',
              heading: 'FIXED BACKREST ANGLE',
              copy: 'Designed purely for racing drivers. Manual longitudinal adjustment, removable headrest inserts for helmet clearance, and deep lateral bolsters.',
            },
            {
              range: [0.55, 0.88],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              maxWidth: '440px',
              tag: 'WEIGHT DISCIPLINE',
              heading: 'REAR BENCH REMOVAL',
              copy: 'The entire rear passenger compartment is replaced by integrated helmet storage nets and a lightweight partition bulkhead.',
            },
          ]}
        />

        {/* =========================================================================
            4. UI INTERSTITIAL 2: The lightweight/weight-savings story
            100 kg mass reduction manifest with editorial hairline dividers
            ========================================================================= */}
        <InterstitialWeight />

        {/* =========================================================================
            5. SWEEP SEQUENCE: Canvas scroll animation using assets/frames_drone_sweep
            Low drone sweep capturing chassis kinematics — 650vh identical scrub distance
            ========================================================================= */}
        <CanvasScroller
          id="sweep-sequence"
          folder="frames_drone_sweep"
          frameCount={300}
          scrollDistance="650vh"
          isReady={isReady}
          chapterTag="05 // LOW-SWEEP CHASSIS DYNAMICS"
          title="CHASSIS KINEMATICS"
          subtitle="ADAPTIVE M SUSPENSION // 8 MM LOWERED RIDE HEIGHT"
          telemetry={[
            { label: 'RIDE HEIGHT', value: '-8 MM VS M4 COMP' },
            { label: 'WHEEL SPECS', value: '19\" FRONT / 20\" REAR' },
            { label: 'BRAKE ROTORS', value: '400 MM CERAMIC' },
            { label: 'FRONT CAMBER', value: 'INDIVIDUALLY TUNED' },
          ]}
          overlays={[
            {
              range: [0.15, 0.45],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              tag: 'TORSIONAL STIFFNESS',
              heading: 'CAST STRUT BRACE',
              copy: 'Cast aluminium front-end strut brace engineered using topology optimization links suspension towers with the front radiator support.',
            },
            {
              range: [0.55, 0.88],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              maxWidth: '440px',
              tag: 'CORNERING GRIP',
              heading: 'MICHELIN PILOT SPORT CUP 2 R',
              copy: 'Track-focused ultra-sticky compound developed directly for dry-weather lap time dominance on the Nordschleife.',
            },
          ]}
        />

        {/* =========================================================================
            6. UI INTERSTITIAL 3: Powertrain and track performance data
            S58 3.0L Bi-Turbo, 550 hp, 650 Nm, 7:15.677 Nürburgring lap
            ========================================================================= */}
        <InterstitialPower />

        {/* =========================================================================
            7. REVOLVE SEQUENCE: Canvas scroll animation using assets/frames_drone_revolve
            360-degree rotational aerodynamic evaluation — 650vh identical scrub distance
            ========================================================================= */}
        <CanvasScroller
          id="revolve-sequence"
          folder="frames_drone_revolve"
          frameCount={300}
          scrollDistance="650vh"
          isReady={isReady}
          chapterTag="07 // ROTATIONAL AERODYNAMIC ANALYSIS"
          title="AERODYNAMIC SILHOUETTE"
          subtitle="ZERO-LIFT AXIS // DUCKTAIL BOOTLID INTEGRATION"
          telemetry={[
            { label: 'EXHAUST SYSTEM', value: 'TITANIUM (-4.3 KG)' },
            { label: 'ROOF DESIGN', value: 'DOUBLE-BUBBLE CFRP' },
            { label: 'TOP VELOCITY', value: '307 KM/H GOVERNED' },
            { label: 'DRIVE TRAIN', value: 'RWD WITH M ACTIVE DIFF' },
          ]}
          overlays={[
            {
              range: [0.15, 0.45],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              tag: 'REAR SPOILER',
              heading: 'UPWARD-SWEPT DUCKTAIL',
              copy: 'Inspired by the historic E46 M3 CSL, the boot lid kick creates targeted downforce on the rear driven axle without additional drag.',
            },
            {
              range: [0.55, 0.88],
              position: { bottom: '130px', left: 'clamp(24px, 5vw, 64px)' },
              maxWidth: '440px',
              tag: 'TITANIUM EXHAUST',
              heading: 'MATTE BLACK TAILPIPES',
              copy: 'Titanium rear silencer reduces rear overhang weight by 4.3 kg while amplifying the raw acoustic resonance of the S58 engine.',
            },
          ]}
        />

        {/* =========================================================================
            8. INTERACTIVE 3D MODEL VIEWER SECTION
            Dedicated 3D Showroom with R3F, Drei, 3 GLB Model Tabs, OrbitControls
            ========================================================================= */}
        <Showroom3D />

        {/* =========================================================================
            9. MOTORSPORT DETAIL GALLERY: WebGL FlexCarousel powered by ogl
            Liquid refraction lens showcasing 12 precision engineering photographs
            ========================================================================= */}
        <EngineeringGallery />

        {/* =========================================================================
            10. EDITORIAL FULL SPECIFICATION SHEET
            ========================================================================= */}
        <SpecSheet />
      </main>

      {/* =========================================================================
          10. FOOTER: Minimal, M tricolor hairline, legal disclaimer
          ========================================================================= */}
      <Footer />
    </div>
    </ErrorBoundary>
  );
}
