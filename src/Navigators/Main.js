import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeContainer from '@/Containers/Home/Index'
import HistoryContainer from '@/Containers/Histories/Index'
import PlanContainer from '@/Containers/Plans/Index'
import ReportContainer from '@/Containers/Report/Index'
import SettingContainer from '@/Containers/Settings/Index'
import Screens from '@/Config/Screens'
import Icon from 'react-native-vector-icons/Feather'

import AnimatedTabBar from '@gorhom/animated-tabbar'
import { useTheme } from '@/Contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
const Tab = createBottomTabNavigator()
// @refresh reset
const MainNavigator = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const defaultSettings = {
    labelStyle: {
      color: colors.tabBarColor,
    },
    icon: {
      activeColor: colors.tabBarColor,
      inactiveColor: colors.tabBarInActive,
    },
    background: {
      activeColor: colors.tabBarActive,
      inactiveColor: colors.tabBarInActive,
    },
  }

  const iconStyle = {
    color: colors.tabIcon,
  }

  const tabs = {
    HOME: {
      ...defaultSettings,
      icon: {
        component: () => <Icon style={iconStyle} name="home" size={22} />,
      },
    },
    HISTORY: {
      ...defaultSettings,
      icon: {
        component: () => <Icon style={iconStyle} name="calendar" size={22} />,
      },
    },
    REPORT: {
      ...defaultSettings,
      icon: {
        component: () => (
          <Icon style={iconStyle} name="bar-chart-2" size={22} />
        ),
      },
    },
    PLANS: {
      ...defaultSettings,
      icon: {
        component: () => <Icon style={iconStyle} name="target" size={22} />,
      },
    },
    SETTINGS: {
      ...defaultSettings,
      icon: {
        component: () => <Icon style={iconStyle} name="user" size={22} />,
      },
    },
  }

  return (
    <Tab.Navigator
      screenOptions={{}}
      tabBar={(props) => (
        <AnimatedTabBar
          style={{ backgroundColor: colors.tabarBackground }}
          preset="flashy"
          tabs={tabs}
          {...props}
          iconSize={22}
        />
      )}
    >
      <Tab.Screen
        name={Screens.HOME}
        getComponent={() => HomeContainer}
        options={{ tabBarLabel: t('home') }}
      />
      <Tab.Screen
        name={Screens.HISTORY}
        getComponent={() => HistoryContainer}
        options={{ tabBarLabel: t('transactions') }}
      />
      <Tab.Screen
        name={Screens.REPORT}
        getComponent={() => ReportContainer}
        options={{ tabBarLabel: t('reports') }}
      />
      <Tab.Screen
        name={Screens.PLANS}
        getComponent={() => PlanContainer}
        options={{ tabBarLabel: t('plans') }}
      />
      <Tab.Screen
        name={Screens.SETTINGS}
        getComponent={() => SettingContainer}
        options={{ tabBarLabel: t('settings') }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
