import { useState } from 'react'

export default function useLoader () {
  const [loader, setLoader] = useState(true)
  const startLoading = () => setLoader(true)
  const endLoading = () => setLoader(false)
  return [loader, endLoading, startLoading]
}
