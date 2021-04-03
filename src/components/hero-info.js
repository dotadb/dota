import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { imgHeroFull } from '../assets'
import { heroDescription } from '../lib/data'
import { colors, fonts, layout, typography } from '../styles'

import { HeroAttribute } from './hero-attribute'

export const HeroInfo = ({ hero, style }) => {
  const { width } = useSafeAreaFrame()

  return (
    <View style={style}>
      <HeroAttribute hero={hero} />

      <Text style={styles.name}>{hero.name_loc}</Text>
      <Text style={styles.description}>{hero.npe_desc_loc.toUpperCase()}</Text>
      <Text style={styles.hype}>{heroDescription(hero.hype_loc)}</Text>

      <Image
        source={imgHeroFull(hero.name)}
        style={[
          styles.image,
          {
            height: width,
            width
          }
        ]}
      />

      <Text style={styles.title}>Bio</Text>
      <Text style={styles.bio}>{hero.bio_loc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    ...fonts.titleBold,
    ...typography.xxxl,
    color: colors.foreground,
    marginTop: layout.margin
  },
  description: {
    ...fonts.bodyBold,
    ...typography.base,
    color: colors.accent
  },
  hype: {
    ...fonts.body,
    ...typography.sm,
    color: colors.foreground,
    marginTop: layout.padding
  },
  image: {
    marginVertical: layout.padding
  },
  title: {
    ...fonts.bodyBold,
    ...typography.xxl,
    color: colors.accent
  },
  bio: {
    ...fonts.body,
    ...typography.base,
    color: colors.foreground
  }
})
