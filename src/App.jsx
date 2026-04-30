import React from 'react';
import { useLenis } from './hooks/useLenis';
import { Cursor } from './components/ui/Cursor';
import { Marquee } from './components/layout/Marquee';

import { Block01_Hero } from './components/blocks/Block01_Hero';
import { Block02_Reto } from './components/blocks/Block02_Reto';
import { Block03_Como } from './components/blocks/Block03_Como';
import { Block04_Ecosistemas } from './components/blocks/Block04_Ecosistemas';
import { Block05_Datos } from './components/blocks/Block05_Datos';
import { Block06_Casos } from './components/blocks/Block06_Casos';
import { Block07_Modelos } from './components/blocks/Block07_Modelos';
import { Block08_FAQ } from './components/blocks/Block08_FAQ';
import { Block09_Cierre } from './components/blocks/Block09_Cierre';

function App() {
  useLenis();

  return (
    <>
      <Cursor />
      
      <main>
        <Block01_Hero />
        <Block02_Reto />
        
        <Marquee text="ATENCIÓN CAPTURADA · 4:12 MIN PROMEDIO · +340% RECORDACIÓN · " />
        
        <Block03_Como />
        <Block04_Ecosistemas />
        
        <Marquee text="TOUCH · MOTION & VISION · PHYGITAL · " />
        
        <Block05_Datos />
        <Block06_Casos />
        
        <Marquee text="MIDA. ITERE. ESCALE. · " />
        
        <Block07_Modelos />
        <Block08_FAQ />
        <Block09_Cierre />
      </main>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid var(--gl-gray-dark)', marginTop: 'var(--space-section)', color: 'var(--gl-text-muted)' }}>
        <img src="/logos/genlab-full.svg" alt="Gen.Lab Logo" style={{ height: '40px', margin: '0 auto 1.5rem auto' }} />
        <p>© 2026 Gen.Lab by Geniality. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;