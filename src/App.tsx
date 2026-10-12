import { useState, useRef, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { planets, PlanetData, SUN_SIZE } from "./planetData";

// Global state for animation control (avoids re-renders)
const animationState = {
  isPlaying: true,
  speed: 1,
  angles: planets.map(() => Math.random() * Math.PI * 2),
};

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [, forceUpdate] = useState(0);

  // Sync state to animation ref
  animationState.isPlaying = isPlaying;
  animationState.speed = speed;

  const handlePlanetClick = useCallback((planet: PlanetData) => {
    setSelectedPlanet((prev) => (prev?.name === planet.name ? null : planet));
  }, []);

  const handleReset = useCallback(() => {
    animationState.angles = planets.map(() => Math.random() * Math.PI * 2);
    setSelectedPlanet(null);
    forceUpdate((n) => n + 1);
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 40, 60], fov: 55, near: 0.1, far: 1000 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene
          selectedPlanet={selectedPlanet}
          onPlanetClick={handlePlanetClick}
        />
      </Canvas>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-lg shadow-lg shadow-orange-500/20">
            ☀️
          </div>
          <div>
            <h1 className="text-white text-lg font-bold tracking-wide">
              Solar System Explorer
            </h1>
            <p className="text-gray-400 text-xs">
              Click any planet to explore • Drag to rotate • Scroll to zoom
            </p>
          </div>
        </div>
      </div>

      {/* Planet Legend */}
      <div className="absolute top-16 left-4 z-10">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-700/40 p-3 shadow-xl">
          <p className="text-gray-500 text-[10px] font-semibold mb-2 uppercase tracking-widest">
            Planets
          </p>
          <div className="space-y-0.5">
            {planets.map((planet) => (
              <button
                key={planet.name}
                onClick={() => handlePlanetClick(planet)}
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

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <div className="absolute top-16 right-4 z-20 w-80 animate-slideIn">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/40 overflow-hidden shadow-2xl shadow-black/50">
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
                    background: `radial-gradient(circle at 30% 30%, ${selectedPlanet.color}ee, ${selectedPlanet.color}88, ${selectedPlanet.color}44)`,
                    boxShadow: `0 0 20px 5px ${selectedPlanet.color}30`,
                  }}
                />
                <div>
                  <h2 className="text-white text-xl font-bold">
                    {selectedPlanet.name}
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Planet #{planets.indexOf(selectedPlanet) + 1} from the Sun
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <InfoRow
                icon="📏"
                label="Diameter"
                value={selectedPlanet.realDiameter}
              />
              <InfoRow
                icon="☀️"
                label="Distance from Sun"
                value={selectedPlanet.realDistance}
              />
              <InfoRow
                icon="🔄"
                label="Orbital Period"
                value={selectedPlanet.orbitalPeriod}
              />
              <div className="pt-3 border-t border-gray-700/40">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedPlanet.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <div className="max-w-3xl mx-auto bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/40 p-3 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between gap-3 flex-wrap">
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

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs font-medium hidden sm:inline">
                Speed:
              </span>
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
                    {s}×
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white font-medium transition-all border border-gray-600/30 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
    </div>
  );
}

// ============= 3D SCENE COMPONENTS =============

function Scene({
  selectedPlanet,
  onPlanetClick,
}: {
  selectedPlanet: PlanetData | null;
  onPlanetClick: (planet: PlanetData) => void;
}) {
  return (
    <>
      {/* Background stars */}
      <Stars
        radius={200}
        depth={80}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.08} />
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        distance={200}
        decay={0.8}
        color="#fff5e0"
      />

      {/* Sun */}
      <Sun />

      {/* Orbit lines */}
      {planets.map((planet) => (
        <OrbitLine key={`orbit-${planet.name}`} radius={planet.orbitRadius} />
      ))}

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          planet={planet}
          index={index}
          isSelected={selectedPlanet?.name === planet.name}
          onClick={() => onPlanetClick(planet)}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={200}
        autoRotate={false}
        zoomSpeed={0.8}
      />
    </>
  );
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.03;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Sun core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN_SIZE, 64, 64]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      {/* Sun glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[SUN_SIZE * 1.3, 32, 32]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[SUN_SIZE * 1.8, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Light flare */}
      <pointLight color="#ffdd88" intensity={2} distance={100} decay={1} />
    </group>
  );
}

function Planet({
  planet,
  index,
  isSelected,
  onClick,
}: {
  planet: PlanetData;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectionRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Orbital motion
    if (animationState.isPlaying) {
      animationState.angles[index] += planet.orbitSpeed * animationState.speed * delta * 0.3;
    }

    const angle = animationState.angles[index];
    const x = Math.cos(angle) * planet.orbitRadius;
    const z = Math.sin(angle) * planet.orbitRadius;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }

    // Self rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed * delta * 10;
    }

    // Selection ring pulse
    if (selectionRingRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.004) * 0.05;
      selectionRingRef.current.scale.setScalar(pulse);
    }
  });

  const tilt = planet.tilt || 0;

  return (
    <group ref={groupRef}>
      <group rotation={[tilt, 0, 0]}>
        {/* Planet sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[planet.size, 32, 32]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.emissive || planet.color}
            emissiveIntensity={0.1}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Saturn's ring */}
        {planet.hasRing && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[planet.size * 1.4, planet.size * 2.2, 64]}
            />
            <meshStandardMaterial
              color={planet.ringColor || "#d4b86a"}
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
              roughness={0.8}
            />
          </mesh>
        )}

        {/* Selection indicator */}
        {isSelected && (
          <mesh ref={selectionRingRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.size * 1.6, planet.size * 1.8, 64]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* Planet label */}
      {(hovered || isSelected) && (
        <Html
          position={[0, planet.size + 1.2, 0]}
          center
          distanceFactor={30}
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-gray-900/90 text-white text-xs px-2.5 py-1 rounded-lg border border-gray-600/40 whitespace-nowrap backdrop-blur-sm shadow-xl">
            {planet.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function OrbitLine({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color="#475569"
      transparent
      opacity={0.25}
      lineWidth={1}
    />
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-800/40 rounded-xl px-3 py-2.5">
      <span className="text-base">{icon}</span>
      <div className="flex-1">
        <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
          {label}
        </p>
        <p className="text-white text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
