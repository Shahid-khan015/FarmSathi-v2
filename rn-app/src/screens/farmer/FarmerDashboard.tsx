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

export function FarmerDashboard() {
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
      setOperations(opsData);
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

  const activeOps = operations.filter((op) => op.status === 'active');
  const completedOps = operations.filter((op) => op.status === 'completed');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Farmer Dashboard</Text>
          <Text style={styles.userName}>{user?.fullName || 'Farmer'}</Text>
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
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.activeCard]}>
            <Text style={styles.statValue}>{activeOps.length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={[styles.statCard, styles.completedCard]}>
            <Text style={styles.statValue}>{completedOps.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={[styles.statCard, styles.alertsCard]}>
            <Text style={styles.statValue}>{alerts.length}</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Active Operations</Text>
        {activeOps.length > 0 ? (
          activeOps.map((op) => (
            <View key={op.id} style={styles.operationCard}>
              <View style={styles.operationHeader}>
                <Text style={styles.operationType}>{op.operationType}</Text>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>In Progress</Text>
                </View>
              </View>
              <Text style={styles.operationDetails}>
                {op.tractor?.manufacturerName} {op.tractor?.model}
              </Text>
              {op.operator && (
                <Text style={styles.operationDetails}>
                  Operator: {op.operator.fullName}
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
          alerts.slice(0, 5).map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.alertDot} />
              <View style={styles.alertContent}>
                <Text style={styles.alertType}>{alert.alertType}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No alerts</Text>
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  activeCard: {
    backgroundColor: '#dcfce7',
  },
  completedCard: {
    backgroundColor: '#dbeafe',
  },
  alertsCard: {
    backgroundColor: '#fef3c7',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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
    backgroundColor: '#f59e0b',
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
