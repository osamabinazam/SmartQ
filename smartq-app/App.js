import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Profile from './screens/Profile'
import BottomNavigator from './screens/BottomNavigator'
import Explore from './screens/Explore'
import Queues from './screens/Queues'
import Home from './screens/Home'
import NoAppoinmentsHomeScreen from './screens/NoAppoinmentsHomeScreen'
import VendorProfile from './screens/VendorProfile'
import { AuthContext } from './Contexts/AuthContext'

const Stack = createNativeStackNavigator()

export default function App() {
  const [accessTokenApiResp, setAccessTokenApiResp] = useState('')
  const [refreshTokenApiResp, setRefreshTokenApiResp] = useState('')
  const [usernameApiResp, setUsernameApiResp] = useState('')
  const [emailApiResp, setEmailApiResp] = useState('')
  const [pp, setPP] = useState(false)
  const [profilePictureApiResp, setProfilePictureApiResp] = useState(
    require('./assets/nopp.jpg')
  ) // State to hold profile image URI
  const [passApiResp, setPassApiResp] = useState('')
  const [pcIP, setPcIP] = useState('http://10.102.128.179')

  return (
    <AuthContext.Provider
      value={{
        accessTokenApiResp,
        setAccessTokenApiResp,
        refreshTokenApiResp,
        setRefreshTokenApiResp,
        usernameApiResp,
        pcIP,
        pp,
        setPP,
        setPassApiResp,
        passApiResp,
        setUsernameApiResp,
        emailApiResp,
        setEmailApiResp,
        profilePictureApiResp,
        setProfilePictureApiResp,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen
            name='NoAppoinmentsHomeScreen'
            component={NoAppoinmentsHomeScreen}
          />
          <Stack.Screen name='Explore' component={Explore} />
          <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
          <Stack.Screen name='Queues' component={Queues} />
          <Stack.Screen name='VendorProfile' component={VendorProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
