// Ilustraciones vectoriales propias (siluetas) de los vehículos.
// Se usan como fondo del banner, en negro con el brillo del color del vehículo.
// No son fotos: evitan problemas de copyright y encajan con el estilo "cabina digital".

export default function VehicleArt({ type, className }) {
  return type === 'car' ? (
    <CarArt className={className} />
  ) : (
    <BikeArt className={className} />
  )
}

function CarArt({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Carrocería (monovolumen / familiar) */}
      <path
        d="M16 104 L16 82 C16 74 20 69 30 67 L62 62 L82 38 C85 33 90 31 98 31 L182 31 C190 31 195 34 199 41 L214 62 L246 67 C256 69 262 75 262 84 L262 104 L236 104 A24 22 0 0 0 178 104 L96 104 A24 22 0 0 0 38 104 Z"
        fill="url(#carBody)"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      {/* Cristales */}
      <path
        d="M90 40 L98 36 L134 36 L134 60 L78 60 Z M140 36 L176 36 C181 36 184 38 187 43 L196 60 L140 60 Z"
        fill="currentColor"
        fillOpacity="0.16"
      />
      {/* Línea de puerta */}
      <path d="M134 60 L134 100" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
      {/* Faro */}
      <circle cx="30" cy="74" r="4" fill="var(--accent)" />
      {/* Ruedas */}
      <g>
        <circle cx="67" cy="104" r="23" fill="#0c0e13" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="67" cy="104" r="11" fill="none" stroke="var(--accent)" strokeWidth="3" />
        <circle cx="207" cy="104" r="23" fill="#0c0e13" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="207" cy="104" r="11" fill="none" stroke="var(--accent)" strokeWidth="3" />
      </g>
      <defs>
        <linearGradient id="carBody" x1="0" y1="31" x2="0" y2="104" gradientUnits="userSpaceOnUse">
          <stop stopColor="#23262f" />
          <stop offset="1" stopColor="#0c0e13" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function BikeArt({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cuerpo: depósito, asiento y colín */}
      <path
        d="M70 96 C66 80 74 70 92 66 L150 58 C160 56 168 58 176 64 L196 60 C204 59 206 64 200 70 L182 80 C174 86 162 90 150 91 L104 96 C92 98 80 100 70 96 Z"
        fill="url(#bikeBody)"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      {/* Colín trasero */}
      <path d="M62 78 L92 70 L96 80 L70 90 Z" fill="#15171e" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Horquilla delantera */}
      <path d="M176 66 L214 102 L208 106 L168 72 Z" fill="#1a1d24" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Basculante trasero */}
      <path d="M86 92 L56 104 L60 110 L92 98 Z" fill="#1a1d24" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Carenado / faro */}
      <path d="M196 60 C206 58 210 64 206 72 L194 70 Z" fill="var(--accent)" fillOpacity="0.85" />
      {/* Escape */}
      <path d="M150 90 L96 100 L96 106 L150 98 Z" fill="#15171e" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      {/* Ruedas */}
      <g>
        <circle cx="56" cy="106" r="26" fill="#0c0e13" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="56" cy="106" r="12" fill="none" stroke="var(--accent)" strokeWidth="3" />
        <circle cx="214" cy="106" r="26" fill="#0c0e13" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="214" cy="106" r="12" fill="none" stroke="var(--accent)" strokeWidth="3" />
      </g>
      <defs>
        <linearGradient id="bikeBody" x1="0" y1="58" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#23262f" />
          <stop offset="1" stopColor="#0c0e13" />
        </linearGradient>
      </defs>
    </svg>
  )
}
