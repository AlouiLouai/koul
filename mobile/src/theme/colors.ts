// Brand Colors - Single Source of Truth
// Synchronized with ThemeContext.tsx for absolute consistency
export const COLORS = {
  light: {
    background: ['#fdfcf0', '#f1f5f9', '#e0f2fe'] as const,
    glass: 'rgba(255, 255, 255, 0.3)',
    glassBorder: 'rgba(15, 23, 42, 0.18)',
    text: '#0f172a',
    textSecondary: '#475569',
    primary: '#2563eb',
    accent: '#e11d48',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    tint: 'light' as const,
  },
  dark: {
    background: ['#020617', '#0f172a', '#1e293b'] as const,
    glass: 'rgba(15, 23, 42, 0.75)',
    glassBorder: 'rgba(255, 255, 255, 0.38)',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    primary: '#38bdf8',
    accent: '#fb7185',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    tint: 'dark' as const,
  },
};

export type ThemeColors = typeof COLORS.light;