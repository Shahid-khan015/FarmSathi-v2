import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert as RNAlert,
} from 'react-native';
import { api, Alert as AlertType } from '../../services/api';

export function FarmerAlerts() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async () => {
    try {
      const alertsData = await api.getAlerts();
      setAlerts(alertsData);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAlerts();
  };

  const handleResolve = async (alertId: string) => {
    try {
      await api.resolveAlert(alertId);
      setAlerts(alerts.map((a) => 
        a.id === alertId ? { ...a, isResolved: true } : a
      ));
      RNAlert.alert('Success', 'Alert resolved');
    } catch (error: any) {
      RNAlert.alert('Error', error.message);
    }
  };

  const unresolvedAlerts = alerts.filter((a) => !a.isResolved);
  const resolvedAlerts = alerts.filter((a) => a.isResolved);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unresolvedAlerts.length} pending</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {unresolvedAlerts.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Pending Alerts</Text>
            {unresolvedAlerts.map((alert) => (
              <View key={alert.id} style={[styles.alertCard, styles.unresolvedCard]}>
                <View style={styles.alertHeader}>
                  <View style={styles.alertDot} />
                  <Text style={styles.alertType}>{alert.alertType}</Text>
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertTime}>
                  {new Date(alert.timestamp).toLocaleString()}
                </Text>
                <TouchableOpacity
                  style={styles.resolveButton}
                  onPress={() => handleResolve(alert.id)}
                >
                  <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {resolvedAlerts.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Resolved Alerts</Text>
            {resolvedAlerts.map((alert) => (
              <View key={alert.id} style={[styles.alertCard, styles.resolvedCard]}>
                <View style={styles.alertHeader}>
                  <View style={[styles.alertDot, styles.resolvedDot]} />
                  <Text style={styles.alertType}>{alert.alertType}</Text>
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertTime}>
                  {new Date(alert.timestamp).toLocaleString()}
                </Text>
              </View>
            ))}
          </>
        )}

        {alerts.length === 0 && (
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  badge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#d97706',
    fontWeight: '600',
    fontSize: 12,
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
    marginTop: 8,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unresolvedCard: {
    borderLeftColor: '#ef4444',
  },
  resolvedCard: {
    borderLeftColor: '#22c55e',
    opacity: 0.7,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    marginRight: 8,
  },
  resolvedDot: {
    backgroundColor: '#22c55e',
  },
  alertType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  alertMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  alertTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
  },
  resolveButton: {
    marginTop: 12,
    backgroundColor: '#22c55e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  resolveButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
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
