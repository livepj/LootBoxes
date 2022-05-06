module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': ["plugin:@typescript-eslint/recommended"],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
	],
	'rules': {
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'indent': ['error', 4],
		"max-len": ["error", { "code": 160 }],
		'padded-blocks': ["error", "never"],
		'object-curly-spacing': ["error", "always"],
		'no-magic-numbers': 0,
		'space-before-function-paren': ["error", "never"]
	},
	'ignorePatterns': ['.eslintrc.js', 'webpack.config.js']
}
