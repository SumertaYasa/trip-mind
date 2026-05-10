import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { router } from 'expo-router';
import { Palette as C } from '@/constants/palette';

const LOADING_DURATION = 2500; // ms

export default function LoadingScreen() {
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade + scale in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Pulse loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.08,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // Redirect ke login setelah loading selesai
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, LOADING_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={s.container}>
      {/* Layer 1: fade-in + scale-in */}
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        {/* Layer 2: pulse — nested view terpisah agar tidak perlu Animated.multiply */}
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <Animated.Image
            source={require('../../assets/images/logo.png')}
            style={s.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
});
