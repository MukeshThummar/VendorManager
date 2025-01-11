import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Picker import
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker import
import { addTransaction, updateTransaction, deleteTransaction, getTransactions } from  '../../services/transactionService';
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


  const handleSave = async() => {
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
      {/* loading ? <Text>Loading vendors...</Text> */}
      <Picker 
        style={styles.input}  
        selectedValue={vendorId} onValueChange={(itemValue) => {
          setVendorId(itemValue);
        }}>
        <Picker.Item label="Select a Vendor" value="" enabled={false} />
        {vendors.map((vendor) => (
          <Picker.Item label={vendor.vendor} value={vendor.vendorId} key={vendor.vendorId} />
        ))}
      </Picker>

      {/* Date picker */}
      <Button onPress={showDatePickerHandler} title="Select Date" />
      {showDatePicker && (
        <DateTimePicker
          style={styles.input}  
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.input}>Selected Date: {formatDate(date)}</Text>
      <TextInput
        style={styles.input}  
        placeholder="Quantity"
        value={qty}
        onChangeText={setQty}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}  
        placeholder="Rate"
        value={rate}
        onChangeText={setRate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}  
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Back" onPress={handleBacktoList} />
    </View>
  );
};

export default TransactionAddPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    color: '#ffffff',
    backgroundColor: '#333',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    //lineHeight: 24,
    fontSize: 16,
  },
});