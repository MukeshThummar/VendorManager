import React, { useState, useEffect } from 'react';
import { View, TextInput, Text,TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { addVendor, updateVendor, deleteVendor, getVendors } from '../../services/vendorService';

const VendorAddPage = ({ navigation, route }) => {
  const [vendorId, setVendorId] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [defaultRate, setDefaultRate] = useState('');
  useEffect(() => {
      if (route?.params?.vendor) {
        const vendor = route.params.vendor;
        setVendorId(vendor.vendorId);
        setVendorName(vendor.vendor);
        setDefaultRate(vendor.defaultRate?.toString());
      }
    }, []);
  
  const resetControls = () => {
    setVendorName('');
    setDefaultRate('');
  };
  const handleAdd = async () => {
    //TODO: Add validation
    if (vendorId) {
      await updateVendor(vendorId,vendorName, parseFloat(defaultRate)).catch(error => { console.error('Error updating vendor:', error); });
    } else {
      await addVendor(vendorName, parseFloat(defaultRate)).catch(error => { console.error('Error adding vendor:', error); });
    }
    resetControls();
    navigation.goBack();
  };
  const handleBacktoList = async () => {
    resetControls();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Add Vendor</Text> */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vendor</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Name of Vendor"
            placeholderTextColor="#B0B0B0"
            value={vendorName}
            onChangeText={setVendorName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Default Rate</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
            value={defaultRate}
            onChangeText={setDefaultRate}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleBacktoList}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VendorAddPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    padding: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  textInput: {
    marginTop: 5,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#FF5A5F',
    flex: 1,
    marginRight: 10,
    padding: 15,
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor: '#444',
    flex: 1,
    marginLeft: 10,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
