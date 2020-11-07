import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Button } from 'react-native'
import { AppleHeader } from '@freakycoder/react-native-header-view'
import { Common, Gutters, Layout } from '@/Theme'
// import FetchOne from '@/Store/User/FetchOne'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/Contexts/ThemeContext'
import { Screen } from '@/Components'
import moment from 'moment'
import { useFirebase } from 'react-redux-firebase'

const HomeContainer = () => {
  const { colors, isDark, setScheme } = useTheme()
  const profile = useSelector((state) => state.firebase.auth)
  const firebase = useFirebase()

  return (
    <Screen>
      <SafeAreaView style={Layout.fill}>
        <AppleHeader
          onChangeText={(text) => console.log(text)}
          largeTitle={profile.displayName}
          imageSource={{ uri: profile.photoURL }}
          largeTitleFontColor={colors.text}
          onPress={() => firebase.logout()}
        />
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Layout.justifyContentCenter,
            Layout.fill,
            Gutters.regularHPadding,
            Gutters.regularVPadding,
          ]}
        >
          <Button
            title="Toggle Theme"
            onPress={() => setScheme(isDark ? 'light' : 'dark')}
          />
        </View>
      </SafeAreaView>
    </Screen>
  )
}

export default HomeContainer
