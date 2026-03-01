/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand': {
                    'blue': '#1e40af',
                    'light-blue': '#eff6ff',
                    'sky': '#7dd3fc',
                }
            },
            animation: {
                'glow': 'glow 3s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { transform: 'scale(1)', opacity: '0.4' },
                    '100%': { transform: 'scale(1.1)', opacity: '0.6' },
                }
            }
        },
    },
    plugins: [],
}
