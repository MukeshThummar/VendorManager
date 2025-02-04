import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker import
import { addTransaction, updateTransaction, deleteTransaction } from '../../services/transactionService';
import { getDate, getformatedDatefromDate } from '@/constants/methods';

const TransactionAddPage = ({ navigation, route }) => {
  const [vendorId, setVendorId] = useState('');
  const [vendor, setVendor] = useState('');
  const [trndate, setDate] = useState(new Date());
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);

  const [description, setDescription] = useState('');
  const [transaction, setTransaction] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (route?.params?.transaction) {
          const trn = route.params.transaction;
          setTransaction(trn);
          setVendorId(trn.vendorId);
          setDate(getDate(trn.trndate));
          setQty(parseFloat(trn.qty).toString());
          setRate(parseFloat(trn.rate).toString());
          setAmount(parseFloat(trn.amount).toString());
          setDescription(trn.description);
          const vendor = route?.params?.vendor;
          setVendor(vendor);
        } else if (route?.params?.vendor) {
          const vendor = route.params.vendor;
          setVendorId(vendor.vendorId);
          setVendor(vendor);
          setRate(vendor.defaultRate?.toString());
          setDate(route?.params?.trndate ? getDate(route.params.trndate) : new Date());
        } else {
          setVendorId(route?.params?.vendorId || '');
          setDate(route?.params?.trndate ? getDate(route.params.trndate) : new Date());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, [route.params]);

  const calculateAmount = (rate, quantity) => {
    const total = (parseFloat(rate) || 0) * (parseFloat(quantity) || 0);
    setAmount(total.toFixed(2)); // Format amount
  };

  const handleSave = async () => {
    //TODO: Add validation
    if (transaction?.transactionId) {
      await updateTransaction(transaction.transactionId, vendorId, getformatedDatefromDate(trndate), qty, rate, amount, description).catch(error => { console.error('Error updating transaction:', error); });
    } else {
      await addTransaction(vendorId, getformatedDatefromDate(trndate), qty, rate, amount, description).catch(error => { console.error('Error adding transaction:', error); });
    }

    if (route.params?.refreshList) {
      route.params.refreshList();
    }
    navigation.goBack();
  };

  const handleDelete = async (transactionId) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTransaction(transactionId).catch(error => { console.error('Error deleting transaction:', error); });
            if (route.params?.refreshList) {
              route.params.refreshList();
            }
            navigation.goBack();
          }
        },
      ]
    );
  };
  const handleBacktoList = async () => {
    navigation.goBack();
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vendor</Text>
          <Text style={styles.textInput}>{vendor.vendor}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.dateInput} onPress={showDatePickerHandler}>
            <Text style={styles.textInput}>{getformatedDatefromDate(trndate)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={trndate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder="0.00"
            placeholderTextColor="#B0B0B0"
            value={qty}
            onChangeText={(text) => {
              const sanitizedText = text.replace(/[^0-9.]/g, ""); // Remove unwanted characters
              const decimalCount = (sanitizedText.match(/\./g) || []).length;
              // Prevent multiple decimal points
              if (decimalCount > 1) return;

              setQty(sanitizedText);
              calculateAmount(rate, sanitizedText);
            }}
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
            onChangeText={(text) => {
              setRate(text);
              calculateAmount(text, qty);
            }}
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
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={handleBacktoList}>
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // Works in React Native 0.71+; use margin if older version
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8, // Space between icon and text
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  continueButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
