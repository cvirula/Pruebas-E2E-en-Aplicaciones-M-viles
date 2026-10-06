import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useBookings } from '../context/BookingContext';
import { getNextDays, professionals, services, timeSlots } from '../data';
import { colors, shadow } from '../theme';

const copy = [
  { title: '¿Qué necesitas?', subtitle: 'Selecciona el servicio ideal para ti.' },
  { title: 'Elige a tu especialista', subtitle: 'Agenda con tu favorito o encuentra el primer espacio.' },
  { title: '¿Cuándo te queda bien?', subtitle: 'Selecciona un día y una hora disponible.' },
  { title: 'Revisa tu cita', subtitle: 'Confirma que todos los datos estén correctos.' },
];

export default function BookScreen() {
  const params = useLocalSearchParams<{ service?: string }>();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(params.service ?? '');
  const [professionalId, setProfessionalId] = useState('');
  const [dateId, setDateId] = useState('');
  const [time, setTime] = useState('');
  const days = useMemo(getNextDays, []);
  const { addAppointment } = useBookings();

  const service = services.find((item) => item.id === serviceId);
  const professional = professionals.find((item) => item.id === professionalId);
  const date = days.find((item) => item.id === dateId);
  const canContinue = [Boolean(service), Boolean(professional), Boolean(date && time), true][step];

  const goBack = () => step === 0 ? router.back() : setStep((current) => current - 1);
  const continueFlow = () => {
    if (step < 3) return setStep((current) => current + 1);
    if (!service || !professional || !date) return;
    addAppointment({ service, professional, date: date.long, time });
    router.replace('/success');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.headerWrap}>
        <AppHeader onBack={goBack} step={`Paso ${step + 1} de 4`} title={copy[step].title} subtitle={copy[step].subtitle} />
        <View style={styles.progressTrack}><View style={[styles.progress, { width: `${(step + 1) * 25}%` }]} /></View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {step === 0 && services.map((item) => {
          const selected = serviceId === item.id;
          return (
            <Pressable key={item.id} testID={`service-${item.id}`} accessibilityRole="button" onPress={() => setServiceId(item.id)} style={({ pressed }) => [styles.optionCard, selected && styles.selectedCard, pressed && styles.pressed]}>
              <View style={[styles.optionIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={25} color={colors.forest} /></View>
              <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>{item.name}</Text>
                <Text style={styles.optionMeta}>{item.duration} · {item.price}</Text>
              </View>
              <View style={[styles.radio, selected && styles.radioSelected]}>{selected && <Ionicons name="checkmark" size={16} color={colors.white} />}</View>
            </Pressable>
          );
        })}

        {step === 1 && professionals.map((item, index) => {
          const selected = professionalId === item.id;
          return (
            <Pressable key={item.id} testID={`professional-${item.id}`} accessibilityRole="button" onPress={() => setProfessionalId(item.id)} style={({ pressed }) => [styles.optionCard, selected && styles.selectedCard, pressed && styles.pressed]}>
              <View style={[styles.avatar, index === 1 && styles.avatarAlt, index === 2 && styles.avatarAny]}><Text style={styles.avatarText}>{item.initials}</Text></View>
              <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>{item.name}</Text>
                <Text style={styles.optionMeta}>{item.role}</Text>
              </View>
              <View style={styles.rating}><Ionicons name={item.id === 'any' ? 'flash' : 'star'} size={13} color={colors.coral} /><Text style={styles.ratingText}>{item.rating}</Text></View>
            </Pressable>
          );
        })}

        {step === 2 && (
          <View>
            <Text style={styles.groupLabel}>PRÓXIMOS DÍAS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
              {days.map((item) => {
                const selected = dateId === item.id;
                return (
                  <Pressable key={item.id} testID={`date-${item.id}`} onPress={() => setDateId(item.id)} style={[styles.dayCard, selected && styles.daySelected]}>
                    <Text style={[styles.dayName, selected && styles.dayTextSelected]}>{item.day}</Text>
                    <Text style={[styles.dayNumber, selected && styles.dayTextSelected]}>{item.number}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Text style={[styles.groupLabel, styles.timeLabel]}>HORARIOS DISPONIBLES</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => {
                const selected = time === slot;
                return (
                  <Pressable key={slot} testID={`time-${slot.replace(':', '')}`} disabled={!dateId} onPress={() => setTime(slot)} style={[styles.timeCard, selected && styles.timeSelected, !dateId && styles.timeDisabled]}>
                    <Text style={[styles.timeText, selected && styles.timeTextSelected]}>{slot}</Text>
                  </Pressable>
                );
              })}
            </View>
            {!dateId && <Text style={styles.helper}>Elige un día para ver sus horarios.</Text>}
          </View>
        )}

        {step === 3 && service && professional && date && (
          <View>
            <View style={styles.summaryCard}>
              <View style={styles.summaryTop}>
                <View style={[styles.optionIcon, { backgroundColor: service.color }]}><Ionicons name={service.icon as keyof typeof Ionicons.glyphMap} size={25} color={colors.forest} /></View>
                <View style={styles.optionCopy}><Text style={styles.optionTitle}>{service.name}</Text><Text style={styles.optionMeta}>{service.duration}</Text></View>
                <Text style={styles.summaryPrice}>{service.price}</Text>
              </View>
              <View style={styles.divider} />
              <SummaryRow icon="person-outline" label="Especialista" value={professional.name} />
              <SummaryRow icon="calendar-outline" label="Fecha" value={date.long} />
              <SummaryRow icon="time-outline" label="Hora" value={time} />
              <SummaryRow icon="location-outline" label="Lugar" value="Centro Turno · Zona 10" />
            </View>
            <View style={styles.notice}><Ionicons name="shield-checkmark-outline" size={22} color={colors.forest} /><Text style={styles.noticeText}>Puedes cancelar o reprogramar sin costo hasta 2 horas antes.</Text></View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton testID={step === 3 ? 'confirm-booking' : 'booking-next'} label={step === 3 ? 'Confirmar cita' : 'Continuar'} icon={step === 3 ? 'checkmark' : 'arrow-forward'} disabled={!canContinue} onPress={continueFlow} />
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return <View style={styles.summaryRow}><View style={styles.summaryIcon}><Ionicons name={icon} size={18} color={colors.forest} /></View><View><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{value}</Text></View></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  headerWrap: { paddingHorizontal: 20, paddingTop: 12 },
  progressTrack: { height: 4, backgroundColor: colors.line, borderRadius: 2, marginTop: 22, overflow: 'hidden' },
  progress: { height: 4, backgroundColor: colors.coral, borderRadius: 2 },
  content: { padding: 20, paddingBottom: 30, gap: 12 },
  optionCard: { minHeight: 86, padding: 14, borderRadius: 21, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.line, marginBottom: 12, ...shadow },
  selectedCard: { borderColor: colors.forest, backgroundColor: colors.mintSoft },
  optionIcon: { width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  optionCopy: { flex: 1, marginHorizontal: 13 },
  optionTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' },
  optionMeta: { color: colors.inkMuted, fontSize: 13, marginTop: 5 },
  radio: { width: 25, height: 25, borderRadius: 13, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { backgroundColor: colors.forest, borderColor: colors.forest },
  avatar: { width: 54, height: 54, borderRadius: 18, backgroundColor: colors.peach, alignItems: 'center', justifyContent: 'center' },
  avatarAlt: { backgroundColor: '#E8E8F7' },
  avatarAny: { backgroundColor: colors.mint },
  avatarText: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.peach, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 10 },
  ratingText: { color: colors.ink, fontSize: 11, fontWeight: '800' },
  groupLabel: { color: colors.inkMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1.4, marginBottom: 12 },
  daysRow: { gap: 9, paddingBottom: 3 },
  dayCard: { width: 62, height: 82, borderRadius: 19, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  daySelected: { backgroundColor: colors.forest, borderColor: colors.forest },
  dayName: { color: colors.inkMuted, fontSize: 10, fontWeight: '800' },
  dayNumber: { color: colors.ink, fontSize: 25, fontWeight: '800', marginTop: 5 },
  dayTextSelected: { color: colors.white },
  timeLabel: { marginTop: 30 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeCard: { width: '30.8%', height: 51, borderRadius: 15, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  timeSelected: { borderColor: colors.coral, backgroundColor: colors.peach },
  timeDisabled: { opacity: 0.45 },
  timeText: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  timeTextSelected: { color: colors.warning, fontWeight: '900' },
  helper: { color: colors.inkMuted, fontSize: 12, marginTop: 12 },
  summaryCard: { backgroundColor: colors.white, borderRadius: 24, padding: 18, borderWidth: 1, borderColor: colors.line, ...shadow },
  summaryTop: { flexDirection: 'row', alignItems: 'center' },
  summaryPrice: { color: colors.forest, fontSize: 20, fontWeight: '900' },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 18 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 17 },
  summaryIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.mintSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  summaryLabel: { color: colors.inkMuted, fontSize: 11, marginBottom: 3 },
  summaryValue: { color: colors.ink, fontSize: 14, fontWeight: '800', textTransform: 'capitalize' },
  notice: { marginTop: 15, borderRadius: 18, padding: 15, backgroundColor: colors.mintSoft, flexDirection: 'row', alignItems: 'center', gap: 11 },
  noticeText: { flex: 1, color: colors.inkMuted, fontSize: 12, lineHeight: 18 },
  footer: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: colors.cream },
  pressed: { opacity: 0.82 },
});
