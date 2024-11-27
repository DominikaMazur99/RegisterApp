/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                customBackground: "#EFEAF7",
                inactivePurple: "#CBB6E5",
                hoverPurple: "#6A19CD",
                defaultPurple: "#761BE4",
                errorBackground: "#FEECEC",
                errorBorder: "#ED4545",
                textColor: "#000853",
            },
        },
    },
    plugins: [],
};
