
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}






/**
 * Generates a rugged rectangle clip-path polygon.
 * @param {Object} options - Configuration options
 * @param {number} options.points - Number of points per edge (default: 8)
 * @param {number} options.roughness - Max deviation in % (default: 2)
 * @param {number} options.cornerRoughness - Corner point deviation (default: 3)
 * @param {boolean} options.spikes - Random spikes to add variance (default: false)
 * @param {number} options.seed - Random seed for reproducibility (optional)
 * @returns {string} CSS clip-path polygon value
 */

type RuggedRectangleOptions = {
    points: number;
    roughness?: number;
    cornerRoughness?: number;
    spikes?: boolean;
    seed?: number | null;
  }

export function generateRuggedRectangle({
  points = 8,
  roughness = 2,
  cornerRoughness = 3,
  spikes = false,
  seed = null
} : RuggedRectangleOptions): string {

  // Linear Congruential Generator for seeded randomness
  let randomSeed = seed ?? Math.random() * 10000;
  const seededRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };
  
  const random = seed !== null ? seededRandom : Math.random;
  
  // Helper to generate deviation
  const deviate = (value: number, maxDeviation: number) => {
    // add random spikes with arbitrary frequency
    if (spikes && random() < 0.1) {
      maxDeviation *= 6;
    }
    return value + (random() - 0.5) * 2 * maxDeviation;
  };
  
  const coordinates = [];
  
  // Top edge (left to right)
  for (let i = 0; i < points; i++) {
    const x = (i / (points - 1)) * 100;
    const y = deviate(0, i === 0 || i === points - 1 ? cornerRoughness : roughness);
    coordinates.push(`${x.toFixed(2)}% ${Math.max(0, y).toFixed(2)}%`);
  }
  
  // Right edge (top to bottom)
  for (let i = 1; i < points; i++) {
    const x = deviate(100, i === points - 1 ? cornerRoughness : roughness);
    const y = (i / (points - 1)) * 100;
    coordinates.push(`${Math.min(100, x).toFixed(2)}% ${y.toFixed(2)}%`);
  }
  
  // Bottom edge (right to left)
  for (let i = 1; i < points; i++) {
    const x = 100 - (i / (points - 1)) * 100;
    const y = deviate(100, i === points - 1 ? cornerRoughness : roughness);
    coordinates.push(`${x.toFixed(2)}% ${Math.min(100, y).toFixed(2)}%`);
  }
  
  // Left edge (bottom to top)
  for (let i = 1; i < points - 1; i++) {
    const x = deviate(0, roughness);
    const y = 100 - (i / (points - 1)) * 100;
    coordinates.push(`${Math.max(0, x).toFixed(2)}% ${y.toFixed(2)}%`);
  }
  
  return `polygon(${coordinates.join(',')})`;
}