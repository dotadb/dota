import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, fonts, layout, typography } from '../styles'

export const Header = ({ title }) => {
  const { top } = useSafeAreaInsets()

  return (
    <View
      style={{
        marginTop: top
      }}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    ...fonts.titleBold,
    ...typography.xxxl,
    color: colors.accent,
    margin: layout.margin
  }
})
