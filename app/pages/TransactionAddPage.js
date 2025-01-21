import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Picker import
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker import
import { addTransaction, updateTransaction, deleteTransaction, getTransactions } from '../../services/transactionService';
import { getVendors } from '../../services/vendorService';

const TransactionAddPage = ({ navigation, route }) => {
  const [vendorId, setVendorId] = useState('');
  const [date, setDate] = useState(new Date());
  const [qty, setQty] = useState('');
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [vendors, setVendors] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      try {
        const vendorsList = await getVendors();
        setVendors(vendorsList);

      } catch (error) {
        console.error('Error fetching vendors:', error); // Handle any errors
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSave = async () => {
    const calculatedAmount = parseFloat(qty) * parseFloat(rate);
    setAmount(calculatedAmount.toFixed(2));
    if (route?.params?.id) {
      await updateTransaction(route.params.id, vendorId, date, qty, rate, calculatedAmount, description);
    } else {
      console.log('Adding transaction:', vendorId, formatDate(date), qty, rate, calculatedAmount, description);
      await addTransaction(vendorId, formatDate(date), qty, rate, calculatedAmount, description);
    }

    if (route.params?.refreshList) {
      route.params.refreshList();
    }
    //resetControls();
    navigation.goBack();
  };
  const handleBacktoList = async () => {
    //resetControls();
    navigation.goBack();
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vendor</Text>
          <Picker
            style={styles.textPicker}
            selectedValue={vendorId} onValueChange={(itemValue) => {
              setVendorId(itemValue);
            }}>
            <Picker.Item label="Select a Vendor" value="" enabled={false} />
            {vendors.map((vendor) => (
              <Picker.Item label={vendor.vendor} value={vendor.vendorId} key={vendor.vendorId} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.dateInput} onPress={showDatePickerHandler}>
            <Text style={styles.textInput}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            placeholderTextColor="#B0B0B0"
            value={qty}
            onChangeText={setQty}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rate</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            placeholderTextColor="#B0B0B0"
            value={rate}
            onChangeText={setRate}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            placeholderTextColor="#B0B0B0"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            placeholderTextColor="#B0B0B0"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleBacktoList}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionAddPage;


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
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: '#B0B0B0',
    marginTop: 5,
    padding: 5,
  },
  dateInput: {
    flex: 2,
    marginTop: 5,
  },
  textInput: {
    flex: 2,
    color: '#FFFFFF',
  },
  textPicker: {
    flex: 2,
    marginTop: 5,
    color: '#FFFFFF',
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
