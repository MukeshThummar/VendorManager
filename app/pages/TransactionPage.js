import React, { useState, useEffect } from 'react';
import { Text, Button, View, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Picker import
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { addTransaction, updateTransaction, deleteTransaction, getTransactions } from '../../services/transactionService';
import { getVendors } from '../../services/vendorService';



const TransactionPage = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`);

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


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const transactionsList = await getTransactions();
          setTransactions(transactionsList); // Set transactions state

        } catch (error) {
          console.error('Error fetching vendors:', error); // Handle any errors
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const generateMonths = () => {
    const months = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 1; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month);
        months.push(`${date.toLocaleString('default', { month: 'long' })} ${year}`);
      }
    }
    return months;
  };

  const months = generateMonths();

  const handleMonthChange = (direction) => {
    const currentIndex = months.indexOf(selectedMonth);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };

  const getStartDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const parseSelectedMonth = (selectedMonth) => {
    const [monthName, year] = selectedMonth.split(' ');
    const monthIndex = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ].indexOf(monthName);
    return { month: monthIndex, year: parseInt(year, 10) };
  };

  const filteredTransactions = vendorId === '' ? transactions : transactions.filter((transaction) => transaction.vendorId === vendorId);

  const SummaryView = () => {
    const totalQty = filteredTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.qty), 0);
    const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    return (
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Quantity: {totalQty.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
      </View>
    );
  };
  const getformatedDate = (year, month, day) => {
    const date = new Date(year, month, day);
    const fday = date.getDate().toString().padStart(2, '0');
    const fmonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const fyear = date.getFullYear();
    return `${fday}/${fmonth}/${fyear}`;
  };

  const renderCalendarDay = (day, isPlaceholder = false) => {
    if (isPlaceholder) {
      return <View style={[styles.dayCell, styles.placeholderCell]} key={`placeholder-${day}`} />;
    }

    const { month, year } = parseSelectedMonth(selectedMonth);
    const formattedDate = getformatedDate(year, month, day);
    const transaction = filteredTransactions?.find((t) => t.date === formattedDate);
    return (
      <View style={styles.dayCell} key={`day-${day}`}>
        <Text style={styles.dayText}>{day}</Text>
        {transaction && (
          <View style={styles.transactionDetails}>
            <Text style={styles.qty}>Q.{transaction.qty.toFixed(2)}</Text>
            <Text style={styles.rate}>₹{transaction.rate.toFixed(2)}</Text>
            <Text style={styles.total}>₹{transaction.amount.toFixed(2)}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderCalendar = () => {
    const { month, year } = parseSelectedMonth(selectedMonth);
    const startDay = getStartDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const blankDays = Array(startDay).fill(null);
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const totalDays = [...blankDays, ...calendarDays];
    const rows = [];
    for (let i = 0; i < totalDays.length; i += 7) {
      const week = totalDays.slice(i, i + 7);
      rows.push(week);
    }

    return (
      <View style={styles.calendarContainer}>
        {/* Render days of the week */}
        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day) => (
            <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
          ))}
        </View>

        {/* Render calendar weeks */}
        <View style={styles.calendarGrid}>
          {rows.map((week, index) => (
            <View style={styles.weekRow} key={`week-${index}`}>
              {week.map((day, dayIndex) =>
                day == null
                  ? renderCalendarDay(`${index}-${dayIndex}`, true)
                  : renderCalendarDay(day)
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

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


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const transactionsList = await getTransactions();
          setTransactions(transactionsList); // Set transactions state

        } catch (error) {
          console.error('Error fetching vendors:', error); // Handle any errors
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.gridcols}>{item.vendor}</Text>
      <Text style={styles.gridcols}>{item.date}</Text>
      <Text style={styles.gridcols}>{item.qty}</Text>
      <Text style={styles.gridcols}>{item.rate}</Text>
      <Text style={styles.gridcols}>{item.amount}</Text>
      <Text style={styles.gridcols}>{item.description}</Text>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => console.log('Edit transaction')} />
        <Button title="Delete" onPress={() => console.log('Delete transaction')} />
      </View>
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
      {renderCalendar()}
      {SummaryView()}
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TransactionAdd')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionPage;

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
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    backgroundColor: '#ffffff',
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
  picker: {
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
    marginVertical: 10,
    borderRadius: 5,
  },
  calendarContainer: {
    marginTop: 10,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  dayOfWeekText: {
    width: '14%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'column',
    marginTop: 10,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    width: '14%',
    height: 100,
    margin: 2,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 5,
  },
  placeholderCell: {
    backgroundColor: 'transparent',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  summary: {
    padding: 10,
  },
  transactionDetails: {
    marginTop: 10,
  },
  qty: {
    color: '#4CAF50',
    fontSize: 10,
  },
  qtyLable: {
    color: '#4CAF50',
    fontSize: 10,
  },
  rate: {
    color: '#F44336',
    fontSize: 10,
  },
  rateLable: {
    color: '#F44336',
    fontSize: 10,
  },
  total: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 5,
  },
  totalLable: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 5,
  },
});