import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  Animated, StyleSheet, Image, Platform, Modal, ActivityIndicator, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Palette as C } from '@/constants/palette';


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

// ─── Tiny reusable components ─────────────────────────────────────────────────
const ProgressBar = ({ step }: { step: number }) => (
  <View style={s.progressTrack}>
    <View style={[s.progressFill, { width: `${(step / 5) * 100}%` as any }]} />
  </View>
);

const Chip = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[s.chip, selected && s.chipOn]}>
    <Text style={[s.chipTxt, selected && s.chipTxtOn]}>{label}</Text>
  </TouchableOpacity>
);

const SelectRow = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[s.row, selected && s.rowOn]}>
    <Text style={[s.rowTxt, selected && s.rowTxtOn]}>{label}</Text>
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
    // Fake delay for AI processing
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
  };

  // ── Steps 
  const steps = [
    // 0 – Allow Location
    <View key="loc" style={s.flex1}>
      <Image source={require('../../assets/images/travel_background.png')}
        style={s.locBg} resizeMode="cover" />
      <View style={s.locCard}>
        <View style={s.locIconBg}><Ionicons name="location" size={28} color={C.primary} /></View>
        <Text style={s.h1}>Hey traveler! Let's see where you are.</Text>
        <Text style={s.body}>By knowing your location, our AI can tailor your day with the best nearby gems and keep you out of traffic.</Text>
        <View style={s.divider} />
        <Text style={s.hint}>🔒 We don't store or sell your location data.</Text>
      </View>
    </View>,

    // 1 – Name & Birthday
    <View key="s1" style={s.pad}>
      <ProgressBar step={1} />
      <Text style={s.h1}>Hey traveler! Let's start something easy.</Text>
      <Text style={s.label}>What should I call you?</Text>
      <TextInput style={s.input} placeholder="Call me..." placeholderTextColor="#9CA3AF"
        value={name} onChangeText={setName} />
      <Text style={[s.label, { marginTop: 20 }]}>May I know your birthday?</Text>
      <Text style={s.sub}>Month / Day / Year</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {[{ v: bMonth, s: setBMonth, ph: 'MM', ml: 2 }, { v: bDay, s: setBDay, ph: 'DD', ml: 2 }, { v: bYear, s: setBYear, ph: 'YYYY', ml: 4 }].map((f, i) => (
          <TextInput key={i} style={[s.input, { flex: i === 2 ? 2 : 1, textAlign: 'center' }]}
            placeholder={f.ph} placeholderTextColor="#9CA3AF"
            keyboardType="number-pad" maxLength={f.ml}
            value={f.v} onChangeText={f.s} />
        ))}
      </View>
      <Text style={s.hint}>ℹ️ We use this to find travel spots that fit you.</Text>
    </View>,

    // 2 – Vibe & Pace
    <View key="s2" style={s.pad}>
      <ProgressBar step={2} />
      <Text style={s.h1}>{name ? `${name} is a great name, traveler` : 'Great name, traveler'}</Text>
      <Text style={s.body}>Pick a few things you enjoy so we can find the perfect spots.</Text>
      <Text style={s.label}>What's your ideal vibe?</Text>
      <Text style={s.sub}>✓ Pick as many as you want.</Text>
      <View style={s.chipWrap}>
        {VIBES.map(v => <Chip key={v} label={v} selected={vibes.includes(v)} onPress={() => toggle(vibes, setVibes, v)} />)}
      </View>
      <Text style={[s.label, { marginTop: 20 }]}>How fast do you like to move?</Text>
      {PACES.map(p => <SelectRow key={p} label={p} selected={pace === p} onPress={() => setPace(p)} />)}
    </View>,

    // 3 – Dietary & Spice
    <View key="s3" style={s.pad}>
      <ProgressBar step={3} />
      <Text style={s.h1}>Eat well, travel better.</Text>
      <Text style={s.body}>Tell us about any dietary preferences or allergies.</Text>
      <Text style={s.label}>Any specific diet or allergies?</Text>
      <Text style={s.sub}>✓ Pick as many as you need.</Text>
      <View style={s.chipWrap}>
        {DIETARY.map(d => <Chip key={d} label={d} selected={dietary.includes(d)} onPress={() => toggle(dietary, setDietary, d)} />)}
      </View>
      <Text style={[s.label, { marginTop: 20 }]}>How's your spice tolerance?</Text>
      {SPICES.map(sp => <SelectRow key={sp} label={sp} selected={spice === sp} onPress={() => setSpice(sp)} />)}
    </View>,

    // 4 – Persona
    <View key="s4" style={s.pad}>
      <ProgressBar step={4} />
      <Text style={s.h1}>What's your travel persona?</Text>
      <Text style={s.body}>Tell us your style so our AI knows exactly what to look for.</Text>
      {PERSONAS.map(p => (
        <TouchableOpacity key={p.id} onPress={() => setPersona(p.id)} style={[s.row, persona === p.id && s.rowOn]}>
          <Text style={{ fontSize: 20, marginRight: 12 }}>{p.icon}</Text>
          <Text style={[s.rowTxt, persona === p.id && s.rowTxtOn]}>{p.label}</Text>
          {persona === p.id && <Feather name="check" size={16} color="#fff" style={{ marginLeft: 'auto' }} />}
        </TouchableOpacity>
      ))}
    </View>,

    // 5 – All Set
    <View key="s5" style={s.pad}>
      <ProgressBar step={5} />
      <Text style={{ fontSize: 56, textAlign: 'center', marginBottom: 16 }}>🎉</Text>
      <Text style={s.h1}>You're all set{name ? `, ${name}` : ''}!</Text>
      <Text style={s.body}>Your profile is ready and our AI is already mapping out some magic for you.</Text>
      <View style={s.featureBox}>
        {FEATURES.map(f => (
          <View key={f.text} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontSize: 20 }}>{f.icon}</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: C.primary }}>{f.text}</Text>
          </View>
        ))}
      </View>
      <Text style={[s.hint, { marginTop: 20 }]}>Just a heads-up: tapping the button below will prompt a request to enable notifications, so we can send you real-time trip updates.</Text>
    </View>,
  ];

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.flex1}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={s.flex1}
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

      {/* Consistent Bottom Nav */}
      <View style={s.nav}>
        {step > 0 && step < 5 && (
          <TouchableOpacity style={s.backBtn} onPress={() => animGo(step - 1)}>
            <Feather name="arrow-left" size={20} color={C.primary} />
          </TouchableOpacity>
        )}

        {step === 0 && (
          <TouchableOpacity style={[s.nextBtn, { flexDirection: 'row', justifyContent: 'center' }]} onPress={handleLocation}>
            <Ionicons name="location-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={s.btnTxt}>Allow location</Text>
          </TouchableOpacity>
        )}

        {step >= 1 && step <= 4 && (
          <TouchableOpacity style={s.nextBtn} onPress={() => animGo(step + 1)}>
            <Text style={s.btnTxt}>Next</Text>
          </TouchableOpacity>
        )}

        {step === 5 && (
          <TouchableOpacity style={s.nextBtn} onPress={() => setShowNotif(true)}>
            <Text style={s.btnTxt}>Start Exploring</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notification Modal */}
      <Modal visible={showNotif} transparent animationType="slide">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <View style={s.notifCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: C.primary }}>TripMind</Text>
                <Text style={{ fontSize: 12, color: '#9CA3AF' }}>now</Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 }}>Good morning{name ? `, ${name}` : ''}. ☀️</Text>
              <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20 }}>3 top destinations mapped for today. Ready to explore?</Text>
            </View>

            <Text style={[s.h1, { marginTop: 24, textAlign: 'center' }]}>Don't miss a beat{name ? `, ${name}` : ''}!</Text>
            <Text style={[s.body, { textAlign: 'center', marginBottom: 24 }]}>Get real-time updates on your itinerary, live traffic alerts, and AI-powered hidden gems as you explore Bali.</Text>

            <TouchableOpacity style={s.btn} onPress={handleNotificationChoice}>
              <Text style={s.btnTxt}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 14, alignItems: 'center', marginTop: 8 }} onPress={handleNotificationChoice}>
              <Text style={{ color: '#6B7280', fontSize: 15, fontWeight: '600' }}>Not Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fullscreen Loading Overlay */}
      {isLoading && (
        <View style={s.loadingOverlay}>
          <ActivityIndicator size="large" color={C.primary} />
          <Text style={s.loadingText}>AI is personalizing your journey...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── Styles 
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  flex1: { flex: 1 },
  pad: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24 },

  // Location
  locBg: { width: '100%', height: 260 },
  locCard: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -32, paddingHorizontal: 28, paddingTop: 28, paddingBottom: 24 },
  locIconBg: { width: 52, height: 52, borderRadius: 16, backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },

  // Typography
  h1: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 10, lineHeight: 30 },
  body: { fontSize: 14, color: '#6B7280', lineHeight: 22, marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 4 },
  sub: { fontSize: 12, color: '#9CA3AF', marginBottom: 10 },
  hint: { fontSize: 12, color: '#9CA3AF', lineHeight: 18, marginTop: 10 },

  // Inputs
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#111827', backgroundColor: '#FAFAFA', marginBottom: 4 },

  // Chips
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: '#D1D5DB', backgroundColor: '#fff' },
  chipOn: { borderColor: C.primary, backgroundColor: C.primary },
  chipTxt: { fontSize: 13, fontWeight: '600', color: '#374151' },
  chipTxtOn: { color: '#fff' },

  // Select rows
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 16, borderRadius: 14, borderWidth: 1.5, borderColor: '#E5E7EB', backgroundColor: '#FAFAFA', marginBottom: 10 },
  rowOn: { borderColor: C.primary, backgroundColor: C.primary },
  rowTxt: { fontSize: 15, fontWeight: '600', color: '#374151' },
  rowTxtOn: { color: '#fff' },

  // Feature box & notif card
  featureBox: { backgroundColor: C.primaryLight, borderRadius: 16, padding: 18, marginBottom: 16, gap: 12 },
  notifCard: { backgroundColor: '#F9FAFB', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },

  // Progress
  progressTrack: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, marginBottom: 28, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: C.primary, borderRadius: 3 },

  // Buttons
  btn: { backgroundColor: C.primary, borderRadius: 14, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  btnTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // Nav bar
  nav: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: '#fff', gap: 12 },
  backBtn: { width: 48, height: 48, borderRadius: 14, borderWidth: 1.5, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  nextBtn: { flex: 1, backgroundColor: C.primary, borderRadius: 14, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },

  // Modals & Overlays
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.95)', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
  loadingText: { marginTop: 16, fontSize: 16, fontWeight: '600', color: C.primary },
});
