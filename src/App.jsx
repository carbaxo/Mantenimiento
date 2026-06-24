import { useMemo, useState } from 'react'
import { VEHICLES } from './data/vehicles'
import { useGarage } from './lib/storage'
import { useAuth } from './lib/auth'
import { buildStatuses } from './lib/maintenance'
import Login from './components/Login'
import VehicleArt from './components/VehicleArt'
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
  const { user, loading: authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="splash">
        <div className="spinner" />
      </div>
    )
  }

  if (!user) return <Login />

  return <Garage user={user} />
}

function Garage({ user }) {
  const [vehicleId, setVehicleId] = useState(VEHICLES[0].id)
  const [tab, setTab] = useState('resumen')
  const { signOut } = useAuth()
  const garage = useGarage(user.id)

  const vehicle = VEHICLES.find((v) => v.id === vehicleId)
  const state = garage.getVehicle(vehicleId)

  const statuses = useMemo(
    () => buildStatuses(vehicle.plan, state.records, state.currentKm),
    [vehicle, state.records, state.currentKm],
  )

  const brand = (
    <div className="brand">
      <span className="brand-mark">⚙️</span>
      <div className="brand-text">
        <h1>Garaje</h1>
        <p>Mantenimiento al día</p>
      </div>
    </div>
  )

  return (
    <div className="app" style={{ '--accent': vehicle.accent }}>
      {/* Barra lateral (escritorio) */}
      <aside className="sidebar">
        {brand}
        <VehicleSwitch vehicles={VEHICLES} current={vehicleId} onSelect={setVehicleId} />
        <nav className="side-nav" role="tablist" aria-label="Secciones">
          <NavTabs tabs={TABS} current={tab} onSelect={setTab} />
        </nav>
        <div className="sidebar-foot">
          <UserMenu user={user} onSignOut={signOut} placement="up" />
        </div>
      </aside>

      {/* Barra superior (móvil) */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">⚙️</span>
          <div className="brand-text">
            <h1>Garaje</h1>
            <p>Mantenimiento al día</p>
          </div>
          <UserMenu user={user} onSignOut={signOut} />
        </div>
        <VehicleSwitch vehicles={VEHICLES} current={vehicleId} onSelect={setVehicleId} />
      </header>

      <div className="main">
        <div className="vehicle-banner">
          <VehicleArt type={vehicle.type} className="banner-art" />
          <div className="banner-info">
            <span className="banner-eyebrow">{vehicle.type === 'car' ? 'Coche' : 'Moto'} · {vehicle.year}</span>
            <h2>{vehicle.name}</h2>
            <p className="muted">{vehicle.subtitle}</p>
          </div>
          <KmEditor
            km={state.currentKm}
            onSave={(km) => garage.setCurrentKm(vehicleId, km)}
          />
        </div>

        <main className="content">
          {garage.loading ? (
            <div className="loading-block"><div className="spinner" /><p className="muted small">Cargando tus datos…</p></div>
          ) : (
            <>
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
            </>
          )}
        </main>
      </div>

      {/* Pestañas inferiores (móvil) */}
      <nav className="tabbar" role="tablist" aria-label="Secciones">
        <NavTabs tabs={TABS} current={tab} onSelect={setTab} />
      </nav>
    </div>
  )
}

function VehicleSwitch({ vehicles, current, onSelect }) {
  return (
    <div className="vehicle-switch" role="tablist" aria-label="Vehículo">
      {vehicles.map((v) => (
        <button
          key={v.id}
          className={'veh-chip' + (v.id === current ? ' active' : '')}
          onClick={() => onSelect(v.id)}
        >
          <span className="veh-emoji">{v.type === 'car' ? '🚗' : '🏍️'}</span>
          <span className="veh-name">{v.shortName}</span>
        </button>
      ))}
    </div>
  )
}

function NavTabs({ tabs, current, onSelect }) {
  return tabs.map((t) => (
    <button
      key={t.id}
      className={'tab' + (t.id === current ? ' active' : '')}
      onClick={() => onSelect(t.id)}
    >
      <span className="tab-icon">{t.icon}</span>
      <span className="tab-label">{t.label}</span>
    </button>
  ))
}

function UserMenu({ user, onSignOut, placement = 'down' }) {
  const [open, setOpen] = useState(false)
  const avatar = user.user_metadata?.avatar_url
  const name = user.user_metadata?.full_name || user.email

  return (
    <div className={'user-menu' + (placement === 'up' ? ' wide' : '')}>
      <button className="user-btn" onClick={() => setOpen(!open)} aria-label="Cuenta">
        {avatar ? <img src={avatar} alt="" /> : <span className="user-initial">{(name || '?')[0].toUpperCase()}</span>}
        {placement === 'up' && <span className="user-btn-name">{name}</span>}
      </button>
      {open && (
        <>
          <div className="user-backdrop" onClick={() => setOpen(false)} />
          <div className={'user-pop' + (placement === 'up' ? ' up' : '')}>
            <p className="user-name">{name}</p>
            {user.email && name !== user.email && <p className="user-email">{user.email}</p>}
            <button className="signout-btn" onClick={onSignOut}>Cerrar sesión</button>
          </div>
        </>
      )}
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
