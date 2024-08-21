const colors=require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode:"class",
  theme: {
    extend:{
      screens:{
        "xs":"435px"
      },
      colors:{
        // primary:{
        //   DEFAULT:"#d84315",
        //   300:"#ff8a65",
        //   600:"#ff5722",
        //   700:"#ff3d00",
        //   800:"#d84315",
        // },
        primary:{
          DEFAULT:"#d84315",
          50:"#fff7ed",
          100:"#ffedd5",
          200:"#fed7aa",
          300:"#fdba74",
          400:"#fb923c",
          500:"#f97316",
          600:"#ea580c",
          700:"#c2410c",
          800:"#9a3412",
          900:"#7c2d12",
          950:"#431407",
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('svg', '& svg');
      addVariant('li', '& li');
    }
  ],
}
