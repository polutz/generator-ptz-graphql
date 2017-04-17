'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('ptz-domain:app', function () {
    describe('default', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withArguments(['MyCoolApp'])
                .withOptions({ skipInstall: true })
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'LICENSE',
                'package.json',
                'README.md',
                'tsconfig.json',
                '.gitignore',
                '.travis.yml',
                'src/index.ts',
                'src/mongoDbUrl.ts'
            ]);
        });

        it('creates schema.json', function () {
            assert.file([
                'public/schema.json'
            ]);
        });

        it('creates core files', function () {
            assert.file([
                'src/core/schema.ts',
                'src/core/appSchema.ts'
            ]);
        });

        it('creates users files', function () {
            assert.file([
                'src/users/userSchema.ts',
                'src/users/userQueryExamples.json',
            ]);
        });

        it('creates menuss files', function () {
            assert.file([
                'src/menus/menuSchema.ts'
            ]);
        });
    });
});
