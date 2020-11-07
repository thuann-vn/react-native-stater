import { Languages } from '@/Config'
import { Colors, Common, FontSize, Images } from '@/Theme'
import React, { useRef } from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper'
import { useState } from 'react/cjs/react.development'
import Screens from '@/Config/Screens'
import { Switch } from 'react-native-gesture-handler'
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import { Picker } from '@/Components'
import { GetCurrencyList } from '@/Utils/CurrencyHelper'
import { DateFormats } from '@/Config/DateTime'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeCurrency,
  changeDateFormat,
  changeLanguage,
} from '@/Store/Settings/actions'
import FastImage from 'react-native-fast-image'

const Dots = ({ selected }) => {
  let backgroundColor

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  )
}

const Skip = ({ ...props }) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>{t('common_skip')}</Text>
    </TouchableOpacity>
  )
}

const Next = ({ ...props }) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>{t('common_next')}</Text>
    </TouchableOpacity>
  )
}

const Done = ({ ...props }) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>{t('common_done')}</Text>
    </TouchableOpacity>
  )
}

const OnboardingScreen = ({ navigation }) => {
  const settings = useSelector((state) => state.Settings)
  const [language, setLanguage] = useState(settings.language)
  const [notificationState, setNotificationState] = useState(false)
  const [currency, setCurrency] = useState(settings.currency)
  const [dateFormat, setDateFormat] = useState(settings.dateFormat)

  const currencyPicker = useRef(null)
  const dateFormatPicker = useRef(null)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  // Change languages event
  const _changeLanguage = (lang) => {
    setLanguage(lang.code)
    dispatch(changeLanguage(lang.code))
  }

  //Request user permission for notification
  const _requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages()

      //Get token
      let fcmToken = await AsyncStorage.getItem('fcmToken')
      if (!fcmToken) {
        fcmToken = await messaging().getToken()
        if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken)
          setNotificationState(true)
        }
      } else {
        setNotificationState(true)
      }
    }
  }

  //Toggle notification
  const _toggleNotification = async (value) => {
    setNotificationState(value)
    if (!value) {
      messaging().unregisterDeviceForRemoteMessages()
    } else {
      _requestUserPermission()
    }
  }

  //Change page
  const _changePageIndex = (index) => {
    if (index === 1) {
      _requestUserPermission()
    }
  }

  //Change currency
  const _openCurrencyList = () => {
    currencyPicker.current.open()
  }

  //Change date format
  const _openDateFormatList = () => {
    dateFormatPicker.current.open()
  }

  return (
    <>
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        pageIndexCallback={_changePageIndex}
        onSkip={() => navigation.replace(Screens.MAIN)}
        onDone={() => navigation.replace(Screens.MAIN)}
        pages={[
          {
            backgroundColor: '#a6e4d0',
            image: (
              <View style={styles.pageStyle}>
                <FastImage
                  style={{ height: 250, marginBottom: 40 }}
                  resizeMode="contain"
                  source={require('@/Assets/Images/onboarding-img1.png')}
                />
                <Text style={styles.title}>{t('wizard_lang_title')}</Text>
                <Text style={styles.subtitle}>{t('wizard_lang_question')}</Text>
                <View style={styles.languageButtons}>
                  {Languages.map((item) => (
                    <TouchableOpacity
                      onPress={() => _changeLanguage(item)}
                      key={'language_' + item.code}
                      style={[
                        styles.language,
                        item.code === language ? styles.selectedLanguage : null,
                        styles['language_' + item.code],
                      ]}
                    >
                      <FastImage style={styles.languageImage} source={item.image} />
                      <Text
                        style={[
                          styles.languageName,
                          item.code === language
                            ? styles.selectedLanguageName
                            : null,
                        ]}
                        weight="demi"
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#fdeb93',
            image: (
              <View style={styles.pageStyle}>
                <FastImage
                  style={{ height: 250, marginBottom: 40 }}
                  resizeMode="contain"
                  source={require('@/Assets/Images/onboarding-img2.png')}
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {t('wizard_notification_title')}
                  </Text>
                  <Text style={styles.subtitle}>
                    {t('wizard_notification_des')}
                  </Text>

                  <View style={styles.buttons}>
                    <Text style={styles.label}>
                      {t('wizard_notification_turn_on')}
                    </Text>
                    <Switch
                      value={notificationState}
                      onValueChange={(value) => {
                        _toggleNotification(value)
                      }}
                    />
                  </View>
                </View>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#e9bcbe',
            image: (
              <View style={styles.pageStyle}>
                <FastImage
                  style={{ height: 250, marginBottom: 40 }}
                  resizeMode="contain"
                  source={require('@/Assets/Images/onboarding-img3.png')}
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{t('wizard_currency_title')}</Text>
                  <Text style={styles.subtitle}>
                    {t('wizard_currency_des')}
                  </Text>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={[styles.button, { marginRight: 5 }]}
                      onPress={_openCurrencyList}
                    >
                      <FastImage
                        style={styles.buttonImage}
                        source={Images.currencyIcon}
                      />
                      <Text style={[styles.buttonLabel, { fontWeight: '100' }]}>
                        {currency}
                      </Text>
                      <Text style={[styles.buttonLabel]}>
                        {t('common_currency')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, { marginLeft: 5 }]}
                      onPress={_openDateFormatList}
                    >
                      <Image
                        style={styles.buttonImage}
                        source={Images.calendarIcon}
                      />
                      <Text style={[styles.buttonLabel, { fontWeight: '100' }]}>
                        {moment().format(dateFormat)}
                      </Text>
                      <Text style={[styles.buttonLabel]}>
                        {t('common_dateTimeFormat')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ),
            title: '',
            subtitle: '',
          },
        ]}
      />
      <Picker
        title={t('settings_currency_format')}
        ref={currencyPicker}
        items={GetCurrencyList()}
        onValueChange={(value) => {
          setCurrency(value)
          dispatch(changeCurrency(value))
        }}
      />

      <Picker
        title={t('settings_currency_format')}
        ref={dateFormatPicker}
        items={DateFormats}
        onValueChange={(value) => {
          setDateFormat(value)
          dispatch(changeDateFormat(value))
        }}
      />
    </>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageStyle: {
    padding: 40,
  },
  title: {
    fontSize: FontSize.xLarge,
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.regular,
    color: Colors.textGray,
  },
  languageButtons: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  language: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 8,
  },
  language_vi: {
    marginLeft: 5,
  },
  language_en: {
    marginRight: 5,
  },
  languageImage: {
    marginBottom: 5,
    width: 50,
    height: 50,
  },
  languageName: {
    color: Colors.text,
  },
  selectedLanguage: {
    backgroundColor: Colors.primary,
  },
  selectedLanguageName: {
    color: Colors.white,
  },
  logoContainer: {
    position: 'relative',
    width: 100,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  notificationContainer: {
    position: 'absolute',
    right: -25,
    top: -15,
    backgroundColor: Colors.red,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 15,
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  notificationNumber: {
    color: Colors.white,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 8,
    minHeight: 150,
  },
  buttonImage: {
    marginBottom: 5,
    width: 50,
    height: 50,
  },
  buttonLabel: {
    textAlign: 'center',
    color: Colors.textGray,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
  },
  note: {
    color: Colors.textGray,
  },
})
