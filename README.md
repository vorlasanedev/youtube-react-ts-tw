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
```
3. install lucide-react (icon)
https://lucide.dev/guide/packages/lucide-react
```
npm i lucide-react
```
4. install classvariance and tailwind-merge
```
npm i class-variance-authority tailwind-merge
```