import React, { useState, useContext, useEffect } from 'react' // Add useEffect
import { View, Text, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
// Import useFocusEffect hook
import * as Location from 'expo-location' // Import Location from expo-location
import { useFocusEffect } from '@react-navigation/native'
import ExploreServiceCard from '../components/ExploreServiceCard'
import { Colors } from '../components/styles'
import { AuthContext } from '../Contexts/AuthContext'
import axios from 'axios'

function Explore() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState(null)
  const [data, setData] = useState([])
  const [hasFetched, setHasFetched] = useState(false)
  const [services, setServices] = useState([]) // New state for storing the extracted service data
  const [updatedFakeData, setUpdatedFakeData] = useState([]) // State for the updated fakeData array
  const [loading, setLoading] = useState(true) // State for loading

  //destructuring the context, username and email, profile, accesstoken only.
  const { pcIp, accessTokenApiResp } = useContext(AuthContext)

  const fakeData = [
    {
      servicesThumbnail: require('../assets/school.jpg'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      distance: '2',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/software.png'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderName: 'Dr. Ahmed',
      distance: '11',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/insurance.jpg'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderName: 'Dr. Ahmed',
      distance: '9.5',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
  ]

  // Function to get user location
  const getUserLocation = async () => {
    try {
      console.log('Inside getUserLocation function')
      let { status } = await Location.requestForegroundPermissionsAsync()
      console.log('Location Permission:', status)
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied')
        return
      }

      let userLocation = await Location.getCurrentPositionAsync({})
      console.log('User Location:', JSON.stringify(userLocation, null, 2))
      const { latitude, longitude } = userLocation.coords
      setLocation({ latitude, longitude, radius: 10000 })

      // Construct API URL
      const url = `http://10.102.138.101:3002/api/profile/vendor/nearby?latitude=40.730610&longitude=-73.935242&radius=10000`
      console.log('API URL:', url)
      console.log('Access Token:', accessTokenApiResp)

      // Make API call with Authorization header using Axios
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessTokenApiResp}`,
          'Content-Type': 'application/json',
        },
      })

      // Check for successful response
      if (response.status === 200) {
        const responseData = response.data
        console.log('API Response Raw:', responseData)
        console.log('API Response Prettified:', JSON.stringify(responseData, null, 2))
        setData(responseData) // Assuming responseData is the array of services

        // Check if results are available
        if (responseData.results) {
          // Extract desired data
          const extractedServices = responseData.results.map(service => ({
            serviceTitle: service.servicetitle,
            name: service.name,
            openingHours: {
              openTime: service.operatinghours.opentime,
              closeTime: service.operatinghours.closetime,
            },
            servicePrice: service.serviceprice
          }))
          setServices(extractedServices)
          console.log('Extracted Services:', JSON.stringify(extractedServices, null, 2))
        } else {
          console.error('No results found in responseData')
        }
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('from catch block: ' + error)
    } finally {
      setLoading(false) // Set loading to false after data is fetched
    }
  }

  // Add useEffect to update fakeData when services change
  useEffect(() => {
    if (services.length > 0) {
      const newFakeData = services.map((service, index) => ({
        ...fakeData[index % fakeData.length],
        serviceTitle: service.serviceTitle,
        serviceProviderName: service.name,
        openingHours: `${service.openingHours.openTime} to ${service.openingHours.closeTime}`,
        price: service.servicePrice,
      }))
      setUpdatedFakeData(newFakeData)
    }
  }, [services])

  useEffect(() => {
    if (!hasFetched) {
      getUserLocation() // Call to fetch user location and API data
      setHasFetched(true) // Set hasFetched to true to prevent multiple fetches
    } else {
      console.log('Data already fetched')
    }
  }, [hasFetched]) // Dependency array to ensure effect runs only when hasFetched changes

  useFocusEffect(() => {
    console.log('Screen Name: Explore')
  })

  return (
    <SafeAreaView style={styles.container}>
      {/* Header & Search box */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore Services</Text>
        <View style={styles.row}>
          <View style={styles.searchBox}>
            <Icon
              name='search'
              size={20}
              color='#999'
              style={{ paddingStart: 10 }}
            />
            <TextInput
              style={styles.input}
              placeholder='Nearby Services'
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <Icon name='menu' size={30} color='#2196F3' style={styles.menu} />
        </View>
        {/* Filters View */}
        <View style={styles.filters}></View>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Getting services offered nearby you</Text>
          <ActivityIndicator size="large" color={Colors.brand} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewStyles}
        >
          {updatedFakeData.length > 0 ? updatedFakeData.map((item, index) => (
            <ExploreServiceCard key={index} item={item} />
          )) : fakeData.map((item, index) => (
            <ExploreServiceCard key={index} item={item} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  filters: {},
  container: {
    // flex: 1,
    paddingBottom: 120,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    marginTop: 8,
    fontWeight: 'bold',
    color: Colors.brand,
    // paddingLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flex: 1,
    marginTop: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#000',
  },
  menu: {
    marginLeft: 10,
    marginRight: 0,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    marginVertical:250,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Explore