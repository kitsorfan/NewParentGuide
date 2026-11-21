import { usePersistentState } from './usePersistentState'

export const BIRTH_DATE_STORAGE_KEY = 'npg.birthDate'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function parseBirthDate(raw: unknown): string | undefined {
  return typeof raw === 'string' && ISO_DATE.test(raw) ? raw : undefined
}

/** The baby's (expected) birth date as `YYYY-MM-DD`, remembered in the browser. */
export function useBirthDate(): [string | undefined, (date: string | undefined) => void] {
  const [date, setDate] = usePersistentState<string | undefined>(
    BIRTH_DATE_STORAGE_KEY,
    undefined,
    parseBirthDate,
  )
  return [date, (next) => setDate(next && ISO_DATE.test(next) ? next : undefined)]
}
