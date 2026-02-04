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

interface OwnerAddImplementProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const OPERATION_TYPES = [
  { value: 'tillage', label: 'Tillage' },
  { value: 'sowing', label: 'Sowing' },
  { value: 'spraying', label: 'Spraying' },
  { value: 'harvesting', label: 'Harvesting' },
];

export function OwnerAddImplement({ onSuccess, onCancel }: OwnerAddImplementProps) {
  const [name, setName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [operationType, setOperationType] = useState('tillage');
  const [workingWidth, setWorkingWidth] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !brandName || !workingWidth) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const width = parseFloat(workingWidth);
    if (isNaN(width) || width <= 0) {
      Alert.alert('Error', 'Please enter a valid working width');
      return;
    }

    setIsLoading(true);
    try {
      await api.createImplement({
        name,
        brandName,
        operationType,
        workingWidth: width,
        isActive: true,
      });
      Alert.alert('Success', 'Implement added successfully');
      onSuccess?.();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add implement');
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
        <Text style={styles.title}>Add Implement</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Implement Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Rotavator, Plow"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Brand Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Shaktiman, Fieldking"
            placeholderTextColor="#9ca3af"
            value={brandName}
            onChangeText={setBrandName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Operation Type</Text>
          <View style={styles.typeContainer}>
            {OPERATION_TYPES.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.typeButton,
                  operationType === type.value && styles.typeButtonActive,
                ]}
                onPress={() => setOperationType(type.value)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    operationType === type.value && styles.typeButtonTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Working Width (meters)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 1.5"
            placeholderTextColor="#9ca3af"
            value={workingWidth}
            onChangeText={setWorkingWidth}
            keyboardType="decimal-pad"
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
            <Text style={styles.submitButtonText}>Add Implement</Text>
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
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  typeButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  typeButtonTextActive: {
    color: '#fff',
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
