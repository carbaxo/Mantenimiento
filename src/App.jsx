import { useMemo, useState } from 'react'
import { VEHICLES } from './data/vehicles'
import { useGarage } from './lib/storage'
import { buildStatuses } from './lib/maintenance'
import Resumen from './components/Resumen'
import Plan from './components/Plan'
import Registrar from './components/Registrar'
import Historial from './components/Historial'

const TABS = [
  { id: 'resumen', label: 'Resumen', icon: '🔔' },
  { id: 'plan', label: 'Plan', icon: '📋' },
  { id: 'registrar', label: 'Registrar', icon: '➕' },
  { id: 'historial', label: 'Historial', icon: '🧾' },
]

export default function App() {
  const [vehicleId, setVehicleId] = useState(VEHICLES[0].id)
  const [tab, setTab] = useState('resumen')
  const garage = useGarage()

  const vehicle = VEHICLES.find((v) => v.id === vehicleId)
  const state = garage.getVehicle(vehicleId)

  const statuses = useMemo(
    () => buildStatuses(vehicle.plan, state.records, state.currentKm),
    [vehicle, state.records, state.currentKm],
  )

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">⚙️</span>
          <div>
            <h1>Garaje</h1>
            <p>Mantenimiento al día</p>
          </div>
        </div>
        <div className="vehicle-switch" role="tablist" aria-label="Vehículo">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              className={'veh-chip' + (v.id === vehicleId ? ' active' : '')}
              onClick={() => setVehicleId(v.id)}
            >
              <span className="veh-emoji">{v.type === 'car' ? '🚗' : '🏍️'}</span>
              <span className="veh-name">{v.shortName}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="vehicle-banner" style={{ '--accent': vehicle.accent }}>
        <div>
          <h2>{vehicle.name}</h2>
          <p className="muted">{vehicle.subtitle} · {vehicle.year}</p>
        </div>
        <KmEditor
          km={state.currentKm}
          onSave={(km) => garage.setCurrentKm(vehicleId, km)}
        />
      </div>

      <main className="content">
        {tab === 'resumen' && <Resumen statuses={statuses} vehicle={vehicle} currentKm={state.currentKm} />}
        {tab === 'plan' && <Plan vehicle={vehicle} statuses={statuses} />}
        {tab === 'registrar' && (
          <Registrar
            vehicle={vehicle}
            currentKm={state.currentKm}
            onAdd={(rec) => {
              garage.addRecord(vehicleId, rec)
              setTab('historial')
            }}
          />
        )}
        {tab === 'historial' && (
          <Historial
            vehicle={vehicle}
            records={state.records}
            onDelete={(id) => garage.deleteRecord(vehicleId, id)}
          />
        )}
      </main>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={'tab' + (t.id === tab ? ' active' : '')}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function KmEditor({ km, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(km)

  if (!editing) {
    return (
      <button className="km-display" onClick={() => { setValue(km); setEditing(true) }}>
        <span className="km-value">{new Intl.NumberFormat('es-ES').format(km)}</span>
        <span className="km-unit">km actuales · editar</span>
      </button>
    )
  }

  return (
    <form
      className="km-edit"
      onSubmit={(e) => { e.preventDefault(); onSave(value); setEditing(false) }}
    >
      <input
        type="number"
        inputMode="numeric"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn-mini">OK</button>
    </form>
  )
}
