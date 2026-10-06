import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { useBookings } from '../context/BookingContext';
import { colors } from '../theme';

export default function SuccessScreen() {
  const { appointments } = useBookings();
  const appointment = appointments[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.confettiOne} /><View style={styles.confettiTwo} /><View style={styles.confettiThree} />
        <View style={styles.checkOuter}><View style={styles.checkInner}><Ionicons name="checkmark" size={46} color={colors.white} /></View></View>
        <Text testID="booking-success-title" style={styles.title}>¡Tu cita está lista!</Text>
        <Text style={styles.subtitle}>Te esperamos. También guardamos los detalles en “Mis citas”.</Text>

        {appointment && (
          <View style={styles.ticket}>
            <View style={styles.ticketTop}>
              <View><Text style={styles.ticketLabel}>CITA CONFIRMADA</Text><Text style={styles.service}>{appointment.service.name}</Text></View>
              <View style={styles.status}><View style={styles.statusDot} /><Text style={styles.statusText}>Confirmada</Text></View>
            </View>
            <View style={styles.dashed} />
            <View style={styles.details}>
              <Detail icon="calendar-outline" value={appointment.date} />
              <Detail icon="time-outline" value={appointment.time} />
              <Detail icon="person-outline" value={appointment.professional.name} />
            </View>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <PrimaryButton testID="view-appointment" label="Ver mi cita" onPress={() => router.replace('/appointments')} icon="calendar-outline" />
        <Pressable testID="back-home" onPress={() => router.replace('/')} style={styles.secondary}><Text style={styles.secondaryText}>Volver al inicio</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

function Detail({ icon, value }: { icon: keyof typeof Ionicons.glyphMap; value: string }) {
  return <View style={styles.detail}><Ionicons name={icon} size={18} color={colors.coral} /><Text style={styles.detailText}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  checkOuter: { width: 112, height: 112, borderRadius: 56, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  checkInner: { width: 78, height: 78, borderRadius: 39, backgroundColor: colors.forest, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.ink, fontSize: 31, fontWeight: '900', letterSpacing: -0.8, textAlign: 'center' },
  subtitle: { color: colors.inkMuted, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 10, maxWidth: 300 },
  ticket: { width: '100%', backgroundColor: colors.white, borderRadius: 24, padding: 19, marginTop: 30, borderWidth: 1, borderColor: colors.line },
  ticketTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  ticketLabel: { color: colors.coral, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  service: { color: colors.ink, fontSize: 18, fontWeight: '900', marginTop: 7 },
  status: { backgroundColor: colors.mintSoft, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.forest },
  statusText: { color: colors.forest, fontSize: 10, fontWeight: '800' },
  dashed: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.line, marginVertical: 17 },
  details: { gap: 12 },
  detail: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailText: { color: colors.ink, fontSize: 13, fontWeight: '700', textTransform: 'capitalize' },
  footer: { paddingHorizontal: 20 },
  secondary: { height: 52, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: colors.forest, fontSize: 14, fontWeight: '800' },
  confettiOne: { position: 'absolute', width: 10, height: 30, borderRadius: 5, backgroundColor: colors.coral, top: '15%', left: '17%', transform: [{ rotate: '-25deg' }] },
  confettiTwo: { position: 'absolute', width: 13, height: 13, borderRadius: 7, backgroundColor: '#B7AFDF', top: '18%', right: '18%' },
  confettiThree: { position: 'absolute', width: 24, height: 8, borderRadius: 4, backgroundColor: colors.mint, top: '28%', right: '9%', transform: [{ rotate: '30deg' }] },
});
