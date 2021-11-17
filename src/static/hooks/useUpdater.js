import { useState } from 'react'

export default function useUpdater () {
  const [updater, setUpdater] = useState(false)
  const update = () => setUpdater(!updater)
  return [updater, update]
}
