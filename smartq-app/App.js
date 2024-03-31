import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Profile from './screens/Profile'
import BottomNavigator from './screens/BottomNavigator'
import Explore from './screens/Explore'
import Queues from './screens/Queues'
import Home from './screens/Home'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
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
        <Stack.Screen name='Explore' component={Explore} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
        <Stack.Screen name='Queues' component={Queues} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
