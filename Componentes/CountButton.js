import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CountButton = ({ value, onIncrease, onDecrease, min = 1, max = 99 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onDecrease} 
        disabled={value <= min}
        style={[styles.button, value <= min && styles.disabledButton]}
      >
        <Icon name="minus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
      
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={onIncrease} 
        disabled={value >= max}
        style={[styles.button, value >= max && styles.disabledButton]}
      >
        <Icon name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(20, 50, 90, 0.7)',
    borderWidth: 1,
    borderColor: '#0096FF',
  },
  button: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096FF',
  },
  disabledButton: {
    backgroundColor: 'rgba(0, 150, 255, 0.3)',
  },
  valueContainer: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CountButton;