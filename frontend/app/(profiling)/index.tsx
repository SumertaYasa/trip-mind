import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  Animated, Image, Platform, Modal, ActivityIndicator, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// ─── Step data ────────────────────────────────────────────────────────────────
const VIBES = ['Beach & Sunset', 'Cultural & Heritage', 'Hidden Gems',
  'Wellness & Yoga', 'Nature & Trekking', 'Local Tastes', 'Photography Spots'];
const PACES = ['Relaxed', 'Balanced', 'Packed'];
const DIETARY = ['Halal Friendly', 'Vegan', 'Vegetarian', 'No Pork',
  'Gluten-Free', 'Seafood Allergy', 'Nut Allergy', 'Dairy-Free'];
const SPICES = ['Non-spicy', 'Mild', 'Hot'];
const PERSONAS = [
  { id: 'zen', icon: '🧘', label: 'The Zen Seeker' },
  { id: 'social', icon: '🦋', label: 'The Social Butterfly' },
  { id: 'culture', icon: '🏛️', label: 'The Culture Geek' },
  { id: 'adrenaline', icon: '🏄', label: 'The Adrenaline Junkie' },
];
const FEATURES = [
  { text: 'Personalised daily itineraries' },
  { text: 'Live traffic & crowd alerts' },
  { text: 'AI-powered hidden gems near you' },
];


const ProgressBar = ({ step }: { step: number }) => (
  <View className="h-1.5 bg-gray-200 rounded-full mb-7 overflow-hidden">
    <View className="h-full bg-[#1A6B5A] rounded-full" style={{ width: `${(step / 5) * 100}%` as any }} />
  </View>
);

const Chip = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-3.5 py-2 rounded-full border-2 ${selected ? 'border-[#1A6B5A] bg-[#1A6B5A]' : 'border-gray-300 bg-white'}`}
  >
    <Text className={`text-[13px] font-semibold ${selected ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
  </TouchableOpacity>
);

const SelectRow = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center px-4 py-4 rounded-2xl border-2 mb-2.5 ${selected ? 'border-[#1A6B5A] bg-[#1A6B5A]' : 'border-gray-200 bg-gray-50'}`}
  >
    <Text className={`text-[15px] font-semibold ${selected ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
    {selected && <Feather name="check" size={16} color="#fff" style={{ marginLeft: 'auto' }} />}
  </TouchableOpacity>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfilingScreen() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [bMonth, setBMonth] = useState('');
  const [bDay, setBDay] = useState('');
  const [bYear, setBYear] = useState('');
  const [vibes, setVibes] = useState<string[]>([]);
  const [pace, setPace] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);
  const [spice, setSpice] = useState('');
  const [persona, setPersona] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');

  const animGo = (next: number) => {
    setStep(next);
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
  };

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) =>
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);

  const handleLocation = async () => { await Location.requestForegroundPermissionsAsync(); animGo(1); };

  const handleNotificationChoice = () => {
    setShowNotif(false);
    setIsLoading(true);
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
  };

  // ── Steps
  const steps = [
    // 0 – Allow Location
    <View key="loc" className="flex-1">
      <Image source={require('../../assets/images/travel_background.png')}
        className="w-full h-[260px]" resizeMode="cover" />
      <View className="flex-1 bg-white rounded-t-[32px] -mt-8 px-7 pt-7 pb-6">
        <View className="w-[52px] h-[52px] rounded-2xl bg-[#E8F0EE] items-center justify-center mb-4">
          <Ionicons name="location" size={28} color="#1A6B5A" />
        </View>
        <Text className="text-[22px] font-extrabold text-gray-900 mb-2.5 leading-[30px]">Hey traveler! Let's see where you are.</Text>
        <Text className="text-sm text-gray-500 leading-[22px] mb-4">By knowing your location, our AI can tailor your day with the best nearby gems and keep you out of traffic.</Text>
        <View className="h-px bg-gray-200 my-3" />
        <Text className="text-xs text-gray-400 leading-[18px] mt-2.5">🔒 We don't store or sell your location data.</Text>
      </View>
    </View>,

    // 1 – Name & Birthday
    <View key="s1" className="px-6 pt-5 pb-6">
      <ProgressBar step={1} />
      <Text className="text-[22px] font-extrabold text-gray-900 mb-2.5 leading-[30px]">Hey traveler! Let's start something easy.</Text>
      <Text className="text-sm font-bold text-gray-700 mb-1">What should I call you?</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#111827', backgroundColor: '#FAFAFA', marginBottom: 4 }}
        placeholder="Call me..." placeholderTextColor="#9CA3AF"
        value={name} onChangeText={setName}
      />
      <Text className="text-sm font-bold text-gray-700 mb-1 mt-5">May I know your birthday?</Text>
      <Text className="text-xs text-gray-400 mb-2.5">Month / Day / Year</Text>
      <View className="flex-row gap-2.5">
        {[{ v: bMonth, s: setBMonth, ph: 'MM', ml: 2 }, { v: bDay, s: setBDay, ph: 'DD', ml: 2 }, { v: bYear, s: setBYear, ph: 'YYYY', ml: 4 }].map((f, i) => (
          <TextInput key={i}
            style={{
              flex: i === 2 ? 2 : 1,
              borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12,
              paddingHorizontal: 16, paddingVertical: 14,
              fontSize: 15, color: '#111827', backgroundColor: '#FAFAFA',
              marginBottom: 4, textAlign: 'center',
            }}
            placeholder={f.ph} placeholderTextColor="#9CA3AF"
            keyboardType="number-pad" maxLength={f.ml}
            value={f.v} onChangeText={f.s}
          />
        ))}
      </View>
      <Text className="text-xs text-gray-400 leading-[18px] mt-2.5">ℹ️ We use this to find travel spots that fit you.</Text>
    </View>,

    // 2 – Vibe & Pace
    <View key="s2" className="px-6 pt-5 pb-6">
      <ProgressBar step={2} />
      <Text className="text-[22px] font-extrabold text-gray-900 mb-2.5 leading-[30px]">{name ? `${name} is a great name, traveler` : 'Great name, traveler'}</Text>
      <Text className="text-sm text-gray-500 leading-[22px] mb-4">Pick a few things you enjoy so we can find the perfect spots.</Text>
      <Text className="text-sm font-bold text-gray-700 mb-1">What's your ideal vibe?</Text>
      <Text className="text-xs text-gray-400 mb-2.5">✓ Pick as many as you want.</Text>
      <View className="flex-row flex-wrap gap-2 mb-1">
        {VIBES.map(v => <Chip key={v} label={v} selected={vibes.includes(v)} onPress={() => toggle(vibes, setVibes, v)} />)}
      </View>
      <Text className="text-sm font-bold text-gray-700 mb-1 mt-5">How fast do you like to move?</Text>
      {PACES.map(p => <SelectRow key={p} label={p} selected={pace === p} onPress={() => setPace(p)} />)}
    </View>,

    // 3 – Dietary & Spice
    <View key="s3" className="px-6 pt-5 pb-6">
      <ProgressBar step={3} />
      <Text className="text-[22px] font-extrabold text-gray-900 mb-2.5 leading-[30px]">Eat well, travel better.</Text>
      <Text className="text-sm text-gray-500 leading-[22px] mb-4">Tell us about any dietary preferences or allergies.</Text>
      <Text className="text-sm font-bold text-gray-700 mb-1">Any specific diet or allergies?</Text>
      <Text className="text-xs text-gray-400 mb-2.5">✓ Pick as many as you need.</Text>
      <View className="flex-row flex-wrap gap-2 mb-1">
        {DIETARY.map(d => <Chip key={d} label={d} selected={dietary.includes(d)} onPress={() => toggle(dietary, setDietary, d)} />)}
      </View>
      <Text className="text-sm font-bold text-gray-700 mb-1 mt-5">How's your spice tolerance?</Text>
      {SPICES.map(sp => <SelectRow key={sp} label={sp} selected={spice === sp} onPress={() => setSpice(sp)} />)}
    </View>,

    // 4 – Persona
    <View key="s4" className="px-6 pt-5 pb-6">
      <ProgressBar step={4} />
      <Text className="text-[22px] font-extrabold text-gray-900 mb-2.5 leading-[30px]">What's your travel persona?</Text>
      <Text className="text-sm text-gray-500 leading-[22px] mb-4">Tell us your style so our AI knows exactly what to look for.</Text>
      {PERSONAS.map(p => (
        <TouchableOpacity
          key={p.id}
          onPress={() => setPersona(p.id)}
          className={`flex-row items-center px-4 py-4 rounded-2xl border-2 mb-2.5 ${persona === p.id ? 'border-[#1A6B5A] bg-[#1A6B5A]' : 'border-gray-200 bg-gray-50'}`}
        >
          <Text style={{ fontSize: 20, marginRight: 12 }}>{p.icon}</Text>
          <Text className={`text-[15px] font-semibold ${persona === p.id ? 'text-white' : 'text-gray-700'}`}>{p.label}</Text>
          {persona === p.id && <Feather name="check" size={16} color="#fff" style={{ marginLeft: 'auto' }} />}
        </TouchableOpacity>
      ))}
    </View>,

    // 5 – All Set
    <View key="s5" className="px-6 pt-5 pb-6">
      <ProgressBar step={5} />
      <Text style={{ fontSize: 56, textAlign: 'center', marginBottom: 16 }}>🎉</Text>
      <Text className="text-[22px] font-extrabold text-gray-900 mb-2.5 leading-[30px]">You're all set{name ? `, ${name}` : ''}!</Text>
      <Text className="text-sm text-gray-500 leading-[22px] mb-4">Your profile is ready and our AI is already mapping out some magic for you.</Text>
      <View className="bg-[#E8F0EE] rounded-2xl p-5 mb-4 gap-3">
        {FEATURES.map(f => (
          <View key={f.text} className="flex-row items-center gap-2.5">
            <Text className="text-sm font-semibold text-[#1A6B5A]">{f.text}</Text>
          </View>
        ))}
      </View>
      <Text className="text-xs text-gray-400 leading-[18px] mt-5">Just a heads-up: tapping the button below will prompt a request to enable notifications, so we can send you real-time trip updates.</Text>
    </View>,
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom']}>
      <View className="flex-1">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {steps.map((content, index) => (
            <ScrollView
              key={index}
              style={{ width }}
              contentContainerStyle={index === 0 ? { flexGrow: 1 } : { paddingBottom: 32 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {content}
            </ScrollView>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Nav */}
      <View className="flex-row items-center px-6 py-3 border-t border-gray-100 bg-white gap-3">
        {step > 0 && step < 5 && (
          <TouchableOpacity className="w-12 h-12 rounded-2xl border-2 border-gray-200 items-center justify-center bg-white" onPress={() => animGo(step - 1)}>
            <Feather name="arrow-left" size={20} color="#1A6B5A" />
          </TouchableOpacity>
        )}

        {step === 0 && (
          <TouchableOpacity className="flex-1 flex-row bg-[#1A6B5A] rounded-2xl py-3.5 items-center justify-center" onPress={handleLocation}>
            <Ionicons name="location-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white text-base font-bold">Allow location</Text>
          </TouchableOpacity>
        )}

        {step >= 1 && step <= 4 && (
          <TouchableOpacity className="flex-1 bg-[#1A6B5A] rounded-2xl py-3.5 items-center justify-center" onPress={() => animGo(step + 1)}>
            <Text className="text-white text-base font-bold">Next</Text>
          </TouchableOpacity>
        )}

        {step === 5 && (
          <TouchableOpacity className="flex-1 bg-[#1A6B5A] rounded-2xl py-3.5 items-center justify-center" onPress={() => setShowNotif(true)}>
            <Text className="text-white text-base font-bold">Start Exploring</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notification Modal */}
      <Modal visible={showNotif} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className={`bg-white rounded-t-[32px] p-6 ${Platform.OS === 'ios' ? 'pb-10' : 'pb-6'}`}>
            <View className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-1">
              <View className="flex-row justify-between mb-1.5">
                <Text className="text-[13px] font-bold text-[#1A6B5A]">TripMind</Text>
                <Text className="text-xs text-gray-400">now</Text>
              </View>
              <Text className="text-[15px] font-bold text-gray-900 mb-1">Good morning{name ? `, ${name}` : ''}. ☀️</Text>
              <Text className="text-[13px] text-gray-500 leading-5">3 top destinations mapped for today. Ready to explore?</Text>
            </View>

            <Text className="text-[22px] font-extrabold text-gray-900 mb-2.5 leading-[30px] mt-6 text-center">Don't miss a beat{name ? `, ${name}` : ''}!</Text>
            <Text className="text-sm text-gray-500 leading-[22px] mb-6 text-center">Get real-time updates on your itinerary, live traffic alerts, and AI-powered hidden gems as you explore Bali.</Text>

            <TouchableOpacity className="bg-[#1A6B5A] rounded-2xl py-3.5 items-center justify-center" onPress={handleNotificationChoice}>
              <Text className="text-white text-base font-bold">Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3.5 items-center mt-2" onPress={handleNotificationChoice}>
              <Text className="text-gray-500 text-[15px] font-semibold">Not Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fullscreen Loading Overlay */}
      {isLoading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} className="bg-white/95 justify-center items-center z-[999]">
          <ActivityIndicator size="large" color="#1A6B5A" />
          <Text className="mt-4 text-base font-semibold text-[#1A6B5A]">AI is personalizing your journey...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
