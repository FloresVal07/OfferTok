import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'number-pad' | 'email-address';
    secureTextEntry?: boolean;
}

export function CustomInput({ 
    label, 
    placeholder, 
    value, 
    onChangeText, 
    keyboardType = 'default',
    secureTextEntry = false 
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
              style={[
              styles.input, 
              { borderColor: isFocused ? '#0F62FE' : '#E5E7EB' } // Blue when typing, gray when not
              ]}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize="none"
          />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#F9FAFB',
    borderRadius: 4, // Matches your button radius
    borderWidth: 2,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
});