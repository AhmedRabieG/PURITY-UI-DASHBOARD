const { green, blue, yellow } = require("vuetify/util/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
    screens: {
      'xs': '375px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
      '3xl': '1600px'
    },
    fontFamily: {
      'sans': ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      'display': ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      'body': ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
    },
    colors: {
      primary: {
        900: '#151729', 
        800: '#1C1E2D', 
        700: '#242635', 
        650: "#2D3748",  
        600: '#404B52',
        500: '#A0AEC0',
        300: '#9197B3', 
        250: '#e9ecef',
        200: '#F8F9FA', 
        100: '#F9FAFB', 
      },
      secondary: { 
        900: '#00ac24',
        800: '#00AC4F', // Success green
        
        700: '#16C098', // Accent green
        650: '#40C7B9',
        600: '#40C7B9', // Turquoise
        500: '#40C7B9', 
        400: '#4AD8C9', 
      },
      danger: {
        700: "#FF0000",
        600: "#DF0404",
        500: "#FF0000",
        400: "#F44336",
        100: "#FFC5C5",
      },
      black: {
        800: "#000000",
        
      },
      red: {
        700: "#FF0000",
        600: "#DF0404",
        500: "#FF0000",
        400: "#F44336",
        100: "#FFC5C5",
      },
      yellow: {
        700: "#FFC700",
        600: "#FFC700",
        500: "#FFB800",
       
      },
      white: {
        700: "#ffffff",
        600: "#FAFAFA"
      },
      blue: {
        700: "#5932EA",
        600: "#2196F3",
        500: "#2196F3",
        100: "#F3F1FF"
      },
      gray: {
        500: "#666666",
        400: "#D9D9D9",
        300: "#858585",
        200: "#C7C7C7",
      },
    },
    spacing: {
      0: '0',
      1: '0.25rem', // 4px
      2: '0.5rem',  // 8px
      3: '0.75rem', // 12px
      4: '1rem',   // 16px
      5: '1.25rem',  // 20px
      6: '1.5rem',   // 24px
      7: '1.75rem',  // 28px 
      8: '2rem',  // 32px
      9: '2.25rem', // 36px
      10: '2.5rem',  // 40px
      11: '2.75rem', // 44px
      12: '3rem',  // 48px
      13: '3.25rem', // 52px
      14: '3.5rem',  // 56px
      15: '3.75rem', // 60px
      16: '4rem',  // 64px
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.625rem', // 26px
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem', // 
      DEFAULT: '0.25rem', // 
      md: '0.375rem', // 
      lg: '0.5rem', // 8px
      xl: '0.75rem',  // 
      '2xl': '1rem', // 16px 
      '3xl': '1.5rem',
      full: '50%',
    },
    backgroundImage: {},
    boxShadow: {
      default: '0px 4px 4px 0px rgb(0 0 0 / 0.25),',
    }

  },
  plugins: [],
}
