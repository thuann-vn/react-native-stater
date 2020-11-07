import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ActivityIndicator, Text, TextInput } from 'react-native'

import { Brand } from '@/Components'
import { Common, Fonts, Gutters, Layout } from '@/Theme'
// import FetchOne from '@/Store/User/FetchOne'
import { useTranslation } from 'react-i18next'

const IndexExampleContainer = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const [userId, setUserId] = useState('1')

  const fetch = (id) => {
    setUserId(id)
    // dispatch(FetchOne.action(id))
  }

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
        <Text style={[Layout.fill, Fonts.textCenter]}>
          {t('example.labels.userId')}
        </Text>
        <TextInput
          onChangeText={(text) => fetch(text)}
          keyboardType={'number-pad'}
          maxLength={1}
          value={userId}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
      </View>
    </View>
  )
}

export default IndexExampleContainer
