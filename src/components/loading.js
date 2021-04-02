import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'

import { imgDota } from '../assets'
import { colors, fonts, layout, typography } from '../styles'

export const Loading = ({ splash = false }) => (
  <View style={styles.main}>
    {splash ? (
      <>
        <Image source={imgDota} style={styles.logo} />
        <Text style={styles.title}>Dota 2</Text>
      </>
    ) : (
      <ActivityIndicator color={colors.accent} size="large" />
    )}
  </View>
)

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    height: 100,
    width: 100
  },
  title: {
    ...fonts.titleBold,
    ...typography.xxxl,
    color: colors.accent,
    marginTop: layout.margin
  }
})
