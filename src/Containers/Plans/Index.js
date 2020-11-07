import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppleHeader } from '@freakycoder/react-native-header-view'
import { Screen } from '@/Components'
import { Layout } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/Contexts/ThemeContext'

const PlanContainer = () => {
  const { t } = useTranslation()
  const { colors, isDark, setScheme } = useTheme()
  const profile = useSelector((state) => state.firebase.auth)
  const dispatch = useDispatch()

  return (
    <Screen>
      <SafeAreaView style={Layout.fill}>
        <AppleHeader
          onChangeText={(text) => console.log(text)}
          largeTitle={t('Plans')}
          imageSource={{ uri: profile.photoURL }}
          largeTitleFontColor={colors.text}
        />
      </SafeAreaView>
    </Screen>
  )
}

export default PlanContainer
