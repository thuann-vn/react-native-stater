import * as React from 'react'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import Login from '../Containers/Auth/Login'
import WelcomeScreen from '../Containers/Auth/Welcome'
import { enableScreens } from 'react-native-screens'
import Screens from '@/Config/Screens'
import ForgotPasswordScreen from '@/Containers/Auth/ForgotPassword'
import SignupScreen from '@/Containers/Auth/Signup'
import OnboardingScreen from '@/Containers/Auth/Onboarding'

enableScreens(true)

const Stack = createStackNavigator()

export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
}

export default function AuthStack() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        useNativeDriver: true,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        options={{ header: () => null }}
        name={Screens.WELCOME}
        component={WelcomeScreen}
      />
      <Stack.Screen name={Screens.LOGIN} component={Login} />
      <Stack.Screen
        name={Screens.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={Screens.SIGNUP} component={SignupScreen} />
      <Stack.Screen
        options={{ header: () => null }}
        name={Screens.ON_BOARDING}
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  )
}
