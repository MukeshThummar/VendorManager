import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Button, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { deleteVendor, getVendors } from '../../services/vendorService';

const VendorPage = () => {
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

  const handleDeleteVendor = async (vendorId) => {
    await deleteVendor(vendorId).catch(error => { console.error('Error deleting vendor:', error); });
    await loadVendors().catch(error => { console.error('Error loading vendors:', error); });
  };

  return (
    <View style={styles.view}>
      <Button title="Refresh" onPress={loadVendors} />
      <View style={styles.container}>
        <FlatList
          data={vendors}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.vendor}</Text>
              <Text>{item.defaultRate}</Text>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
                <Button title="Delete" onPress={() => handleDeleteVendor(item.vendorId)} />
              </View>
            </View>
          )}
          keyExtractor={item => item.vendorId.toString()}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('VendorAdd')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default VendorPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  view: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    backgroundColor: '#ffffff',
  }
});
