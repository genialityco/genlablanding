const matrix = {
  'leads_protagonista_premium': {
    productos: ['Gravity Challenge', 'Scratch & Win'],
    modelo: 'Llave en Mano',
    precio: 'desde $7.000.000 COP'
  },
  'leads_pequeno_b2b': {
    productos: ['Trivia Interactiva'],
    modelo: 'Gen.BOX + Licencia',
    precio: 'desde $3.500.000 COP'
  },
  'leads_default': {
    productos: ['Scratch & Win', 'Ruleta Digital'],
    modelo: 'Variable según escala',
    precio: 'desde $4.000.000 COP'
  },
  'dominar_default': {
    productos: ['Motion Wall', 'Phygital Sports'],
    modelo: 'Llave en Mano',
    precio: 'desde $12.000.000 COP'
  },
  'educar_default': {
    productos: ['Simulador 3D', 'Trivia Educativa'],
    modelo: 'Llave en Mano',
    precio: 'desde $8.000.000 COP'
  },
  'fidelizar_default': {
    productos: ['Arcade Custom', 'Photo Opportunity'],
    modelo: 'Llave en Mano',
    precio: 'desde $6.500.000 COP'
  }
};

const fallback = {
  productos: ['Experiencia Custom'],
  modelo: 'Llave en Mano',
  precio: 'A cotizar según requerimientos'
};

export function getRecommendation({ objetivo, escala, industria }) {
  const key1 = `${objetivo}_${escala}_${industria}`;
  const key2 = `${objetivo}_${escala}`;
  const key3 = `${objetivo}_default`;
  
  return matrix[key1] || matrix[key2] || matrix[key3] || fallback;
}