import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

// react-native-maps is native-only — conditionally import to avoid web crash
let MapView: any = View;
let Marker: any = View;
if (Platform.OS !== 'web') {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
}

const { width } = Dimensions.get('window');
const absoluteFill = { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0 };

const PLAN_DATA = {
  id: '1',
  title: '7 Day Bali Trip',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  days: [
    { id: 'd1', title: 'Day 1', date: 'May 22' },
    { id: 'd2', title: 'Day 2', date: 'May 23' },
    { id: 'd3', title: 'Day 3', date: 'May 24' },
    { id: 'd4', title: 'Day 4', date: 'May 25' },
  ],
  itinerary: [
    {
      id: 'i1', time: '11:30', subtitle: 'Most Iconic Place in Bali',
      title: 'Ubud Monkey Forest',
      image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80',
      rating: 5,
    },
    {
      id: 'i2', time: '14:00', subtitle: 'Beautiful Rice Terraces',
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
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <View className="w-full h-[220px] rounded-3xl overflow-hidden mb-6 bg-white shadow-lg">
        <Image source={{ uri: PLAN_DATA.image }} className="w-full h-full" />
        <View className="absolute inset-0 bg-black/20 justify-end p-5">
          <Text className="text-white text-[28px] font-extrabold">{PLAN_DATA.title}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-white rounded-2xl p-4 shadow-sm"
        activeOpacity={0.7}
        onPress={() => setAttractionsExpanded(!attractionsExpanded)}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-slate-900">Attractions</Text>
          <Feather name={attractionsExpanded ? "chevron-up" : "chevron-down"} size={20} color="#64748B" />
        </View>

        {attractionsExpanded && (
          <View className="mt-4 pt-4 border-t border-slate-200">
            <Text className="text-[15px] leading-6 text-slate-500">
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
    <View className="flex-1">
      {Platform.OS === 'web' ? (
        <View style={absoluteFill} className="bg-slate-200 items-center justify-center">
          <Ionicons name="map-outline" size={48} color="#94A3B8" />
          <Text className="text-slate-400 mt-2 text-sm">Map not available on web</Text>
        </View>
      ) : (
        <MapView
          style={absoluteFill}
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
      )}

      <View style={{ flex: 0.35 }} pointerEvents="none" />

      {/* Bottom sheet */}
      <View className="bg-white rounded-t-[32px] shadow-2xl" style={{ flex: 0.65 }}>
        <View className="py-4 border-b border-slate-200">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {PLAN_DATA.days.map((day) => {
              const isActive = selectedDay === day.id;
              return (
                <TouchableOpacity
                  key={day.id}
                  className={`py-3 px-5 rounded-full items-center border ${isActive ? 'bg-[#1A6B5A] border-[#1A6B5A]' : 'bg-white border-slate-200'}`}
                  onPress={() => setSelectedDay(day.id)}
                >
                  <Text className={`text-sm font-bold mb-0.5 ${isActive ? 'text-white' : 'text-slate-900'}`}>{day.title}</Text>
                  <Text className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{day.date}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
          <Text className="text-[22px] font-extrabold text-slate-900 mb-6">{PLAN_DATA.days.find(d => d.id === selectedDay)?.title}</Text>

          {PLAN_DATA.itinerary.map((item, index) => {
            const isLast = index === PLAN_DATA.itinerary.length - 1;
            return (
              <View key={item.id} className="flex-row">
                <View className="w-[30px] items-center">
                  <View className="w-3.5 h-3.5 rounded-full border-4 border-[#1A6B5A] bg-white z-10" />
                  {!isLast && <View className="w-0.5 flex-1 bg-slate-300 -mt-0.5 -mb-0.5 z-0" />}
                </View>

                <View className={`flex-1 pl-4 ${isLast ? 'pb-10' : 'pb-8'}`}>
                  <Text className="text-base font-extrabold text-[#1A6B5A] mb-0.5">{item.time}</Text>
                  <Text className="text-[13px] text-slate-500 mb-3">{item.subtitle}</Text>

                  <View className="w-full h-[140px] rounded-2xl overflow-hidden bg-white shadow-sm">
                    <Image source={{ uri: item.image }} className="absolute inset-0 w-full h-full" />
                    <View className="flex-1 bg-black/30 justify-start p-4">
                      <Text className="text-white text-lg font-bold mb-1">{item.title}</Text>
                      <View className="flex-row gap-0.5">
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }} edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm" onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View className="flex-row bg-slate-200 rounded-full p-1 w-[200px]">
          <TouchableOpacity
            className={`flex-1 py-2 items-center rounded-full ${activeTab === 'overview' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setActiveTab('overview')}
          >
            <Text className={`text-sm font-semibold ${activeTab === 'overview' ? 'text-slate-900' : 'text-slate-500'}`}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 items-center rounded-full ${activeTab === 'itinerary' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setActiveTab('itinerary')}
          >
            <Text className={`text-sm font-semibold ${activeTab === 'itinerary' ? 'text-slate-900' : 'text-slate-500'}`}>Itinerary</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <View className="flex-1">
        {activeTab === 'overview' ? renderOverview() : renderItinerary()}
      </View>

      {activeTab === 'overview' && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20 }}>
          <TouchableOpacity className="bg-[#1A6B5A] flex-row items-center justify-center py-4 rounded-2xl gap-2 shadow-xl" activeOpacity={0.8}>
            <Feather name="zap" size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-bold">Generate Itinerary</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
