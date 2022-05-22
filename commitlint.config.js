module.exports = {
	'extends': ['@commitlint/config-angular'],
	'rules': {
		'scope-case': [2, 'always', 'pascal-case'],
		'type-enum': [
			2,
			'always',
			[
				'chore',
				'build',
				'ci',
				'docs',
				'feat',
				'fix',
				'perf',
				'refactor',
				'revert',
				'style',
				'test',
				'types',
				'workflow',
				'wip',
			],
		],
	},
};
