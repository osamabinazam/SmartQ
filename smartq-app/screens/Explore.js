import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
// Import useFocusEffect hook
import { useFocusEffect } from '@react-navigation/native'
import ExploreServiceCard from '../components/ExploreServiceCard'
import { Colors } from '../components/styles'

function Explore() {
  const [search, setSearch] = useState('')
  const data = [
    {
      servicesThumbnail: require('../assets/doc.jpg'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/doc.png'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/doc.jpg'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/doc.png'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/doc.jpg'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/doc.png'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/doc.jpg'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    {
      servicesThumbnail: require('../assets/doc.png'),
      serviceTitle: 'SONOLOGIST SPECIALIST, SUKKUR',
      serviceProviderRating: 4.5,
      serviceProviderName: 'Dr. Ahmed',
      openingHours: '9:45 AM to 1:00 PM',
      price: 'Rs. 800',
    },
    // ... more data objects
  ]

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
            placeholder='Search'
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <Icon name='menu' size={30} color='#2196F3' style={styles.menu} />
      </View>
      {/* Filters View */}
      <View style={styles.filters}></View>
      </View>

      {/* Text for Nearby Services */}
      <></>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewStyles}>
        {data.map((item, index) => (
          <ExploreServiceCard key={index} item={item} />
        ))}
      </ScrollView>
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
})

export default Explore
