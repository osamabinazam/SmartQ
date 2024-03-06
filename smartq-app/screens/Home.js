import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
// Import useFocusEffect hook
import { useFocusEffect } from "@react-navigation/native";

function Home() {
  const [search, setSearch] = useState("");

  useFocusEffect(() => {
    console.log('Screen Name: Home');
  });

    return (
      <SafeAreaView style={styles.container}>

      {/* Header & Search box */}
      <Text style={styles.title}>Shafique Ahmed, you</Text>
      <View style={styles.row}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#999" style={{paddingStart: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <Icon name="menu" size={30} color="#2196F3" style={styles.menu} />
      </View>

      {/* Filters View */}
      <View style={styles.filters}>
        
      </View>
    </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    filters:{},
    container: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#000",
      paddingLeft: 8,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      flex: 1,
      marginTop: 10,
    },
    input: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 8,
      fontSize: 16,
      color: "#000",
    },
    menu: {
      marginHorizontal: 8,
      paddingTop: 10,
    },
  });

export default Home