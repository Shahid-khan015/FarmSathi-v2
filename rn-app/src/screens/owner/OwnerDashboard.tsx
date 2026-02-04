import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { api, DashboardStats } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export function OwnerDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const dashboardStats = await api.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
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

  const StatCard = ({ title, value, color }: { title: string; value: number | string; color: string }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.fullName || 'Owner'}</Text>
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
        <Text style={styles.sectionTitle}>Fleet Overview</Text>
        
        <View style={styles.statsGrid}>
          <StatCard
            title="Tractors"
            value={stats?.tractorsCount || 0}
            color="#22c55e"
          />
          <StatCard
            title="Implements"
            value={stats?.implementsCount || 0}
            color="#3b82f6"
          />
          <StatCard
            title="Active Operations"
            value={stats?.activeOperations || 0}
            color="#f59e0b"
          />
          <StatCard
            title="Unresolved Alerts"
            value={stats?.unresolvedAlerts || 0}
            color="#ef4444"
          />
        </View>

        <Text style={styles.sectionTitle}>Fuel Usage Today</Text>
        <View style={styles.fuelCard}>
          <Text style={styles.fuelValue}>{stats?.todayFuelUsage || 0} L</Text>
          <Text style={styles.fuelLabel}>Liters consumed</Text>
        </View>

        <Text style={styles.sectionTitle}>Recent Operations</Text>
        {stats?.recentOperations && stats.recentOperations.length > 0 ? (
          stats.recentOperations.map((op: any, index: number) => (
            <View key={index} style={styles.operationCard}>
              <View style={styles.operationHeader}>
                <Text style={styles.operationType}>{op.operationType}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: op.status === 'active' ? '#dcfce7' : '#f3f4f6' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: op.status === 'active' ? '#16a34a' : '#6b7280' }
                  ]}>
                    {op.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.operationDetails}>
                {op.tractor?.manufacturerName} {op.tractor?.model}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No recent operations</Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  fuelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  fuelValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  fuelLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  operationDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
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
