import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector, ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  runOnJS, 
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { Image } from 'expo-image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const MOCK_PLACES = [
  {
    id: 'p1',
    title: 'Monkey Forest Ubud',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tags: ['Ubud', '3 km away', 'Nature', 'Open', '$$'],
    insight: 'Matching your Zen Seeker persona, this sanctuary offers a peaceful escape with shaded forest trails and a serene atmosphere.',
    about: 'The Sacred Monkey Forest Sanctuary is a nature reserve and Hindu temple complex in Ubud, Bali. It houses over 1000 monkeys and beautiful ancient temples.',
    tip: 'Visit before 10 AM for the best experience. Keep your sunglasses and bags secured!',
    gallery: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1554481923-a691d78d216d?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'p2',
    title: 'Tegallalang Rice Terrace',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1554481923-a691d78d216d?auto=format&fit=crop&w=800&q=80',
    tags: ['Ubud', '8 km away', 'Nature', 'Open', '$'],
    insight: 'Perfect for your nature-loving side. Stunning views and great photo opportunities in a traditional Balinese setting.',
    about: 'Famous for its beautiful scenes of rice paddies involving the subak (traditional Balinese cooperative irrigation system).',
    tip: 'Wear comfortable walking shoes. It can get muddy and there are many stairs!',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'p3',
    title: 'Uluwatu Temple',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    tags: ['Uluwatu', '15 km away', 'Culture', 'Sunset', '$$'],
    insight: 'Experience breathtaking sunsets and traditional Kecak fire dances atop a dramatic cliff.',
    about: 'A Balinese Hindu sea temple located in Uluwatu. The temple is regarded as one of the sad kahyangan and is dedicated to Sang Hyang Widhi Wasa.',
    tip: 'Arrive by 4 PM to get good seats for the sunset Kecak dance performance.',
    gallery: []
  }
];

export default function ExploreScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSegment, setActiveSegment] = useState('wisata');

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    setCurrentIndex((prev) => prev + 1);
    translateX.value = 0;
    translateY.value = 0;
  };

  const forceSwipe = (direction: 'left' | 'right') => {
    const toValue = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    translateX.value = withTiming(toValue, { duration: 300 }, () => {
      runOnJS(handleSwipeComplete)(direction);
    });
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
          runOnJS(handleSwipeComplete)('right');
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
          runOnJS(handleSwipeComplete)('left');
        });
      } else {
        translateX.value = withSpring(0, { damping: 15 });
        translateY.value = withSpring(0, { damping: 15 });
      }
    });

  const topCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2], [-10, 0, 10], Extrapolation.CLAMP);
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotate}deg` },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(Math.abs(translateX.value), [0, SCREEN_WIDTH], [0.95, 1], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
      opacity: 1,
    };
  });

  // Animated overlays for Swipe Indication 
  const rightOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SCREEN_WIDTH / 3], [0, 0.4], Extrapolation.CLAMP),
    backgroundColor: '#10B981', 
  }));
  
  const leftOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -SCREEN_WIDTH / 3], [0, 0.4], Extrapolation.CLAMP),
    backgroundColor: '#EF4444', 
  }));

  const renderCard = (place: typeof MOCK_PLACES[0], isTop: boolean) => {
    if (!place) return null;

    const content = (
      <View className="flex-1 bg-white rounded-3xl overflow-hidden shadow-xl" style={styles.cardBorder}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 128 }}>
          {/* Header Image & Info */}
          <View className="w-full h-96 relative">
            <Image source={{ uri: place.image }} className="absolute inset-0 w-full h-full" contentFit="cover" />
            <View className="absolute bottom-0 left-0 right-0 pt-20 pb-5 px-5 bg-black/40">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="flex-1 text-white text-2xl font-extrabold shadow-sm">{place.title}</Text>
                <View className="flex-row items-center gap-1 bg-black/50 px-2 py-1 rounded-xl">
                  <Text className="text-white font-bold text-sm">{place.rating}</Text>
                  <Ionicons name="star" size={14} color="#FBBF24" />
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                {place.tags.map((tag, i) => (
                  <View key={i} className="bg-emerald-700 px-3 py-1 rounded-full mr-2">
                    <Text className="text-white text-xs font-semibold">{tag}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          <View className="p-5">
            {/* Insight */}
            <View className="bg-white border border-slate-200 rounded-2xl p-4 mb-5 shadow-sm">
              <Text className="text-sm font-extrabold text-slate-900 mb-1">TripMind Insight</Text>
              <Text className="text-sm text-slate-600 leading-relaxed">{place.insight}</Text>
            </View>

            {/* About */}
            <View className="mb-6">
              <Text className="text-base font-extrabold text-slate-900 mb-2">About this Place</Text>
              <Text className="text-sm text-slate-600 leading-relaxed">{place.about}</Text>
            </View>

            {/* Tip */}
            <View className="bg-slate-50 rounded-2xl p-4 mb-6 border-l-4 border-emerald-600">
              <Text className="text-sm font-bold text-slate-900 mb-1">Quick Tip</Text>
              <Text className="text-sm text-slate-600 leading-relaxed">{place.tip}</Text>
            </View>

            {/* Gallery */}
            {place.gallery.length > 0 && (
              <View className="mb-6">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                  {place.gallery.map((img, idx) => (
                    <Image key={idx} source={{ uri: img }} className="w-36 h-52 rounded-2xl" contentFit="cover" />
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Nearby Bites Placeholders */}
            <View className="mb-6">
              <Text className="text-base font-extrabold text-slate-900 mb-2">Nearby Bites</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                {[1, 2, 3].map((_, idx) => (
                  <View key={idx} className="w-24 h-24 rounded-2xl bg-slate-200" />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        
        {/* Color Overlays during Swipe */}
        {isTop && (
          <>
            <Animated.View style={[StyleSheet.absoluteFill, rightOverlayStyle]} pointerEvents="none" />
            <Animated.View style={[StyleSheet.absoluteFill, leftOverlayStyle]} pointerEvents="none" />
          </>
        )}
      </View>
    );

    if (isTop) {
      return (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardWrapper, topCardStyle, { zIndex: 10 }]}>
            {content}
          </Animated.View>
        </GestureDetector>
      );
    }

    return (
      <Animated.View style={[styles.cardWrapper, nextCardStyle, { zIndex: 1 }]}>
        {content}
      </Animated.View>
    );
  };

  const isFinished = currentIndex >= MOCK_PLACES.length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }} edges={['top']}>
        {/* Top Navigation */}
        <View className="flex-row justify-between items-center px-5 py-3">
          <View className="flex-row items-center gap-2">
            <Ionicons name="flash" size={24} color="#059669" />
            <Text className="text-xl font-extrabold text-emerald-700">Explore</Text>
          </View>
          <TouchableOpacity>
            <Feather name="sliders" size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* Segmented Control */}
        <View className="items-center mb-4">
          <View className="flex-row bg-white rounded-full p-1 border border-slate-200 w-52">
            <TouchableOpacity 
              className={`flex-1 py-2 items-center rounded-full ${activeSegment === 'wisata' ? 'bg-emerald-700' : ''}`}
              onPress={() => setActiveSegment('wisata')}
            >
              <Text className={`text-sm font-semibold ${activeSegment === 'wisata' ? 'text-white' : 'text-slate-500'}`}>Wisata</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-2 items-center rounded-full ${activeSegment === 'kuliner' ? 'bg-emerald-700' : ''}`}
              onPress={() => setActiveSegment('kuliner')}
            >
              <Text className={`text-sm font-semibold ${activeSegment === 'kuliner' ? 'text-white' : 'text-slate-500'}`}>Kuliner</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards Area */}
        <View className="flex-1 items-center justify-center px-4 pb-5">
          {isFinished ? (
            <View className="flex-1 justify-center items-center p-10">
              <Ionicons name="checkmark-circle-outline" size={64} color="#059669" />
              <Text className="text-xl font-extrabold text-slate-900 mt-4 mb-2">You're all caught up!</Text>
              <Text className="text-sm text-slate-500 text-center mb-8">Check back later for more recommendations.</Text>
              <TouchableOpacity className="bg-emerald-700 px-6 py-3 rounded-full" onPress={() => setCurrentIndex(0)}>
                <Text className="text-white font-bold text-base">Start Over</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {currentIndex + 1 < MOCK_PLACES.length && renderCard(MOCK_PLACES[currentIndex + 1], false)}
              {renderCard(MOCK_PLACES[currentIndex], true)}
            </>
          )}
        </View>

        {/* Floating Action Buttons */}
        {!isFinished && (
          <View className="absolute bottom-10 left-0 right-0 flex-row justify-center items-center gap-6 z-50">
            <TouchableOpacity 
              className="w-14 h-14 rounded-full bg-white justify-center items-center shadow-lg border border-slate-100" 
              onPress={() => forceSwipe('left')}
            >
              <Feather name="x" size={24} color="#EF4444" />
            </TouchableOpacity>
            
            <TouchableOpacity className="w-16 h-16 rounded-full bg-emerald-700 justify-center items-center shadow-xl border-4 border-slate-50">
              <Feather name="bookmark" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-14 h-14 rounded-full bg-white justify-center items-center shadow-lg border border-slate-100" 
              onPress={() => forceSwipe('right')}
            >
              <Ionicons name="heart" size={26} color="#10B981" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// Keeping some styles that are tricky in standard nativewind classes, like specific positioning for stacked cards
const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    bottom: 20,
  },
  cardBorder: {
    ...Platform.select({
      android: {
        elevation: 8,
      }
    })
  }
});
