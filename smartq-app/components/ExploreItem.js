import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExploreItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={item.profilePicture} style={styles.profilePicture} />
        <View style={styles.nameAndRating}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.rating}>
            {/* Render star icons based on item.rating */}
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>...</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.openingHours}>{item.openingHours}</Text>
      <View style={styles.priceAndHeart}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Text style={styles.heartButtonText}>♥</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.bookAppointmentButton}>
          <Text style={styles.bookAppointmentButtonText}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinQueueButton}>
          <Text style={styles.joinQueueButtonText}>Join Queue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameAndRating: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    fontSize: 24,
  },
  description: {
    marginTop: 12,
    fontSize: 16,
  },
  openingHours: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  priceAndHeart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heartButton: {
    marginLeft: 12,
    padding: 8,
  },
  heartButtonText: {
    fontSize: 24,
    color: '#f00',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  bookAppointmentButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  bookAppointmentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  joinQueueButton: {
    backgroundColor: '#f0ad4e',
    padding: 12,
    borderRadius: 8,
  },
  joinQueueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ExploreItem;