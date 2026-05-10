import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const MOCK_PLANS = [
  {
    id: '1',
    title: '7 Day Bali Trip',
    date: 'May 2, 2026',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Tokyo Exploration',
    date: 'Sep 10, 2026',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80'
  },
];

export default function MyPlansScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }} edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm"
          onPress={() => { if (router.canGoBack()) router.back(); }}
        >
          <Feather name="chevron-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">My Plans</Text>
        <View style={{ width: 40 }} />
      </View>

      <View className="flex-row items-center bg-white mx-4 my-3 rounded-2xl px-4 h-[52px] shadow-sm">
        <Feather name="search" size={20} color="#94A3B8" style={{ marginRight: 12 }} />
        <TextInput
          style={{ flex: 1, fontSize: 16, color: '#0F172A' }}
          placeholder="Your next destination..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View className="flex-row px-4 gap-3 mb-4">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white py-3 rounded-xl gap-2 border border-slate-200">
          <Feather name="filter" size={16} color="#64748B" />
          <Text className="text-[15px] font-semibold text-slate-500">Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white py-3 rounded-xl gap-2 border border-slate-200">
          <Feather name="git-commit" size={16} color="#64748B" style={{ transform: [{ rotate: '90deg' }] }} />
          <Text className="text-[15px] font-semibold text-slate-500">Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Create New Trip Button */}
      <View className="px-4 mb-5">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-emerald-700 py-3.5 rounded-2xl gap-2 shadow-sm"
          onPress={() => router.push('/plan/create')}
        >
          <Feather name="plus" size={18} color="#FFFFFF" />
          <Text className="text-white font-bold text-base">Create New Trip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
            activeOpacity={0.8}
            onPress={() => router.push(`/plan/${plan.id}`)}
          >
            <Image source={{ uri: plan.image }} className="w-full h-[180px]" />
            <View className="p-4">
              <Text className="text-lg font-bold text-slate-900 mb-1">{plan.title}</Text>
              <View className="flex-row items-center gap-1.5">
                <Feather name="calendar" size={14} color="#94A3B8" />
                <Text className="text-sm font-medium text-slate-500">{plan.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
