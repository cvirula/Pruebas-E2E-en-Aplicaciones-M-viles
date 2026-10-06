import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { colors, shadow } from '../theme';

const schedule = [
  { id: '1', time: '09:00', client: 'María López', service: 'Consulta general', duration: '45 min', tone: '#E3F1EB' },
  { id: '2', time: '10:30', client: 'Alex Rivera', service: 'Masaje relajante', duration: '60 min', tone: '#FCE7DE' },
  { id: '3', time: '15:30', client: 'Daniel Ortiz', service: 'Terapia física', duration: '50 min', tone: '#E8E8F7' },
];

export default function ProfessionalScreen() {
  const [completed, setCompleted] = useState<string[]>([]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader onBack={() => router.back()} step="ESPACIO PROFESIONAL" title="Agenda profesional" subtitle="Hola, Sofía. Este es tu día de trabajo." />

        <View style={styles.statsRow}>
          <View style={styles.primaryStat}>
            <View style={styles.statIcon}><Ionicons name="calendar" size={22} color={colors.white} /></View>
            <Text testID="professional-today-count" style={styles.primaryNumber}>3</Text>
            <Text style={styles.primaryLabel}>citas para hoy</Text>
          </View>
          <View style={styles.secondaryStats}>
            <View style={styles.smallStat}><Text style={styles.smallNumber}>2h 35m</Text><Text style={styles.smallLabel}>Tiempo reservado</Text></View>
            <View style={styles.smallStat}><Text style={styles.smallNumber}>$125</Text><Text style={styles.smallLabel}>Ingreso estimado</Text></View>
          </View>
        </View>

        <View style={styles.sectionHead}>
          <View><Text style={styles.sectionTitle}>Agenda de hoy</Text><Text style={styles.sectionMeta}>Viernes · Jornada activa</Text></View>
          <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>EN VIVO</Text></View>
        </View>

        <View style={styles.timeline}>
          {schedule.map((appointment, index) => {
            const isCompleted = completed.includes(appointment.id);
            return (
              <View key={appointment.id} testID={`professional-appointment-${appointment.id}`} style={styles.timelineRow}>
                <View style={styles.timeColumn}><Text style={styles.slotTime}>{appointment.time}</Text>{index < schedule.length - 1 && <View style={styles.line} />}</View>
                <View style={[styles.appointmentCard, isCompleted && styles.completedCard]}>
                  <View style={[styles.clientMark, { backgroundColor: appointment.tone }]}><Text style={styles.clientInitials}>{appointment.client.split(' ').map((part) => part[0]).join('')}</Text></View>
                  <View style={styles.appointmentCopy}>
                    <Text style={[styles.clientName, isCompleted && styles.completedText]}>{appointment.client}</Text>
                    <Text style={styles.serviceText}>{appointment.service} · {appointment.duration}</Text>
                    {isCompleted ? (
                      <View testID={`completed-${appointment.id}`} style={styles.doneBadge}><Ionicons name="checkmark-circle" size={15} color={colors.forest} /><Text style={styles.doneText}>Completada</Text></View>
                    ) : (
                      <Pressable testID={`professional-complete-${appointment.id}`} onPress={() => setCompleted((current) => [...current, appointment.id])} style={styles.completeButton}>
                        <Ionicons name="checkmark" size={15} color={colors.forest} /><Text style={styles.completeButtonText}>Marcar atendida</Text>
                      </Pressable>
                    )}
                  </View>
                  <Pressable accessibilityLabel={`Opciones de ${appointment.client}`} style={styles.more}><Ionicons name="ellipsis-horizontal" size={19} color={colors.inkMuted} /></Pressable>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.insight}>
          <View style={styles.insightIcon}><Ionicons name="trending-up" size={21} color={colors.coral} /></View>
          <View style={{ flex: 1 }}><Text style={styles.insightTitle}>Tu semana va muy bien</Text><Text style={styles.insightText}>Tienes un 92% de ocupación y 4.9 de valoración promedio.</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 34 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 25 },
  primaryStat: { flex: 1, minHeight: 157, backgroundColor: colors.forest, borderRadius: 23, padding: 17, overflow: 'hidden' },
  statIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#367366', alignItems: 'center', justifyContent: 'center' },
  primaryNumber: { color: colors.white, fontSize: 34, fontWeight: '900', marginTop: 14 },
  primaryLabel: { color: '#D9E7E2', fontSize: 12, fontWeight: '700', marginTop: -2 },
  secondaryStats: { flex: 1, gap: 10 },
  smallStat: { flex: 1, borderRadius: 19, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 15, justifyContent: 'center', ...shadow },
  smallNumber: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  smallLabel: { color: colors.inkMuted, fontSize: 10, marginTop: 3 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 18 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900' },
  sectionMeta: { color: colors.inkMuted, fontSize: 12, marginTop: 4 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.peach, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 10 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.coral },
  liveText: { color: colors.warning, fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  timeline: { gap: 0 },
  timelineRow: { flexDirection: 'row', minHeight: 130 },
  timeColumn: { width: 52, alignItems: 'center' },
  slotTime: { color: colors.ink, fontSize: 12, fontWeight: '900', marginTop: 17 },
  line: { width: 1, flex: 1, backgroundColor: colors.line, marginTop: 8 },
  appointmentCard: { flex: 1, minHeight: 112, marginBottom: 16, backgroundColor: colors.white, borderRadius: 20, borderWidth: 1, borderColor: colors.line, padding: 14, flexDirection: 'row', alignItems: 'flex-start', ...shadow },
  completedCard: { opacity: 0.72, backgroundColor: colors.mintSoft },
  clientMark: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  clientInitials: { color: colors.ink, fontWeight: '900', fontSize: 13 },
  appointmentCopy: { flex: 1, marginLeft: 11 },
  clientName: { color: colors.ink, fontWeight: '900', fontSize: 14 },
  completedText: { textDecorationLine: 'line-through' },
  serviceText: { color: colors.inkMuted, fontSize: 11, marginTop: 4 },
  completeButton: { alignSelf: 'flex-start', marginTop: 11, backgroundColor: colors.mintSoft, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6, flexDirection: 'row', gap: 4, alignItems: 'center' },
  completeButtonText: { color: colors.forest, fontSize: 10, fontWeight: '800' },
  doneBadge: { alignSelf: 'flex-start', marginTop: 11, flexDirection: 'row', alignItems: 'center', gap: 4 },
  doneText: { color: colors.forest, fontSize: 10, fontWeight: '900' },
  more: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  insight: { marginTop: 8, borderRadius: 20, backgroundColor: colors.peach, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12 },
  insightIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  insightTitle: { color: colors.ink, fontSize: 13, fontWeight: '900' },
  insightText: { color: colors.inkMuted, fontSize: 11, lineHeight: 17, marginTop: 3 },
});
