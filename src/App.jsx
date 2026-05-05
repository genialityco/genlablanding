import React from 'react';
import { useLenis } from './hooks/useLenis';
import { Cursor } from './components/ui/Cursor';
import { Marquee } from './components/layout/Marquee';

import { Block01_Hero } from './components/blocks/Block01_Hero';
import { Block02_Reto } from './components/blocks/Block02_Reto';
import { Block03_Como } from './components/blocks/Block03_Como';
import { Block04_Ecosistemas } from './components/blocks/Block04_Ecosistemas';
import { Block05_DosCaminos } from './components/blocks/Block05_DosCaminos';
import { Block06_Tecnologia } from './components/blocks/Block06_Tecnologia';
import { Block07_Aplicaciones } from './components/blocks/Block07_Aplicaciones';
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
        {/* 01 — HERO */}
        <Block01_Hero />

        {/* 02 — EL RETO */}
        <Block02_Reto />

        {/* MARQUEE 1 */}
        <Marquee text="+53% TIEMPO DE ATENCIÓN · 2.7× MÁS ENGAGEMENT · 70% RETENCIÓN VS 45% PASIVO · " />

        {/* 03 — LA EXPERIENCIA */}
        <Block03_Como />

        {/* 04 — ECOSISTEMAS */}
        <Block04_Ecosistemas />

        {/* MARQUEE 2 */}
        <Marquee text="TOUCH · MOTION & VISION · PHYGITAL · " />

        {/* 05 — DOS CAMINOS */}
        <Block05_DosCaminos />

        {/* 06 — TECNOLOGÍA */}
        <Block06_Tecnologia />

        {/* 07 — APLICACIONES */}
        <Block07_Aplicaciones />

        {/* 08 — INTELIGENCIA DE DATOS */}
        <Block05_Datos />

        {/* 09 — CASOS DE ÉXITO */}
        <Block06_Casos />

        {/* MARQUEE 3 */}
        <Marquee text="MIDA. ITERE. ESCALE. · " />

        {/* 10 — MODELOS */}
        <Block07_Modelos />

        {/* 11 — FAQ */}
        <Block08_FAQ />

        {/* 12 — CIERRE */}
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
