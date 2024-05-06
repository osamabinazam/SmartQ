import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../components/styles'
import QueuesComponent from '../components/QueuesComponent'

const Queues = () => {
  const [search, setSearch] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Queues</Text>
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

      {/* table container */}
      <QueuesComponent />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
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

export default Queues
