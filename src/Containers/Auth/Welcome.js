import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Layout, Fonts, Images } from '@/Theme'
import { useTranslation, Trans } from 'react-i18next'
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import LottieView from 'lottie-react-native'
import { Colors, FontSize } from '../../Theme/Variables'
import SocialButton from '@/Components/SocialButton'
import { useFirebase } from 'react-redux-firebase'
import { SharedElement } from 'react-native-shared-element'
import { GoogleSignin } from '@react-native-community/google-signin'
import { Config } from '@/Config'
import Screens from '@/Config/Screens'

GoogleSignin.configure({
  webClientId: Config.GOOGLE_CLIENT_ID,
})

const WelcomeScreen = ({ navigation }) => {
  const { t } = useTranslation()

  const firebase = useFirebase()

  /**
   * Apple login button event
   */
  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned'
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse
    const credential = firebase.auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    )

    // Sign the user in with the credential
    const appleLoginResult = await firebase.login({
      credential,
    })

    //Login success
    appleLoginResult && _loginSuccess()
  }

  const onAccountLoginPress = () => {
    navigation.navigate(Screens.LOGIN)
  }

  /**
   * Facebook login button event
   */
  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ])

    if (result.isCancelled) {
      throw 'User cancelled the login process'
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken()

    if (!data) {
      throw 'Something went wrong obtaining access token'
    }

    // Create a Firebase credential with the AccessToken
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    )
    // Sign-in the user with the credential
    const fbLoginResult = await firebase.login({
      credential,
    })

    fbLoginResult && _loginSuccess()
  }

  /**
   * Google login button event
   */
  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    const googleLoginResult = await firebase.login({
      credential,
    })

    //Login success
    googleLoginResult && _loginSuccess()
  }

  const _loginSuccess = () => {
    navigation.replace(Screens.ON_BOARDING)
  }
  return (
    <View style={[Layout.fill, Layout.rowCenter]}>
      <View style={styles.container}>
        <SharedElement id="animation">
          <LottieView
            source={require('../../Assets/Animations/money-tree-animation.json')}
            autoPlay
            loop
            style={styles.animation}
            speed={0.5}
          />
        </SharedElement>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <Trans i18nKey="wizard_welcome" values={{ name: t('app_name') }}>
              Hello, my name is
              <Text style={styles.appName}>{t('app_name')}</Text>
            </Trans>
          </Text>
          <SharedElement id="welcome_text">
            <Text style={styles.description}>{t('wizard_intro_des')}</Text>
          </SharedElement>
        </View>

        <View style={styles.buttonContainer}>
          {appleAuth.isSupported && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.CONTINUE}
              onPress={() =>
                onAppleButtonPress().then(() =>
                  console.log('Apple sign-in complete!'),
                )
              }
            />
          )}

          <SocialButton
            buttonTitle={t('common_login_with_google')}
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => onGoogleButtonPress()}
          />
          <SocialButton
            buttonTitle={t('common_login_with_facebook')}
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => onFacebookButtonPress()}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => onAccountLoginPress()}
          >
            <Text style={styles.loginButtonText}>
              {t('common_login_with_account')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    maxWidth: 300,
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
    paddingHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.xLarge,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSize.regular,
    textAlign: 'center',
  },
  appName: {
    color: Colors.primary,
  },
  loginButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginButtonText: {
    fontWeight: '500',
    color: Colors.primary,
  },
})
