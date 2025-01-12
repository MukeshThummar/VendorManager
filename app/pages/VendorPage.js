import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Button, TouchableOpacity, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { deleteVendor, getVendors } from '../../services/vendorService';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const navigateToEdit = (transaction) => {
    navigation.navigate('EditTransaction', { transaction });
  };

  const handleDeleteVendor = async (vendorId) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteVendor(vendorId).catch(error => { console.error('Error deleting vendor:', error); });
            await loadVendors().catch(error => { console.error('Error loading vendors:', error); });
          }
        },
      ]
    );

  };

  return (
    <View style={styles.container}>
      <View style={styles.transactions}>
        <View style={styles.transactionList}>
          <FlatList
            data={vendors}
            renderItem={({ item }) => (
              <View style={styles.transaction}>
                <TouchableOpacity
                  style={styles.transactionInfo}
                  onPress={() => navigateToEdit(item)}
                >
                  <Text style={styles.transactionText}>{item.vendor}</Text>
                  <Text style={styles.transactionAmount}>{item.defaultRate}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteVendor(item.vendorId)}
                >
                  <Icon name="trash-outline" size={20} color="#ff3b30" />
                </TouchableOpacity>
                {/* <View style={styles.actions}>
                  <Button title="Edit" onPress={() => handleEdit(item)} />
                  <Button title="Delete" onPress={() => handleDeleteVendor(item.vendorId)} />
                </View> */}
              </View>
            )}
            keyExtractor={item => item.vendorId.toString()}
          />

        </View>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('VendorAdd')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VendorPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 10,
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#ff3b30',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  transactions: {
    padding: 16,
    backgroundColor: '#1c1c1e',
  },
  transactionList: {
    borderTopWidth: 1,
    borderTopColor: '#3a3a3c',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3c',
  },
  transactionText: {
    color: '#fff',
  },
  transactionAmount: {
    color: '#ff3b30',
  },
});
