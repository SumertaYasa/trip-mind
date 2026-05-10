import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Modal, TextInput,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

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
        <View className="flex-1 justify-center items-center px-6 bg-black/50">
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ width: '100%' }}>
            <View className="bg-white rounded-[32px] p-6 items-center w-full">

              {/* Close */}
              <TouchableOpacity onPress={onClose} className="absolute right-6 top-6 w-8 h-8 rounded-full bg-gray-100 items-center justify-center z-10">
                <Feather name="x" size={16} color="#94A3B8" />
              </TouchableOpacity>

              {/* Icon */}
              <View className="w-16 h-16 rounded-2xl bg-[#E8F0EE] items-center justify-center mt-4 mb-6">
                <MaterialCommunityIcons name="shield-check-outline" size={32} color="#1A6B5A" />
              </View>

              {/* Title */}
              <Text className="text-xl font-bold text-[#0F172A] mb-2">Enter Security Code</Text>
              <Text className="text-sm text-[#94A3B8] text-center leading-5 px-4 mb-8">
                We've sent a 4-digit authentication code to{'\n'}
                <Text className="font-bold text-[#64748B]">{email}</Text>
              </Text>

              {/* OTP inputs — TextInput must use style prop */}
              <View className="flex-row justify-center gap-3 w-full mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <TextInput
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    style={{
                      width: 56, height: 64, backgroundColor: '#fff',
                      borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16,
                      textAlign: 'center', fontSize: 24, fontWeight: '700', color: '#0F172A',
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={code[i]}
                    onChangeText={(t) => handleChange(t, i)}
                    onKeyPress={(e) => handleKey(e, i)}
                  />
                ))}
              </View>

              {/* Verify */}
              <TouchableOpacity className="w-full bg-[#1A6B5A] py-4 rounded-2xl items-center mb-6" onPress={onVerify}>
                <Text className="text-white font-bold text-base">Verify Code</Text>
              </TouchableOpacity>

              {/* Resend */}
              <View className="flex-row items-center mb-2">
                <Text className="text-sm text-[#94A3B8]">Didn't receive it? </Text>
                <TouchableOpacity>
                  <Text className="text-sm text-[#1A6B5A] font-bold">Resend</Text>
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
