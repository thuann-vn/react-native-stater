import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { Layout, Fonts, Common, Images, Colors, FontSize } from '@/Theme'
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { Trans, useTranslation } from 'react-i18next'
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import SocialButton from '@/Components/SocialButton'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState } from 'react/cjs/react.development'
import { SharedElement } from 'react-native-shared-element'
import LottieView from 'lottie-react-native'
import FastImage from 'react-native-fast-image'
import Screens from '@/Config/Screens'
import { useFirebase } from 'react-redux-firebase'
import FormInput from '@/Components/FormInput'

const SignupScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const firebase = useFirebase()

  const onSignupPress = async () => {
    try {
      await firebase.createUser({ email, password })
      navigation.replace(Screens.MAIN)
    } catch (ex) {
      Alert.alert(t('auth_signup_failed'), t('auth_signup_failed_message'))
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
              {t('auth_register_title')}
            </Text>
            <Text style={[Common.text, styles.description]}>
              {t('auth_register_des')}
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
              iconType="lock"
            />
            <FormInput
              placeholderTextColor={Colors.placeholder}
              secureTextEntry
              placeholder={t('auth_profile_confirm_password')}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              blurOnSubmit
              iconType="lock"
              onSubmitEditing={() => onSignupPress()}
            />
            <TouchableOpacity
              style={[Common.button, styles.loginButton]}
              onPress={() => onSignupPress()}
            >
              <Text style={Common.buttonTitle}>{t('auth_register_button')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

SignupScreen.sharedElements = (route, otherRoute, showing) => [
  { id: 'image' },
  { id: 'text', animation: 'fade' },
]

export default SignupScreen

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
    marginBottom: 40,
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
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  navButtonText: {
    fontWeight: '500',
    color: Colors.primary,
  },
})
