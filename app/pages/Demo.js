import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Demo = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Jan 2025</Text>
        <TouchableOpacity>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Daily', 'Calendar', 'Monthly', 'Total', 'Note'].map((tab, index) => (
          <TouchableOpacity key={index} style={[styles.tab, index === 0 && styles.activeTab]}>
            <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Income</Text>
          <Text style={styles.income}>₹1,24,768.50</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Expenses</Text>
          <Text style={styles.expenses}>₹1,13,929.00</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Total</Text>
          <Text style={styles.total}>₹10,839.50</Text>
        </View>
      </View>

      {/* Transactions */}
      <ScrollView style={styles.transactions}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>09 Thu 01.2025</Text>
          <View style={styles.transactionList}>
            {[
              { description: 'Rent', amount: '₹6,700.00' },
              { description: 'Fd repayment', amount: '₹276.79' },
              { description: 'Indian Oil Petrol', amount: '₹400.00' },
              { description: 'Besan', amount: '₹100.00' },
            ].map((item, index) => (
              <View key={index} style={styles.transaction}>
                <Text style={styles.transactionText}>{item.description}</Text>
                <Text style={styles.transactionAmount}>{item.amount}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('DemoDet')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2c2c2e',
  },
  navButton: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2c2c2e',
    paddingVertical: 8,
  },
  tab: {
    padding: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff3b30',
  },
  tabText: {
    color: '#8e8e93',
  },
  activeTabText: {
    color: '#fff',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2c2c2e',
    paddingVertical: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryTitle: {
    color: '#8e8e93',
    fontSize: 14,
  },
  income: {
    color: '#4cd964',
    fontSize: 16,
  },
  expenses: {
    color: '#ff3b30',
    fontSize: 16,
  },
  total: {
    color: '#ffcc00',
    fontSize: 16,
  },
  transactions: {
    padding: 16,
    backgroundColor: '#1c1c1e',
  },
  dateContainer: {
    marginBottom: 16,
  },
  date: {
    color: '#8e8e93',
    fontSize: 16,
    marginBottom: 8,
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
});

export default Demo;
