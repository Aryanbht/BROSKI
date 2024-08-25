/** @type {import('tailwindcss').Config} */  
export default {  
  content: [  
    "./index.html",  
    "./src/**/*.{js,ts,jsx,tsx}",  
  ],  
  theme: {  
    extend: {  
      fontFamily: {  
        'myFont1': ["Open Sans", 'sans-serif'],  
      },  
      boxShadow: {  
        'myShadow': '0px 0px 58px #ffffff69',  
      },  
    },  
  },  
  plugins: [],  
}