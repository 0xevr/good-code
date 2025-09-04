import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'chart-1': 'hsl(var(--chart-1))',
        'chart-2': 'hsl(var(--chart-2))',
        'chart-3': 'hsl(var(--chart-3))',
        'chart-4': 'hsl(var(--chart-4))',
        'chart-5': 'hsl(var(--chart-5))',
        brand: {
          // Dark bases
          black: '#0A0F1C',
          'navy': '#1B2436',
          'slate': '#2A3441',
          
          // Primary colors
          blue: '#3B82F6',
          'blue-light': '#60A5FA',
          'blue-dark': '#1E40AF',
          
          // Accent colors
          cyan: '#06B6D4',
          'cyan-light': '#22D3EE',
          purple: '#8B5CF6',
          
          // Success/warning
          emerald: '#10B981',
          orange: '#F59E0B',
          
          // Neutral grays
          'gray-50': '#F8FAFC',
          'gray-100': '#F1F5F9',
          'gray-200': '#E2E8F0',
          'gray-300': '#CBD5E1',
          'gray-400': '#94A3B8',
          'gray-500': '#64748B',
          'gray-600': '#475569',
          'gray-700': '#334155',
          'gray-800': '#1E293B',
          'gray-900': '#0F172A',
          
          // Light variations for backgrounds
          'blue-50': '#EFF6FF',
          'cyan-50': '#ECFEFF',
          'purple-50': '#FAF5FF',
          'emerald-50': '#ECFDF5',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config