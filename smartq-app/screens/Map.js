import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'

function Map() {
  const [initialRegion, setInitialRegion] = useState(null)
  const mapRef = useRef()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
      <TouchableOpacity onPress={focusMap}>
        <View style={{ padding: 10 }}>
        <Text>Sukkur</Text>
        </View>
      </TouchableOpacity>
      ),
    })

    const getLocationAsync = async () => {
      try {
        // Request permission to access location
        // let { status } = await Location.requestForegroundPermissionsAsync();
        let { status } = await Location.requestForegroundPermissionsAsync({
          accuracy: Location.Accuracy.BestForNavigation, // or BestForNavigation
        })

        if (status !== 'granted') {
          console.log('Permission to access location was denied')
          return
        }

        // Get the current location
        let location = await Location.getCurrentPositionAsync({})

        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 1.0153322029536938,
          longitudeDelta: 0.5877685546874858,
        })
      } catch (error) {
        console.error('Error fetching location: ', error)
      }
    }

    getLocationAsync()
  }, [])

  const focusMap = () => {
    const sukkurCoor = {
      latitude: 27.713926,
      longitude: 68.836899,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    mapRef.current.animateCamera(
      { center: sukkurCoor, zoom: 10 },
      { duration: 3000 }
    )
  }

  onRegionChange = (region) => {
    console.log('region', region)
  }

  return (
    <View style={{ flex: 1 }}>
      {initialRegion && (
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          region={initialRegion}
          showsMyLocationButton
          //showsUserLocation
          //showsCompass
          onRegionChangeComplete={onRegionChange}
          showsTraffic
          ref={mapRef}
          showsPointsOfInterest
        ></MapView>
      )}
    </View>
  )
}

export default Map