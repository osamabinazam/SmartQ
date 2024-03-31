import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons' // Assuming you have FontAwesome installed
import { useState } from 'react'
import { Colors } from './styles'

const ExploreServiceCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false) // State for heart icon

  // Function to toggle heart icon state
  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <View style={styles.container}>
      {/* Temporary Image */}
      <Image source={item.servicesThumbnail} style={styles.image} />

      {/* Service Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.serviceTitle}</Text>
        <TouchableOpacity style={styles.dotsIcon}>
          <FontAwesome name='ellipsis-h' size={24} color='gray' />
        </TouchableOpacity>
      </View>

      {/* Necessary Details */}
      <Text style={styles.details}>
        {item.serviceProviderName} ~ {item.serviceProviderRating}
      </Text>
      <Text style={styles.details}>{item.openingHours}</Text>

      {/* Price */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity onPress={handleFavoritePress}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={24}
            color={Colors.brand}
          />
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.filledButton]}>
          <Text style={[styles.buttonText, styles.filledButtonText]}>
            Book Appointment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.outlinedButton]}>
          <Text style={styles.outlinedButtonText}>Join Queue</Text>
        </TouchableOpacity>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />
    </View>
  )
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 1,
    // marginTop: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  details: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  dotsIcon: {
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    marginLeft: 1,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#3cc0f0',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 8,
  },
  buttonText: {
    color: Colors.brand,
    fontWeight: 'bold',
  },
  //q: what is gray color code?
  //a: gray color code is #808080
  outlinedButtonText: {
    color: '#808080',
    fontWeight: 'bold',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.brand,
  },
  filledButton: {
    backgroundColor: Colors.brand,
  },
  filledButtonText: {
    color: '#ffffff',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 16,
  },
}

export default ExploreServiceCard
