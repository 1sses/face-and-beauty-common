import useInput from './useInput'
import React, { useState } from 'react'

export default function usePersonalEdit (initial) {
  const [value, valueHandler] = useInput(initial)
  const [edit, setEdit] = useState(false)
  const clickHandler = () => setEdit(!edit)
  const signHandler = () => edit ? <i className="far fa-save" /> : <i className="far fa-edit"/>
  return [value, valueHandler, edit, clickHandler, signHandler]
}
