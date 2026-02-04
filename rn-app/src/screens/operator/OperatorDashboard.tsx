import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { api, Operation, Alert as AlertType } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export function OperatorDashboard() {
  const { user, logout } = useAuth();
  const [operations, setOperations] = useState<Operation[]>([]);
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [opsData, alertsData] = await Promise.all([
        api.getOperations(),
        api.getAlerts(),
      ]);
      setOperations(opsData.filter((op) => op.status === 'active'));
      setAlerts(alertsData.filter((a) => !a.isResolved));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Operator Dashboard</Text>
          <Text style={styles.userName}>{user?.fullName || 'Operator'}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Active Operations</Text>
        {operations.length > 0 ? (
          operations.map((op) => (
            <View key={op.id} style={styles.operationCard}>
              <View style={styles.operationHeader}>
                <Text style={styles.operationType}>{op.operationType}</Text>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>
              </View>
              <Text style={styles.operationDetails}>
                {op.tractor?.manufacturerName} {op.tractor?.model}
              </Text>
              {op.implement && (
                <Text style={styles.operationDetails}>
                  Implement: {op.implement.name}
                </Text>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No active operations</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Alerts</Text>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.alertDot} />
              <View style={styles.alertContent}>
                <Text style={styles.alertType}>{alert.alertType}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertTime}>
                  {new Date(alert.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No pending alerts</Text>
          </View>
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
  greeting: {
    fontSize: 14,
    color: '#6b7280',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    marginTop: 16,
  },
  operationCard: {
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
  operationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  operationType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeBadgeText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '500',
  },
  operationDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    marginTop: 6,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  alertMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
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
