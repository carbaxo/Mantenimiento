import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'mantenimiento-garaje-v1'

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* almacenamiento lleno o no disponible */
  }
}

/**
 * Estado por vehículo:
 *   { currentKm: number, records: [{ id, taskId, date, km, cost, notes }] }
 */
export function useGarage() {
  const [store, setStore] = useState(readStore)

  useEffect(() => {
    writeStore(store)
  }, [store])

  // Sincroniza entre pestañas del navegador
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setStore(readStore())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const getVehicle = useCallback(
    (vehicleId) => store[vehicleId] || { currentKm: 0, records: [] },
    [store],
  )

  const setCurrentKm = useCallback((vehicleId, km) => {
    setStore((prev) => {
      const v = prev[vehicleId] || { currentKm: 0, records: [] }
      return { ...prev, [vehicleId]: { ...v, currentKm: Number(km) || 0 } }
    })
  }, [])

  const addRecord = useCallback((vehicleId, record) => {
    setStore((prev) => {
      const v = prev[vehicleId] || { currentKm: 0, records: [] }
      const newRecord = { id: crypto.randomUUID(), ...record }
      // Si el registro tiene un km mayor que el actual, actualizamos el odómetro
      const km = Number(record.km) || 0
      return {
        ...prev,
        [vehicleId]: {
          currentKm: Math.max(v.currentKm, km),
          records: [...v.records, newRecord],
        },
      }
    })
  }, [])

  const deleteRecord = useCallback((vehicleId, recordId) => {
    setStore((prev) => {
      const v = prev[vehicleId]
      if (!v) return prev
      return {
        ...prev,
        [vehicleId]: {
          ...v,
          records: v.records.filter((r) => r.id !== recordId),
        },
      }
    })
  }, [])

  return { getVehicle, setCurrentKm, addRecord, deleteRecord }
}
