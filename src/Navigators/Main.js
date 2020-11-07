import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeContainer from '@/Containers/Home/Index'
import Screens from '@/Config/Screens'
import Icon from 'react-native-vector-icons/Feather'

import AnimatedTabBar from '@gorhom/animated-tabbar'
import { Colors, Common } from '@/Theme'

const defaultSettings = {
  labelStyle: {
    color: Colors.tabBarColor,
  },
  icon: {
    activeColor: Colors.tabBarColor,
    inactiveColor: 'rgba(223,215,243,0)',
  },
  background: {
    activeColor: Colors.tabBarActiveColor,
    inactiveColor: 'rgba(223,215,243,0)',
  },
}

const tabs = {
  HOME: {
    ...defaultSettings,
    icon: {
      component: () => <Icon style={Common.tabIcon} name="home" size={22} />,
    },
  },
  HISTORY: {
    ...defaultSettings,
    icon: {
      component: () => (
        <Icon style={Common.tabIcon} name="calendar" size={22} />
      ),
    },
  },
  REPORT: {
    ...defaultSettings,
    icon: {
      component: () => (
        <Icon style={Common.tabIcon} name="bar-chart-2" size={22} />
      ),
    },
  },
  PLANS: {
    ...defaultSettings,
    icon: {
      component: () => <Icon style={Common.tabIcon} name="target" size={22} />,
    },
  },
  SETTINGS: {
    ...defaultSettings,
    icon: {
      component: () => <Icon style={Common.tabIcon} name="user" size={22} />,
    },
  },
}

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{}}
      tabBar={(props) => (
        <AnimatedTabBar
          style={Common.tab}
          preset="flashy"
          tabs={tabs}
          {...props}
          iconSize={22}
        />
      )}
    >
      <Tab.Screen name={Screens.HOME} component={HomeContainer} />
      <Tab.Screen name={Screens.HISTORY} component={HomeContainer} />
      <Tab.Screen name={Screens.REPORT} component={HomeContainer} />
      <Tab.Screen name={Screens.PLANS} component={HomeContainer} />
      <Tab.Screen name={Screens.SETTINGS} component={HomeContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
