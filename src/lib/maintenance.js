// Lógica para calcular el estado de cada operación de mantenimiento.

const MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.44

export function monthsBetween(dateA, dateB) {
  return (dateB.getTime() - dateA.getTime()) / MS_PER_MONTH
}

/**
 * Devuelve el último registro (mayor km / fecha más reciente) de una tarea.
 */
export function lastRecordForTask(records, taskId) {
  const matches = records
    .filter((r) => r.taskId === taskId)
    .sort((a, b) => (b.km || 0) - (a.km || 0) || new Date(b.date) - new Date(a.date))
  return matches[0] || null
}

/**
 * Calcula el estado de una tarea: próximo km/fecha y nivel (ok / pronto / vencido / sin-datos).
 */
export function taskStatus(task, last, currentKm, today = new Date()) {
  const result = {
    task,
    last,
    dueKm: null,
    dueDate: null,
    kmRemaining: null,
    monthsRemaining: null,
    level: 'unknown', // unknown | ok | soon | overdue
  }

  if (!last) {
    result.level = 'unknown'
    return result
  }

  let worstByKm = null
  let worstByTime = null

  if (task.intervalKm && last.km != null) {
    result.dueKm = last.km + task.intervalKm
    result.kmRemaining = result.dueKm - currentKm
    const ratio = result.kmRemaining / task.intervalKm
    worstByKm = ratio <= 0 ? 'overdue' : ratio <= 0.1 ? 'soon' : 'ok'
  }

  if (task.intervalMonths && last.date) {
    const lastDate = new Date(last.date)
    result.dueDate = new Date(lastDate.getTime() + task.intervalMonths * MS_PER_MONTH)
    result.monthsRemaining = monthsBetween(today, result.dueDate)
    const ratio = result.monthsRemaining / task.intervalMonths
    worstByTime = ratio <= 0 ? 'overdue' : ratio <= 0.15 ? 'soon' : 'ok'
  }

  const levels = [worstByKm, worstByTime].filter(Boolean)
  if (levels.includes('overdue')) result.level = 'overdue'
  else if (levels.includes('soon')) result.level = 'soon'
  else if (levels.includes('ok')) result.level = 'ok'
  else result.level = 'unknown'

  return result
}

export function buildStatuses(plan, records, currentKm, today = new Date()) {
  return plan.map((task) => {
    const last = lastRecordForTask(records, task.id)
    return taskStatus(task, last, currentKm, today)
  })
}

const LEVEL_ORDER = { overdue: 0, soon: 1, unknown: 2, ok: 3 }

export function sortByUrgency(statuses) {
  return [...statuses].sort((a, b) => {
    const d = LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]
    if (d !== 0) return d
    const ka = a.kmRemaining ?? Infinity
    const kb = b.kmRemaining ?? Infinity
    return ka - kb
  })
}

export const LEVEL_LABEL = {
  overdue: 'Vencido',
  soon: 'Pronto',
  ok: 'Al día',
  unknown: 'Sin registro',
}

export function formatKm(n) {
  if (n == null) return '—'
  return new Intl.NumberFormat('es-ES').format(Math.round(n)) + ' km'
}

export function formatDate(d) {
  if (!d) return '—'
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatMoney(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n || 0)
}
