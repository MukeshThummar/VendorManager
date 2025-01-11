import React, { useState, useEffect } from 'react';
import { Text, Button, View, TouchableOpacity, FlatList, StyleSheet,ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { addTransaction, updateTransaction, deleteTransaction, getTransactions } from  '../../services/transactionService';


const TransactionPage = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); 

  
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
      <Button title="Edit" onPress={() => console.log('Edit transaction')} />
      <Button title="Delete" onPress={() => console.log('Delete transaction')} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.input}>Transactions</Text>
      {transactions === undefined || transactions.length === 0 ? (
            <Text style={styles.input}>No transactions.</Text>
          ) : (
            <ScrollView horizontal>
              <View>
                {/* Table Header */}
                <View style={styles.grid}>
                  <Text style={styles.gridheader}>Vendor</Text>
                  <Text style={styles.gridheader}>Date</Text>
                  <Text style={styles.gridheader}>Quantity</Text>
                  <Text style={styles.gridheader}>Rate</Text>
                  <Text style={styles.gridheader}>Amount</Text>
                  <Text style={styles.gridheader}>Description</Text>
                </View>

                {/* Table Data */}
                <FlatList
                  data={transactions}
                  keyExtractor={(item) => item.transactionId.toString()}
                  renderItem={renderTransaction} // Render each transaction
                />
              </View>
            </ScrollView>
          )}
          <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TransactionAdd')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  view: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  grid: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingVertical: 10 
  },
  gridheader: {
    flex: 1 ,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
  },
  gridcols: {
    flex: 1 ,
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
  },
});