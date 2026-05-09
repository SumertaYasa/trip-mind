import React, { useRef, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Image,
  StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Palette as C } from '@/constants/palette';

const { width: SW } = Dimensions.get('window');
const H_PAD   = 16;
const SLIDE_W = SW - H_PAD * 2;

// ── Placeholder data (swap with real data later) ──────────────────────────────
const HERO_SLIDES = [
  { id: '1', title: 'Travel Without Limits.',   sub: "Discover Bali's hidden gems",    bg: '#1A6B5A' },
  { id: '2', title: 'Explore Ancient Temples.',  sub: 'Immerse in rich culture',        bg: '#1A4A6B' },
  { id: '3', title: 'Taste Local Flavors.',      sub: 'Authentic culinary journeys',    bg: '#6B3A1A' },
];

const CITIES = [
  { id: '1', name: 'Ubud',     bg: '#8BBFA0' },
  { id: '2', name: 'Seminyak', bg: '#8BAABF' },
  { id: '3', name: 'Canggu',   bg: '#BFA88B' },
  { id: '4', name: 'Sanur',    bg: '#A88BBF' },
];

const TOP_PLACES = [
  { id: '1', name: 'Tegallalang\nRice Terraces', bg: '#7FAD93' },
  { id: '2', name: 'Sacred\nMonkey Forest',       bg: '#AD8F7F' },
  { id: '3', name: 'Uluwatu Temple',              bg: '#7F90AD' },
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
      <SafeAreaView edges={['top']} style={s.devBar}>
        <Text style={s.devLabel}>DEV</Text>
        <TouchableOpacity style={s.devBtn} onPress={() => router.replace('/(profiling)')}>
          <Feather name="arrow-left" size={14} color="#fff" />
          <Text style={s.devBtnTxt}>Profiling</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.devBtn} onPress={() => router.replace('/(auth)/login')}>
          <Feather name="log-out" size={14} color="#fff" />
          <Text style={s.devBtnTxt}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView style={s.root} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <View style={s.header}>
          {/* Kiri: map icon */}
          <View style={s.headerSide}>
            <Ionicons name="map-outline" size={26} color={C.primary} />
          </View>

          {/* Tengah: TripMind + logo */}
          <View style={s.headerCenter}>
            <Text style={s.brandTxt}>TripMind</Text>
            <Image
              source={require('../../assets/images/logo.png')}
              style={s.headerLogo}
              resizeMode="contain"
            />
          </View>

          {/* Kanan: avatar bulat */}
          <TouchableOpacity style={s.headerSide}>
            <View style={s.avatarCircle}>
              <Ionicons name="person" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Search bar ────────────────────────────────────────────────── */}
        <View style={s.searchBar}>
          <Ionicons name="search-outline" size={18} color={C.textFaint} />
          <TextInput
            style={s.searchInput}
            placeholder="Your next destination..."
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
          style={s.heroScroll}
          decelerationRate="fast"
          snapToInterval={SLIDE_W}
          snapToAlignment="start"
        >
          {HERO_SLIDES.map((slide) => (
            <View key={slide.id} style={[s.heroSlide, { backgroundColor: slide.bg }]}>
              <Text style={s.heroTitle}>{slide.title}</Text>
              <Text style={s.heroSub}>{slide.sub}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Dots */}
        <View style={s.dotsRow}>
          {HERO_SLIDES.map((_, i) => (
            <View key={i} style={[s.dot, i === activeSlide && s.dotActive]} />
          ))}
        </View>

        {/* ── Suggested Cities ──────────────────────────────────────────── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Suggested Cities</Text>
          <TouchableOpacity><Text style={s.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hList}>
          {CITIES.map((c) => (
            <TouchableOpacity key={c.id} style={[s.cityCard, { backgroundColor: c.bg }]}>
              <View style={s.cityCardOverlay}>
                <Text style={s.cityName}>{c.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Top Must Visit Places ─────────────────────────────────────── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Top Must Visit Places</Text>
          <TouchableOpacity><Text style={s.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hList}>
          {TOP_PLACES.map((p) => (
            <TouchableOpacity key={p.id} style={[s.placeCard, { backgroundColor: p.bg }]}>
              <View style={s.cityCardOverlay}>
                <Text style={s.cityName}>{p.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root:         { flex: 1, backgroundColor: '#F9FAFB' },
  content:      { paddingHorizontal: H_PAD, paddingBottom: 110 },

  // Header
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 4, backgroundColor: '#F9FAFB', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', position: 'relative' },
  headerSide:   { width: 44, alignItems: 'center', justifyContent: 'center' },
  headerCenter: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0, pointerEvents: 'none' },
  headerLogo:   { width: 60, height: 60, tintColor: C.primary },
  brandTxt:     { fontSize: 20, fontWeight: '800', color: C.primary, letterSpacing: -0.3 },
  avatarCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },

  // Search
  searchBar:    { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: C.border, marginBottom: 18, gap: 10 },
  searchInput:  { flex: 1, fontSize: 14, color: C.textPrimary },

  // Hero swiper
  heroScroll:   { marginHorizontal: -H_PAD },
  heroSlide:    { width: SLIDE_W, height: 180, borderRadius: 18, marginHorizontal: H_PAD, justifyContent: 'flex-end', padding: 20, overflow: 'hidden' },
  heroTitle:    { fontSize: 22, fontWeight: '800', color: '#fff', lineHeight: 28 },
  heroSub:      { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },

  // Dots
  dotsRow:      { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12, marginBottom: 24 },
  dot:          { width: 6, height: 6, borderRadius: 3, backgroundColor: C.border },
  dotActive:    { width: 18, backgroundColor: C.primary },

  // Sections
  sectionHeader:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: C.textPrimary },
  seeAll:       { fontSize: 13, color: C.primary, fontWeight: '600' },
  hList:        { paddingLeft: 2, paddingRight: H_PAD, gap: 12, marginBottom: 24 },

  // City cards
  cityCard:     { width: 110, height: 130, borderRadius: 16, overflow: 'hidden', justifyContent: 'flex-end' },
  cityCardOverlay: { backgroundColor: 'rgba(0,0,0,0.28)', padding: 10 },
  cityName:     { color: '#fff', fontWeight: '700', fontSize: 13 },

  // Place cards (wider)
  placeCard:    { width: 160, height: 110, borderRadius: 16, overflow: 'hidden', justifyContent: 'flex-end' },

  // DEV bar
  devBar:       { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  devLabel:     { color: '#f59e0b', fontSize: 11, fontWeight: '800', letterSpacing: 1, marginRight: 4 },
  devBtn:       { flexDirection: 'row', alignItems: 'center', backgroundColor: '#334155', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, gap: 5 },
  devBtnTxt:    { color: '#fff', fontSize: 12, fontWeight: '600' },
});
