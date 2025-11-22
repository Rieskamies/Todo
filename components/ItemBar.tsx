import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ItemList from './ItemList';

interface Item {
  id: string;
  name: string;
  done: boolean;
}

interface Props {
  items: Item[];
  addItem: (name: string) => void;
  deleteItem: (id: string) => void;
  toggleDone: (id: string) => void;
}

export default function Itembar({ items, addItem, deleteItem, toggleDone }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      addItem(input.trim());
      setInput('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add item"
        />
        <Button 
          title="Add" 
          onPress={handleAdd} />
      </View>

      <ItemList items={items} onDelete={deleteItem} onToggle={toggleDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: { 
    flexDirection: 'row', 
    marginBottom: 16
  },

  input: {
    flex: 1,
    borderWidth: 1,
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingVertical: 22,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 0,
  },

});
