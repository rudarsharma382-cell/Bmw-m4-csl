import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TelemetryHUD } from './TelemetryHUD';

gsap.registerPlugin(ScrollTrigger);

/**
 * CanvasScroller: Pristine 1080p Scroll-scrubbed image sequence canvas
 * Architecture:
 * - Hard-coded static 650vh container height guarantees 100% identical scroll time across all 4 sequences
 * - CSS position: sticky pins each sequence at top: 0 for exactly 550vh of active scrub travel
 * - ScrollTrigger monitors start: 'top top' to end: 'bottom bottom' without dynamic pin-spacers
 * - Outward frame search guarantees immediate, seamless rendering with zero missing frames
 * - Native buffer pixel rendering at 1080p with imageSmoothingQuality: high
 */
export const CanvasScroller = ({
  id,
  folder,
  frameCount,
  filePrefix = 'frame_',
  fileExt = '.jpg',
  scrollDistance = '650vh', // Identical, deliberate scroll distance across all sequences
  title = '',
  subtitle = '',
  chapterTag = '',
  telemetry = [],
  overlays = [],
  isReady = false,
}) => {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnFrameRef = useRef(-1);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);

  // Pad frame index to 4 digits (e.g. 1 -> "0001")
  const getFrameUrl = useCallback(
    (index) => {
      const padded = String(index).padStart(4, '0');
      return `/assets/${folder}/${filePrefix}${padded}${fileExt}`;
    },
    [folder, filePrefix, fileExt]
  );

  // Outward search: Finds exact image or the closest loaded frame in the sequence
  const getBestFrame = useCallback(
    (targetIndex) => {
      const frames = imagesRef.current;
      if (frames[targetIndex]?.complete && frames[targetIndex]?.naturalWidth > 0) {
        return frames[targetIndex];
      }
      for (let offset = 1; offset < frameCount; offset++) {
        const left = targetIndex - offset;
        if (left >= 0 && frames[left]?.complete && frames[left]?.naturalWidth > 0) {
          return frames[left];
        }
        const right = targetIndex + offset;
        if (right < frameCount && frames[right]?.complete && frames[right]?.naturalWidth > 0) {
          return frames[right];
        }
      }
      return null;
    },
    [frameCount]
  );

  // Render a specific frame index with pixel-perfect cover-fit math
  const renderFrame = useCallback(
    (targetIndex) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const img = getBestFrame(targetIndex);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetWidth = Math.round(rect.width * dpr) || Math.round((window.innerWidth || 1920) * dpr);
      const targetHeight = Math.round(rect.height * dpr) || Math.round((window.innerHeight || 1080) * dpr);

      if (targetWidth <= 0 || targetHeight <= 0) return;

      // Only resize canvas buffer if dimensions actually changed
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      // Exact pixel cover-fit: match native canvas buffer resolution
      const canvasW = canvas.width;
      const canvasH = canvas.height;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      if (canvasW <= 0 || canvasH <= 0 || imgW <= 0 || imgH <= 0) return;

      const imgRatio = imgW / imgH;
      const canvasRatio = canvasW / canvasH;

      let drawW, drawH, offX, offY;
      if (canvasRatio > imgRatio) {
        drawW = canvasW;
        drawH = canvasW / imgRatio;
        offX = 0;
        offY = (canvasH - drawH) / 2;
      } else {
        drawW = canvasH * imgRatio;
        drawH = canvasH;
        offX = (canvasW - drawW) / 2;
        offY = 0;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offX, offY, drawW, drawH);

      lastDrawnFrameRef.current = targetIndex;
      setCurrentFrameNum(targetIndex + 1);
    },
    [getBestFrame]
  );

  // Load images in controlled batches to prevent saturating HTTP sockets and Vercel edge limits
  useEffect(() => {
    imagesRef.current = new Array(frameCount);
    let loadedCount = 0;
    let isCancelled = false;

    // Load initial 30 frames immediately for instant scrub response
    const initialBatch = Math.min(30, frameCount);
    for (let i = 0; i < initialBatch; i++) {
      const img = new Image();
      img.src = getFrameUrl(i + 1);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        loadedCount++;
        setLoadedPercent(Math.round((loadedCount / frameCount) * 100));

        // Draw initial frame as soon as ANY frame is available
        if (lastDrawnFrameRef.current === -1) {
          renderFrame(0);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        loadedCount++;
      };
    }

    // Load remaining frames progressively
    let nextIndex = initialBatch;
    const loadNextChunk = () => {
      if (isCancelled || nextIndex >= frameCount) return;
      const chunkSize = 20;
      const end = Math.min(nextIndex + chunkSize, frameCount);

      for (let i = nextIndex; i < end; i++) {
        const img = new Image();
        img.src = getFrameUrl(i + 1);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          loadedCount++;
          setLoadedPercent(Math.round((loadedCount / frameCount) * 100));
        };
        img.onerror = () => {
          if (isCancelled) return;
          loadedCount++;
        };
      }
      nextIndex = end;
      if (nextIndex < frameCount) {
        setTimeout(loadNextChunk, 80);
      }
    };

    const timer = setTimeout(loadNextChunk, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [frameCount, getFrameUrl, renderFrame]);

  // Re-paint initial frame immediately when isReady triggers
  useEffect(() => {
    if (isReady) {
      renderFrame(0);
    }
  }, [isReady, renderFrame]);

  // CSS Sticky + ScrollTrigger scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Paint initial frame immediately
    renderFrame(0);

    // Primary scrub tracker: monitors container from top to bottom
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6, // Weighted 0.6s easing for identical smooth response
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.min(1, Math.max(0, self.progress));
        setScrollProgress(progress);

        const targetFrame = Math.min(
          frameCount - 1,
          Math.max(0, Math.floor(progress * (frameCount - 1)))
        );

        renderFrame(targetFrame);
      },
    });

    // Enter trigger: ensures frame 0 is painted the instant the section nears viewport
    const enterSt = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      onEnter: () => {
        if (lastDrawnFrameRef.current === -1) {
          renderFrame(0);
        }
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
      if (lastDrawnFrameRef.current >= 0) {
        renderFrame(lastDrawnFrameRef.current);
      } else {
        renderFrame(0);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
      enterSt.kill();
    };
  }, [frameCount, renderFrame]);

  return (
    <section
      id={id}
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: scrollDistance, // Static height in layout ensures exact same timing for every video
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Sticky Viewport Container: Natively pinned at top: 0 by browser compositor */}
      <div
        ref={pinWrapperRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg)',
          backgroundImage: `url(${getFrameUrl(1)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse at center, rgba(11, 12, 14, 0.05) 0%, rgba(11, 12, 14, 0.65) 100%)',
          }}
        />

        {/* Top Header & Chapter Telemetry */}
        <div
          style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            right: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <div
            className="container-grid"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <span className="label-micro" style={{ color: 'var(--accent)' }}>
                {chapterTag}
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: 'var(--text-h2)',
                  color: 'var(--text)',
                  marginTop: '8px',
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  className="font-mono"
                  style={{
                    fontSize: 'var(--text-small)',
                    color: 'var(--text-dim)',
                    marginTop: '4px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* Live Frame Scrub Telemetry */}
            <div
              style={{
                textAlign: 'right',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span className="label-micro">CINEMATIC FRAME (1080P)</span>
              <span
                className="font-mono"
                style={{
                  fontSize: 'var(--text-h3)',
                  fontWeight: 700,
                  color: 'var(--text)',
                }}
              >
                {String(currentFrameNum).padStart(4, '0')} / {frameCount}
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'flex-end',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor:
                      loadedPercent >= 100 ? '#4ade80' : 'var(--accent)',
                    display: 'inline-block',
                  }}
                />
                <span className="label-micro">BUFFER: {loadedPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Story Overlays (fade in and out based on progress) */}
        {overlays.map((overlay, idx) => {
          const isVisible =
            scrollProgress >= overlay.range[0] &&
            scrollProgress <= overlay.range[1];
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                ...overlay.position,
                pointerEvents: 'none',
                zIndex: 12,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                maxWidth: overlay.maxWidth || '480px',
                padding: '16px 24px',
                backgroundColor: 'rgba(11, 12, 14, 0.85)',
                borderLeft: '2px solid var(--accent)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span className="label-micro" style={{ color: 'var(--accent)' }}>
                {overlay.tag}
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text)',
                  marginTop: '6px',
                }}
              >
                {overlay.heading}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-dim)',
                  marginTop: '6px',
                  lineHeight: 1.5,
                }}
              >
                {overlay.copy}
              </p>
            </div>
          );
        })}

        {/* Real-Time Contextual Telemetry & Studio Diagnostics (Directly covers and masks video watermark) */}
        <TelemetryHUD scrollProgress={scrollProgress} chapter={chapterTag} folder={folder} />

        {/* Bottom Technical Telemetry & Scrub Gauge Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: 0,
            right: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <div
            className="container-grid"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Visual Frame Scrubber Gauge */}
            <div
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--line)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${scrollProgress * 100}%`,
                  backgroundColor: 'var(--accent)',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: '8px',
              }}
            >
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {telemetry.map((item, idx) => (
                  <div key={idx}>
                    <div className="label-micro">{item.label}</div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 'var(--text-small)',
                        fontWeight: 600,
                        color: 'var(--text)',
                        marginTop: '2px',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Cue Marker */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-dim)',
                }}
              >
                <span className="label-micro">
                  {scrollProgress >= 0.98 ? 'COMPLETE [SCROLL DOWN]' : 'CONTINUE SCROLLING'}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRight: '1px solid var(--accent)',
                    borderBottom: '1px solid var(--accent)',
                    transform: 'rotate(45deg)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
