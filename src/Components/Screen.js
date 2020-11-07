import { useTheme } from '@/Contexts/ThemeContext'
import React from 'react'
import { View, StatusBar } from 'react-native'

const Screen = (props) => {
  const { children } = props

  // Using the custom hook we made to pull the theme colors
  const { colors, isDark } = useTheme()

  const containerStyle = {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  }

  return (
    <>
      {/* We can also use the isDark prop to set the statusbar style accordingly */}
      <StatusBar
        animated
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={containerStyle}>{children}</View>
    </>
  )
}
export default Screen
