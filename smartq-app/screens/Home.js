import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { Colors } from '../components/styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import NoAppoinmentsHomeScreen from './NoAppoinmentsHomeScreen'
import VendorProfile from './VendorProfile'
import { AuthContext } from '../Contexts/AuthContext'

function Home() {
  const navigation = useNavigation()

  //destructuring the context, username and email, profile, accesstoken only.
  const {
    usernameApiResp,
    emailApiResp,
    profilePictureApiResp,
    setProfilePictureApiResp,
    accessTokenApiResp,
    pcIp,
    pp,
  } = useContext(AuthContext)

  useEffect(() => {
    console.log('Screen Name: Home')
    console.log('Profile Picture: ', profilePictureApiResp)
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.divider} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <View style={styles.userInfoContainer}>
          <View>
            <Text style={styles.subtitle}>{usernameApiResp},</Text>
            <Text style={styles.welcome}>Welcome back!</Text>
          </View>

          <Image
            source={{
              uri: pp
                ? profilePictureApiResp
                  ? profilePictureApiResp
                  : undefined
                : profilePictureApiResp
                ? profilePictureApiResp.uri
                : undefined,
            }}
            style={styles.userImage}
          />
        </View>
        <View style={styles.divider} />

        {/* New UI elements */}

        <Text style={styles.appointmentTitle}>Schools Training Appointment</Text>
        <View style={styles.appointmentContainer}>
          {/* Profile picture */}
          <TouchableOpacity
            onPress={() => navigation.navigate('VendorProfile')}
          >
            <Image
              source={require('../assets/sppp.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.appointmentInfo}>
            {/* Text content */}
            <Text style={styles.updatedText}>John Doe Enterprises</Text>
            <Text style={styles.updatedText}>Updated: 2 minutes ago</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('NoAppoinmentsHomeScreen')}
          >
            <Text style={styles.detailsButton}>Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.elevatedBox}>
          {/* Box 1 */}
          <View style={[styles.box, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.boxTitle}>Your Position</Text>
            <Text style={styles.boxContent}>012</Text>
          </View>

          {/* Box 2 */}
          <View style={[styles.box, styles.borderBottom]}>
            <Text style={styles.boxTitle}>Total</Text>
            <Text style={styles.boxContent}>120</Text>
          </View>

          {/* Box 3 */}
          <View style={[styles.box, styles.borderRight]}>
            <Text style={styles.boxTitle}>Current</Text>
            <Text style={styles.boxContent}>008</Text>
          </View>

          {/* Box 4 */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Remaining</Text>
            <Text style={styles.boxContent}>112</Text>
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
              <Text style={styles.distanceText}>Distance: 26km</Text>
              <Text style={styles.timeText}>Time: 20 mins</Text>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 0, // Adjust as needed
    paddingHorizontal: 0, // Adjust as needed
  },
  scrollView: {
    flex: 1, // Ensures ScrollView takes up the full space
  },
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex: 1,
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
    alignItems: 'center',
    paddingBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    marginTop: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 20,
    paddingVertical: 4,
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    // marginLeft: '2%',
    // width: '96%',
  },
  box: {
    width: '50%',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  secondElevatedBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3 },
    shadowRadius: 2,
    shadowOpacity: 0.75,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    // width: '96%',
    // marginLeft: '2%',
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
    paddingTop: 10,
    color: Colors.brand,
  },
  // Button styles
  buttonContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3 },
    shadowRadius: 2,
    shadowOpacity: 0.75,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    // width: '96%',
    // marginLeft: '2%',
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
