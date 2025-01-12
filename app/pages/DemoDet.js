import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DemoDet = () => {
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    Alert.alert('Saved', `Amount: ₹${amount}, Note: ${note}`);
  };

  const handleContinue = () => {
    Alert.alert('Continue', `Proceeding with Amount: ₹${amount}, Note: ${note}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense</Text>
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.inactiveTab]}>Income</Text>
        <Text style={[styles.tab, styles.activeTab]}>Expense</Text>
        <Text style={[styles.tab, styles.inactiveTab]}>Transfer</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>12/01/25 (Sun)   8:11 pm</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account</Text>
          <Text style={styles.value}>Cash</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>Food/Lunch</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="₹ 500"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.textInput}
            value={note}
            onChangeText={setNote}
            placeholder="Enter note"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activeTab: {
    color: '#FFFFFF',
    backgroundColor: '#FF5A5F',
  },
  inactiveTab: {
    color: '#B0B0B0',
    backgroundColor: '#2E2E2E',
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

export default DemoDet;
