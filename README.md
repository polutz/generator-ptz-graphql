# generator-ptz-graphql

[![Build Status](https://travis-ci.org/polutz/generator-ptz-graphql.svg)](https://travis-ci.org/polutz/generator-ptz-graphql)
[![codecov.io](http://codecov.io/github/polutz/generator-ptz-graphql/coverage.svg)](http://codecov.io/github/polutz/generator-ptz-graphql)
[![Dependency Status](https://gemnasium.com/polutz/generator-ptz-graphql.svg)](https://gemnasium.com/polutz/generator-ptz-graphql)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/polutz/generator-ptz-graphql)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Yeoman generator to create polutz domain modules.

## Install
You can remove 'yo typings' if you already have them installed
```
    npm install -g generator-ptz-graphql yo typings
```

## Create your project
Go to your project folder and run:
```    
    yo ptz-graphql && typings install
```

## Create an Entity class
replace 'EntityName' with your class name, using first letter as upercase
```    
    yo ptz-graphql:entity EntityName
```
