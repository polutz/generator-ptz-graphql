'use strict';

var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    defaultPrompting = require('generator-ptz/generators/app/defaultPrompting');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    //initializing - Your initialization methods (checking current project state, getting configs, etc)
    initializing() {
        this.log('initializing');
    }

    //prompting - Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        return defaultPrompting(this);
    }

    //    configuring - Saving configurations and configure the project (creating.editorconfig files and other metadata files)
    configuring() {
        this.log('configuring');
    }

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

        const pkg = _.merge({
            //"description": "this is a Polutz React App.",
            scripts: {
                "start": "npm-run-all --parallel gensalt server",
                "server": "npm run js && babel-node --presets es2015 dist/index.js",
                "gensalt": "node gensalt.js"
            },
            dependencies: {
                "bcryptjs": "^2.4.3",
                "cors": "^2.8.3",
                "dotenv": "^4.0.0",
                "express": "^4.15.2",
                "express-graphql": "^0.6.4",
                "graphql": "^0.9.2",
                "graphql-relay": "^0.5.1",
                "mongodb": "^2.2.25",
                "ptz-user-app": "^1.2.0",
                "ptz-user-domain": "^1.2.3",
                "ptz-user-repository": "^1.1.1"
            }
        }, currentPkg);

        // Let's extend package.json so we're not overwriting user previous fields
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);

        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            this.options.ptz);

        // gensalt - DEGING
        // Creates envirioment variables for password hash
        this.fs.copy(this.templatePath('_gensalt.js'),
            this.destinationPath('gensalt.js'));
        // src - END


        // src - DEGING
        this.fs.copy(this.templatePath('src/_index.ts'),
            this.destinationPath('src/index.ts'));
        // src - END


        // Core - DEGING
        this.fs.copy(this.templatePath('src/core/_schema.ts'),
            this.destinationPath('src/core/schema.ts'));
        // Core - END

        // Users - BEGIN
        this.fs.copy(this.templatePath('src/users/_userSchema.ts'),
            this.destinationPath('src/users/userSchema.ts'));

        this.fs.copy(this.templatePath('src/users/_userQueryExamples.json'),
            this.destinationPath('src/users/userQueryExamples.json'));
        // Users - END
    }

    //default - If the method name doesn't match a priority, it will be pushed to this group.
    default() {
        this.log('default');

        this.options.ptz.dontCreateIndexTs = true;
        this.options.ptz.dontCreateErrorsTs = true;

        this.composeWith(require.resolve('generator-ptz/generators/app'), {
            isComposing: true,
            skipInstall: this.options.skipInstall,
            ptz: this.options.ptz
        });
    }

    //conflicts - Where conflicts are handled (used internally)
    conflicts() {
    }

    //install - Where installation are run (npm, bower)
    install() {
    }

    //end - Called last, cleanup, say good bye, etc
    end() {
    }
};
