import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ActivityIndicator, Text, TextInput, Button } from 'react-native'

import { Brand } from '@/Components'
import { Common, Fonts, Gutters, Layout } from '@/Theme'
import auth from '@react-native-firebase/auth'
// import FetchOne from '@/Store/User/FetchOne'
import { useTranslation } from 'react-i18next'

const HomeContainer = () => {
  const { t } = useTranslation()

  const accounts = useSelector((state) => state.firebase.profile)
  const dispatch = useDispatch()

  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.smallHPadding]}>
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.backgroundPrimary,
        ]}
      >
        <Button title="Logout" onPress={()=> auth().signOut()}/>
      </View>
    </View>
  )
}

export default HomeContainer
