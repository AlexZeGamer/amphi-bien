// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
  trailingComma: 'es5',
  bracketSpacing: true,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: 'Routes.*',
      options: {
        printWidth: 999,
      },
    },
  ],
  tailwindConfig: './web/config/tailwind.config.js',
  plugins: ['prettier-plugin-tailwindcss'],
}
