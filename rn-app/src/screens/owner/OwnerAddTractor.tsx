import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { api } from '../../services/api';

interface OwnerAddTractorProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function OwnerAddTractor({ onSuccess, onCancel }: OwnerAddTractorProps) {
  const [manufacturerName, setManufacturerName] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!manufacturerName || !model || !registrationNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await api.createTractor({
        manufacturerName,
        model,
        registrationNumber,
        isActive: true,
      });
      Alert.alert('Success', 'Tractor added successfully');
      onSuccess?.();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add tractor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Tractor</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Manufacturer</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., John Deere, Mahindra"
            placeholderTextColor="#9ca3af"
            value={manufacturerName}
            onChangeText={setManufacturerName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 5050D, 575 DI"
            placeholderTextColor="#9ca3af"
            value={model}
            onChangeText={setModel}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Registration Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., MH-12-AB-1234"
            placeholderTextColor="#9ca3af"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            autoCapitalize="characters"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Add Tractor</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    color: '#6b7280',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  placeholder: {
    width: 50,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  submitButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
