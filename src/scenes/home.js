import React, { useEffect } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  useSafeAreaFrame,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

import { imgHero, imgHeroAttribute } from '../assets'
import { Header } from '../components/header'
import { Refresh } from '../components/refresh'
import { useHeroes } from '../stores/heroes'
import { colors, fonts, layout, typography } from '../styles'

export const Home = ({ navigation: { navigate } }) => {
  const { width } = useSafeAreaFrame()
  const { bottom } = useSafeAreaInsets()

  const [{ heroes, loading }, { fetch }] = useHeroes()

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <>
      <Header title="Heroes" />
      <FlatList
        contentContainerStyle={{
          paddingBottom: bottom
        }}
        data={heroes}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={<Refresh onRefresh={fetch} refreshing={loading} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigate('Hero', {
                id: item.id
              })
            }
            style={styles.item}>
            <Image
              source={imgHero(item.name)}
              style={{
                backgroundColor: colors.backgroundLight,
                height: width * (144 / 256),
                width
              }}
            />
            <View style={styles.content}>
              <Image
                source={imgHeroAttribute(item.primary_attr)}
                style={styles.attribute}
              />
              <Text style={styles.name}>{item.name_loc}</Text>
            </View>
          </Pressable>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: layout.margin
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: layout.margin,
    marginTop: layout.margin
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
