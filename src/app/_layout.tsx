import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BookingProvider } from '../context/BookingContext';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <BookingProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream }, animation: 'slide_from_right' }} />
    </BookingProvider>
  );
}
