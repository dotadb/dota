import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { imgHeroAttribute, imgHeroFull } from '../assets'
import { heroAttribute, heroDescription } from '../lib/data'
import { colors, fonts, layout, typography } from '../styles'

export const HeroAttributes = ({ hero, style }) => (
  <View style={style}>
    <Text style={[styles.title, styles.space]}>Attributes</Text>
    <View style={styles.stats}>
      <View style={[styles.statsCard, styles.statsCardHealth]}>
        <Text style={styles.statsCardLabel}>{hero.max_health}</Text>
        <Text style={styles.statsCardLabel}>
          +{hero.health_regen.toFixed(1)}
        </Text>
      </View>
      <View style={[styles.statsCard, styles.statsCardMana]}>
        <Text style={styles.statsCardLabel}>{hero.max_mana}</Text>
        <Text style={styles.statsCardLabel}>+{hero.mana_regen.toFixed(1)}</Text>
      </View>
    </View>
    <View style={styles.stats}>
      {[
        { id: 0, key: 'str' },
        { id: 1, key: 'agi' },
        { id: 2, key: 'int' }
      ].map((attribute) => (
        <View key={attribute.key} style={styles.attributeCard}>
          <Image
            source={imgHeroAttribute(attribute.id)}
            style={styles.attributeIcon}
          />
          <View style={styles.attributeCardDetails}>
            <Text style={styles.attributeCardLabel}>
              {hero[`${attribute.key}_base`]}
            </Text>
            <Text
              style={[
                styles.attributeCardLabel,
                styles.attributeCardLabelGain
              ]}>
              +{hero[`${attribute.key}_gain`].toFixed(1)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  </View>
)

const styles = StyleSheet.create({
  attributeIcon: {
    height: 32,
    width: 32
  },
  title: {
    ...fonts.bodyBold,
    ...typography.xxl,
    color: colors.accent
  },
  stats: {
    flexDirection: 'row',
    marginTop: layout.padding
  },
  statsCard: {
    borderRadius: layout.radius / 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statsCardHealth: {
    backgroundColor: '#286323'
  },
  statsCardMana: {
    backgroundColor: '#1056db',
    marginLeft: layout.margin
  },
  statsCardLabel: {
    ...typography.base,
    ...fonts.bodyBold,
    color: colors.foreground,
    padding: layout.padding
  },
  attributeCard: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  attributeCardDetails: {
    flexDirection: 'row',
    marginLeft: layout.padding
  },
  attributeCardLabel: {
    ...typography.xl,
    ...fonts.bodyBold,
    color: colors.foreground
  },
  attributeCardLabelGain: {
    ...typography.lg,
    color: colors.foregroundLight,
    marginLeft: layout.padding / 2
  }
})
