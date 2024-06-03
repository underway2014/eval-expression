# eval-math-expression

**Evaluate math expressions from String,  Currently, only addition, subtraction, multiplication, and division are supported**

## Install
 ```
 npm i eval-math-expression
 ```


## Use


ES module:

```javascript
import evalExpression from 'eval-math-expression'

evalExpression('(2+3/(3-1))*1.123')  // result: 3.9305

```

CommonJS:

```javascript
const evalExpression = require('eval-math-expression').default

evalExpression('(2+3/(3-1))*1.123') // result: 3.9305

```

## Build

```
npm run build
```

## Test
```
npm run test
```