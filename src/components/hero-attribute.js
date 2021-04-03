import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { imgHeroAttribute } from '../assets'
import { heroAttribute } from '../lib/data'
import { colors, fonts, layout, typography } from '../styles'

export const HeroAttribute = ({ hero, style }) => (
  <View style={[styles.main, style]}>
    <Image source={imgHeroAttribute(hero.primary_attr)} style={styles.icon} />
    <Text style={styles.label}>{heroAttribute(hero.primary_attr)}</Text>
  </View>
)

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    height: 32,
    width: 32
  },
  label: {
    ...fonts.bodyBold,
    ...typography.xl,
    color: colors.foregroundLight,
    marginLeft: layout.padding
  }
})
