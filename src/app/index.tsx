import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { services } from '../data';
import { colors, shadow } from '../theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <View>
            <Text style={styles.eyebrow}>BUENOS DÍAS</Text>
            <Text style={styles.greeting}>Hola, Alex 👋</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Notificaciones" style={styles.notification}>
            <Ionicons name="notifications-outline" size={22} color={colors.ink} />
            <View style={styles.dot} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroDecorOne} />
          <View style={styles.heroDecorTwo} />
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>AGENDA SIMPLE</Text>
            <Text style={styles.heroTitle}>Tu tiempo,{`\n`}bien cuidado.</Text>
            <Text style={styles.heroText}>Reserva tu próxima cita en menos de un minuto.</Text>
          </View>
          <Pressable testID="book-primary" accessibilityRole="button" onPress={() => router.push('/book')} style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
            <Text style={styles.heroButtonLabel}>Agendar ahora</Text>
            <View style={styles.heroArrow}><Ionicons name="arrow-forward" size={18} color={colors.forest} /></View>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Servicios populares</Text>
          <Text style={styles.sectionHint}>Elige tu bienestar</Text>
        </View>

        <View style={styles.serviceList}>
          {services.map((service) => (
            <Pressable
              key={service.id}
              testID={`home-service-${service.id}`}
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/book', params: { service: service.id } })}
              style={({ pressed }) => [styles.serviceCard, pressed && styles.pressed]}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon as keyof typeof Ionicons.glyphMap} size={23} color={colors.forest} />
              </View>
              <View style={styles.serviceCopy}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceMeta}>{service.duration} · desde {service.price}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.inkMuted} />
            </Pressable>
          ))}
        </View>

        <View style={styles.careCard}>
          <View style={styles.careIcon}><Ionicons name="sparkles" size={22} color={colors.coral} /></View>
          <View style={styles.careCopy}>
            <Text style={styles.careTitle}>Un espacio para ti</Text>
            <Text style={styles.careText}>Tu cita incluye 10 minutos de preparación sin costo.</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.nav}>
        <Pressable style={styles.navItem}><Ionicons name="home" size={22} color={colors.forest} /><Text style={styles.navActive}>Inicio</Text></Pressable>
        <Pressable testID="nav-appointments" onPress={() => router.push('/appointments')} style={styles.navItem}><Ionicons name="calendar-outline" size={22} color={colors.inkMuted} /><Text style={styles.navText}>Mis citas</Text></Pressable>
        <Pressable testID="nav-professional" onPress={() => router.push('/professional')} style={styles.navItem}><Ionicons name="briefcase-outline" size={22} color={colors.inkMuted} /><Text style={styles.navText}>Profesional</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 116 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  eyebrow: { color: colors.coral, fontWeight: '800', fontSize: 11, letterSpacing: 1.6, marginBottom: 4 },
  greeting: { color: colors.ink, fontSize: 25, fontWeight: '800', letterSpacing: -0.5 },
  notification: { width: 46, height: 46, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line },
  dot: { position: 'absolute', right: 10, top: 9, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.coral, borderWidth: 1.5, borderColor: colors.white },
  hero: { backgroundColor: colors.forest, borderRadius: 28, padding: 24, minHeight: 276, overflow: 'hidden', ...shadow },
  heroCopy: { zIndex: 2, maxWidth: '88%' },
  heroKicker: { color: colors.mint, fontSize: 11, fontWeight: '800', letterSpacing: 1.8, marginBottom: 12 },
  heroTitle: { color: colors.white, fontSize: 37, lineHeight: 40, fontWeight: '800', letterSpacing: -1.2 },
  heroText: { color: '#D9E7E2', fontSize: 14, lineHeight: 20, marginTop: 13, maxWidth: 240 },
  heroButton: { zIndex: 2, marginTop: 24, height: 52, borderRadius: 16, backgroundColor: colors.white, flexDirection: 'row', paddingLeft: 18, paddingRight: 7, alignItems: 'center', alignSelf: 'flex-start', gap: 18 },
  heroButtonLabel: { color: colors.forest, fontSize: 15, fontWeight: '800' },
  heroArrow: { width: 37, height: 37, borderRadius: 13, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  heroDecorOne: { position: 'absolute', width: 150, height: 150, borderRadius: 75, backgroundColor: '#2C6A5C', right: -45, top: -35 },
  heroDecorTwo: { position: 'absolute', width: 85, height: 85, borderRadius: 43, borderWidth: 18, borderColor: '#F47B5F', right: -22, bottom: -19, opacity: 0.8 },
  sectionHeader: { marginTop: 30, marginBottom: 14 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '800', letterSpacing: -0.4 },
  sectionHint: { color: colors.inkMuted, fontSize: 13, marginTop: 3 },
  serviceList: { gap: 11 },
  serviceCard: { minHeight: 80, backgroundColor: colors.white, borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.line, ...shadow },
  serviceIcon: { width: 52, height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  serviceCopy: { flex: 1, marginLeft: 13 },
  serviceName: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  serviceMeta: { color: colors.inkMuted, fontSize: 12, marginTop: 5 },
  careCard: { marginTop: 22, borderRadius: 20, backgroundColor: colors.peach, padding: 16, flexDirection: 'row', alignItems: 'center' },
  careIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  careCopy: { flex: 1, marginLeft: 13 },
  careTitle: { color: colors.ink, fontWeight: '800', fontSize: 14 },
  careText: { color: colors.inkMuted, fontSize: 12, lineHeight: 18, marginTop: 2 },
  nav: { position: 'absolute', left: 16, right: 16, bottom: 14, height: 72, borderRadius: 24, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', ...shadow },
  navItem: { width: 92, height: 56, alignItems: 'center', justifyContent: 'center', gap: 4 },
  navActive: { color: colors.forest, fontSize: 11, fontWeight: '800' },
  navText: { color: colors.inkMuted, fontSize: 11, fontWeight: '600' },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
