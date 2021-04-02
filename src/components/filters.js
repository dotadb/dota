import React from 'react'
import { useCallback } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { imgHeroAttribute } from '../assets'

import { useKeyboard } from '../hooks/keyboard'
import { colors, fonts, layout, typography } from '../styles'

export const Filters = ({ filters, onChange, onClose, visible }) => {
  const { bottom, top } = useSafeAreaInsets()

  const keyboard = useKeyboard(true)

  const update = useCallback((key, value) => {
    const next = new Map(filters)

    // if (next.get(key)) {
    // next
    // }else {

    // }
  }, [])

  const paddingBottom = keyboard ? layout.margin : bottom + layout.margin

  return (
    <Modal
      avoidKeyboard
      backdropColor={colors.background}
      backdropOpacity={0.75}
      backdropTransitionOutTiming={0}
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      propagateSwipe
      style={[
        styles.modal,
        {
          marginTop: top
        }
      ]}
      swipeDirection="down">
      <View
        style={[
          styles.main,
          {
            paddingBottom
          }
        ]}>
        <Text style={styles.title}>Filters</Text>

        <Text style={styles.label}>Attribute</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
          placeholderTextColor={colors.foregroundLight}
          onChangeText={(query) => {
            const next = new Map(filters)

            next.set('query', query)

            onChange(next)
          }}
          returnKeyType="search"
          style={styles.search}
          value={filters.get('query')}
        />

        <Text style={styles.label}>Search</Text>
        <View style={styles.buttons}>
          {[0, 1, 2].map((attribute, index) => (
            <Pressable
              key={attribute}
              onPress={() => {
                const next = new Map(filters)

                if (next.get('attribute') === attribute) {
                  next.delete('attribute')
                } else {
                  next.set('attribute', attribute)
                }

                onChange(next)
              }}
              style={[
                styles.button,
                index === 0 && styles.buttonLeft,
                index === 2 && styles.buttonRight,
                attribute === filters.get('attribute') && styles.buttonActive
              ]}>
              <Image
                source={imgHeroAttribute(attribute)}
                style={styles.attribute}
              />
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Complexity</Text>
        <View style={styles.buttons}>
          {[1, 2, 3].map((complexity, index) => (
            <Pressable
              key={complexity}
              onPress={() => {
                const next = new Map(filters)

                if (next.get('complexity') === complexity) {
                  next.delete('complexity')
                } else {
                  next.set('complexity', complexity)
                }

                onChange(next)
              }}
              style={[
                styles.button,
                index === 0 && styles.buttonLeft,
                index === 2 && styles.buttonRight,
                complexity <= filters.get('complexity') && styles.buttonActive
              ]}>
              <View style={styles.complexity} />
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  main: {
    backgroundColor: '#18181b',
    borderTopLeftRadius: layout.radius,
    borderTopRightRadius: layout.radius,
    maxHeight: '80%',
    paddingHorizontal: layout.margin,
    paddingTop: layout.margin
  },
  title: {
    ...typography.xl,
    ...fonts.titleBold,
    color: colors.accent
  },
  search: {
    ...typography.lg,
    ...fonts.body,
    backgroundColor: colors.background,
    borderRadius: layout.radius,
    color: colors.foreground,
    padding: layout.padding,
    marginTop: layout.padding
  },
  label: {
    ...typography.xl,
    ...fonts.bodyBold,
    color: colors.foreground,
    marginTop: layout.margin
  },
  buttons: {
    flexDirection: 'row',
    marginTop: layout.padding
  },
  button: {
    backgroundColor: colors.background,
    opacity: 0.25,
    padding: layout.padding
  },
  buttonLeft: {
    borderTopLeftRadius: layout.radius,
    borderBottomLeftRadius: layout.radius
  },
  buttonRight: {
    borderTopRightRadius: layout.radius,
    borderBottomRightRadius: layout.radius
  },
  buttonActive: {
    opacity: 1
  },
  attribute: {
    height: 32,
    width: 32
  },
  complexity: {
    backgroundColor: colors.foreground,
    height: 16,
    margin: 8,
    transform: [
      {
        rotate: '45deg'
      }
    ],
    width: 16
  }
})
