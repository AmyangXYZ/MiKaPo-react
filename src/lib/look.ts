// The look reze.design's demo scene is lit with, brought over so a model styled
// there arrives here under the same key light, the same magenta environment and
// the same bloom.
//
// Held as the hex colours and the azimuth/elevation that app stores, converted
// on the way into the engine, so these numbers stay readable against
// reze-design's lib/default-scene.ts instead of being linear-light vectors
// nobody can match by eye.

import { Vec3 } from "reze-engine"

/** sRGB hex → linear-light Vec3 (what the engine's Blender-style colours expect). */
function hexToLinearVec3(hex: string): Vec3 {
  const n = parseInt(hex.replace("#", ""), 16)
  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  return new Vec3(toLinear(((n >> 16) & 0xff) / 255), toLinear(((n >> 8) & 0xff) / 255), toLinear((n & 0xff) / 255))
}

/** Azimuth/elevation (degrees) → the engine's sun direction (travel FROM sun TO scene). */
function azElToDirection(azimuth: number, elevation: number): Vec3 {
  const az = (azimuth * Math.PI) / 180
  const el = (elevation * Math.PI) / 180
  return new Vec3(-Math.cos(el) * Math.sin(az), -Math.sin(el), -Math.cos(el) * Math.cos(az))
}

/** Environment lighting: a magenta world, which is what tints the shadow side. */
export const WORLD = { color: hexToLinearVec3("#ed6aff"), strength: 0.66 }

/** The single directional lamp, over the character's left shoulder and low. */
export const SUN = { color: hexToLinearVec3("#ffffff"), strength: 2.0, direction: azElToDirection(205, 21) }

/** EEVEE bloom, warmed pink so highlights bloom toward the skin rather than the sky. */
export const BLOOM = {
  enabled: true,
  threshold: 0.5,
  knee: 0.5,
  radius: 4.0,
  intensity: 0.05,
  color: hexToLinearVec3("#ffc9c9"),
}
