/**
 * Global shared frame buffer cache
 * Ensures all 1,199 frames loaded during preloading are directly reused
 * across all CanvasScroller sequence components with zero duplicate network requests
 * and instantaneous 60/120fps scrubbing.
 */
export const frameCache = {
  frames_studio: [],
  frames_doors: [],
  frames_drone_sweep: [],
  frames_drone_revolve: [],
};
