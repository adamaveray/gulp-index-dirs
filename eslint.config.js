import { makeEslintConfig } from '@averay/codeformat';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**/*', '**/*.d.ts'],
  },
  {
    files: ['test/**/*'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, NodeJS: 'readonly' },
    },
  },
  ...makeEslintConfig({ tsconfigPath: './tsconfig.json' }),
];
