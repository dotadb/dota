import React, { useEffect } from 'react'
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  useSafeAreaFrame,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

import {
  imgAbility,
  imgHeroAttribute,
  imgHeroFull,
  videoAbility
} from '../assets'
import { Loading } from '../components/loading'
import { Video } from '../components/video'
import {
  heroAbilityDescription,
  heroAttribute,
  heroDescription
} from '../lib/data'
import { useHero } from '../stores/hero'
import { colors, fonts, layout, typography } from '../styles'

export const Hero = ({
  route: {
    params: { id }
  }
}) => {
  const { width } = useSafeAreaFrame()
  const { bottom, top } = useSafeAreaInsets()

  const [{ heroes, loading }, { fetch }] = useHero()

  useEffect(() => {
    fetch(id)
  }, [fetch, id])

  const hero = heroes[id]

  if (!hero) {
    return <Loading />
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: bottom + layout.margin,
        paddingHorizontal: layout.margin,
        paddingTop: layout.margin
      }}
      refreshControl={
        <RefreshControl
          colors={[colors.accent]}
          onRefresh={() => fetch(id)}
          refreshing={loading}
          tintColor={colors.accent}
        />
      }
      style={{
        marginTop: top
      }}>
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
          <Text style={styles.statsCardLabel}>
            +{hero.mana_regen.toFixed(1)}
          </Text>
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

      <Text style={[styles.title, styles.space]}>Roles</Text>

      <Text style={[styles.title, styles.space]}>Stats</Text>

      <Text style={[styles.title, styles.space]}>Abilities</Text>
      <View style={styles.abilities}>
        {hero.abilities.map((ability) => (
          <View key={ability.id} style={styles.ability}>
            <View style={styles.abilityCard}>
              <Image
                source={imgAbility(ability.name)}
                style={styles.abilityIcon}
              />
              <View style={styles.abilityDetails}>
                <Text style={styles.abilityName}>{ability.name_loc}</Text>
                <Text style={styles.abilityDescription}>
                  {heroAbilityDescription(ability)}
                </Text>
              </View>
            </View>

            <Video
              source={videoAbility(hero.name, ability.name)}
              style={{
                backgroundColor: colors.backgroundLight,
                height: width * (756 / 1344),
                marginLeft: -layout.margin,
                marginTop: layout.padding,
                width: width
              }}
            />

            {!!ability.lore_loc && (
              <Text style={styles.abilityLore}>{ability.lore_loc}</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
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
  },
  space: {
    marginTop: layout.margin
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
  },
  abilities: {
    marginTop: -layout.margin
  },
  ability: {
    marginTop: layout.margin
  },
  abilityCard: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  abilityIcon: {
    backgroundColor: colors.backgroundLight,
    height: 64,
    width: 64
  },
  abilityDetails: {
    flex: 1,
    marginLeft: layout.margin
  },
  abilityName: {
    ...fonts.bodyBold,
    ...typography.xl,
    color: colors.foreground
  },
  abilityDescription: {
    ...fonts.body,
    ...typography.base,
    color: colors.foreground
  },
  abilityLore: {
    ...fonts.body,
    ...typography.sm,
    color: colors.foregroundLight,
    marginTop: layout.padding
  }
})
