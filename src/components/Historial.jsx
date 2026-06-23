import { useMemo } from 'react'
import { formatKm, formatDate, formatMoney } from '../lib/maintenance'

export default function Historial({ vehicle, records, onDelete }) {
  const taskName = useMemo(
    () => Object.fromEntries(vehicle.plan.map((t) => [t.id, t.name])),
    [vehicle],
  )

  const sorted = useMemo(
    () => [...records].sort((a, b) => new Date(b.date) - new Date(a.date) || (b.km || 0) - (a.km || 0)),
    [records],
  )

  const total = records.reduce((sum, r) => sum + (Number(r.cost) || 0), 0)
  const thisYear = new Date().getFullYear()
  const totalYear = records
    .filter((r) => new Date(r.date).getFullYear() === thisYear)
    .reduce((sum, r) => sum + (Number(r.cost) || 0), 0)

  if (records.length === 0) {
    return (
      <div className="view">
        <div className="empty">
          <span className="empty-emoji">🧾</span>
          <p>Aún no hay mantenimientos registrados.</p>
          <p className="muted small">Añade el primero desde la pestaña «Registrar».</p>
        </div>
      </div>
    )
  }

  return (
    <div className="view">
      <div className="cost-cards">
        <div className="cost-card">
          <span className="cost-n">{formatMoney(totalYear)}</span>
          <span className="cost-label">Gastado en {thisYear}</span>
        </div>
        <div className="cost-card">
          <span className="cost-n">{formatMoney(total)}</span>
          <span className="cost-label">Total histórico</span>
        </div>
      </div>

      <ul className="history-list">
        {sorted.map((r) => (
          <li key={r.id} className="history-item">
            <div className="history-main">
              <p className="history-name">{taskName[r.taskId] || 'Operación'}</p>
              <p className="history-meta">
                {formatDate(r.date)} · {formatKm(r.km)}
                {r.cost > 0 && <span className="history-cost"> · {formatMoney(r.cost)}</span>}
              </p>
              {r.notes && <p className="history-notes">{r.notes}</p>}
            </div>
            <button
              className="btn-del"
              aria-label="Eliminar registro"
              onClick={() => onDelete(r.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
