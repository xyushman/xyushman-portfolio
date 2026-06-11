import React, { useRef, Suspense, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float, Billboard, useTexture, useGLTF, Scroll, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useIsMobile';

// --- TRUE 3D TEXT HERO ---
function Hero3DText() {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const textsRef = useRef<any[]>([]);
  const { viewport } = useThree();
  const isMobile = useIsMobile();

  const setRef = (index: number) => (el: any) => {
    textsRef.current[index] = el;
  };

  useFrame((state, delta) => {
    if (!group.current) return;
    
    const r1 = scroll.offset;
    
    // The tunnel uses the 700vh gap, which starts after the 100vh Hero.
    // With pages=15, the Hero is r1 = 1/15. The 700vh gap is 7/15.
    // So we map r1 from 1/15 to 8/15 into a 0 to 1 progress value.
    let progress = Math.max(0, Math.min((r1 - (1/15)) / (7/15), 1));
    
    // Target Z position based on scroll: flies from 0 to 160
    const targetZ = THREE.MathUtils.lerp(0, 160, progress);
    
    // Keep it completely hidden below the screen during the Hero section (progress=0)
    // Rise up to center screen as we enter the tunnel gap (progress 0 -> 0.1)
    let targetY = 0;
    if (progress === 0) {
      targetY = -15;
    } else if (progress < 0.1) {
      targetY = THREE.MathUtils.lerp(-15, 0, progress / 0.1);
    }
    
    // Smooth damping for the hyperspace travel and rise
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 3, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, delta);

    // Apply distance-based fading
    textsRef.current.forEach((textMesh) => {
      if (!textMesh) return;
      const worldZ = (group.current?.position.z || 0) + textMesh.position.z;
      const dist = 8 - worldZ; // Camera is at Z=8

      // Fade in from distance (starts fading in at 40 units away, fully bright at 20)
      let opacity = THREE.MathUtils.mapLinear(dist, 40, 20, 0, 1);
      
      // Fade out as it flies past the camera (starts fading out at 5 units away, fully invisible at -2)
      if (dist < 5) {
        opacity = THREE.MathUtils.mapLinear(dist, 5, -2, 1, 0);
      }
      
      opacity = THREE.MathUtils.clamp(opacity, 0, 1);

      // Store original opacities so we don't accidentally make an outline text solid
      if (textMesh.userData.origFillOpacity === undefined) {
        textMesh.userData.origFillOpacity = textMesh.fillOpacity !== undefined ? textMesh.fillOpacity : 1;
        textMesh.userData.origStrokeOpacity = textMesh.strokeOpacity !== undefined ? textMesh.strokeOpacity : 1;
      }

      textMesh.fillOpacity = textMesh.userData.origFillOpacity * opacity;
      if (textMesh.strokeWidth > 0) {
        textMesh.strokeOpacity = textMesh.userData.origStrokeOpacity * opacity;
      }
    });
  });

  const scale = Math.min(1, viewport.width / 15);

  if (isMobile) return null;

  return (
    <group ref={group} scale={scale}>
      {/* 1. ENGINEER (Center) */}
      <Text ref={setRef(0)} position={[0, 0, -40]} fontSize={4.5} color="#d9663f" fillOpacity={0} strokeWidth={0.02} strokeColor="#d9663f" fontWeight={800}>
        ENGINEER
      </Text>

      {/* 2. CREATIVE (Left Top, slightly smaller) */}
      <Text ref={setRef(1)} position={[-3, 2, -55]} fontSize={3} color="#ffffff" fontWeight={800}>
        CREATIVE
      </Text>

      {/* 3. DEVELOPER (Right Bottom, slightly larger) */}
      <Text ref={setRef(2)} position={[3, -2, -70]} fontSize={5} color="#d9663f" fillOpacity={0} strokeWidth={0.02} strokeColor="#d9663f" fontWeight={800}>
        DEVELOPER
      </Text>

      {/* 4. BUILDING (Left Top, smaller) */}
      <Text ref={setRef(3)} position={[-3, 2, -85]} fontSize={3} color="#ffffff">
        BUILDING
      </Text>

      {/* 5. SCALABLE (Right Bottom, larger) */}
      <Text ref={setRef(4)} position={[3, -2, -100]} fontSize={3.5} color="#d9663f" fillOpacity={0} strokeWidth={0.02} strokeColor="#d9663f" fontWeight={800}>
        SCALABLE
      </Text>

      {/* 6. CLOUD (Left Top) */}
      <Text ref={setRef(5)} position={[-3, 2, -115]} fontSize={3} color="#ffffff" fontWeight={800}>
        CLOUD
      </Text>
      
      {/* 7. SOLUTION (Right Bottom) */}
      <Text ref={setRef(6)} position={[3, -2, -130]} fontSize={3} color="#ffffff">
        SOLUTION
      </Text>

      {/* 8. Full Stack + Cloud + AI (Center) */}
      <Text ref={setRef(7)} position={[0, 0, -145]} fontSize={1.5} color="#d9663f" fillOpacity={0} strokeWidth={0.02} strokeColor="#d9663f" fontWeight={800} letterSpacing={0.05}>
        Full Stack + Cloud + AI
      </Text>
    </group>
  );
}

// --- GHOST SPRITE ---
function GhostSprite() {
  const texture = useTexture('/ghost.svg');
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 10);
  
  return (
    <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
      <mesh scale={scale}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={texture} transparent={true} depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

// --- GHOST SHIP ---
function ExternalShipModel() {
  const { scene } = useGLTF('/ghost-ship.glb');
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDim;
    clonedScene.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [clonedScene]);

  return (
    <group position={[4, -1, -2]} rotation={[0, -Math.PI / 4, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

function FallbackShip() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={ref} position={[4, -1, -2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="red" wireframe />
    </mesh>
  );
}

class GhostShipErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <FallbackShip />;
    }
    return this.props.children;
  }
}

// --- MAIN ENGINE ---
export default function GhostModel() {
  const group = useRef<THREE.Group>(null);
  const decorationsGroup = useRef<THREE.Group>(null);
  const wireframe1 = useRef<THREE.Mesh>(null);
  const wireframe2 = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  const isMobile = useIsMobile();

  useFrame((state, delta) => {
    if (wireframe1.current) {
      wireframe1.current.rotation.x += delta * 0.2;
      wireframe1.current.rotation.y += delta * 0.3;
    }
    if (wireframe2.current) {
      wireframe2.current.rotation.x -= delta * 0.5;
      wireframe2.current.rotation.y -= delta * 0.2;
    }

    const r1 = scroll.offset;

    // Move the ghost sprite left/right based on scroll offset!
    if (group.current) {
      // On desktop, map over the duration of the tunnel (up to 8/15). On mobile, map over the first 40% of the page.
      const driftSpeed = isMobile ? 2.5 : (15/8);
      const targetX = THREE.MathUtils.lerp(6, -8, r1 * driftSpeed); 
      const targetY = Math.sin(state.clock.elapsedTime) * 0.5 - 1; // gentle bobbing
      const targetZ = -4;
      
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 2, delta);
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 2, delta);
      group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 2, delta);
    }

    // Move ALL decorations (ghost, ship, wireframes) UP and OFF-SCREEN 
    // once we scroll past the 3D Tunnel (r1 > 8/15 on desktop, r1 > 0.8 on mobile)
    if (decorationsGroup.current) {
      let targetDecorY = 0;
      const flyUpThreshold = isMobile ? 0.8 : (8/15);
      if (r1 > flyUpThreshold) {
        // Fly up 20 units into the sky
        targetDecorY = THREE.MathUtils.lerp(0, 20, Math.min((r1 - flyUpThreshold) / 0.1, 1));
      }
      decorationsGroup.current.position.y = THREE.MathUtils.damp(decorationsGroup.current.position.y, targetDecorY, 4, delta);
    }
  });

  return (
    <group>
      {/* --- THE TRUE 3D TEXT Z-TRAVEL --- */}
      <Hero3DText />

      {/* --- DECORATIONS (Hidden during HTML content) --- */}
      <group ref={decorationsGroup}>
        {/* 1. THE SVG GHOST SPRITE */}
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
          <group ref={group} position={[4, -2, -2]}>
            <Suspense fallback={null}>
              <GhostSprite />
            </Suspense>
          </group>
        </Float>

        {/* 2. THE GHOST SHIP */}
        <Scroll>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={2}>
            <GhostShipErrorBoundary>
              <Suspense fallback={<FallbackShip />}>
                <ExternalShipModel />
              </Suspense>
            </GhostShipErrorBoundary>
          </Float>
        </Scroll>

        {/* 3. WIREFRAMES */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh ref={wireframe1} position={[-4, 1, -2]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
          </mesh>
        </Float>

        <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
          <mesh ref={wireframe2} position={[5, -2, -4]}>
            <torusGeometry args={[0.8, 0.05, 16, 32]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
          </mesh>
        </Float>
      </group>
    </group>
  );
}
