import { useState, useEffect, useRef, useCallback } from "react";
import { planets, PlanetData } from "./planetData";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [angles, setAngles] = useState<number[]>(() =>
    planets.map(() => Math.random() * Math.PI * 2)
  );
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);

  // Keep refs in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    if (isPlayingRef.current) {
      setAngles((prev) =>
        prev.map((angle, i) => angle + planets[i].orbitSpeed * speedRef.current * delta * 0.5)
      );
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  const getSpeedLabel = (s: number) => {
    if (s < 1) return `${s}×`;
    return `${s}×`;
  };

  return (
    <div className="w-full h-screen bg-[#050510] overflow-hidden relative flex flex-col select-none">
      {/* Nebula background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #4a00e0, transparent 70%)",
            top: "10%",
            left: "60%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #00b4d8, transparent 70%)",
            bottom: "20%",
            left: "10%",
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-lg shadow-lg shadow-orange-500/20">
            ☀️
          </div>
          <div>
            <h1 className="text-white text-lg font-bold tracking-wide">Solar System Explorer</h1>
            <p className="text-gray-500 text-xs">Click any planet to explore</p>
          </div>
        </div>
      </div>

      {/* Solar System Canvas */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Stars background */}
        <Stars />

        {/* Sun */}
        <div className="absolute z-10" style={{ width: 56, height: 56 }}>
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #fffde0, #ffcc00, #ff8800, #cc4400)",
              boxShadow:
                "0 0 30px 10px rgba(255, 200, 0, 0.35), 0 0 60px 20px rgba(255, 150, 0, 0.15), 0 0 100px 40px rgba(255, 100, 0, 0.08)",
            }}
          />
          <div
            className="absolute inset-[-20px] rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(255,200,0,0.15) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Orbital paths and planets */}
        {planets.map((planet, index) => {
          const x = Math.cos(angles[index]) * planet.radius;
          const y = Math.sin(angles[index]) * planet.radius * 0.38;
          const isSelected = selectedPlanet?.name === planet.name;
          const isHovered = hoveredPlanet === planet.name;
          const isBehindSun = Math.sin(angles[index]) > 0;

          return (
            <div key={planet.name}>
              {/* Orbit path */}
              <div
                className="absolute rounded-full"
                style={{
                  width: planet.radius * 2,
                  height: planet.radius * 2 * 0.38,
                  left: `calc(50% - ${planet.radius}px)`,
                  top: `calc(50% - ${planet.radius * 0.38}px)`,
                  border: `1px solid ${isHovered || isSelected ? planet.color + "40" : "rgba(100,116,139,0.15)"}`,
                  transition: "border-color 0.3s",
                }}
              />

              {/* Planet */}
              <div
                className="absolute cursor-pointer"
                style={{
                  width: planet.size,
                  height: planet.size,
                  left: `calc(50% + ${x}px - ${planet.size / 2}px)`,
                  top: `calc(50% + ${y}px - ${planet.size / 2}px)`,
                  zIndex: isBehindSun ? 5 : 20,
                  transform: isSelected || isHovered ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.2s ease",
                }}
                onClick={() => setSelectedPlanet(isSelected ? null : planet)}
                onMouseEnter={() => setHoveredPlanet(planet.name)}
                onMouseLeave={() => setHoveredPlanet(null)}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: planet.gradient,
                    boxShadow: isSelected
                      ? `0 0 12px 4px ${planet.color}80, 0 0 25px 8px ${planet.color}30`
                      : isHovered
                      ? `0 0 8px 2px ${planet.color}60`
                      : `0 0 3px 1px ${planet.color}30`,
                    transition: "box-shadow 0.3s",
                  }}
                />
                {/* Saturn's ring */}
                {planet.name === "Saturn" && (
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: planet.size * 2,
                      height: planet.size * 0.5,
                      left: `calc(50% - ${planet.size}px)`,
                      top: `calc(50% - ${planet.size * 0.25}px)`,
                      border: "2px solid rgba(210, 180, 100, 0.5)",
                      transform: "rotateX(75deg)",
                    }}
                  />
                )}
                {/* Planet name tooltip */}
                {isHovered && !isSelected && (
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900/95 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm border border-gray-600/40 shadow-xl pointer-events-none">
                    {planet.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
        <div className="max-w-3xl mx-auto bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/40 p-3 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium transition-all active:scale-95 shadow-lg shadow-blue-600/25 text-sm"
            >
              {isPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Speed Controls */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs font-medium hidden sm:inline">Speed:</span>
              <div className="flex gap-0.5 bg-gray-800/80 rounded-lg p-0.5">
                {[0.25, 0.5, 1, 2, 5, 10].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      speed === s
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/60"
                    }`}
                  >
                    {getSpeedLabel(s)}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setAngles(planets.map(() => Math.random() * Math.PI * 2));
                setSelectedPlanet(null);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white font-medium transition-all border border-gray-600/30 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <div className="absolute top-16 right-4 z-40 w-80 animate-slideIn">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/40 overflow-hidden shadow-2xl shadow-black/50">
            {/* Header */}
            <div
              className="p-4 relative"
              style={{
                background: `linear-gradient(135deg, ${selectedPlanet.color}15, transparent)`,
              }}
            >
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                ✕
              </button>
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex-shrink-0"
                  style={{
                    background: selectedPlanet.gradient,
                    boxShadow: `0 0 20px 5px ${selectedPlanet.color}30`,
                  }}
                />
                <div>
                  <h2 className="text-white text-xl font-bold">{selectedPlanet.name}</h2>
                  <p className="text-gray-400 text-xs">
                    Planet #{planets.indexOf(selectedPlanet) + 1} from the Sun
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 space-y-3">
              <InfoRow icon="📏" label="Diameter" value={selectedPlanet.realDiameter} />
              <InfoRow icon="☀️" label="Distance from Sun" value={selectedPlanet.realDistance} />
              <InfoRow icon="🔄" label="Orbital Period" value={selectedPlanet.orbitalPeriod} />

              <div className="pt-3 border-t border-gray-700/40">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedPlanet.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Planet Legend */}
      <div className="absolute top-16 left-4 z-20">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-700/40 p-3 shadow-xl">
          <p className="text-gray-500 text-[10px] font-semibold mb-2 uppercase tracking-widest">
            Planets
          </p>
          <div className="space-y-0.5">
            {planets.map((planet) => (
              <button
                key={planet.name}
                onClick={() =>
                  setSelectedPlanet(selectedPlanet?.name === planet.name ? null : planet)
                }
                className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg transition-all ${
                  selectedPlanet?.name === planet.name
                    ? "bg-gray-700/50 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: planet.color,
                    boxShadow:
                      selectedPlanet?.name === planet.name
                        ? `0 0 6px 2px ${planet.color}60`
                        : "none",
                  }}
                />
                <span className="text-xs font-medium">{planet.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stars() {
  const stars = useRef(
    Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.current.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-800/40 rounded-xl px-3 py-2.5">
      <span className="text-base">{icon}</span>
      <div className="flex-1">
        <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-white text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
