export interface PlanetData {
  name: string;
  color: string;
  size: number; // display size in px
  radius: number; // orbital radius in px
  realDiameter: string; // km
  realDistance: string; // million km from sun
  orbitalPeriod: string; // Earth days/years
  orbitSpeed: number; // relative speed multiplier
  description: string;
  emoji: string;
  gradient: string;
}

export const planets: PlanetData[] = [
  {
    name: "Mercury",
    color: "#b5b5b5",
    size: 8,
    radius: 70,
    realDiameter: "4,879 km",
    realDistance: "57.9 million km",
    orbitalPeriod: "88 days",
    orbitSpeed: 4.15,
    description: "The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.",
    emoji: "☿",
    gradient: "radial-gradient(circle at 30% 30%, #d4d4d4, #8a8a8a, #5c5c5c)",
  },
  {
    name: "Venus",
    color: "#e8a838",
    size: 14,
    radius: 100,
    realDiameter: "12,104 km",
    realDistance: "108.2 million km",
    orbitalPeriod: "225 days",
    orbitSpeed: 1.62,
    description: "The hottest planet due to its thick atmosphere. It rotates backwards compared to most planets.",
    emoji: "♀",
    gradient: "radial-gradient(circle at 30% 30%, #ffd280, #e8a838, #c47a1a)",
  },
  {
    name: "Earth",
    color: "#4a90d9",
    size: 15,
    radius: 140,
    realDiameter: "12,756 km",
    realDistance: "149.6 million km",
    orbitalPeriod: "365.25 days",
    orbitSpeed: 1.0,
    description: "Our home planet — the only known world with liquid water on its surface and life.",
    emoji: "🌍",
    gradient: "radial-gradient(circle at 30% 30%, #7ec8e3, #4a90d9, #2d5f8a)",
  },
  {
    name: "Mars",
    color: "#d44a2a",
    size: 11,
    radius: 180,
    realDiameter: "6,792 km",
    realDistance: "227.9 million km",
    orbitalPeriod: "687 days",
    orbitSpeed: 0.53,
    description: "The Red Planet, with the tallest volcano (Olympus Mons) and deepest canyon in the Solar System.",
    emoji: "♂",
    gradient: "radial-gradient(circle at 30% 30%, #f07050, #d44a2a, #8b2500)",
  },
  {
    name: "Jupiter",
    color: "#c88b3a",
    size: 32,
    radius: 240,
    realDiameter: "142,984 km",
    realDistance: "778.6 million km",
    orbitalPeriod: "11.86 years",
    orbitSpeed: 0.084,
    description: "The largest planet, a gas giant with a famous Great Red Spot storm that has raged for centuries.",
    emoji: "♃",
    gradient: "radial-gradient(circle at 30% 30%, #f0c878, #c88b3a, #8b5e20)",
  },
  {
    name: "Saturn",
    color: "#e8c868",
    size: 27,
    radius: 310,
    realDiameter: "120,536 km",
    realDistance: "1,433.5 million km",
    orbitalPeriod: "29.46 years",
    orbitSpeed: 0.034,
    description: "Famous for its stunning ring system made of ice and rock. It's the least dense planet — it could float on water!",
    emoji: "♄",
    gradient: "radial-gradient(circle at 30% 30%, #fff0a0, #e8c868, #b89830)",
  },
  {
    name: "Uranus",
    color: "#7ec8c8",
    size: 20,
    radius: 370,
    realDiameter: "51,118 km",
    realDistance: "2,872.5 million km",
    orbitalPeriod: "84.01 years",
    orbitSpeed: 0.012,
    description: "An ice giant that rotates on its side. It has a blue-green color from methane in its atmosphere.",
    emoji: "♅",
    gradient: "radial-gradient(circle at 30% 30%, #a0e8e8, #7ec8c8, #4a9898)",
  },
  {
    name: "Neptune",
    color: "#4466cc",
    size: 19,
    radius: 420,
    realDiameter: "49,528 km",
    realDistance: "4,495.1 million km",
    orbitalPeriod: "164.8 years",
    orbitSpeed: 0.006,
    description: "The windiest planet with speeds up to 2,100 km/h. It's the farthest planet from the Sun.",
    emoji: "♆",
    gradient: "radial-gradient(circle at 30% 30%, #6688ee, #4466cc, #2244aa)",
  },
];
