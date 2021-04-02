import React, { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Filters } from '../components/filters'

import { Header } from '../components/header'
import { HeroCard } from '../components/hero'
import { useHeroes } from '../stores/heroes'
import { colors, fonts, layout, typography } from '../styles'

export const Home = ({ navigation: { navigate } }) => {
  const { bottom } = useSafeAreaInsets()

  const [{ heroes, loading }, { fetch }] = useHeroes()

  const [filters, setFilters] = useState(new Map())
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetch()
  }, [fetch])

  const data = useMemo(() => {
    let data = [...heroes]

    if (filters.has('attribute')) {
      data = data.filter(
        ({ primary_attr }) => primary_attr === filters.get('attribute')
      )
    }

    if (filters.has('complexity')) {
      data = data.filter(
        ({ complexity }) => complexity === filters.get('complexity')
      )
    }

    if (filters.get('query')) {
      data = data.filter((hero) =>
        JSON.stringify(hero).toLowerCase().includes(filters.get('query'))
      )
    }

    return data
  }, [heroes, filters])

  const renderItem = useCallback(
    (hero) => (
      <Pressable
        onPress={() =>
          navigate('Hero', {
            id: hero.id
          })
        }>
        <HeroCard hero={hero} />
      </Pressable>
    ),
    []
  )

  return (
    <>
      <Header title="Heroes">
        <Pressable onPress={() => setVisible(true)}>
          <Text style={styles.filters}>Filters</Text>
        </Pressable>
      </Header>

      <FlatList
        contentContainerStyle={{
          paddingBottom: bottom
        }}
        data={data}
        keyExtractor={({ name }) => name}
        refreshControl={
          <RefreshControl
            colors={[colors.accent]}
            onRefresh={fetch}
            refreshing={loading}
            tintColor={colors.accent}
          />
        }
        renderItem={({ item }) => renderItem(item)}
      />

      <Filters
        filters={filters}
        onChange={(filters) => setFilters(filters)}
        onClose={() => setVisible(false)}
        visible={visible}
      />
    </>
  )
}

const styles = StyleSheet.create({
  filters: {
    ...typography.base,
    ...fonts.bodyBold,
    color: colors.foreground,
    margin: layout.margin
  }
})
