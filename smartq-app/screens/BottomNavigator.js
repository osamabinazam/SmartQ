import React, { useContext, useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'react-native' // Import the Image component
import { AuthContext } from '../Contexts/AuthContext'
import Explore from './Explore'
import Queues from './Queues'
import Profile from './Profile'
import Home from './Home'
import { Colors } from '../components/styles'

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
  //destructuring the context, username and email, profile, accesstoken only.
  const { profilePictureApiResp, pp } = useContext(AuthContext)

  // State to store the image source
  const [imageSource, setImageSource] = useState('')

  useEffect(() => {
    // Update image source whenever profilePictureApiResp changes
    setImageSource(
      profilePictureApiResp
        ? { uri: pp ? profilePictureApiResp : profilePictureApiResp.uri }
        : require('./../assets/nopp.jpg')
    )
  }, [profilePictureApiResp])

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
            // Check if there's a profile picture available
            if (profilePictureApiResp) {
              return (
                <Image
                  source={imageSource}
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: focused ? 2 : 0, // Add border width based on focus
                    borderColor: focused ? Colors.brand : 'transparent', // Color of border when focused
                  }}
                />
              )
            } else {
              iconName = 'person-circle'
              return <Ionicons name={iconName} size={size} color={color} />
            }
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
        tabBarActiveTintColor: Colors.brand, // Set your active tint color
        tabBarInactiveTintColor: 'gray', // Set your inactive tint color
        tabBarStyle: {
          display: 'flex', // Set your tabBarStyle
        },
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Explore' component={Explore} />
      <Tab.Screen name='Queues' component={Queues} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

export default BottomNavigator
