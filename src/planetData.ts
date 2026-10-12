export interface PlanetData {
  name: string;
  color: string;
  emissive?: string;
  size: number; // 3D sphere radius
  orbitRadius: number; // distance from sun in 3D units
  realDiameter: string;
  realDistance: string;
  orbitalPeriod: string;
  orbitSpeed: number; // relative speed multiplier
  rotationSpeed: number; // self-rotation speed
  description: string;
  emoji: string;
  hasRing?: boolean;
  ringColor?: string;
  tilt?: number; // axial tilt in radians
}

export const SUN_SIZE = 4;

export const planets: PlanetData[] = [
  {
    name: "Mercury",
    color: "#b5b5b5",
    size: 0.38,
    orbitRadius: 8,
    realDiameter: "4,879 km",
    realDistance: "57.9 million km",
    orbitalPeriod: "88 days",
    orbitSpeed: 4.15,
    rotationSpeed: 0.004,
    description: "The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.",
    emoji: "☿",
  },
  {
    name: "Venus",
    color: "#e8a838",
    size: 0.72,
    orbitRadius: 12,
    realDiameter: "12,104 km",
    realDistance: "108.2 million km",
    orbitalPeriod: "225 days",
    orbitSpeed: 1.62,
    rotationSpeed: 0.002,
    description: "The hottest planet due to its thick atmosphere. It rotates backwards compared to most planets.",
    emoji: "♀",
  },
  {
    name: "Earth",
    color: "#4a90d9",
    emissive: "#112244",
    size: 0.78,
    orbitRadius: 16,
    realDiameter: "12,756 km",
    realDistance: "149.6 million km",
    orbitalPeriod: "365.25 days",
    orbitSpeed: 1.0,
    rotationSpeed: 0.01,
    description: "Our home planet — the only known world with liquid water on its surface and life.",
    emoji: "🌍",
  },
  {
    name: "Mars",
    color: "#d44a2a",
    size: 0.53,
    orbitRadius: 21,
    realDiameter: "6,792 km",
    realDistance: "227.9 million km",
    orbitalPeriod: "687 days",
    orbitSpeed: 0.53,
    rotationSpeed: 0.009,
    description: "The Red Planet, with the tallest volcano (Olympus Mons) and deepest canyon in the Solar System.",
    emoji: "♂",
  },
  {
    name: "Jupiter",
    color: "#c88b3a",
    size: 2.2,
    orbitRadius: 30,
    realDiameter: "142,984 km",
    realDistance: "778.6 million km",
    orbitalPeriod: "11.86 years",
    orbitSpeed: 0.084,
    rotationSpeed: 0.02,
    description: "The largest planet, a gas giant with a famous Great Red Spot storm that has raged for centuries.",
    emoji: "♃",
  },
  {
    name: "Saturn",
    color: "#e8c868",
    size: 1.8,
    orbitRadius: 40,
    realDiameter: "120,536 km",
    realDistance: "1,433.5 million km",
    orbitalPeriod: "29.46 years",
    orbitSpeed: 0.034,
    rotationSpeed: 0.018,
    description: "Famous for its stunning ring system made of ice and rock. It's the least dense planet — it could float on water!",
    emoji: "♄",
    hasRing: true,
    ringColor: "#d4b86a",
    tilt: 0.47,
  },
  {
    name: "Uranus",
    color: "#7ec8c8",
    size: 1.2,
    orbitRadius: 50,
    realDiameter: "51,118 km",
    realDistance: "2,872.5 million km",
    orbitalPeriod: "84.01 years",
    orbitSpeed: 0.012,
    rotationSpeed: 0.014,
    description: "An ice giant that rotates on its side. It has a blue-green color from methane in its atmosphere.",
    emoji: "♅",
    tilt: 1.71,
  },
  {
    name: "Neptune",
    color: "#4466cc",
    size: 1.1,
    orbitRadius: 58,
    realDiameter: "49,528 km",
    realDistance: "4,495.1 million km",
    orbitalPeriod: "164.8 years",
    orbitSpeed: 0.006,
    rotationSpeed: 0.013,
    description: "The windiest planet with speeds up to 2,100 km/h. It's the farthest planet from the Sun.",
    emoji: "♆",
  },
];
