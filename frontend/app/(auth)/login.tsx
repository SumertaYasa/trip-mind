import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ImageBackground, KeyboardAvoidingView, Platform,
  ScrollView, StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import VerificationModal from '../../components/VerificationModal';
import { Palette as C } from '@/constants/palette';

export default function LoginScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={s.root}>
      {/* Hero image */}
      <View style={s.heroWrap}>
        <ImageBackground
          source={require('../../assets/images/travel_background.png')}
          style={s.flex1}
          resizeMode="cover"
        >
          <SafeAreaView edges={['top']} style={s.heroInner}>
            <Text style={s.brand}>TripMind</Text>
          </SafeAreaView>
        </ImageBackground>
      </View>

      {/* Form area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s.kavWrap}
      >
        <ScrollView
          style={s.formCard}
          contentContainerStyle={s.formContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Tabs */}
          <View style={s.tabRow}>
            <View style={s.tabActive}>
              <Text style={s.tabActiveText}>Log In</Text>
              <View style={s.tabIndicator} />
            </View>
            <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
              <Text style={s.tabInactiveText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View style={s.inputRow}>
            <Feather name="mail" size={20} color={C.textFaint} />
            <TextInput
              style={s.input}
              placeholder="Email Address"
              placeholderTextColor={C.textFaint}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={[s.inputRow, { marginTop: 12 }]}>
            <Feather name="lock" size={20} color={C.textFaint} />
            <TextInput
              style={s.input}
              placeholder="Password"
              placeholderTextColor={C.textFaint}
              secureTextEntry
            />
          </View>

          {/* Forgot */}
          <TouchableOpacity style={s.forgotWrap}>
            <Text style={s.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign in */}
          <TouchableOpacity style={s.primaryBtn} onPress={() => setModalVisible(true)}>
            <Text style={s.primaryBtnTxt}>Sign in</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerTxt}>Or continue with</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social */}
          <View style={s.socialRow}>
            <TouchableOpacity style={s.socialBtn}>
              <FontAwesome5 name="facebook" size={20} color="#1877F2" />
              <Text style={s.socialTxt}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.socialBtn}>
              <AntDesign name="google" size={20} color="#EA4335" />
              <Text style={s.socialTxt}>Google</Text>
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

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.white },
  flex1: { flex: 1 },
  heroWrap: { height: '45%' },
  heroInner: { paddingHorizontal: 24, paddingTop: 24 },
  brand: { color: C.primary, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  kavWrap: { flex: 1, marginTop: -40 },
  formCard: { flex: 1, backgroundColor: C.surface, borderTopLeftRadius: 40, borderTopRightRadius: 40 },
  formContent: { paddingHorizontal: 32, paddingTop: 32, paddingBottom: 40 },

  tabRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 24 },
  tabActive: { alignItems: 'center' },
  tabActiveText: { fontSize: 22, fontWeight: '700', color: C.textPrimary, marginBottom: 4 },
  tabIndicator: { height: 4, width: 24, backgroundColor: C.primary, borderRadius: 2 },
  tabInactiveText: { fontSize: 22, fontWeight: '700', color: C.textFaint },

  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, borderWidth: 1, borderColor: C.border },
  input: { flex: 1, marginLeft: 12, fontSize: 15, color: C.textPrimary },

  forgotWrap: { marginTop: 16, marginBottom: 24, alignItems: 'flex-end' },
  forgotTxt: { color: C.primary, fontSize: 14, fontWeight: '600' },

  primaryBtn: { backgroundColor: C.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  primaryBtnTxt: { color: C.white, fontWeight: '700', fontSize: 16 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 28 },
  dividerLine: { flex: 1, height: 1, backgroundColor: C.border },
  dividerTxt: { marginHorizontal: 12, color: C.textFaint, fontSize: 14 },

  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.white, paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: C.border, gap: 8 },
  socialTxt: { fontWeight: '700', color: C.textPrimary, fontSize: 14 },
});
