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
                'gulpfile.js',
                'LICENSE',
                'package.json',
                'README.md',
                'tsconfig.json',
                'typings.json',
                '.gitignore',
                '.travis.yml',
                'typings/index.d.ts',
                'src/index.ts'
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
