import globals from 'globals'
import pluginJs from '@eslint/js'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    {
        rules: {
            'prettier/prettier': 'error',
        },
    },
    prettier,
    pluginPrettier,
]
