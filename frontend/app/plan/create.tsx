import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CreateTripScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }} edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 border-b border-slate-200 bg-white">
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-sm"
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-extrabold text-slate-900 mr-10">
          Create Trip
        </Text>
      </View>

      {/* Options List */}
      <ScrollView className="flex-1 px-5 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Where */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm border border-slate-100">
          <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
            <Feather name="map-pin" size={22} color="#64748b" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-slate-500 mb-1">Where?</Text>
            <Text className="text-base font-bold text-slate-900">Pick a destination</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        {/* When (Active State as per Figma) */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm border-2 border-emerald-500">
          <View className="w-12 h-12 rounded-full bg-emerald-100 items-center justify-center mr-4">
            <Feather name="calendar" size={22} color="#059669" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-emerald-600 mb-1">When?</Text>
            <Text className="text-base font-extrabold text-slate-900">4 Days | Apr 23-26</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#059669" />
        </TouchableOpacity>

        {/* Who's going */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm border border-slate-100">
          <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
            <Feather name="users" size={22} color="#64748b" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-slate-500 mb-1">Who's going?</Text>
            <Text className="text-base font-bold text-slate-900">Choose travel type</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        {/* Interests */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm border border-slate-100">
          <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
            <Feather name="star" size={22} color="#64748b" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-slate-500 mb-1">Interests</Text>
            <Text className="text-base font-bold text-slate-900">Add interests</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        {/* Budget */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm border border-slate-100">
          <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4">
            <Ionicons name="wallet-outline" size={24} color="#64748b" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-slate-500 mb-1">Budget</Text>
            <Text className="text-base font-bold text-slate-900">Select a range</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white border-t border-slate-100 px-6 py-4 flex-row justify-between items-center shadow-2xl">
        <TouchableOpacity className="flex-row items-center gap-2 py-3 px-5 rounded-full bg-slate-100">
          <Feather name="x-circle" size={16} color="#64748b" />
          <Text className="text-slate-600 font-bold text-sm">Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center gap-2 py-3 px-8 rounded-full bg-emerald-700 shadow-md">
          <Text className="text-white font-bold text-base">Next</Text>
          <Feather name="chevron-right" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
