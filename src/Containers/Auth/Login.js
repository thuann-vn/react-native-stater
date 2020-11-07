import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Layout, Common, Images, Colors, FontSize } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState } from 'react/cjs/react.development'
import { SharedElement } from 'react-native-shared-element'
import FastImage from 'react-native-fast-image'
import Screens from '@/Config/Screens'
import { useFirebase } from 'react-redux-firebase'
import FormInput from '@/Components/FormInput'

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const firebase = useFirebase()

  const onLoginPress = async () => {
    try {
      await firebase.login({ email, password })
      navigation.replace(Screens.ON_BOARDING)
    } catch (ex) {
      Alert.alert(t('auth_login_failed'), t('auth_login_failed_message'))
    }
  }

  return (
    <View style={[Layout.fill, Layout.row]}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <SharedElement id="animation">
            <FastImage source={Images.logo} style={styles.logo} />
          </SharedElement>

          <View style={styles.titleContainer}>
            <Text style={[Common.text, styles.title]}>
              {t('auth_login_title')}
            </Text>
            <Text style={[Common.text, styles.description]}>
              {t('auth_login_des')}
            </Text>
          </View>
          <View style={[Layout.fill, Layout.fullSize, styles.inputContainer]}>
            <FormInput
              placeholder={t('auth_profile_email')}
              placeholderTextColor={Colors.placeholder}
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              iconType="user"
            />
            <FormInput
              placeholderTextColor={Colors.placeholder}
              secureTextEntry
              placeholder={t('auth_profile_password')}
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              blurOnSubmit
              onSubmitEditing={() => onLoginPress()}
              iconType="lock"
            />
            <TouchableOpacity
              style={[Common.button, styles.loginButton]}
              onPress={() => onLoginPress()}
            >
              <Text style={Common.buttonTitle}>{t('auth_login_button')}</Text>
            </TouchableOpacity>

            <View style={styles.otherButtons}>
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => {
                  navigation.navigate(Screens.FORGOT_PASSWORD)
                }}
              >
                <Text style={styles.navButtonText}>
                  {t('auth_forgot_password')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => {
                  navigation.navigate(Screens.SIGNUP)
                }}
              >
                <Text style={styles.navButtonText}>{t('auth_register')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

LoginScreen.sharedElements = () => [
  { id: 'image' },
  { id: 'text', animation: 'fade' },
]

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingTop: 60,
  },
  animation: {
    width: 300,
    height: 300,
    marginHorizontal: 'auto',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  titleContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    color: Colors.primary,
    fontSize: FontSize.xLarge,
    textAlign: 'center',
  },
  description: {
    color: Colors.text,
    fontSize: FontSize.regular,
    textAlign: 'center',
  },
  appName: {
    color: Colors.primary,
  },
  loginButton: {
    marginTop: 10,
  },
  forgotButton: {
    marginTop: 10
  },
  navButtonText: {
    fontWeight: '500',
    color: Colors.primary,
  },
  otherButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
