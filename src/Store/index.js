import AsyncStorage from '@react-native-community/async-storage'
import { combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import createDebugger from 'redux-flipper'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase'

import firebase from '@react-native-firebase/app'
import '@react-native-firebase/database'

// import accounts from './accounts'
import Settings from './Settings'
// import categories from './categories'
// import transactions from './transactions'
// import rateExchanges from './rateExchanges'
// import plans from './plans'
// import contacts from './contacts'
// import notifications from './notifications'
// import syncs from './syncs'

const reducers = combineReducers({
  firebase: persistReducer(
    { key: 'firepersist', storage: AsyncStorage },
    firebaseReducer,
  ),
  // accounts,
  Settings,
  // categories,
  // transactions,
  // // transfers,
  // plans,
  // rateExchanges,
  // contacts,
  // notifications,
  // syncs,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'Settings',
    // 'accounts',
    // 'categories',
    // 'transactions',
    // 'transfers',
    // 'rateExchanges',
    // 'plans',
    // 'contacts',
    // 'notifications',
    // 'syncs',
  ],
}

const initialState = {}
const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, initialState)

const persistor = persistStore(store)

const rrfConfig = {
  userProfile: 'users',
  // presence: 'presence', // where list of online users is stored in database
  // sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

export { store, rrfProps, persistor }

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(createDebugger()),
// })

// const persistor = persistStore(store)

// export { store, persistor }
