/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'creative': '#FB8C00',
				'creative-light': '#FBB45C',
				'creative-dark': '#E27E00',
				'technical': '#FBA0FA',
				'technical-light': '#FFBCFE',
				'technical-dark': '#FA88F9',
				'accent': '#F0E71A',
				'accent-dark': '#7E7909',
				'midground': '#F7F6DF',
				'foreground': '#18181B',
				'background': '#EEE2CB',
			}
		},
	},
	plugins: [],
}
