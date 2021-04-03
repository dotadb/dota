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

import { imgAbility, imgHeroAttribute, videoAbility } from '../assets'
import { HeroAttributes } from '../components/hero-attributes'
import { HeroInfo } from '../components/hero-info'
import { Loading } from '../components/loading'
import { Video } from '../components/video'
import { heroAbilityDescription } from '../lib/data'
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
      <HeroInfo hero={hero} />

      <HeroAttributes hero={hero} style={styles.space} />

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
  space: {
    marginTop: layout.margin
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
