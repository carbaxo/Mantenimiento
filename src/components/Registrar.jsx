import { useState } from 'react'

export default function Registrar({ vehicle, currentKm, onAdd }) {
  const today = new Date().toISOString().slice(0, 10)
  const [taskId, setTaskId] = useState(vehicle.plan[0].id)
  const [date, setDate] = useState(today)
  const [km, setKm] = useState(currentKm || '')
  const [cost, setCost] = useState('')
  const [notes, setNotes] = useState('')

  const categories = [...new Set(vehicle.plan.map((t) => t.category))]

  const submit = (e) => {
    e.preventDefault()
    onAdd({
      taskId,
      date,
      km: Number(km) || 0,
      cost: Number(cost) || 0,
      notes: notes.trim(),
    })
  }

  return (
    <div className="view">
      <form className="form" onSubmit={submit}>
        <label className="field">
          <span>Operación realizada</span>
          <select value={taskId} onChange={(e) => setTaskId(e.target.value)}>
            {categories.map((cat) => (
              <optgroup key={cat} label={cat}>
                {vehicle.plan
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
              </optgroup>
            ))}
          </select>
        </label>

        <div className="field-row">
          <label className="field">
            <span>Fecha</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label className="field">
            <span>Kilómetros</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={km}
              onChange={(e) => setKm(e.target.value)}
            />
          </label>
        </div>

        <label className="field">
          <span>Coste (€)</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            placeholder="0,00"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Notas (taller, marca de aceite, etc.)</span>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Opcional"
          />
        </label>

        <button type="submit" className="btn-primary">Guardar mantenimiento</button>
      </form>
    </div>
  )
}
