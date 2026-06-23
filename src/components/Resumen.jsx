import { sortByUrgency, LEVEL_LABEL, formatKm, formatDate } from '../lib/maintenance'

export default function Resumen({ statuses, vehicle, currentKm }) {
  const sorted = sortByUrgency(statuses)
  const overdue = sorted.filter((s) => s.level === 'overdue')
  const soon = sorted.filter((s) => s.level === 'soon')
  const unknown = sorted.filter((s) => s.level === 'unknown')

  const counts = {
    overdue: overdue.length,
    soon: soon.length,
    ok: sorted.filter((s) => s.level === 'ok').length,
    unknown: unknown.length,
  }

  return (
    <div className="view">
      <div className="summary-cards">
        <SummaryCard n={counts.overdue} label="Vencidos" tone="overdue" />
        <SummaryCard n={counts.soon} label="Pronto" tone="soon" />
        <SummaryCard n={counts.ok} label="Al día" tone="ok" />
        <SummaryCard n={counts.unknown} label="Sin registro" tone="unknown" />
      </div>

      {overdue.length === 0 && soon.length === 0 ? (
        <div className="empty good">
          <span className="empty-emoji">✅</span>
          <p>Nada urgente. {counts.unknown > 0 && `Registra mantenimientos para afinar los avisos.`}</p>
        </div>
      ) : (
        <>
          {overdue.length > 0 && (
            <Section title="Vencido — hazlo ya" items={overdue} currentKm={currentKm} />
          )}
          {soon.length > 0 && (
            <Section title="Próximamente" items={soon} currentKm={currentKm} />
          )}
        </>
      )}

      {unknown.length > 0 && (
        <details className="unknown-block">
          <summary>{unknown.length} operaciones sin registro previo</summary>
          <p className="muted small">
            Registra la última vez que se hicieron (en la pestaña «Registrar») para que la app
            calcule cuándo toca la próxima.
          </p>
          <ul className="plain-list">
            {unknown.map((s) => (
              <li key={s.task.id}>{s.task.name}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}

function SummaryCard({ n, label, tone }) {
  return (
    <div className={'sum-card ' + tone}>
      <span className="sum-n">{n}</span>
      <span className="sum-label">{label}</span>
    </div>
  )
}

function Section({ title, items, currentKm }) {
  return (
    <section className="alert-section">
      <h3>{title}</h3>
      <ul className="alert-list">
        {items.map((s) => (
          <li key={s.task.id} className={'alert-item ' + s.level}>
            <div className="alert-main">
              <span className="dot" />
              <div>
                <p className="alert-name">{s.task.name}</p>
                <p className="alert-meta">
                  {s.dueKm != null && (
                    <span>
                      Toca a {formatKm(s.dueKm)}
                      {s.kmRemaining != null && (
                        <em>
                          {' '}
                          ({s.kmRemaining <= 0
                            ? `${formatKm(-s.kmRemaining)} pasados`
                            : `faltan ${formatKm(s.kmRemaining)}`})
                        </em>
                      )}
                    </span>
                  )}
                  {s.dueDate && (
                    <span>
                      {s.dueKm != null ? ' · ' : ''}
                      {formatDate(s.dueDate)}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <span className={'badge ' + s.level}>{LEVEL_LABEL[s.level]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
