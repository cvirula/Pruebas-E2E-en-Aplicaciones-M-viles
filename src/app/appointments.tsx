import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useBookings } from '../context/BookingContext';
import { colors, shadow } from '../theme';

export default function AppointmentsScreen() {
  const { appointments, cancelAppointment } = useBookings();
  const active = appointments.filter((item) => item.status === 'confirmada');
  const cancelled = appointments.filter((item) => item.status === 'cancelada');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}><AppHeader onBack={() => router.replace('/')} title="Mis citas" subtitle="Todo tu tiempo, en un solo lugar." /></View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {active.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}><Ionicons name="calendar-outline" size={38} color={colors.forest} /></View>
            <Text testID="empty-appointments" style={styles.emptyTitle}>Aún no tienes citas</Text>
            <Text style={styles.emptyText}>Cuando reserves una cita aparecerá aquí con todos sus detalles.</Text>
            <View style={styles.emptyButton}><PrimaryButton testID="empty-book" label="Agendar una cita" onPress={() => router.push('/book')} /></View>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionLabel}>PRÓXIMAS</Text>
            {active.map((appointment) => (
              <View testID="appointment-card" key={appointment.id} style={styles.card}>
                <View style={styles.cardAccent} />
                <View style={styles.dateBadge}><Text style={styles.dateIcon}>◷</Text><Text style={styles.time}>{appointment.time}</Text></View>
                <Text style={styles.service}>{appointment.service.name}</Text>
                <View style={styles.metaRow}><Ionicons name="calendar-outline" size={16} color={colors.inkMuted} /><Text style={styles.meta}>{appointment.date}</Text></View>
                <View style={styles.metaRow}><Ionicons name="person-outline" size={16} color={colors.inkMuted} /><Text style={styles.meta}>{appointment.professional.name}</Text></View>
                <View style={styles.actions}>
                  <Pressable testID="reschedule-appointment" onPress={() => router.push({ pathname: '/book', params: { service: appointment.service.id } })} style={styles.actionPrimary}><Ionicons name="refresh-outline" size={17} color={colors.forest} /><Text style={styles.actionPrimaryText}>Reprogramar</Text></Pressable>
                  <Pressable testID="cancel-appointment" onPress={() => cancelAppointment(appointment.id)} style={styles.actionSecondary}><Text style={styles.actionSecondaryText}>Cancelar</Text></Pressable>
                </View>
              </View>
            ))}
          </View>
        )}

        {cancelled.length > 0 && (
          <View style={styles.cancelledSection}>
            <Text style={styles.sectionLabel}>HISTORIAL</Text>
            {cancelled.map((appointment) => (
              <View testID="cancelled-appointment" key={appointment.id} style={styles.cancelledCard}>
                <View style={styles.cancelIcon}><Ionicons name="close" size={18} color={colors.warning} /></View>
                <View style={{ flex: 1 }}><Text style={styles.cancelledTitle}>{appointment.service.name}</Text><Text style={styles.cancelledMeta}>Cita cancelada · {appointment.date}</Text></View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  header: { paddingHorizontal: 20, paddingTop: 12 },
  content: { padding: 20, paddingBottom: 36 },
  sectionLabel: { color: colors.inkMuted, fontSize: 11, fontWeight: '900', letterSpacing: 1.4, marginBottom: 12 },
  card: { backgroundColor: colors.white, borderRadius: 25, padding: 20, borderWidth: 1, borderColor: colors.line, overflow: 'hidden', ...shadow },
  cardAccent: { position: 'absolute', top: 0, bottom: 0, left: 0, width: 6, backgroundColor: colors.coral },
  dateBadge: { alignSelf: 'flex-start', backgroundColor: colors.peach, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7, gap: 6 },
  dateIcon: { color: colors.warning, fontSize: 16, fontWeight: '900' },
  time: { color: colors.warning, fontSize: 13, fontWeight: '900' },
  service: { color: colors.ink, fontSize: 22, fontWeight: '900', marginTop: 15, marginBottom: 13 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 8 },
  meta: { color: colors.inkMuted, fontSize: 13, fontWeight: '600', textTransform: 'capitalize' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 21, paddingTop: 17, borderTopWidth: 1, borderTopColor: colors.line },
  actionPrimary: { flex: 1, height: 45, borderRadius: 14, backgroundColor: colors.mintSoft, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  actionPrimaryText: { color: colors.forest, fontSize: 13, fontWeight: '800' },
  actionSecondary: { width: 96, height: 45, borderRadius: 14, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  actionSecondaryText: { color: colors.warning, fontSize: 13, fontWeight: '800' },
  empty: { alignItems: 'center', marginTop: 70 },
  emptyIcon: { width: 92, height: 92, borderRadius: 32, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-5deg' }] },
  emptyTitle: { color: colors.ink, fontSize: 23, fontWeight: '900', marginTop: 24 },
  emptyText: { color: colors.inkMuted, fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 280, marginTop: 9 },
  emptyButton: { width: '100%', marginTop: 27 },
  cancelledSection: { marginTop: 32 },
  cancelledCard: { backgroundColor: colors.white, borderRadius: 18, borderWidth: 1, borderColor: colors.line, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12, opacity: 0.78 },
  cancelIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.peach, alignItems: 'center', justifyContent: 'center' },
  cancelledTitle: { color: colors.ink, fontSize: 14, fontWeight: '800', textDecorationLine: 'line-through' },
  cancelledMeta: { color: colors.inkMuted, fontSize: 11, marginTop: 4, textTransform: 'capitalize' },
});
