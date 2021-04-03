import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { imgHeroAttribute, imgHeroFull } from '../assets'
import { heroAttribute, heroDescription } from '../lib/data'
import { colors, fonts, layout, typography } from '../styles'

export const HeroInfo = ({ hero }) => {
  const { width } = useSafeAreaFrame()

  return (
    <View>
      <View style={styles.attribute}>
        <Image
          source={imgHeroAttribute(hero.primary_attr)}
          style={styles.attributeIcon}
        />
        <Text style={styles.attributeLabel}>
          {heroAttribute(hero.primary_attr)}
        </Text>
      </View>
      <Text style={styles.name}>{hero.name_loc}</Text>
      <Text style={styles.tagline}>{hero.npe_desc_loc.toUpperCase()}</Text>
      <Text style={styles.description}>{heroDescription(hero.hype_loc)}</Text>
      <Image
        source={imgHeroFull(hero.name)}
        style={{
          height: width,
          marginVertical: layout.padding,
          width
        }}
      />
      <Text style={styles.title}>History</Text>
      <Text style={styles.history}>{hero.bio_loc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  attribute: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  attributeIcon: {
    height: 32,
    width: 32
  },
  attributeLabel: {
    ...fonts.bodyBold,
    ...typography.xl,
    color: colors.foregroundLight,
    marginLeft: layout.padding
  },
  name: {
    ...fonts.titleBold,
    ...typography.xxxl,
    color: colors.foreground,
    marginTop: layout.margin
  },
  tagline: {
    ...fonts.bodyBold,
    ...typography.base,
    color: colors.accent
  },
  description: {
    ...fonts.body,
    ...typography.sm,
    color: colors.foreground,
    marginTop: layout.padding
  },
  title: {
    ...fonts.bodyBold,
    ...typography.xxl,
    color: colors.accent
  },
  history: {
    ...fonts.body,
    ...typography.base,
    color: colors.foreground
  }
})
