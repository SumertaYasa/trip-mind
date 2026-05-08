import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Modal, TextInput,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
  Keyboard, StyleSheet,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Palette as C } from '@/constants/palette';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify?: () => void;
  email?: string;
}

export default function VerificationModal({
  visible, onClose, onVerify, email = 'hello@tripmind.com',
}: VerificationModalProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<any[]>([]);

  const handleChange = (text: string, i: number) => {
    const next = [...code];
    next[i] = text;
    setCode(next);
    if (text && i < 3) inputs.current[i + 1]?.focus();
  };

  const handleKey = (e: any, i: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[i] && i > 0)
      inputs.current[i - 1]?.focus();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.overlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.kav}>
            <View style={s.card}>

              {/* Close */}
              <TouchableOpacity onPress={onClose} style={s.closeBtn}>
                <Feather name="x" size={16} color={C.textMuted} />
              </TouchableOpacity>

              {/* Icon */}
              <View style={s.iconWrap}>
                <MaterialCommunityIcons name="shield-check-outline" size={32} color={C.primary} />
              </View>

              {/* Title */}
              <Text style={s.title}>Enter Security Code</Text>
              <Text style={s.subtitle}>
                We've sent a 4-digit authentication code to{'\n'}
                <Text style={s.emailTxt}>{email}</Text>
              </Text>

              {/* OTP inputs */}
              <View style={s.otpRow}>
                {[0, 1, 2, 3].map((i) => (
                  <TextInput
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    style={s.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={code[i]}
                    onChangeText={(t) => handleChange(t, i)}
                    onKeyPress={(e) => handleKey(e, i)}
                  />
                ))}
              </View>

              {/* Verify */}
              <TouchableOpacity style={s.verifyBtn} onPress={onVerify}>
                <Text style={s.verifyTxt}>Verify Code</Text>
              </TouchableOpacity>

              {/* Resend */}
              <View style={s.resendRow}>
                <Text style={s.resendLabel}>Didn't receive it? </Text>
                <TouchableOpacity>
                  <Text style={s.resendLink}>Resend</Text>
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay:    { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, backgroundColor: C.overlay },
  kav:        { width: '100%' },
  card:       { backgroundColor: C.white, borderRadius: 32, padding: 24, alignItems: 'center', width: '100%' },

  closeBtn:   { position: 'absolute', right: 24, top: 24, width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  iconWrap:   { width: 64, height: 64, borderRadius: 20, backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 24 },

  title:      { fontSize: 20, fontWeight: '700', color: C.textPrimary, marginBottom: 8 },
  subtitle:   { fontSize: 14, color: C.textMuted, textAlign: 'center', lineHeight: 20, paddingHorizontal: 16, marginBottom: 32 },
  emailTxt:   { fontWeight: '700', color: C.textSecondary },

  otpRow:     { flexDirection: 'row', justifyContent: 'center', gap: 12, width: '100%', marginBottom: 32 },
  otpInput:   { width: 56, height: 64, backgroundColor: C.white, borderWidth: 1.5, borderColor: C.border, borderRadius: 16, textAlign: 'center', fontSize: 24, fontWeight: '700', color: C.textPrimary },

  verifyBtn:  { width: '100%', backgroundColor: C.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  verifyTxt:  { color: C.white, fontWeight: '700', fontSize: 16 },

  resendRow:  { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  resendLabel:{ fontSize: 14, color: C.textMuted },
  resendLink: { fontSize: 14, color: C.primary, fontWeight: '700' },
});
