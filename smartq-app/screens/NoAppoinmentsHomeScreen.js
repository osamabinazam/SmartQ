import React, { useContext } from 'react'
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
import { AuthContext } from '../Contexts/AuthContext'

function NoAppoinmentsHomeScreen() {
  //destructuring the context, username and email, profile, accesstoken only.
  const {
    usernameApiResp,
    emailApiResp,
    pp,
    profilePictureApiResp,
    accessTokenApiResp,
  } = useContext(AuthContext)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.divider} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
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

        {/* Big container */}
        <View style={styles.elevatedBox}>
          {/* Text content */}
          <Text style={styles.noAppointmentText}>
            You have no appointment scheduled.
          </Text>
          <Text style={styles.instructionText}>
            Take it easy, or set up your next visit to keep your routine on
            track.
            {'\n\n'}Quick and easy scheduling is just a tap away.
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Schedule now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  container: {
    padding: 20,
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
  elevatedBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginTop: 10,
    // marginLeft: '2%',
    // width: '96%',
  },
  noAppointmentText: {
    fontSize: 32,
    paddingBottom: 20,
    fontWeight: 'bold',
    color: Colors.brand,
  },
  instructionText: {
    fontSize: 18,
    color: '#000',
  },
  buttonContainer: {
    paddingVertical: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
  },
  button: {
    paddingVertical: 10,
    paddingStart: 10,
    paddingEnd: 60,
    borderColor: Colors.brand,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.brand,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default NoAppoinmentsHomeScreen
