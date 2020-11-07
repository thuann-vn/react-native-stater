import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { store, rrfProps, persistor } from '@/Store'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationNavigator } from '@/Navigators'
import { Layout } from '@/Theme'
import './Translations'
import { Colors } from './Theme'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { enableScreens } from 'react-native-screens'
import { PersistGate } from 'redux-persist/integration/react'
enableScreens()
const App = () => {
  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactReduxFirebaseProvider {...rrfProps} >
            <SafeAreaView style={Layout.fill}>
              <NavigationContainer>
                <StatusBar
                  barStyle="dark-content"
                  translucent={true}
                  backgroundColor={Colors.transparent}
                />
                <ApplicationNavigator />
              </NavigationContainer>
            </SafeAreaView>
          </ReactReduxFirebaseProvider>
        </PersistGate>
      </Provider>
    </Provider>
  )
}

export default App
