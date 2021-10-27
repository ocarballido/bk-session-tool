const regWords = /[a-z]+/gi;
const toPascalCase = (str) =>
    str
        ? str.match(regWords)
            .map((word) => `${word.charAt(0).toUpperCase()}${word.substr(1)}`)
                .join('')
        : '';
                

module.exports = (plop) => {
    plop.setGenerator('Create Component', {
        description: 'Creates a Component in the desired folder',
        prompts: [
            {
                type: 'list',
                name: 'ComponentFolder',
                message: 'Choose the type of component',
                choices: [
                    'atoms',
                    'molecules',
                    'organisms'
                ]
            },
            {
                type: 'input',
                name: 'ComponentName',
                message: 'Choose a name for the Component',
                transformer: toPascalCase,
                filter: toPascalCase,
                validate: (value) => {
					if ((/.+/).test(value)) { return true; }
					return 'A Component name is required';
				}
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{ComponentFolder}}/{{ ComponentName }}/{{ ComponentName }}.js',
                templateFile: '.plop/component.hbs'
            },
            {
                type: 'add',
                path: 'src/components/{{ComponentFolder}}/{{ ComponentName }}//index.js',
                templateFile: '.plop/index.hbs'
            },
            {
                type: 'add',
                path: 'src/components/{{ComponentFolder}}/{{ ComponentName }}//styles.scss',
                templateFile: '.plop/styles.hbs'
            }
        ]
    });
};