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
                'src/index.ts'
            ]);
        });

        it('creates schema.json', function () {
            assert.file([
                'public/_schema.json'
            ]);
        });

        it('creates core files', function () {
            assert.file([
                'src/core/schema.ts'
            ]);
        });

        it('creates users files', function () {
            assert.file([
                'src/users/userSchema.ts',
                'src/users/userQueryExamples.json',
            ]);
        });
    });
});
