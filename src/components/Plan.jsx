import { useState } from 'react'
import { LEVEL_LABEL, formatKm, formatDate } from '../lib/maintenance'

function intervalText(task) {
  const parts = []
  if (task.intervalKm) parts.push(formatKm(task.intervalKm))
  if (task.intervalMonths) {
    parts.push(
      task.intervalMonths % 12 === 0
        ? `${task.intervalMonths / 12} año${task.intervalMonths / 12 > 1 ? 's' : ''}`
        : `${task.intervalMonths} meses`,
    )
  }
  if (parts.length === 0) return 'Según inspección'
  return parts.join(' o ')
}

export default function Plan({ vehicle, statuses }) {
  const categories = [...new Set(vehicle.plan.map((t) => t.category))]
  const [open, setOpen] = useState(categories[0])
  const statusById = Object.fromEntries(statuses.map((s) => [s.task.id, s]))

  return (
    <div className="view">
      <p className="muted small intro">
        Plan de mantenimiento de referencia. Toca una operación para ver detalles y especificaciones.
      </p>
      {categories.map((cat) => {
        const tasks = vehicle.plan.filter((t) => t.category === cat)
        const isOpen = open === cat
        return (
          <section key={cat} className="cat-block">
            <button className="cat-head" onClick={() => setOpen(isOpen ? null : cat)}>
              <span>{cat}</span>
              <span className="cat-count">{tasks.length}</span>
              <span className={'chev' + (isOpen ? ' open' : '')}>›</span>
            </button>
            {isOpen && (
              <ul className="task-list">
                {tasks.map((t) => (
                  <TaskRow key={t.id} task={t} status={statusById[t.id]} />
                ))}
              </ul>
            )}
          </section>
        )
      })}
      {vehicle.sources?.length > 0 && (
        <details className="sources">
          <summary>Fuentes consultadas</summary>
          <ul>
            {vehicle.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}

function TaskRow({ task, status }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="task-row">
      <button className="task-head" onClick={() => setOpen(!open)}>
        <span className={'dot ' + (status?.level || 'unknown')} />
        <span className="task-name">{task.name}</span>
        <span className="task-interval">{intervalText(task)}</span>
      </button>
      {open && (
        <div className="task-detail">
          {task.notes && <p>{task.notes}</p>}
          <dl>
            {status?.last && (
              <>
                <dt>Último registrado</dt>
                <dd>{formatKm(status.last.km)} · {formatDate(status.last.date)}</dd>
              </>
            )}
            {status?.dueKm != null && (
              <>
                <dt>Próximo</dt>
                <dd>{formatKm(status.dueKm)}</dd>
              </>
            )}
            {status?.dueDate && (
              <>
                <dt>Fecha límite</dt>
                <dd>{formatDate(status.dueDate)}</dd>
              </>
            )}
            {status && (
              <>
                <dt>Estado</dt>
                <dd><span className={'badge ' + status.level}>{LEVEL_LABEL[status.level]}</span></dd>
              </>
            )}
          </dl>
        </div>
      )}
    </li>
  )
}
