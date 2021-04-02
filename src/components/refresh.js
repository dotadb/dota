import React from 'react'
import { RefreshControl } from 'react-native'

import { colors } from '../styles'

export const Refresh = ({ onRefresh, refreshing }) => (
  <RefreshControl
    colors={[colors.accent]}
    onRefresh={onRefresh}
    refreshing={refreshing}
    tintColor={colors.accent}
  />
)
