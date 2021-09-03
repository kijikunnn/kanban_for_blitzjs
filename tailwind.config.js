module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      theme: "#3474CE",
      accent: "#FF6B6A",
      bgMain: "#FFFFFF",
      bgSub: "#E5EAEE",
      textMain: "#444444",
      textSub1: "#777777",
      textSub2: "#999999",
      borderMain: "#BBBBBB",
      borderSub: "#D8D8D8",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
