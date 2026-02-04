import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { api, Operation } from '../../services/api';

export function FarmerReports() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const opsData = await api.getOperations();
      setOperations(opsData.filter((op) => op.status === 'completed'));
    } catch (error) {
      console.error('Failed to fetch reports:', error);
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

  const groupByDate = (ops: Operation[]) => {
    const groups: { [key: string]: Operation[] } = {};
    ops.forEach((op) => {
      const date = new Date(op.startTime).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(op);
    });
    return groups;
  };

  const groupedOperations = groupByDate(operations);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.subtitle}>
          {operations.length} completed operations
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {Object.keys(groupedOperations).length > 0 ? (
          Object.entries(groupedOperations).map(([date, ops]) => (
            <View key={date}>
              <Text style={styles.dateHeader}>{date}</Text>
              {ops.map((op) => (
                <View key={op.id} style={styles.reportCard}>
                  <View style={styles.reportHeader}>
                    <Text style={styles.operationType}>{op.operationType}</Text>
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedBadgeText}>Completed</Text>
                    </View>
                  </View>
                  <View style={styles.reportDetails}>
                    <Text style={styles.detailText}>
                      Tractor: {op.tractor?.manufacturerName} {op.tractor?.model}
                    </Text>
                    {op.implement && (
                      <Text style={styles.detailText}>
                        Implement: {op.implement.name}
                      </Text>
                    )}
                    {op.operator && (
                      <Text style={styles.detailText}>
                        Operator: {op.operator.fullName}
                      </Text>
                    )}
                    <Text style={styles.timeText}>
                      Started: {new Date(op.startTime).toLocaleTimeString()}
                    </Text>
                    {op.endTime && (
                      <Text style={styles.timeText}>
                        Ended: {new Date(op.endTime).toLocaleTimeString()}
                      </Text>
                    )}
                  </View>
                  {op.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.notesLabel}>Notes:</Text>
                      <Text style={styles.notesText}>{op.notes}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No completed operations yet</Text>
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
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 8,
  },
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  operationType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedBadgeText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '500',
  },
  reportDetails: {
    marginTop: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  notesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  notesText: {
    fontSize: 14,
    color: '#1f2937',
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
