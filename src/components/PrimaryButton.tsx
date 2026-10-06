import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = { label: string; onPress: () => void; testID?: string; disabled?: boolean; icon?: keyof typeof Ionicons.glyphMap };

export function PrimaryButton({ label, onPress, testID, disabled, icon = 'arrow-forward' }: Props) {
  return (
    <Pressable accessibilityRole="button" testID={testID} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && !disabled && styles.pressed]}>
      <Text style={styles.label}>{label}</Text>
      <Ionicons name={icon} size={19} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 58, borderRadius: 18, backgroundColor: colors.forest, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  label: { color: colors.white, fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.38 },
});
