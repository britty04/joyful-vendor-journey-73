
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced vibrant colors for our event marketplace
				eventBlue: {
					50: '#e6f2ff',
					100: '#cce5ff',
					200: '#99ccff',
					300: '#66b2ff',
					400: '#3399ff',
					500: '#007fff',
					600: '#0066cc',
					700: '#004d99',
					800: '#003366',
					900: '#001a33',
					950: '#000d1a',
				},
				eventPurple: {
					50: '#f5f0ff',
					100: '#ebe0ff',
					200: '#d6c2ff',
					300: '#c2a3ff',
					400: '#ad85ff',
					500: '#9966ff',
					600: '#7a52cc',
					700: '#5c3d99',
					800: '#3d2966',
					900: '#1f1433',
					950: '#100a1a',
				},
				eventPink: {
					50: '#fff0f6',
					100: '#ffe0ed',
					200: '#ffc2db',
					300: '#ffa3c9',
					400: '#ff85b6',
					500: '#ff66a4',
					600: '#cc5283',
					700: '#993d62',
					800: '#662941',
					900: '#331421',
					950: '#1a0a10',
				},
				eventGreen: {
					50: '#edfff4',
					100: '#d6ffe6',
					200: '#adffcc',
					300: '#85ffb3',
					400: '#5cff99',
					500: '#33ff80',
					600: '#29cc66',
					700: '#1f994d',
					800: '#146633',
					900: '#0a331a',
					950: '#05190d',
				},
				eventYellow: {
					50: '#fffbed',
					100: '#fff6db',
					200: '#ffecb8',
					300: '#ffe394',
					400: '#ffd971',
					500: '#ffd04d',
					600: '#cca63e',
					700: '#997d2e',
					800: '#66531f',
					900: '#332a0f',
					950: '#1a1508',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'blur-in': {
					'0%': { filter: 'blur(8px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'slide-down': 'slide-down 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'blur-in': 'blur-in 0.6s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite'
			},
			backgroundImage: {
				'confetti-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01LjY4MyA1LjY4M2MyLjQ5OC0yLjQ5OCA2LjU0Ni0yLjQ5OCA5LjA0NCAwbDM5LjU5IDM5LjU5YzIuNDk4IDIuNDk4IDIuNDk4IDYuNTQ2IDAgOS4wNDRzLTYuNTQ2IDIuNDk4LTkuMDQ0IDBsLTM5LjU5LTM5LjU5Yy0yLjQ5OC0yLjQ5OC0yLjQ5OC02LjU0NiAwLTkuMDQ0eiIgZmlsbD0iI2ZmYmQ1ZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik01MC43MTIgNS42ODNjMi40OTggMi40OTggMi40OTggNi41NDYgMCA5LjA0NGwtMzkuNTkgMzkuNTljLTIuNDk4IDIuNDk4LTYuNTQ2IDIuNDk4LTkuMDQ0IDBzLTIuNDk4LTYuNTQ2IDAtOS4wNDRsMzkuNTktMzkuNTljMi40OTgtMi40OTggNi41NDYtMi40OTggOS4wNDQgMHoiIGZpbGw9IiNmZjUzOTEiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')",
				'dots-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDIwdjIwSDB6Ii8+PGNpcmNsZSBjeD0iMi41IiBjeT0iMi41IiByPSIuNSIgZmlsbD0iIzk5NjZmZiIgZmlsbC1vcGFjaXR5PSIuMiIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9Ii41IiBmaWxsPSIjOTk2NmZmIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PGNpcmNsZSBjeD0iMTcuNSIgY3k9IjE3LjUiIHI9Ii41IiBmaWxsPSIjOTk2NmZmIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')",
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
