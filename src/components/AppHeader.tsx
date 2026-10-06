import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = { title?: string; subtitle?: string; onBack?: () => void; step?: string };

export function AppHeader({ title, subtitle, onBack, step }: Props) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Volver" testID="back-button" onPress={onBack} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color={colors.ink} />
        </Pressable>
      ) : null}
      <View style={styles.copy}>
        {step ? <Text style={styles.step}>{step}</Text> : null}
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  back: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line },
  copy: { flex: 1 },
  step: { color: colors.coral, fontSize: 12, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 5 },
  title: { color: colors.ink, fontSize: 29, lineHeight: 34, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { color: colors.inkMuted, fontSize: 15, lineHeight: 22, marginTop: 7 },
});
