import 'react-native-gesture-handler'

import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Loading } from './src/components/loading'
import { MainNavigator } from './src/navigators/main'

const Dota = () => {
  const [loaded] = useFonts({
    Radiance: require('./src/assets/fonts/radiance.ttf'),
    'Radiance SemiBold': require('./src/assets/fonts/radiance-semibold.ttf'),
    'Reaver SemiBold': require('./src/assets/fonts/reaver-semibold.ttf'),
    'Reaver Bold': require('./src/assets/fonts/reaver-bold.ttf')
  })

  if (!loaded) {
    return <Loading splash />
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default Dota
