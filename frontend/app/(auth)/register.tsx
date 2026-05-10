import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ImageBackground, KeyboardAvoidingView, Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import VerificationModal from '../../components/VerificationModal';

export default function RegisterScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Hero image */}
      <View style={{ height: '45%' }}>
        <ImageBackground
          source={require('../../assets/images/travel_background.png')}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <SafeAreaView edges={['top']} style={{ paddingHorizontal: 24, paddingTop: 24 }}>
            <Text className="text-[#1A6B5A] text-[28px] font-extrabold tracking-tight">TripMind</Text>
          </SafeAreaView>
        </ImageBackground>
      </View>

      {/* Form area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, marginTop: -40 }}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: '#F8FAFC', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          contentContainerStyle={{ paddingHorizontal: 32, paddingTop: 32, paddingBottom: 40 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Tabs */}
          <View className="flex-row items-center mb-8 gap-6">
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text className="text-[22px] font-bold text-[#64748B]">Log In</Text>
            </TouchableOpacity>
            <View className="items-center">
              <Text className="text-[22px] font-bold text-[#0F172A] mb-1">Sign up</Text>
              <View className="h-1 w-6 bg-[#1A6B5A] rounded-full" />
            </View>
          </View>

          {/* Email */}
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 border border-[#E2E8F0]">
            <Feather name="mail" size={20} color="#64748B" />
            <TextInput
              style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#0F172A' }}
              placeholder="Email Address"
              placeholderTextColor="#64748B"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 border border-[#E2E8F0] mt-3">
            <Feather name="lock" size={20} color="#64748B" />
            <TextInput
              style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#0F172A' }}
              placeholder="Password"
              placeholderTextColor="#64748B"
              secureTextEntry
            />
          </View>

          {/* Confirm Password */}
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 border border-[#E2E8F0] mt-3">
            <Feather name="lock" size={20} color="#64748B" />
            <TextInput
              style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#0F172A' }}
              placeholder="Confirm Password"
              placeholderTextColor="#64748B"
              secureTextEntry
            />
          </View>

          {/* Sign up */}
          <TouchableOpacity className="bg-[#1A6B5A] py-4 rounded-2xl items-center mt-7" onPress={() => setModalVisible(true)}>
            <Text className="text-white font-bold text-base">Sign up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-7">
            <View className="flex-1 h-px bg-[#E2E8F0]" />
            <Text className="mx-3 text-[#64748B] text-sm">Or continue with</Text>
            <View className="flex-1 h-px bg-[#E2E8F0]" />
          </View>

          {/* Social */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white py-3.5 rounded-2xl border border-[#E2E8F0] gap-2">
              <FontAwesome5 name="facebook" size={20} color="#1877F2" />
              <Text className="font-bold text-[#0F172A] text-sm">Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white py-3.5 rounded-2xl border border-[#E2E8F0] gap-2">
              <AntDesign name="google" size={20} color="#EA4335" />
              <Text className="font-bold text-[#0F172A] text-sm">Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onVerify={() => { setModalVisible(false); router.replace('/(profiling)'); }}
        email="hello@tripmind.com"
      />
    </View>
  );
}
