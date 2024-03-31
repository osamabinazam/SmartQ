import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
// Import useFocusEffect hook
import { useFocusEffect } from '@react-navigation/native'
import { Colors } from '../components/styles'
import { MaterialIcons } from '@expo/vector-icons'

function Home() {
  useFocusEffect(() => {
    console.log('Screen Name: Home')
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userInfoContainer}>
          <View>
            <Text style={styles.subtitle}>Shafique Ahmed,</Text>
            <Text style={styles.welcome}>Welcome back!</Text>
          </View>

          <Image
            source={require('../assets/pp.jpeg')}
            style={styles.userImage}
          />
        </View>
        <View style={styles.divider} />

        {/* New UI elements */}
        <View style={styles.appointmentContainer}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTitle}>Sonologist Appointment</Text>
            <Text style={styles.updatedText}>Dr. Ahmed ~ Rated 4.5</Text>
            <Text style={styles.updatedText}>Updated: 2 minutes ago</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.detailsButton}>Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.elevatedBox}>
          {/* Box 1 */}
          <View style={[styles.box, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.boxTitle}>Your Position</Text>
            <Text style={styles.boxContent}>#008</Text>
          </View>

          {/* Box 2 */}
          <View style={[styles.box, styles.borderBottom]}>
            <Text style={styles.boxTitle}>Total</Text>
            <Text style={styles.boxContent}>#120</Text>
          </View>

          {/* Box 3 */}
          <View style={[styles.box, styles.borderRight]}>
            <Text style={styles.boxTitle}>Current</Text>
            <Text style={styles.boxContent}>#012</Text>
          </View>

          {/* Box 4 */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Remaining</Text>
            <Text style={styles.boxContent}>#112</Text>
          </View>
        </View>

        {/* Second Elevated Box */}
        <View style={styles.secondElevatedBox}>
          {/* Average Time */}
          <View style={styles.secondBox}>
            <Text style={styles.secondBoxTitle}>Average Time</Text>
            <Text style={styles.secondBoxContent}>40 minutes</Text>
          </View>

          {/* Your Time */}
          <View style={styles.secondBox}>
            <Text style={styles.secondBoxTitle}>Your Time</Text>
            <Text style={styles.secondBoxContent}>~55 minutes</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => console.log('Get Ready button pressed')}
        >
          {/* Button */}
          <View style={styles.buttonContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.getReadyText}>Get Ready!</Text>
              <Text style={styles.distanceText}>Distance: 25km</Text>
              <Text style={styles.timeText}>Time: 30 mins</Text>
            </View>
            <MaterialIcons
              name='arrow-forward'
              size={42}
              color={Colors.brand}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // marginBottom: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.brand,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    paddingBottom: 5,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.brand,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  appointmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updatedText: {
    marginTop: 5,
    color: Colors.brand,
  },
  detailsButton: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  elevatedBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1, // Added border
    borderColor: '#ddd', // Border color
    marginTop: 10,
  },
  box: {
    width: '50%',
    padding: 10,
    justifyContent: 'flex-start', // Align content to the left
    alignItems: 'flex-start', // Align content to the left
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  boxTitle: {
    fontSize: 20,
    paddingBottom: 24,
    // fontWeight: 'bold',
  },
  boxContent: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.brand,
  },
  // Styles for the second elevated box
  secondElevatedBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Move shadow down
    shadowRadius: 6, // Increase shadow radius
    shadowOpacity: 0.25,
    elevation: 5,
    borderWidth: 1, // Added border
    borderColor: '#ddd', // Border color
    marginTop: 20,
  },
  secondBox: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  secondBoxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondBoxContent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.brand,
  },
  // Button styles
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
  },
  getReadyText: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 5,
    color: Colors.brand,
  },
  distanceText: {
    color: 'gray',
  },
  timeText: {
    color: 'gray',
  },
})

export default Home
