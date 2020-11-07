import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import MainNavigator from './Main'
import AuthNavigator from './Auth'
import { IndexStartupContainer } from '@/Containers'
import { isLoaded } from 'react-redux-firebase'
import Screens from '@/Config/Screens'
import i18next from 'i18next'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const settings = useSelector((state) => state.Settings)

  useEffect(() => {
    if (settings.language !== i18next.language) {
      i18next.changeLanguage(settings.language)
    }
  }, [settings])

  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={Screens.START_UP}>
      <Stack.Screen name={Screens.START_UP} component={IndexStartupContainer} />
      <Stack.Screen name={Screens.AUTH} component={AuthNavigator} />
      <Stack.Screen name={Screens.MAIN} component={MainNavigator} />
    </Stack.Navigator>
  )
}

export default ApplicationNavigator
