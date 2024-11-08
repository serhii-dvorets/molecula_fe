import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
			},
			fontSize: {
				'display-large': ['57px', { lineHeight: '64px', fontWeight: '400' }],
				'display-medium': ['45px', { lineHeight: '52px', fontWeight: '400' }],
				'display-small': ['36px', { lineHeight: '44px', fontWeight: '400' }],
				'headline-large': ['32px', { lineHeight: '40px', fontWeight: '400' }],
				'headline-medium': ['28px', { lineHeight: '36px', fontWeight: '400' }],
				'headline-small': ['24px', { lineHeight: '32px', fontWeight: '400' }],
				'title-large': ['22px', { lineHeight: '28px', fontWeight: '500' }],
				'title-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
				'label-large': ['14px', { lineHeight: '20px', fontWeight: '500' }],
				'label-small': ['12px', { lineHeight: '16px', fontWeight: '500' }],
				'body-large': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'body-small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
			},
		},
	},
	plugins: [],
} satisfies Config;
