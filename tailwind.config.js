/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
darkMode: "class",
theme: {
extend: {
colors: {
background: "#000000",
foreground: "#FFFFFF",
accent: {
DEFAULT: "#1e3a8a", 
glow: "#3b82f6", 
},
},
boxShadow: {
glow: "0 0 24px 2px rgba(59,130,246,0.35)",
glowSoft: "0 0 80px 16px rgba(30,58,138,0.25)",
},
animation: {
'pulse-slow': 'pulse 4s ease-in-out infinite',
},
fontFamily: {
sans: ['Inter', 'system-ui', 'sans-serif'],
},
},
},
plugins: [],
};