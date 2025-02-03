import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Button, TouchableOpacity, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { deleteVendor, getVendors } from '../../services/vendorService';
import Icon from 'react-native-vector-icons/Ionicons';

const HomePage = () => {
  const navigation = useNavigation();

  const [vendors, setVendors] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadVendors();
    }, [])
  );
  const loadVendors = async () => {
    const result = await getVendors().catch(error => { console.error('Error getting vendors:', error); });
    setVendors(result);
  };

  const navigateToTransaction = (vendor) => {
    navigation.navigate('Transaction', { vendor });
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={vendors}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tile}
            onPress={() => navigateToTransaction(item)}
          >
            <Text style={styles.text}>{item.vendor}</Text>
            <Text style={styles.textdescription}>Default ₹: {item.defaultRate}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.vendorId.toString()}
      />
    </View>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  tile: {
    flex: 1,
    margin: 10,
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2, // Shadow effect
    backgroundColor: "#333",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textdescription: {
    color: "#fff",
    fontSize: 12,
    marginTop: 10,
  },
});