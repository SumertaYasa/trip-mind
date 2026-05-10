import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }} edges={['top']}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100"
          onPress={() => {
            if (router.canGoBack()) router.back();
          }}
        >
          <Feather name="chevron-left" size={20} color="#0f172a" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100"
        >
          <Feather name="log-out" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* User Info */}
        <View className="px-6 py-4">
          <View className="w-20 h-20 rounded-full bg-emerald-100 items-center justify-center mb-4 shadow-sm border-2 border-emerald-50">
            <Feather name="user" size={32} color="#059669" />
          </View>
          <Text className="text-3xl font-extrabold text-slate-900 mb-1">Dani Pingge</Text>
          <Text className="text-sm font-medium text-slate-500">danipingge@gmail.com</Text>
        </View>

        {/* Menu Options */}
        <View className="px-6 mt-6">
          <View className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            
            {/* Edit Profile */}
            <TouchableOpacity className="flex-row items-center px-5 py-4 border-b border-slate-100">
              <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-4">
                <Feather name="user" size={18} color="#475569" />
              </View>
              <Text className="flex-1 text-base font-bold text-slate-700">Edit Profile</Text>
              <Feather name="chevron-right" size={18} color="#cbd5e1" />
            </TouchableOpacity>

            {/* Subscription */}
            <TouchableOpacity className="flex-row items-center px-5 py-4 border-b border-slate-100">
              <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-4">
                <Feather name="credit-card" size={18} color="#475569" />
              </View>
              <Text className="flex-1 text-base font-bold text-slate-700">Subscription</Text>
              <Feather name="chevron-right" size={18} color="#cbd5e1" />
            </TouchableOpacity>

            {/* Saved */}
            <TouchableOpacity className="flex-row items-center px-5 py-4 border-b border-slate-100">
              <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-4">
                <Feather name="bookmark" size={18} color="#475569" />
              </View>
              <Text className="flex-1 text-base font-bold text-slate-700">Saved</Text>
              <Feather name="chevron-right" size={18} color="#cbd5e1" />
            </TouchableOpacity>

            {/* About */}
            <TouchableOpacity className="flex-row items-center px-5 py-4">
              <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-4">
                <Feather name="info" size={18} color="#475569" />
              </View>
              <Text className="flex-1 text-base font-bold text-slate-700">About</Text>
              <Feather name="chevron-right" size={18} color="#cbd5e1" />
            </TouchableOpacity>

          </View>
        </View>

        {/* Optional Extra Settings / Danger Zone */}
        <View className="px-6 mt-8">
          <TouchableOpacity className="flex-row items-center px-5 py-4 bg-red-50 rounded-2xl border border-red-100">
            <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4 shadow-sm">
              <Feather name="trash-2" size={18} color="#ef4444" />
            </View>
            <Text className="flex-1 text-base font-bold text-red-600">Delete Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
