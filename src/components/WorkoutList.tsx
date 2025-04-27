import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Workout } from '../types/workout';
import { workoutService } from '../services/workoutService';

export const WorkoutList: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchWorkouts = async () => {
        try {
            const data = await workoutService.getWorkouts();
            setWorkouts(data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchWorkouts();
    };

    const renderWorkoutItem = ({ item }: { item: Workout }) => (
        <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{item.name}</Text>
            {item.description && (
                <Text style={styles.workoutDescription}>{item.description}</Text>
            )}
            <View style={styles.workoutDetails}>
                {item.durationMinutes && (
                    <Text style={styles.detailText}>Duration: {item.durationMinutes} min</Text>
                )}
                {item.caloriesBurned && (
                    <Text style={styles.detailText}>Calories: {item.caloriesBurned}</Text>
                )}
                {item.distanceKm && (
                    <Text style={styles.detailText}>Distance: {item.distanceKm} km</Text>
                )}
                {item.steps && (
                    <Text style={styles.detailText}>Steps: {item.steps}</Text>
                )}
            </View>
            <Text style={styles.dateText}>
                {new Date(item.workoutDate).toLocaleDateString()}
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={workouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16,
    },
    workoutCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    workoutName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    workoutDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    workoutDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#444',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    dateText: {
        fontSize: 12,
        color: '#888',
        marginTop: 8,
    },
}); 