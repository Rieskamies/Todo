import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Itembar from './components/ItemBar';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Item {
  id: string;
  name: string;
  done: boolean;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);

  // Load items from storage
  useEffect(() => {
    AsyncStorage.getItem("items").then(data => {
      if (data) setItems(JSON.parse(data));
    });
  }, []);

  // Save items to storage
  useEffect(() => {
    AsyncStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Functions passed down
  const addItem = (name: string) => {
    setItems(prev => [
      ...prev,
      { id: Date.now().toString(), name, done: false }
    ]);
  };


  // Delete items
  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleDone = (id: string) => {
  setItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    )
  );
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>

      <Itembar
        items={items}
        addItem={addItem}
        deleteItem={deleteItem}
        toggleDone={toggleDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 60, 
    paddingHorizontal: 16 
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 16 },
});