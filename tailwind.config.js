module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [
    require('tailwindcss-rem2px-preset').createPreset({
      fontSize: 4,
      unit: 'rpx',
    }),
  ],
  corePlugins: {
    preflight: false,
  },
}
