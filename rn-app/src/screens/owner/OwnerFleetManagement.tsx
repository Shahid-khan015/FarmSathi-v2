import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api, Tractor, Implement } from '../../services/api';

interface OwnerFleetManagementProps {
  navigation?: any;
}

export function OwnerFleetManagement({ navigation }: OwnerFleetManagementProps) {
  const [tractors, setTractors] = useState<Tractor[]>([]);
  const [implements_, setImplements] = useState<Implement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'tractors' | 'implements'>('tractors');

  const fetchData = async () => {
    try {
      const [tractorsData, implementsData] = await Promise.all([
        api.getTractors(),
        api.getImplements(),
      ]);
      setTractors(tractorsData);
      setImplements(implementsData);
    } catch (error) {
      console.error('Failed to fetch fleet data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleDeleteTractor = async (id: string) => {
    Alert.alert(
      'Delete Tractor',
      'Are you sure you want to delete this tractor?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteTractor(id);
              setTractors(tractors.filter((t) => t.id !== id));
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const handleDeleteImplement = async (id: string) => {
    Alert.alert(
      'Delete Implement',
      'Are you sure you want to delete this implement?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteImplement(id);
              setImplements(implements_.filter((i) => i.id !== id));
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const handleAddTractor = () => {
    navigation?.navigate('AddTractor');
  };

  const handleAddImplement = () => {
    navigation?.navigate('AddImplement');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fleet Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={activeTab === 'tractors' ? handleAddTractor : handleAddImplement}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tractors' && styles.activeTab]}
          onPress={() => setActiveTab('tractors')}
        >
          <Text style={[styles.tabText, activeTab === 'tractors' && styles.activeTabText]}>
            Tractors ({tractors.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'implements' && styles.activeTab]}
          onPress={() => setActiveTab('implements')}
        >
          <Text style={[styles.tabText, activeTab === 'implements' && styles.activeTabText]}>
            Implements ({implements_.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'tractors' ? (
          <>
            {tractors.map((tractor) => (
              <View key={tractor.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>
                    {tractor.manufacturerName} {tractor.model}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: tractor.isActive ? '#dcfce7' : '#f3f4f6' }]}>
                    <Text style={[styles.statusText, { color: tractor.isActive ? '#16a34a' : '#6b7280' }]}>
                      {tractor.isActive ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardDetail}>Reg: {tractor.registrationNumber}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTractor(tractor.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
            {tractors.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No tractors added yet</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {implements_.map((impl) => (
              <View key={impl.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{impl.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: impl.isActive ? '#dcfce7' : '#f3f4f6' }]}>
                    <Text style={[styles.statusText, { color: impl.isActive ? '#16a34a' : '#6b7280' }]}>
                      {impl.isActive ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardDetail}>Brand: {impl.brandName}</Text>
                <Text style={styles.cardDetail}>Type: {impl.operationType}</Text>
                <Text style={styles.cardDetail}>Width: {impl.workingWidth}m</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteImplement(impl.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
            {implements_.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No implements added yet</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#22c55e',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#22c55e',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardDetail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 12,
    padding: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ef4444',
    fontWeight: '500',
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
