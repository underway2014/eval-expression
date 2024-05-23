const assert = require('node:assert');
const evalExpression = require('./index')
const Big = require('big.js')

let data = [
    ['(+1+12*(3-1/6*7*3) - 3*(6-21*3/2 - 0.000000000178999*6 + 33)-3+4)*2+8/(4*-6)+ -44', 
        Big(1)
          .add(Big(12).times(Big(3).minus(Big(1).div(6).times(7).times(3))))
          .minus(Big(3).times(Big(6).minus(Big(21).times(3).div(2)).minus(Big(0.000000000178999).times(6)).plus(33))).minus(3).add(4)
        .times(2)
        .add(Big(8).div(Big(4).times(-6)))
        .add(-44).toNumber()
    ],
    ['-19618.9/0.000000000178999841', Big(-19618.9).div(0.000000000178999841).toNumber() ],
    ['1.1+12*4444.44444/3333.22331',Big(1.1).plus(Big(12).times(4444.44444).div(3333.22331)).toNumber() ],
    ['0+0', 0 ],
    ['0.1+0.2', 0.3],
    ['0.0000000000000611670287*1182.8 --0.000000000000339156493611 *(33.1 - 11.234572342)',  
        Big(0.0000000000000611670287).times(1182.8).minus(Big(-0.000000000000339156493611).times(Big(33.1).minus(11.234572342))).toNumber()
    ],
    ['123456464*33534654764365+4848487272*8484884848484848848484/22-12354/33', 
    Big(123456464).times(33534654764365).plus(Big(4848487272).times(8484884848484848848484).div(22)).plus(Big(12354).div(33)).toNumber()]

]


for(let i = 0; i < data.length; i++) {
    let el = data[i]
    let val = evalExpression(el[0])
    console.log('val = ', val)
   assert.strictEqual(val, el[1], `index = ${i} not equal`)
}

console.log('==== all tests pass =========')