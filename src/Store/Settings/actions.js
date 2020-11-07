import { createActions } from 'redux-actions'
import types from './types'

export const {
  setReviewTime,
  setActiveAccount,
  setFirstLaunchFinish,
  changeCurrency,
  changeLanguage,
  changeDateFormat,
  signIn,
  signOut,
  resetSettings,
  setPinCode,
  removePinCode,
  enableFingerPrint,
  disableFingerPrint,
  backupToggle,
  setLastBackupTime,
  setLastShowAdsTime,
  enableNotification,
  disableNotification,
  setMustShowPinCode,
  setTrackingEnabled,
  setRestoreDataState,
  setIcons,
  setIconPacks,
  setSavedNotificationState,
  setFirstTimeIntroState,
} = createActions(
  types.SET_REVIEW_TIME,
  types.SET_ACTIVE_ACCOUNT,
  types.SET_FIRST_LAUNCH_FINISH,
  types.CHANGE_CURRENCY,
  types.CHANGE_LANGUAGE,
  types.CHANGE_DATE_FORMAT,
  types.SIGN_IN,
  types.SIGN_OUT,
  types.RESET,
  types.SET_PIN_CODE,
  types.REMOVE_PIN_CODE,
  types.ENABLE_FINGER_PRINT,
  types.DISABLE_FINGER_PRINT,
  types.BACKUP_TOGGLE,
  types.SET_LAST_BACKUP_TIME,
  types.SET_LAST_SHOW_ADS_TIME,
  types.ENABLE_NOTIFICATION,
  types.DISABLE_NOTIFICATION,
  types.SET_MUST_SHOW_PIN_CODE,
  types.SET_TRACKING_ENABLED,
  types.SET_RESTORE_DATA_STATE,
  types.SET_ICONS,
  types.SET_ICON_PACKS,
  types.SET_SAVED_NOTIFICATION_TOKEN_STATE,
  types.SET_FIRST_TIME_INTRO_STATE,
)
