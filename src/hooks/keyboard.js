import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const useKeyboard = (eager = false) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onShow = () => setVisible(true)
    const onHide = () => setVisible(false)

    Keyboard.addListener(eager ? 'keyboardWillShow' : 'keyboardDidShow', onShow)
    Keyboard.addListener(eager ? 'keyboardWillHide' : 'keyboardDidHide', onHide)

    return () => {
      Keyboard.removeListener(
        eager ? 'keyboardWillShow' : 'keyboardDidShow',
        onShow
      )
      Keyboard.removeListener(
        eager ? 'keyboardWillHide' : 'keyboardDidHide',
        onHide
      )
    }
  }, [eager])

  return visible
}
