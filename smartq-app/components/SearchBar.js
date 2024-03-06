import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SearchBar as ElementsSearchBar } from 'react-native-elements';

const SearchBar = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.searchBarContainer}>
      <Text style={styles.title}>Chats</Text>
      <ElementsSearchBar
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchTextInput}
        inputProps={{
          placeholder: placeholder,
          onChangeText: onChangeText,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
  },
  searchBar: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    flex: 1,
    height: 40,
  },
  searchTextInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default SearchBar;
