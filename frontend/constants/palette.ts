/**
 * TripMind — Brand color palette
 *
 * Usage:
 *   import { Palette } from '@/constants/palette';
 *   style={{ color: Palette.primary }}
 */

export const Palette = {
  // ── Primary (teal) ──────────────────────────────────────────────────────
  /** Main brand teal – buttons, active states, accents */
  primary:       '#1A6B5A',
  /** Lighter teal – hover / pressed states */
  primaryMid:    '#2E9E82',
  /** Very light teal – chip backgrounds, feature boxes, icon badges */
  primaryLight:  '#E6F5F1',

  // ── Neutrals ────────────────────────────────────────────────────────────
  /** Page / card backgrounds */
  white:         '#FFFFFF',
  /** Subtle off-white – form area backgrounds */
  surface:       '#FAFAFA',
  /** Dividers, input borders */
  border:        '#E5E7EB',
  /** Slightly darker border – chip borders */
  borderMid:     '#D1D5DB',

  // ── Text ────────────────────────────────────────────────────────────────
  /** Primary body text */
  textPrimary:   '#111827',
  /** Secondary / label text */
  textSecondary: '#374151',
  /** Placeholder / hint text */
  textMuted:     '#6B7280',
  /** Disabled / placeholder input text */
  textFaint:     '#9CA3AF',

  // ── Utility ─────────────────────────────────────────────────────────────
  /** Modal scrim */
  overlay:       'rgba(0,0,0,0.6)',
  /** Danger / destructive actions */
  danger:        '#EF4444',
} as const;
