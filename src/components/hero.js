import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { imgHero, imgHeroAttribute } from '../assets'
import { colors, fonts, layout, typography } from '../styles'

export const HeroCard = ({ hero }) => {
  const { width } = useSafeAreaFrame()

  return (
    <View style={styles.main}>
      <Image
        source={imgHero(hero.name)}
        style={{
          backgroundColor: colors.backgroundLight,
          height: width * (144 / 256),
          width
        }}
      />
      <View style={styles.content}>
        <Image
          source={imgHeroAttribute(hero.primary_attr)}
          style={styles.attribute}
        />
        <Text style={styles.name}>{hero.name_loc}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {},
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: layout.margin
  },
  attribute: {
    height: 32,
    width: 32
  },
  name: {
    ...typography.xxl,
    ...fonts.bodyBold,
    color: colors.foreground,
    marginLeft: layout.padding
  }
})
