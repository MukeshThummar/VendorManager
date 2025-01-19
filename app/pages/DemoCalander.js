import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Picker import
//DemoCalander

const DemoCalander = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
  const [selectedVendor, setSelectedVendor] = useState('All');

  const generateMonths = () => {
    const months = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 1; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        months.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
      }
    }
    return months;
  };

  const months = generateMonths();

  const vendors = ['All', 'Vendor 1', 'Vendor 2', 'Vendor 3'];

  const sampleTransactions = [
    { date: '1-12-2024', vendor: 'Vendor 1', income: 111173.98, expense: 291007.78, total: -179833.80 },
    { date: '2-12-2024', vendor: 'Vendor 2', income: 0, expense: 230.00, total: -230.00 },
    { date: '3-12-2024', vendor: 'Vendor 1', income: 0, expense: 0, total: 0 },
    { date: '4-12-2024', vendor: 'Vendor 3', income: 63.00, expense: 4686.00, total: -4623.00 },
    // Add more sample transactions here for each day...
  ];

  const handleMonthChange = (direction) => {
    const currentIndex = months.indexOf(selectedMonth);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };

  const filteredTransactions =
    selectedVendor === 'All'
      ? sampleTransactions
      : sampleTransactions.filter((transaction) => transaction.vendor === selectedVendor);

  const getStartDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDay = (day, isPlaceholder = false) => {
    if (isPlaceholder) {
      return <View style={[styles.dayCell, styles.placeholderCell]} key={`placeholder-${day}`} />;
    }

    const { month, year } = parseSelectedMonth(selectedMonth);
    const formattedDate = `${day}-${month + 1}-${year}`;
    const transaction = filteredTransactions.find((t) => t.date === formattedDate);

    return (
      <View style={styles.dayCell} key={`day-${day}`}>
        <Text style={styles.dayText}>{day}</Text>
        {transaction && (
          <View style={styles.transactionDetails}>
            <Text style={styles.income}>+{transaction.income.toFixed(2)}</Text>
            <Text style={styles.expense}>-{transaction.expense.toFixed(2)}</Text>
            <Text style={styles.total}>{transaction.total.toFixed(2)}</Text>
          </View>
        )}
      </View>
    );
  };

  const parseSelectedMonth = (selectedMonth) => {
    const [monthName, year] = selectedMonth.split(' ');
    const monthtest = "February";
    const monthIndex = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ].indexOf(monthName);
    //const monthIndex = new Date(`${monthtest} 1, 2000`).getMonth(); // getting NaN here
    return { month: monthIndex, year: parseInt(year, 10) };
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
        selectedValue={selectedVendor}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedVendor(itemValue)}
      >
        {vendors.map((vendor) => (
          <Picker.Item key={vendor} label={vendor} value={vendor} />
        ))}
      </Picker>

      {renderCalendar()}
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
  transactionDetails: {
    marginTop: 10,
  },
  income: {
    color: '#4CAF50',
    fontSize: 12,
  },
  expense: {
    color: '#F44336',
    fontSize: 12,
  },
  total: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
  },
});

export default DemoCalander;
