# How to help


## Setup

[pt-br](https://github.com/polutz/generator-ptz-graphql/docs/contribute.pt-br.md)
[en-us](https://github.com/polutz/generator-ptz-graphql/docs/contribute.md)

### Download project
```
    git clone https://github.com/polutz/generator-ptz-graphql.git
```

### Go to project folder
```
    cd generator-ptz-graphql
```

### Install dependencies
```
    npm install -g yo
```

### Make it globally

With 'npm link', you can run 'yo ptz-graphql' from anywhere on your machine,
and it will always points to this directory

```
    npm link
```

## Tests
```
    npm test
```

## Integration Test

### Create test project folder
```
    mkdir ptz-graphql-test && cd ptz-graphql-test 
```

### Clean test project folder
```
    cd .. && rm -r ptz-graphql-test && mkdir ptz-graphql-test && cd ptz-graphql-test
```

### Run Yeoman
```
    yo ptz-graphql
```
