import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette as C } from '@/constants/palette';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.center}>
        <Text style={s.title}>Profile</Text>
        <Text style={s.sub}>Your profile will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center:    { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title:     { fontSize: 24, fontWeight: '800', color: C.primary },
  sub:       { fontSize: 14, color: '#94A3B8', marginTop: 8 },
});
