/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},

		screens: {
			'2xl': { min: '1535px' },
			// => @media (max-width: 1535px) { ... }

			xl: { min: '1279px' },
			// => @media (max-width: 1279px) { ... }

			lg: { min: '992' },
			// => @media (max-width: 1023px) { ... }

			md: { min: '768px' },
			// => @media (max-width: 767px) { ... }

			sm: { min: '480' },
			// => @media (max-width: 639px) { ... }

			xs: { max: '479px' },
			// => @media (max-width: 479px) { ... }
		},
	},
	plugins: [],
};
