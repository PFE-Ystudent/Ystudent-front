// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    parser: 'vue-eslint-parser',
    plugins: ['vue', 'prettier', 'import'],
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.vue', '.json'],
            },
        },
    },
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-multiple-empty-lines': ['error', {
            max: 1
        }],
        'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
        'no-trailing-spaces': ['error', {
            skipBlankLines: false
        }],
        'object-curly-spacing': ['error', 'always'],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never',
            'selfClosingTag': {
                'singleline': 'never',
                'multiline': 'never'
            }
        }
        ],
        'vue/first-attribute-linebreak': ['error', {
            'singleline': 'ignore',
            'multiline': 'beside'
        }],
        'vue/require-explicit-emits': 'off',
        'vue/html-indent': ['warn', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/attributes-order': ['error', {
            'order': [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                ['UNIQUE', 'SLOT'],
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT'
            ],
            'alphabetical': false
        }],
        'vue/custom-event-name-casing': ['error', 'kebab-case'],
        'space-before-function-paren': ['error', 'always'],
        camelcase: ['error', {
            'properties': 'never',
            'ignoreDestructuring': false,
        }],
        'max-len': [
            'error',
            {
                code: 1800,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ]
    }
};
