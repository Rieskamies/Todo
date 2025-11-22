import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

interface Item {
  id: string;
  name: string;
  done: boolean; // added
}

interface ItemListProps {
  items: Item[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function ItemList({ items, onDelete, onToggle }: ItemListProps) {
  return (
    <SwipeListView
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.rowFront, item.done && styles.rowDone]}
          onPress={() => onToggle(item.id)}
        >
          <Text style={[styles.itemText, item.done && styles.itemDone]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      renderHiddenItem={({ item }, rowMap) => (
        <View style={styles.rowBack}>
          <Button
            title="X"
            color="#d11a2a"
            onPress={() => {
              onDelete(item.id);
              rowMap[item.id]?.closeRow(); // optional
            }}
          />
        </View>
      )}
      rightOpenValue={-75}
      disableRightSwipe
    />
  );
}

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 5,
  },

  rowBack: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    marginBottom: 10
  },

  itemText: {
    fontSize: 16,
  },

  itemDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  rowDone: {
    backgroundColor: '#ddd',
  },

});
