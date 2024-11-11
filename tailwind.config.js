/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,css,ts,hbs}"],
  theme: {
    extend: {
      colors: {

        'danger': '#e3342f',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        customTheme: {
          'primary': '#4a5777',
          'secondary': '#558d4f',
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "off-white": "#FAF9F6"
        },
      },],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}

