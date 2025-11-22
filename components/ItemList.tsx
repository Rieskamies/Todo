import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

interface Item {
  id: string;
  name: string;
}

interface ItemListProps {
  items: Item[];
  onDelete: (id: string) => void;
}

export default function ItemList({ items, onDelete }: ItemListProps) {
  return (
    <SwipeListView
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.rowFront}>
          <Text>{item.name}</Text>
        </View>
      )}
      renderHiddenItem={({ item }) => (
        <View style={styles.rowBack}>
          <Button
            title="X"
            color="#d11a2a"
            onPress={() => onDelete(item.id)}
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
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginBottom: 4,
  },
  rowBack: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
});
