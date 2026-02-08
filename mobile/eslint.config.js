// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');



/**
 * @type {import('@eslint/config-helpers').SimpleExtendsElement}
 */
const restrictedImports = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native-mmkv',
            message:
              'Do not use react-native-mmkv directly. Use @/lib/mmkv instead.',
          },
        ],

      },
    ],
  },
  ignores: ['src/lib/mmkv.ts'],
}

module.exports = defineConfig([
  expoConfig,
  restrictedImports,
  {
    ignores: ['dist/*'],
  },
]);
