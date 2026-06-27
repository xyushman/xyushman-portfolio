import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment } from '@react-three/drei';
import Layout from './components/Layout';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import GhostModel from './components/GhostModel';
import Home from './pages/Home';
import { useIsMobile } from './hooks/useIsMobile';

function App() {
  const isMobile = useIsMobile();

  return (
    <Router>
      <CustomCursor />

      {/* 3D Canvas wrapper that covers the entire viewport */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, backgroundColor: 'var(--bg-dark)' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
          {/* Stark white and cool grey lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <Environment preset="city" />

          <CanvasBackground />

          <ScrollControls pages={isMobile ? 10 : 23} damping={0.25}>
            <GhostModel />

            <Scroll html style={{ width: '100%' }}>
              <Layout>
                <Home />
              </Layout>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </Router>
  );
}

export default App;
