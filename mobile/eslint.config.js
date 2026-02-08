// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');



/**
 * @type {import('@eslint/config-helpers').SimpleExtendsElement}
 */
const reactNativeMMKV = {
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
const tanstackReactQuery = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@tanstack/react-query',
            message:
              'Do not use @tanstack/react-query directly. Use @/lib/react-query instead.',
          },
        ],

      },
    ],
  },
  ignores: ['src/lib/react-query.ts'],
}

module.exports = defineConfig([
  expoConfig,
  reactNativeMMKV,
  tanstackReactQuery,
  {
    ignores: ['dist/*'],
  },
]);
