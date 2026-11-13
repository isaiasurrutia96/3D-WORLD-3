/**
 * Graphics quality presets and persisted user settings.
 *
 * The target test machine is a Mac with Intel Iris Graphics 6100, so the
 * default is deliberately conservative. "high" exists so the look can be
 * judged; "low" exists so the game stays playable if the chip cannot keep up.
 */

export type QualityLevel = 'low' | 'medium' | 'high';

export interface QualityPreset {
  /** Upper bound on devicePixelRatio. Rendering cost scales with its square. */
  pixelRatioCap: number;
  /** Multiplier applied to the drawing buffer, below the CSS size. */
  renderScale: number;
  shadows: boolean;
  shadowMapSize: number;
  /** Distance in world units covered by the directional light's shadow camera. */
  shadowDistance: number;
  antialias: boolean;
  /** Reflective water costs a second render pass; a cheap shader is used otherwise. */
  waterReflections: boolean;
  bloom: boolean;
  fogDensity: number;
  viewDistance: number;
  /** Grass tufts, small rocks and similar decoration. */
  foliageDensity: number;
  anisotropy: number;
}

export const QUALITY_PRESETS: Record<QualityLevel, QualityPreset> = {
  low: {
    pixelRatioCap: 1,
    renderScale: 0.8,
    shadows: false,
    shadowMapSize: 512,
    shadowDistance: 60,
    antialias: false,
    waterReflections: false,
    bloom: false,
    fogDensity: 0.0075,
    viewDistance: 420,
    foliageDensity: 0.25,
    anisotropy: 1,
  },
  medium: {
    pixelRatioCap: 1.25,
    renderScale: 1,
    shadows: true,
    shadowMapSize: 1024,
    shadowDistance: 90,
    antialias: false,
    waterReflections: false,
    bloom: false,
    fogDensity: 0.0052,
    viewDistance: 620,
    foliageDensity: 0.6,
    anisotropy: 4,
  },
  high: {
    pixelRatioCap: 2,
    renderScale: 1,
    shadows: true,
    shadowMapSize: 2048,
    shadowDistance: 130,
    antialias: true,
    waterReflections: true,
    bloom: true,
    fogDensity: 0.004,
    viewDistance: 900,
    foliageDensity: 1,
    anisotropy: 8,
  },
};

export interface UserSettings {
  quality: QualityLevel;
  musicVolume: number;
  effectsVolume: number;
  cameraSensitivity: number;
  invertCameraY: boolean;
  /** The chase camera behind him, or the isometric view from high on a diagonal. */
  cameraView: 'follow' | 'isometric';
}

const DEFAULTS: UserSettings = {
  quality: 'medium',
  musicVolume: 0.6,
  effectsVolume: 0.8,
  cameraSensitivity: 1,
  invertCameraY: false,
  cameraView: 'follow',
};

const STORAGE_KEY = 'letsgo.settings.v1';

function clamp01(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(1, Math.max(0, value))
    : fallback;
}

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    return {
      quality:
        parsed.quality === 'low' || parsed.quality === 'medium' || parsed.quality === 'high'
          ? parsed.quality
          : DEFAULTS.quality,
      musicVolume: clamp01(parsed.musicVolume, DEFAULTS.musicVolume),
      effectsVolume: clamp01(parsed.effectsVolume, DEFAULTS.effectsVolume),
      cameraSensitivity:
        typeof parsed.cameraSensitivity === 'number' && Number.isFinite(parsed.cameraSensitivity)
          ? Math.min(3, Math.max(0.2, parsed.cameraSensitivity))
          : DEFAULTS.cameraSensitivity,
      invertCameraY: parsed.invertCameraY === true,
      cameraView: parsed.cameraView === 'isometric' ? 'isometric' : 'follow',
    };
  } catch {
    // Private windows and blocked site data both throw here; defaults are fine.
    return { ...DEFAULTS };
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Settings are a convenience, never required for the game to run.
  }
}
