import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Palette as C } from '@/constants/palette';


const { width } = Dimensions.get('window');

const PLAN_DATA = {
  id: '1',
  title: '7 Day Bali Trip',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80', // Light map-like abstract
  days: [
    { id: 'd1', title: 'Day 1', date: 'May 22' },
    { id: 'd2', title: 'Day 2', date: 'May 23' },
    { id: 'd3', title: 'Day 3', date: 'May 24' },
    { id: 'd4', title: 'Day 4', date: 'May 25' },
  ],
  itinerary: [
    {
      id: 'i1',
      time: '11:30',
      subtitle: 'Most Iconic Place in Bali',
      title: 'Ubud Monkey Forest',
      image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80',
      rating: 5,
    },
    {
      id: 'i2',
      time: '14:00',
      subtitle: 'Beautiful Rice Terraces',
      title: 'Tegallalang',
      image: 'https://images.unsplash.com/photo-1554481923-a691d78d216d?auto=format&fit=crop&w=600&q=80',
      rating: 5,
    },
  ]
};

export default function PlanDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary'>('overview');
  const [attractionsExpanded, setAttractionsExpanded] = useState(true);
  const [selectedDay, setSelectedDay] = useState('d1');

  const renderOverview = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.heroContainer}>
        <Image source={{ uri: PLAN_DATA.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{PLAN_DATA.title}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.accordionContainer}
        activeOpacity={0.7}
        onPress={() => setAttractionsExpanded(!attractionsExpanded)}
      >
        <View style={styles.accordionHeader}>
          <Text style={styles.accordionTitle}>Attractions</Text>
          <Feather name={attractionsExpanded ? "chevron-up" : "chevron-down"} size={20} color={C.textSecondary} />
        </View>

        {attractionsExpanded && (
          <View style={styles.accordionContent}>
            <Text style={styles.accordionText}>
              • Uluwatu Temple{"\n"}
              • Sacred Monkey Forest Sanctuary{"\n"}
              • Tegallalang Rice Terrace{"\n"}
              • Mount Batur Sunrise Trek
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );

  const renderItinerary = () => (
    <View style={styles.itineraryContainer}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: -8.45,
          longitude: 115.27,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
      >
        <Marker coordinate={{ latitude: -8.5069, longitude: 115.2625 }} title="Ubud Monkey Forest" />
        <Marker coordinate={{ latitude: -8.4326, longitude: 115.2788 }} title="Tegallalang" />
      </MapView>

      <View style={{ flex: 0.35 }} pointerEvents="none" />

      <View style={styles.sheetContainer}>
        <View style={styles.daysWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysScroll}>
            {PLAN_DATA.days.map((day) => {
              const isActive = selectedDay === day.id;
              return (
                <TouchableOpacity
                  key={day.id}
                  style={[styles.dayButton, isActive && styles.dayButtonActive]}
                  onPress={() => setSelectedDay(day.id)}
                >
                  <Text style={[styles.dayButtonTitle, isActive && styles.dayButtonTitleActive]}>{day.title}</Text>
                  <Text style={[styles.dayButtonDate, isActive && styles.dayButtonDateActive]}>{day.date}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.timelineContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.currentDayTitle}>{PLAN_DATA.days.find(d => d.id === selectedDay)?.title}</Text>

          {PLAN_DATA.itinerary.map((item, index) => {
            const isLast = index === PLAN_DATA.itinerary.length - 1;
            return (
              <View key={item.id} style={styles.timelineRow}>
                <View style={styles.timelineGraphic}>
                  <View style={styles.timelineDot} />
                  {!isLast && <View style={styles.timelineLine} />}
                </View>

                <View style={[styles.timelineCardContainer, isLast && { paddingBottom: 40 }]}>
                  <Text style={styles.timelineTime}>{item.time}</Text>
                  <Text style={styles.timelineSubtitle}>{item.subtitle}</Text>

                  <View style={styles.destinationCard}>
                    <Image source={{ uri: item.image }} style={styles.destinationImage} />
                    <View style={styles.destinationOverlay}>
                      <Text style={styles.destinationTitle}>{item.title}</Text>
                      <View style={styles.ratingRow}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Ionicons key={i} name="star" size={12} color="#FBBF24" />
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={C.textPrimary} />
        </TouchableOpacity>

        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentButton, activeTab === 'overview' && styles.segmentButtonActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.segmentText, activeTab === 'overview' && styles.segmentTextActive]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentButton, activeTab === 'itinerary' && styles.segmentButtonActive]}
            onPress={() => setActiveTab('itinerary')}
          >
            <Text style={[styles.segmentText, activeTab === 'itinerary' && styles.segmentTextActive]}>Itinerary</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {activeTab === 'overview' ? renderOverview() : renderItinerary()}
      </View>

      {activeTab === 'overview' && (
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
            <Feather name="zap" size={20} color={C.white} />
            <Text style={styles.fabText}>Generate Itinerary</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: C.white,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    padding: 4,
    width: 200,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  segmentButtonActive: {
    backgroundColor: C.white,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.textMuted,
  },
  segmentTextActive: {
    color: C.textPrimary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroContainer: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: C.white,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 20 },
      android: { elevation: 5 },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroTitle: {
    color: C.white,
    fontSize: 28,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  accordionContainer: {
    backgroundColor: C.white,
    borderRadius: 20,
    padding: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
      android: { elevation: 2 },
    }),
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.textPrimary,
  },
  accordionContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  accordionText: {
    fontSize: 15,
    lineHeight: 24,
    color: C.textSecondary,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    // Add safe area bottom padding manually if needed, or rely on wrapper
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: 'transparent',
  },
  fab: {
    backgroundColor: C.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: C.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 },
      android: { elevation: 6 },
    }),
  },
  fabText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // ITINERARY STYLES
  itineraryContainer: {
    flex: 1,
  },
  sheetContainer: {
    flex: 0.65,
    backgroundColor: C.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 16 },
      android: { elevation: 12 },
    }),
  },
  daysWrapper: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  daysScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: C.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },
  dayButtonActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  dayButtonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: C.textPrimary,
    marginBottom: 2,
  },
  dayButtonTitleActive: {
    color: C.white,
  },
  dayButtonDate: {
    fontSize: 12,
    color: C.textMuted,
  },
  dayButtonDateActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  timelineContent: {
    padding: 20,
  },
  currentDayTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.textPrimary,
    marginBottom: 24,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineGraphic: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: C.primary,
    backgroundColor: C.white,
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: C.borderMid,
    marginTop: -2,
    marginBottom: -2,
    zIndex: 1,
  },
  timelineCardContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingBottom: 32,
  },
  timelineTime: {
    fontSize: 16,
    fontWeight: '800',
    color: C.primary,
    marginBottom: 2,
  },
  timelineSubtitle: {
    fontSize: 13,
    color: C.textMuted,
    marginBottom: 12,
  },
  destinationCard: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: C.white,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 3 },
    }),
  },
  destinationImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    padding: 16,
  },
  destinationTitle: {
    color: C.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 2,
  },
});
