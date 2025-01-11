import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addVendor, updateVendor, deleteVendor, getVendors } from '../../services/vendorService';

const VendorAddPage = ({ navigation }) => {
  const [vendorName, setVendorName] = useState('');
  const [defaultRate, setDefaultRate] = useState('');

  const resetControls = () => {
    setVendorName('');
    setDefaultRate('');
  };
  const handleAdd = async () => {
    console.log('Adding vendor:', vendorName, defaultRate);
    await addVendor(vendorName, parseFloat(defaultRate)).catch(error => { console.error('Error adding vendor:', error); });
    resetControls();
    navigation.goBack();
  };
  const handleBacktoList = async () => {
    resetControls();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
      />
      <TextInput
        style={styles.input}
        placeholder="Default Rate"
        keyboardType="numeric"
        value={defaultRate}
        onChangeText={setDefaultRate}
      />
      <Button title="Add Vendor" onPress={handleAdd} />
      <Button title="Back" onPress={handleBacktoList} />
    </View>
  );
};

export default VendorAddPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    input: {
      height: 40,
      color: '#ffffff',
      backgroundColor: '#333',
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
  });
  