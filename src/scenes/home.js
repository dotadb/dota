import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { FlatList, Pressable, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Header } from '../components/header'
import { HeroCard } from '../components/hero'
import { useHeroes } from '../stores/heroes'
import { colors } from '../styles'

export const Home = ({ navigation: { navigate } }) => {
  const { bottom } = useSafeAreaInsets()

  const [{ heroes, loading }, { fetch }] = useHeroes()

  useEffect(() => {
    fetch()
  }, [fetch])

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
      <Header title="Heroes" />
      <FlatList
        contentContainerStyle={{
          paddingBottom: bottom
        }}
        data={heroes}
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
    </>
  )
}
