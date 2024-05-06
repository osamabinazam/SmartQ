import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import { Colors } from './styles'

const data = [
  { id: 'id-1', name: 'Ahsan', joined: '9:00 AM', age: 'Served' },
  { id: 'id-2', name: 'Ali', joined: '9:45 AM', age: 'Current' },
  { id: 'id-3', name: 'Bilal', joined: '10:22 AM', age: 'Next in line' },
  { id: 'id-4', name: 'You', joined: '12:50 PM', age: 'In Queue' },
  { id: 'id-5', name: 'Shehzad', joined: '1:22 PM', age: 'In Queue' },
  { id: 'id-6', name: 'Shahid', joined: '2:00 PM', age: 'In Queue' },
  { id: 'id-7', name: 'Shahzad', joined: '2:30 PM', age: 'In Queue' },
  { id: 'id-8', name: 'Shahzaib', joined: '3:00 PM', age: 'In Queue' },
  {
    id: 'id-9',
    name: 'Shahzaib',
    joined: '3:00 PM',
    age: 'In Queue',
  },
]

const App = () => {
  const renderItem = ({ item }) => (
    <View style={styles.cell}>
      <Text style={styles.item_name}>{item.name}</Text>
      <Text style={styles.item_joined}>{item.joined}</Text>
      <Text style={styles.item_age}>{item.age}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sonologist Appointment</Text>
        <Text style={styles.headerSubText}>Dated: 12 March, 2024</Text>
      </View>
      <View style={styles.appointmentContainer}>
        {/* Profile picture */}
        <Image
          source={require('../assets/sppp.png')}
          style={styles.profileImage}
        />

        <View style={styles.appointmentInfo}>
          {/* Text content */}
          <Text style={styles.updatedText}>Dr. Ahmed ~ Rated 4.5</Text>
          <Text style={styles.updatedText}>Updated: 2 minutes ago</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: Colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 15,
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
  item_name: {
    textAlign: 'left',
    fontSize: 16,
    flex: 1,
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
})

export default App
