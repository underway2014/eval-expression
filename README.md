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

evalExpression('1+2.12/3*(122+5/3)-2')

```

CommonJS:

```javascript
const evalExpression = require('eval-math-expression').default

evalExpression('1+2.12/3*(122+5/3)-2')

```

