import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from './supabase'

/**
 * Datos del garaje guardados en Supabase (tablas vehicle_state y
 * maintenance_records), ligados al usuario autenticado mediante RLS.
 *
 * Estructura en memoria por vehículo:
 *   { currentKm: number, records: [{ id, taskId, date, km, cost, notes }] }
 */
export function useGarage(userId) {
  const [store, setStore] = useState({})
  const [loading, setLoading] = useState(true)
  const storeRef = useRef(store)
  storeRef.current = store

  const reload = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const [{ data: states }, { data: records }] = await Promise.all([
      supabase.from('vehicle_state').select('*').eq('user_id', userId),
      supabase
        .from('maintenance_records')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false }),
    ])

    const next = {}
    const ensure = (vid) => (next[vid] ||= { currentKm: 0, records: [] })
    for (const s of states || []) ensure(s.vehicle_id).currentKm = s.current_km || 0
    for (const r of records || []) {
      ensure(r.vehicle_id).records.push({
        id: r.id,
        taskId: r.task_id,
        date: r.date,
        km: r.km,
        cost: Number(r.cost) || 0,
        notes: r.notes || '',
      })
    }
    setStore(next)
    setLoading(false)
  }, [userId])

  useEffect(() => {
    if (userId) reload()
    else {
      setStore({})
      setLoading(false)
    }
  }, [userId, reload])

  const getVehicle = useCallback(
    (vehicleId) => store[vehicleId] || { currentKm: 0, records: [] },
    [store],
  )

  const setCurrentKm = useCallback(
    async (vehicleId, km) => {
      const value = Number(km) || 0
      setStore((prev) => {
        const v = prev[vehicleId] || { currentKm: 0, records: [] }
        return { ...prev, [vehicleId]: { ...v, currentKm: value } }
      })
      await supabase
        .from('vehicle_state')
        .upsert(
          { user_id: userId, vehicle_id: vehicleId, current_km: value },
          { onConflict: 'user_id,vehicle_id' },
        )
    },
    [userId],
  )

  const addRecord = useCallback(
    async (vehicleId, record) => {
      const km = Number(record.km) || 0
      const { data, error } = await supabase
        .from('maintenance_records')
        .insert({
          user_id: userId,
          vehicle_id: vehicleId,
          task_id: record.taskId,
          date: record.date,
          km,
          cost: Number(record.cost) || 0,
          notes: (record.notes || '').trim(),
        })
        .select()
        .single()

      if (error) {
        // eslint-disable-next-line no-console
        console.error('No se pudo guardar el mantenimiento:', error.message)
        return
      }

      const prevKm = storeRef.current[vehicleId]?.currentKm || 0
      const newKm = Math.max(prevKm, km)

      setStore((prev) => {
        const v = prev[vehicleId] || { currentKm: 0, records: [] }
        const mapped = {
          id: data.id,
          taskId: data.task_id,
          date: data.date,
          km: data.km,
          cost: Number(data.cost) || 0,
          notes: data.notes || '',
        }
        return {
          ...prev,
          [vehicleId]: { currentKm: newKm, records: [mapped, ...v.records] },
        }
      })

      if (newKm > prevKm) {
        await supabase
          .from('vehicle_state')
          .upsert(
            { user_id: userId, vehicle_id: vehicleId, current_km: newKm },
            { onConflict: 'user_id,vehicle_id' },
          )
      }
    },
    [userId],
  )

  const deleteRecord = useCallback(async (vehicleId, recordId) => {
    setStore((prev) => {
      const v = prev[vehicleId]
      if (!v) return prev
      return { ...prev, [vehicleId]: { ...v, records: v.records.filter((r) => r.id !== recordId) } }
    })
    await supabase.from('maintenance_records').delete().eq('id', recordId)
  }, [])

  return { getVehicle, setCurrentKm, addRecord, deleteRecord, loading }
}
