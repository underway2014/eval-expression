import * as Big from  'big.js'

const operatorPriority =  {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1
}

const operations = {
    '+': add,
    '-': minus,
    '*': times,
    '/': div
}

type Okey = keyof typeof  operations

function add(x, y) {
  return Big(x).add(y)
}

function minus(x, y) {
  return Big(x).minus(y)
}

function times(x, y) {
  return Big(x).times(y)
}

function div(x, y) {
  return Big(x).div(y)
}

const evalExpression = function(expression) {
  expression = expression.replace(/\s+/g, '')

   const result = evalAtomExpression(expression)

   return Big(result).toNumber()
}

function evalAtomExpression(expression) {
  let matchs = expression.match(/\((\d|\.|\+|-|\*|\/)*\)/)
  if (!matchs) return parse(expression)

  for (let el of matchs) {
    let val = evalAtomExpression(el.replace(/(^\(|\)$)/g, ''))
    expression = expression.replace(el, val)
  }

  return evalAtomExpression(expression)
}

function parse (expression: string) {
  const valueStack: any[] = [],
    operatorStack: any[] = []

  let isVal = true
  for (let i = 0; i < expression.length; ) {
    let element
    if (isVal) {
      const matchElements = expression.match(/(\+|-){0,1}\d*\.?\d*/)
      if(!matchElements) {
        throw Error(`expression error: ${expression}`)
      }
      element = matchElements[0]
      valueStack.push(element)
    } else {
      element = expression[0]
      check(element, operatorStack, valueStack)
    }

    isVal = !isVal

    expression = expression.replace(element, '')

    if (!expression.length) {
      let old = operatorStack.pop()
      while (old) {
        calculate(old, valueStack)
        old = operatorStack.pop()
      }
    }
  }

  return valueStack.pop()
}

function calculate(old: Okey, valueStack) {
  let behind = +valueStack.pop()
  let front = +valueStack.pop()
  let result = operations[old](front, behind)
  valueStack.push(result)
}

function check(newOperation, operatorStack, valueStack) {
  let old = operatorStack.pop()

  if (!old) {
    return operatorStack.push(newOperation)
  }

  if (operatorPriority[old] >= operatorPriority[newOperation]) {
    calculate(old, valueStack)
    check(newOperation, operatorStack, valueStack)
  } else {
    operatorStack.push(old)
    operatorStack.push(newOperation)
  }
}


export default evalExpression