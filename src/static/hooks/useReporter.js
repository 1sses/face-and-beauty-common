import { useState } from 'react'

export default function useReporter () {
  const [content, setContent] = useState('')
  const [alert, setAlert] = useState(false)
  const [visible, setVisible] = useState(false)
  const showReporter = (content, alert) => {
    setVisible(true)
    setAlert(alert)
    setContent(content)
    setTimeout(() => setVisible(false), 5000)
  }
  const closeHandler = () => {
    setVisible(false)
  }
  return { content, alert, visible, closeHandler, showReporter }
}
