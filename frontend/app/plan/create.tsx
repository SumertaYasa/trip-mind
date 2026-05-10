import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Calendar } from 'react-native-calendars';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parseDate = (str: string) => {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const formatDate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function CreateTripScreen() {
  const [isWhenExpanded, setIsWhenExpanded] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate('');
    } else if (startDate && !endDate) {
      setEndDate(day.dateString);
    }
  };

  const getMarkedDates = () => {
    const dates: any = {};
    if (!startDate) return dates;
    if (!endDate) {
      dates[startDate] = { startingDay: true, endingDay: true, color: '#059669', textColor: 'white' };
      return dates;
    }

    let dStart = parseDate(startDate);
    let dEnd = parseDate(endDate);
    if (dStart > dEnd) { const tmp = dStart; dStart = dEnd; dEnd = tmp; }

    const strStart = formatDate(dStart);
    const strEnd = formatDate(dEnd);

    if (strStart === strEnd) {
      dates[strStart] = { startingDay: true, endingDay: true, color: '#059669', textColor: 'white' };
      return dates;
    }

    dates[strStart] = { startingDay: true, color: '#059669', textColor: 'white' };
    let curr = new Date(dStart);
    curr.setDate(curr.getDate() + 1);
    while (curr < dEnd) {
      dates[formatDate(curr)] = { color: '#d1fae5', textColor: '#059669' };
      curr.setDate(curr.getDate() + 1);
    }
    dates[strEnd] = { endingDay: true, color: '#059669', textColor: 'white' };
    return dates;
  };

  const getFormattedRange = () => {
    if (!startDate) return 'Anytime';
    const fmt = (s: string) => { const [, m, d] = s.split('-').map(Number); return `${MONTHS[m - 1]} ${d}`; };
    if (!endDate) return fmt(startDate);

    let [sy, sm, sd] = startDate.split('-').map(Number);
    let [ey, em, ed] = endDate.split('-').map(Number);
    if (new Date(sy, sm - 1, sd) > new Date(ey, em - 1, ed)) {
      [sy, sm, sd, ey, em, ed] = [ey, em, ed, sy, sm, sd];
    }
    return sm === em && sy === ey
      ? `${MONTHS[sm - 1]} ${sd}-${ed}`
      : `${MONTHS[sm - 1]} ${sd} - ${MONTHS[em - 1]} ${ed}`;
  };

  const hasSelection = !!startDate;

  const StaticItem = ({
    iconName, label, placeholder, iconFamily = 'Feather',
  }: { iconName: string; label: string; placeholder: string; iconFamily?: 'Feather' | 'Ionicons' }) => (
    <View className="flex-row items-center bg-white p-4 rounded-2xl mb-4 border border-slate-100">
      <View className="w-12 h-12 rounded-full items-center justify-center mr-4 bg-slate-100">
        {iconFamily === 'Feather'
          ? <Feather name={iconName as any} size={22} color="#64748b" />
          : <Ionicons name={iconName as any} size={24} color="#64748b" />}
      </View>
      <View style={{ flex: 1 }}>
        <Text className="text-xs font-semibold mb-1 text-slate-500">{label}</Text>
        <Text className="text-base text-slate-900 font-bold">{placeholder}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#cbd5e1" />
    </View>
  );

  const whenBorder = isWhenExpanded || hasSelection
    ? 'border-2 border-emerald-500'
    : 'border border-slate-100';

  const iconBg = isWhenExpanded || hasSelection ? 'bg-emerald-100' : 'bg-slate-100';
  const iconColor = isWhenExpanded || hasSelection ? '#059669' : '#64748b';
  const labelColor = isWhenExpanded || hasSelection ? 'text-emerald-600' : 'text-slate-500';
  const chevron = isWhenExpanded ? 'chevron-down' : 'chevron-right';
  const chevronColor = isWhenExpanded || hasSelection ? '#059669' : '#cbd5e1';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }} edges={['top', 'bottom']}>

      {/* Header */}
      <View className="flex-row items-center px-5 py-4 border-b border-slate-200 bg-white">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100"
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-extrabold text-slate-900 mr-10">
          Create Trip
        </Text>
      </View>

      {/* Options List — ScrollView contentContainerStyle must use style prop too */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Where */}
        <StaticItem iconName="map-pin" label="Where?" placeholder="Pick a destination" />

        {/* When – accordion */}
        <View className={`bg-white rounded-2xl mb-4 overflow-hidden ${whenBorder}`}>
          <TouchableOpacity
            onPress={() => setIsWhenExpanded(!isWhenExpanded)}
            className="flex-row items-center p-4"
          >
            <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${iconBg}`}>
              <Feather name="calendar" size={22} color={iconColor} />
            </View>
            <View style={{ flex: 1 }}>
              <Text className={`text-xs font-semibold mb-1 ${labelColor}`}>When?</Text>
              <Text className="text-base text-slate-900 font-bold">{getFormattedRange()}</Text>
            </View>
            <Feather name={chevron} size={20} color={chevronColor} />
          </TouchableOpacity>

          {isWhenExpanded && (
            <View className="px-2 pb-4">
              <Calendar
                markingType="period"
                onDayPress={handleDayPress}
                markedDates={getMarkedDates()}
                theme={{
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#64748b',
                  todayTextColor: '#059669',
                  dayTextColor: '#0f172a',
                  textDisabledColor: '#cbd5e1',
                  arrowColor: '#059669',
                  monthTextColor: '#0f172a',
                  textDayFontWeight: '600',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '600',
                  textDayFontSize: 15,
                  textMonthFontSize: 18,
                  textDayHeaderFontSize: 13,
                }}
              />
            </View>
          )}
        </View>

        {/* Who's going */}
        <StaticItem iconName="users" label="Who's going?" placeholder="Choose travel type" />

        {/* Interests */}
        <StaticItem iconName="star" label="Interests" placeholder="Add interests" />

        {/* Budget */}
        <StaticItem iconName="wallet-outline" label="Budget" placeholder="Select a range" iconFamily="Ionicons" />
      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white border-t border-slate-100 px-6 py-4 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => { setStartDate(''); setEndDate(''); setIsWhenExpanded(false); }}
          className="flex-row items-center gap-2 py-3 px-5 rounded-full bg-slate-100"
        >
          <Feather name="x-circle" size={16} color="#64748b" />
          <Text className="text-slate-600 font-bold text-sm">Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2 py-3 px-8 rounded-full bg-emerald-700">
          <Text className="text-white font-bold text-base">Next</Text>
          <Feather name="chevron-right" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
