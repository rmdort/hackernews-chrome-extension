import React, { useState, useEffect, useCallback } from 'react'

type valueType = string | null
type initialValueType = any | null
export type setStateType = (arg: any) => void

function useLocalStorage(
  key: string,
  initialValue: initialValueType
): [any, setStateType] {
  const getValue = (key: string) => {
    try {
      const value: valueType = localStorage.getItem(key)
      if (typeof value !== 'string') {
        if (initialValue !== void 0) {
          localStorage.setItem(key, initialValue)
        }
        return initialValue
      } else {
        return JSON.parse(value)
      }
    } catch (err) {
      return initialValue
    }
  }

  const [state, setState] = useState(() => getValue(key))

  useEffect(() => {
    const value = getValue(key)
    setState(value)
  }, [key])

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      console.error('Error saving in localstorage')
    }
  }, [state])

  return [state, setState]
}

export default useLocalStorage
