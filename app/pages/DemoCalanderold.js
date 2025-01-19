import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Picker import

const DemoCalanderold = () => {
  const [selectedMonth, setSelectedMonth] = useState('December 2024');
  const [transactions, setTransactions] = useState([]);
  const [filterVendor, setFilterVendor] = useState('All');

  const months = [
    'January 2024', 'February 2024', 'March 2024', 'April 2024',
    'May 2024', 'June 2024', 'July 2024', 'August 2024',
    'September 2024', 'October 2024', 'November 2024', 'December 2024',
  ];

  const sampleTransactions = [
    { date: '2024-12-01', income: 111173.98, expense: 291007.78, total: -179833.80 },
    { date: '2024-12-02', income: 0, expense: 230.00, total: -230.00 },
    { date: '2024-12-03', income: 0, expense: 0, total: 0 },
    // Add more sample transactions here...
  ];

  const handleMonthChange = (direction) => {
    const currentIndex = months.indexOf(selectedMonth);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionRow}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.income}>Income: ${item.income.toFixed(2)}</Text>
      <Text style={styles.expense}>Expense: ${item.expense.toFixed(2)}</Text>
      <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>{selectedMonth}</Text>
        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Vendor:</Text>
        <Picker
          selectedValue={filterVendor}
          onValueChange={(itemValue) => setFilterVendor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Vendor A" value="Vendor A" />
          <Picker.Item label="Vendor B" value="Vendor B" />
          {/* Add more vendors dynamically */}
        </Picker>
      </View>

      <FlatList
        data={sampleTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
  },
  navButton: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthYear: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginTop: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 10,
  },
  filterLabel: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  picker: {
    color: '#FFFFFF',
  },
  listContainer: {
    marginTop: 10,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  date: {
    color: '#FFFFFF',
    flex: 1,
  },
  income: {
    color: '#4CAF50',
    flex: 1,
    textAlign: 'right',
  },
  expense: {
    color: '#F44336',
    flex: 1,
    textAlign: 'right',
  },
  total: {
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'right',
  },
});

export default DemoCalanderold;
