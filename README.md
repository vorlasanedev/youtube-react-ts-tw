# React + TypeScript + Vite
## installation
1. create project
```
npm create vite@latest
```
- input project name
- cd to project name and install node module
```
npm install
```
2. install tailwindcss framework
link: https://flowbite.com/docs/getting-started/react/
- install tailwindcss
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- config tailwind.config.js
```
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- setup tailwind directory './src/index.css'
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```# youtube-react-ts-tw
