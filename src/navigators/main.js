import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { Hero } from '../scenes/hero'
import { Home } from '../scenes/home'

const { Navigator, Screen } = createStackNavigator()

export const MainNavigator = () => {
  const { width } = useSafeAreaFrame()

  return (
    <Navigator headerMode="none">
      <Screen component={Home} name="Home" />
      <Screen
        component={Hero}
        name="Hero"
        options={{
          gestureResponseDistance: {
            horizontal: width
          }
        }}
      />
    </Navigator>
  )
}
