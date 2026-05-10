import React, { useRef, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Image,
  Dimensions, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Palette as C } from '@/constants/palette';

const { width: SW } = Dimensions.get('window');
const H_PAD = 16;
const SLIDE_W = SW - H_PAD * 2;

// ── Placeholder data (swap with real data later) ──────────────────────────────
const HERO_SLIDES = [
  { id: '1', title: 'Travel Without Limits.', sub: "Discover Bali's hidden gems", bg: '#1A6B5A' },
  { id: '2', title: 'Explore Ancient Temples.', sub: 'Immerse in rich culture', bg: '#1A4A6B' },
  { id: '3', title: 'Taste Local Flavors.', sub: 'Authentic culinary journeys', bg: '#6B3A1A' },
];

const WISATA_PLACES = [
  { id: '1', name: 'Tegallalang\nRice Terraces', bg: '#7FAD93' },
  { id: '2', name: 'Sacred\nMonkey Forest', bg: '#AD8F7F' },
  { id: '3', name: 'Uluwatu Temple', bg: '#7F90AD' },
];

const KULINER_PLACES = [
  { id: '1', name: 'Babi Guling\nPak Malen', bg: '#C28383' },
  { id: '2', name: 'Ayam Betutu\nMen Weti', bg: '#C2A383' },
  { id: '3', name: 'Sate Lilit\nWarung Ari', bg: '#83C2A3' },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<ScrollView>(null);

  const onHeroScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SLIDE_W);
    setActiveSlide(idx);
  };

  return (
    <>
      {/* ── DEV bar ─────────────────────────────────────────────────────── */}
      <SafeAreaView edges={['top']} className="flex-row items-center bg-slate-800 px-3 py-2">
        <Text className="text-amber-500 text-[11px] font-extrabold tracking-widest mr-2">DEV</Text>
        <TouchableOpacity className="flex-row items-center bg-slate-700 px-2.5 py-1.5 rounded-lg mr-2" onPress={() => router.replace('/(profiling)')}>
          <Feather name="arrow-left" size={14} color="#fff" className="mr-1.5" />
          <Text className="text-white text-xs font-semibold">Profiling</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-slate-700 px-2.5 py-1.5 rounded-lg" onPress={() => router.replace('/(auth)/login')}>
          <Feather name="log-out" size={14} color="#fff" className="mr-1.5" />
          <Text className="text-white text-xs font-semibold">Login</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingHorizontal: H_PAD, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <View className="flex-row items-center justify-between py-3.5 px-1 bg-gray-50 border-b border-slate-200 relative">
          {/* Kiri: map icon */}
          <View className="w-11 items-center justify-center">
            <Ionicons name="map-outline" size={26} color={C.primary} />
          </View>

          {/* Tengah: TripMind + logo */}
          <View className="absolute left-0 right-0 flex-row items-center justify-center pointer-events-none">
            <Text className="text-xl font-extrabold tracking-tight" style={{ color: C.primary }}>TripMind</Text>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 60, height: 60, tintColor: C.primary }}
              resizeMode="contain"
            />
          </View>

          {/* Kanan: avatar bulat */}
          <TouchableOpacity className="w-11 items-center justify-center">
            <View className="w-9 h-9 rounded-full items-center justify-center overflow-hidden" style={{ backgroundColor: C.primary }}>
              <Ionicons name="person" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Search bar ────────────────────────────────────────────────── */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 border border-gray-200 mt-4 mb-4">
          <Ionicons name="search-outline" size={18} color={C.textFaint} className="mr-2.5" />
          <TextInput
            className="flex-1 text-sm text-gray-800"
            placeholder="Cari destinasi wisata atau kuliner..."
            placeholderTextColor={C.textFaint}
          />
        </View>

        {/* ── Hero Swiper ───────────────────────────────────────────────── */}
        <ScrollView
          ref={heroRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onHeroScroll}
          className="-mx-4"
          decelerationRate="fast"
          snapToInterval={SLIDE_W}
          snapToAlignment="start"
        >
          {HERO_SLIDES.map((slide) => (
            <View key={slide.id} className="h-44 rounded-2xl mx-4 justify-end p-5 overflow-hidden" style={{ width: SLIDE_W, backgroundColor: slide.bg }}>
              <Text className="text-white text-2xl font-extrabold leading-7">{slide.title}</Text>
              <Text className="text-white/80 text-sm mt-1">{slide.sub}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Dots */}
        <View className="flex-row justify-center mt-3 mb-6">
          {HERO_SLIDES.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full mx-1 ${i === activeSlide ? 'w-5' : 'w-1.5'}`}
              style={{ backgroundColor: i === activeSlide ? C.primary : C.border }}
            />
          ))}
        </View>

        {/* ── Destinasi Wisata Pilihan ─────────────────────────────────────── */}
        <View className="flex-row justify-between items-center mb-3 mt-2">
          <Text className="text-lg font-bold text-gray-800">Destinasi Wisata Pilihan</Text>
          <TouchableOpacity><Text className="text-sm font-semibold" style={{ color: C.primary }}>Lihat semua</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-0.5 mb-6" contentContainerStyle={{ paddingRight: 16 }}>
          {WISATA_PLACES.map((p) => (
            <TouchableOpacity key={p.id} className="w-40 h-28 rounded-2xl overflow-hidden justify-end mr-3" style={{ backgroundColor: p.bg }}>
              <View className="bg-black/30 p-3">
                <Text className="text-white font-bold text-sm">{p.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Rekomendasi Kuliner ─────────────────────────────────────────── */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-gray-800">Rekomendasi Kuliner</Text>
          <TouchableOpacity><Text className="text-sm font-semibold" style={{ color: C.primary }}>Lihat semua</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-0.5 mb-6" contentContainerStyle={{ paddingRight: 16 }}>
          {KULINER_PLACES.map((p) => (
            <TouchableOpacity key={p.id} className="w-40 h-28 rounded-2xl overflow-hidden justify-end mr-3" style={{ backgroundColor: p.bg }}>
              <View className="bg-black/30 p-3">
                <Text className="text-white font-bold text-sm">{p.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    </>
  );
}
