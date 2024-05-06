import React from 'react'
import {
  View,
  Text,
  FlatList,
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
import { StatusBar } from 'expo-status-bar'
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledTextBox,
  StyledButton,
  ButtonText,
  DividerLine,
  WelcomeContainer,
  Avatar,
} from './../components/styles'

const data = [
  { id: 'id-1', name: 'Ahsan', joined: '9:00 AM', age: 'Served' },
  { id: 'id-2', name: 'Ali', joined: '9:45 AM', age: 'Current' },
  { id: 'id-3', name: 'Bilal', joined: '10:22 AM', age: 'Next in line' },
]

const data2 = [
  { id: 'id-4', name: 'You', joined: '12:50 PM', age: 'Served' },
  { id: 'id-5', name: 'Shehzad', joined: '1:22 PM', age: 'Served' },
  { id: 'id-6', name: 'Shahid', joined: '2:00 PM', age: 'Cancelled' },
  { id: 'id-7', name: 'Shahzad', joined: '2:30 PM', age: 'Served' },
  { id: 'id-8', name: 'Shahzaib', joined: '3:00 PM', age: 'Served' },
  {
    id: 'id-9',
    name: 'Shahzaib',
    joined: '3:00 PM',
    age: 'Served',
  },
]

const data3 = [
  { id: 'id-4', name: 'John', joined: '12:50 PM', age: 'Served' },
  { id: 'id-5', name: 'Albert', joined: '1:22 PM', age: 'Served' },
  { id: 'id-7', name: 'Balqees', joined: '2:30 PM', age: 'Served' },
  { id: 'id-6', name: 'Bhutto', joined: '2:00 PM', age: 'Cancelled' },
]

function VendorProfile() {
  const renderItem = ({ item }) => (
    <View style={styles.cell}>
      <Text style={styles.item_name}>{item.name}</Text>
      <Text style={styles.item_joined}>{item.joined}</Text>
      <Text style={styles.item_age}>{item.age}</Text>
    </View>
  )

  useFocusEffect(() => {
    console.log('Screen Name: VendorProfile')
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Vendor Profile</Text>
      <View style={styles.divider} />

      {/* <PageTitle welcome={true}>Welcome to SmartQ!</PageTitle>
       */}
      <ScrollView
        // style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row' }}>
          <Avatar resizeMode='cover' source={require('./../assets/sppp.png')} />
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10,
                // marginRight: 130,
              }}
            >
              Dr. Ahmed
            </Text>
            <Text
              style={{
                fontSize: 14,
                // fontWeight: 'bold',
                marginTop: 10,
                marginRight: -5,
                //wrap text
                flexWrap: 'wrap',
              }}
            >
              Sonologist ~ MBBS '12, LUMS Larkana
            </Text>
            <Text
              style={{
                fontSize: 14,
                // fontWeight: 'bold',
                marginTop: 10,
                marginRight: 15,
                //wrap text
                flexWrap: 'wrap',
              }}
            >
              Rating 4.5 ~ Customers served: 42
            </Text>
            <Text
              style={{
                fontSize: 14,
                // fontWeight: 'bold',
                marginTop: 10,
                marginRight: 15,
                //wrap text
                flexWrap: 'wrap',
              }}
            >
              Opening Hours: 9:00 AM - 5:00 PM
            </Text>
          </View>
        </View>
        {/* Vendor Active Queues */}
        <View style={styles.divider} />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Sonologist Apponitment Active Queue
          </Text>
        </View>
        <View style={styles.appointmentContainer}>
          <View style={styles.appointmentInfo}>
            {/* Text content */}
            <Text style={styles.updatedText}>Status: Currently on going</Text>
            <Text style={styles.updatedText}>
              Created on 12 Mar, Updated 2 minutes ago
            </Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Joined</Text>
          <Text style={styles.columnHeader}>Status</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.divider} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Heart Check Queue</Text>
        </View>
        <View style={styles.appointmentContainer}>
          <View style={styles.appointmentInfo}>
            {/* Text content */}
            <Text style={styles.updatedText}>Status: Completed 2 Days Ago</Text>
            <Text style={styles.updatedText}>Updated 20 hours ago</Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Joined</Text>
          <Text style={styles.columnHeader}>Status</Text>
        </View>
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.divider} />
        <View style={styles.header}>
          <Text style={styles.headerText}>One More Queue</Text>
        </View>
        <View style={styles.appointmentContainer}>
          <View style={styles.appointmentInfo}>
            {/* Text content */}
            <Text style={styles.updatedText}>Status: Completed 2 Days Ago</Text>
            <Text style={styles.updatedText}>Updated 20 days ago</Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Joined</Text>
          <Text style={styles.columnHeader}>Status</Text>
        </View>
        <FlatList
          data={data3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appointmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
    marginStart: 4,
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
  header: {
    backgroundColor: Colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 18,
    marginTop: 10,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 15,
  },
  item_name: {
    textAlign: 'left',
    fontSize: 16,
    flex: 1,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    // paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#FFF',
    marginBottom: 15,
    marginStart: 2,
  },
  item_joined: {
    textAlign: 'left',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  item_age: {
    textAlign: 'left',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    marginStart: 2,
  },
  columnHeader: {
    padding: 5, // Adjust this value as needed
    paddingStart: 4,
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  headerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerSubText: {
    color: '#FFF',
    fontSize: 14,
    paddingTop: 10,
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
})

export default VendorProfile
