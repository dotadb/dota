import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, fonts, layout, typography } from '../styles'

export const Header = ({ children, title }) => {
  const { top } = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.main,
        {
          marginTop: top
        }
      ]}>
      <Text style={styles.title}>{title}</Text>
      {children && <View style={styles.right}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    ...fonts.titleBold,
    ...typography.xxxl,
    color: colors.accent,
    margin: layout.margin
  },
  right: {
    marginLeft: 'auto'
  }
})
