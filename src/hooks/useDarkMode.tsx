import React from 'react'
import useLocalStorage from './useLocalStorage'

const KEY_DARK_MODE = 'hn_dark_mode'

function useDarkMode(initialValue: boolean) {
  return useLocalStorage(KEY_DARK_MODE, initialValue)
}

export default useDarkMode
