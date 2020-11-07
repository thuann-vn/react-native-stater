import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Layout, Common, Images, Colors } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState } from 'react/cjs/react.development'
import { SharedElement } from 'react-native-shared-element'
import FastImage from 'react-native-fast-image'
import { useFirebase } from 'react-redux-firebase'
import FormInput from '@/Components/FormInput'

const ForgotPasswordScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const firebase = useFirebase()

  const onLoginPress = async () => {
    try {
      await firebase.resetPassword(email)
      Alert.alert(
        t('auth_forgot_password_success'),
        t('auth_forgot_password_success_message'),
      )
      navigation.pop()
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
              {t('auth_forgot_password_title')}
            </Text>
            <Text style={[Common.text, styles.description]}>
              {t('auth_forgot_password_des')}
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
            <TouchableOpacity
              style={[Common.button, styles.loginButton]}
              onPress={() => onLoginPress()}
            >
              <Text style={Common.buttonTitle}>
                {t('auth_forgot_password_button')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

ForgotPasswordScreen.sharedElements = () => [
  { id: 'image' },
  { id: 'text', animation: 'fade' },
]

export default ForgotPasswordScreen

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
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    color: Colors.text,
    fontSize: 14,
    textAlign: 'center',
  },
  appName: {
    color: Colors.primary,
  },
  loginButton: {
    marginTop: 10,
  },
  forgotButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  navButtonText: {
    fontWeight: '500',
    color: Colors.primary,
  },
})
