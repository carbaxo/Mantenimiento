// Planes de mantenimiento elaborados a partir de los manuales y programas
// oficiales SEAT/VW y VOGE, contrastados entre varias fuentes y usando
// siempre el criterio MÁS CONSERVADOR (lo que antes ocurra entre km y tiempo).
//
// Campos de cada operación:
//   id            identificador único
//   name          nombre de la operación
//   category      grupo para agrupar en la vista «Plan»
//   intervalKm    cada cuántos km (null = según inspección / una sola vez)
//   intervalMonths cada cuántos meses (null = no aplica por tiempo)
//   notes         especificaciones, cantidades, normas

export const VEHICLES = [
  {
    id: 'altea',
    type: 'car',
    name: 'Seat Altea XL 1.6 TDI',
    shortName: 'Altea XL',
    subtitle: '1.6 TDI CR · 105 CV · Diésel',
    year: 2010,
    accent: '#ef4444',
    plan: [
      // --- Motor ---
      {
        id: 'aceite-motor',
        name: 'Aceite motor + filtro de aceite',
        category: 'Motor',
        intervalKm: 15000,
        intervalMonths: 12,
        notes:
          'Aceite norma VW 507 00 (low-SAPS, obligatorio por el filtro de partículas DPF), viscosidad 5W-30. Cantidad con filtro ≈ 4,3 L. Si el coche está en servicio LongLife (PR QG1) el intervalo puede llegar a 30.000 km / 24 meses; en servicio fijo (QG0) es 15.000 km / 12 meses. Se usa el valor conservador.',
      },
      {
        id: 'correa-distribucion',
        name: 'Correa de distribución (kit + bomba de agua)',
        category: 'Motor',
        intervalKm: 120000,
        intervalMonths: 60,
        notes:
          'CRÍTICO: motor interferente, si la correa rompe destruye el motor. Sustituir el kit completo (correa + tensor + rodillos + bomba de agua). El valor oficial VAG va de 180.000 a 210.000 km, pero por el historial de roturas prematuras (~100-111k km) del 1.6 TDI EA189 se recomienda hacerlo a 120.000 km / 5 años como máximo.',
      },
      {
        id: 'correa-accesorios',
        name: 'Correa de accesorios (poly-V)',
        category: 'Motor',
        intervalKm: 60000,
        intervalMonths: null,
        notes:
          'Sin intervalo fijo de VW. Inspeccionar y sustituir si está agrietada; lo habitual es cambiarla al hacer la distribución.',
      },
      {
        id: 'bujias-incandescencia',
        name: 'Bujías de incandescencia (precalentamiento)',
        category: 'Motor',
        intervalKm: 120000,
        intervalMonths: null,
        notes:
          'No tienen intervalo en el plan oficial; se cambian por avería. Sustitución preventiva orientativa a ~100.000-120.000 km, las 4 a la vez.',
      },
      // --- Filtros ---
      {
        id: 'filtro-aire',
        name: 'Filtro de aire',
        category: 'Filtros',
        intervalKm: 30000,
        intervalMonths: 36,
        notes:
          'Las fuentes discrepan (30k/60k/90k). Valor conservador 30.000 km. Antes en ambiente con mucho polvo.',
      },
      {
        id: 'filtro-combustible',
        name: 'Filtro de combustible (diésel)',
        category: 'Filtros',
        intervalKm: 60000,
        intervalMonths: 24,
        notes:
          'Crítico en common-rail; incorpora purga de agua. Algunas fuentes indican 90.000 km; se usa 60.000 km como conservador.',
      },
      {
        id: 'filtro-habitaculo',
        name: 'Filtro de habitáculo / polen',
        category: 'Filtros',
        intervalKm: 30000,
        intervalMonths: 12,
        notes: 'Anual si hay mucha contaminación o polen.',
      },
      // --- Frenos ---
      {
        id: 'liquido-frenos',
        name: 'Líquido de frenos',
        category: 'Frenos',
        intervalKm: null,
        intervalMonths: 24,
        notes:
          'DOT 4 / norma VW 501 14. Primera sustitución a los 3 años, después cada 2 años. ~1 L para la purga completa.',
      },
      {
        id: 'pastillas-del',
        name: 'Pastillas de freno delanteras',
        category: 'Frenos',
        intervalKm: 40000,
        intervalMonths: null,
        notes: 'Por desgaste; cambiar por ejes. Inspección anual. Orientativo 30.000-60.000 km.',
      },
      {
        id: 'pastillas-tras',
        name: 'Pastillas de freno traseras',
        category: 'Frenos',
        intervalKm: 60000,
        intervalMonths: null,
        notes: 'Por desgaste. Orientativo 40.000-70.000 km.',
      },
      {
        id: 'discos-freno',
        name: 'Discos de freno',
        category: 'Frenos',
        intervalKm: 80000,
        intervalMonths: null,
        notes: 'Normalmente al 2º juego de pastillas o al llegar al mínimo de espesor.',
      },
      // --- Fluidos ---
      {
        id: 'refrigerante',
        name: 'Refrigerante / anticongelante',
        category: 'Fluidos',
        intervalKm: 150000,
        intervalMonths: 60,
        notes:
          'Oficialmente "de por vida"; como buena práctica ~5 años / 150.000 km. G12++ (VW TL 774 G) rosa/violeta o G13 compatible, mezcla 50/50. Capacidad ~5 L.',
      },
      {
        id: 'aceite-caja',
        name: 'Aceite de caja de cambios manual',
        category: 'Fluidos',
        intervalKm: 120000,
        intervalMonths: null,
        notes:
          'Oficialmente "de por vida". Caja MQ200 / 0AF (5 vel.). Aceite VW G 052 171 A2, ~75W GL-4. Cantidad ≈ 2,0 L.',
      },
      // --- Neumáticos y otros ---
      {
        id: 'neumaticos',
        name: 'Neumáticos (sustitución)',
        category: 'Neumáticos y otros',
        intervalKm: null,
        intervalMonths: 72,
        notes:
          'Medida original 205/55 R16. Cambio recomendado a 6 años (máximo 10). Límite legal de banda 1,6 mm; mejor cambiar a 3 mm.',
      },
      {
        id: 'rotacion-neumaticos',
        name: 'Rotación de neumáticos',
        category: 'Neumáticos y otros',
        intervalKm: 10000,
        intervalMonths: null,
        notes: 'Para igualar el desgaste entre ejes.',
      },
      {
        id: 'bateria',
        name: 'Batería',
        category: 'Neumáticos y otros',
        intervalKm: null,
        intervalMonths: 60,
        notes:
          '12V, ~72 Ah, CCA ≥ 680 A (diésel). Vida típica 4-6 años. La variante Ecomotive Start/Stop requiere batería EFB/AGM.',
      },
      {
        id: 'escobillas',
        name: 'Escobillas limpiaparabrisas',
        category: 'Neumáticos y otros',
        intervalKm: null,
        intervalMonths: 12,
        notes: 'Sustituir por condición, aproximadamente cada año.',
      },
      // --- Inspección ---
      {
        id: 'dpf',
        name: 'Filtro de partículas (DPF/FAP)',
        category: 'Inspección',
        intervalKm: null,
        intervalMonths: null,
        notes:
          'Autorregenerable, sin aditivo (no lleva Eolys) y sin AdBlue. No tiene intervalo de sustitución. Clave para su vida: usar aceite 507 00 y permitir las regeneraciones (evitar solo trayectos cortos).',
      },
      {
        id: 'inspeccion-general',
        name: 'Inspección general (Inspektion)',
        category: 'Inspección',
        intervalKm: 30000,
        intervalMonths: 24,
        notes:
          'Revisión de frenos, suspensión, luces, niveles, bajos, escape/DPF y batería, con prueba en ruta.',
      },
    ],
    sources: [
      { label: 'Calculadora oficial de mantenimiento SEAT', url: 'https://calculadoramantenimiento.seat.es/' },
      { label: 'SEAT — Mantenimiento y garantía', url: 'https://www.seat.es/preguntas-frecuentes/clientes-posventa/mantenimiento-y-garantia' },
      { label: 'Manual SEAT Altea (definiciones de servicio QG0/QG1)', url: 'https://www.seat.es/datamanual-manual/altea/my09_w45/es-es/altea_ES.pdf' },
      { label: 'Especificación de aceite VW (oilspecifications.org)', url: 'https://www.oilspecifications.org/articles/vw_motor_oil_specifications_explained.php' },
      { label: 'Intervalos de distribución VW TDI (BlauParts)', url: 'https://www.blauparts.com/blog/vw-tdi-timing-belt-interval-chart.html' },
    ],
  },
  {
    id: 'voge',
    type: 'moto',
    name: 'Voge 500R',
    shortName: 'Voge 500R',
    subtitle: 'Bicilíndrico 471 cc · Refrigerado por líquido',
    year: 2020,
    accent: '#22c55e',
    plan: [
      // --- Rodaje ---
      {
        id: 'rodaje',
        name: 'Rodaje inicial y 1ª revisión (1.000 km)',
        category: 'Rodaje',
        intervalKm: null,
        intervalMonths: null,
        notes:
          'Conducción moderada los primeros 1.000 km. La primera revisión incluye cambio de aceite + filtro, ajuste de cadena, comprobación de mandos y apriete de tornillería. Operación única.',
      },
      // --- Motor ---
      {
        id: 'aceite-motor',
        name: 'Aceite motor + filtro',
        category: 'Motor',
        intervalKm: 4000,
        intervalMonths: 12,
        notes:
          'SAE 10W-40, API SL o superior, JASO MA2 (embrague húmedo). Cantidad ≈ 2,5 L con filtro (verificar por la mirilla). Conservador: 4.000 km / 1 año (el manual 500DS indica 5.000 y guías EN 6.000). 1er cambio a los 1.000 km.',
      },
      {
        id: 'valvulas',
        name: 'Holgura de válvulas (taqués)',
        category: 'Motor',
        intervalKm: 12000,
        intervalMonths: null,
        notes:
          'En frío: admisión 0,16 ± 0,03 mm; escape 0,27 ± 0,03 mm. Ajuste por pastillas (shim under bucket).',
      },
      {
        id: 'bujias',
        name: 'Bujías (sustitución)',
        category: 'Motor',
        intervalKm: 12000,
        intervalMonths: null,
        notes: 'Tipo OEM NGK CPR8EA-9, separación de electrodos 0,8-0,9 mm. Inspección cada 6.000 km.',
      },
      // --- Filtros ---
      {
        id: 'filtro-aire',
        name: 'Filtro de aire',
        category: 'Filtros',
        intervalKm: 12000,
        intervalMonths: null,
        notes:
          'Limpiar con aire comprimido periódicamente (cada ~6.000 km) y sustituir antes si se circula en zonas con polvo.',
      },
      {
        id: 'filtro-combustible',
        name: 'Filtro de combustible',
        category: 'Filtros',
        intervalKm: 18000,
        intervalMonths: null,
        notes: 'Protege los inyectores. Inspeccionar las líneas de combustible en cada servicio.',
      },
      {
        id: 'tuberia-combustible',
        name: 'Tubería de combustible',
        category: 'Filtros',
        intervalKm: null,
        intervalMonths: 48,
        notes: 'Sustitución preventiva cada 4 años; inspección en cada servicio.',
      },
      // --- Transmisión (cadena) ---
      {
        id: 'cadena-lubricar',
        name: 'Cadena — lubricación',
        category: 'Transmisión',
        intervalKm: 500,
        intervalMonths: null,
        notes: 'Lubricar cada 500 km y siempre tras circular bajo lluvia. Cadena con retenes (O-ring).',
      },
      {
        id: 'cadena-tension',
        name: 'Cadena — tensión y ajuste',
        category: 'Transmisión',
        intervalKm: 4000,
        intervalMonths: null,
        notes: 'Holgura 20-30 mm en el centro del tramo inferior. Comprobar en cada servicio.',
      },
      {
        id: 'cadena-sustitucion',
        name: 'Cadena — sustitución',
        category: 'Transmisión',
        intervalKm: 24000,
        intervalMonths: null,
        notes: 'Orientativo; sustituir junto con piñón y corona si están desgastados.',
      },
      // --- Frenos ---
      {
        id: 'liquido-frenos',
        name: 'Líquido de frenos (delantero y trasero)',
        category: 'Frenos',
        intervalKm: null,
        intervalMonths: 24,
        notes: 'DOT 4. Mismo intervalo en ambos circuitos. Inspeccionar nivel en cada servicio. Frenos Nissin + ABS Bosch.',
      },
      {
        id: 'pastillas',
        name: 'Pastillas de freno (inspección)',
        category: 'Frenos',
        intervalKm: 6000,
        intervalMonths: null,
        notes: 'Sustituir si el espesor < 2 mm o hay desgaste irregular.',
      },
      {
        id: 'latiguillos',
        name: 'Latiguillos / manguitos de freno',
        category: 'Frenos',
        intervalKm: null,
        intervalMonths: 48,
        notes: 'Sustitución preventiva cada 4 años.',
      },
      // --- Fluidos ---
      {
        id: 'refrigerante',
        name: 'Líquido refrigerante',
        category: 'Fluidos',
        intervalKm: 40000,
        intervalMonths: 24,
        notes:
          'Etilenglicol, punto de congelación -45 °C. Capacidad ≈ 1,3 L (verificar). Comprobar nivel periódicamente.',
      },
      // --- Neumáticos y chasis ---
      {
        id: 'neumaticos-presion',
        name: 'Neumáticos — presiones y estado',
        category: 'Neumáticos y chasis',
        intervalKm: null,
        intervalMonths: null,
        notes:
          'Delantero 2,2 bar (~32 psi), trasero 2,5 bar (~36 psi); 2,5 bar delante con carga o 2 pasajeros. Medidas: delantero 120/70-17, trasero 160/60-17. Comprobar regularmente.',
      },
      {
        id: 'embrague',
        name: 'Embrague (ajuste de cable)',
        category: 'Neumáticos y chasis',
        intervalKm: 4000,
        intervalMonths: null,
        notes: 'Juego libre de la maneta 2-4 mm. Comprobar/ajustar en cada servicio.',
      },
      {
        id: 'bateria',
        name: 'Batería',
        category: 'Neumáticos y chasis',
        intervalKm: null,
        intervalMonths: null,
        notes:
          'Sin mantenimiento (libre). Comprobar mensualmente. Desconectar el borne negativo si no se usa varios días.',
      },
      {
        id: 'inspeccion-general',
        name: 'Apriete de tornillería e inspección general',
        category: 'Neumáticos y chasis',
        intervalKm: 4000,
        intervalMonths: null,
        notes:
          'Revisar el apriete de tuercas/tornillos del chasis al par especificado, suspensión, dirección, caballete lateral, luces y mandos.',
      },
    ],
    sources: [
      { label: 'Manual de usuario oficial VOGE 500R (ES)', url: 'https://vogeargentina.com.ar/descargas/VOGE_500R_MANUAL_DE_USUARIO.pdf' },
      { label: 'Manual VOGE 500DS (ManualsLib)', url: 'https://www.manualslib.com/manual/1881620/Voge-500ds.html' },
      { label: 'Guía de mantenimiento Loncin/Voge 500R', url: 'https://erwinsalarda.com/loncin-voge-500r-maintenance-schedule-guide/' },
      { label: 'Mantenimiento básico VOGE (Quadis)', url: 'https://quadismotostore.es/blog/mantenimiento-basico-para-tu-moto-voge-consejos-y-trucos/' },
      { label: 'Ficha técnica VOGE 500R 2020 (1000PS)', url: 'https://www.1000ps.com/en-us/model/10239/voge-500r/2020' },
    ],
  },
]
