import { Video as Player } from 'expo-av'
import React, { useState } from 'react'
import { Pressable } from 'react-native'

import { colors } from '../styles'

export const Video = ({ source, style }) => {
  const [muted, setMuted] = useState(true)

  return (
    <Pressable onPress={() => setMuted(muted)}>
      <Player
        isLooping
        isMuted={muted}
        shouldPlay
        source={source}
        style={[
          {
            backgroundColor: colors.backgroundLight
          },
          style
        ]}
      />
    </Pressable>
  )
}
