/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: false, // Disable dark mode entirely
    theme: {
        extend: {},
    },
    plugins: [],
    variants: {
        extend: {},
    },
    utilities: {
        ".scrollbar-hide": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
            "&::-webkit-scrollbar": {
                display: "none",
            },
        },
    },
};
