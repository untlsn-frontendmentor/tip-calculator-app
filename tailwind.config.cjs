module.exports = {
  purge: false,
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      colors: {
        c: {
          cyan: {
            500: '#00494d',
            400: '#5e7a7d',
            300: '#9FE8DF',
            200: '#c5e4e7',
            100: '#f4fafa',
            strong: '#26c0ab'
          },
        },
      },
    },
  },
  plugins: [],
};
