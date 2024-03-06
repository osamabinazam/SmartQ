import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native' // Import useNavigation hook
import { useFocusEffect } from '@react-navigation/native' // Import useFocusEffect hook
import Explore from './Explore'
import Queues from './Queues'
import Profile from './Profile'
import Home from './Home'

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = focused ? 'home-variant' : 'home-variant-outline'
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          } else if (route.name === 'Profile') {
            iconName = 'person-circle'
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline'
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          } else if (route.name === 'Queues') {
            iconName = focused ? 'list' : 'list-outline'
            return <Ionicons name={iconName} size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Explore' component={Explore} />
      <Tab.Screen name='Queues' component={Queues} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

export default BottomNavigator
