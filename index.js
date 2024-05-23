const Big = require('big.js');

const operatorPriority = new Map([
  ['+', 0],
  ['-', 0],
  ['*', 1],
  ['/', 1]
])

const operations = new Map([
  ['+', add],
  ['-', minus],
  ['*', times],
  ['/', div]
])

function add(x, y) {
  return   Big(x).add(y)
}
function minus(x, y) {
  return new Big(x).minus(y)
}
function times(x, y) {
  return new Big(x).times(y)
}

function div(x, y) {
  return new Big(x).div(y)
}

function evalExpression(expression) {
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

function parse (expression) {
  const valueStack = [],
    operatorStack = []

  let isVal = true
  for (let i = 0; i < expression.length; ) {
    let element
    if (isVal) {
      element = expression.match(/(\+|-){0,1}\d*\.?\d*/)[0]
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

function calculate(old, valueStack) {
  let behind = +valueStack.pop()
  let front = +valueStack.pop()
  let result = operations.get(old)(front, behind)
  valueStack.push(result)
}

function check(newOperation, operatorStack, valueStack) {
  let old = operatorStack.pop()

  if (!old) {
    return operatorStack.push(newOperation)
  }

  if (operatorPriority.get(old) >= operatorPriority.get(newOperation)) {
    calculate(old, valueStack)
    check(newOperation, operatorStack, valueStack)
  } else {
    operatorStack.push(old)
    operatorStack.push(newOperation)
  }
}


exports = module.exports = evalExpression
