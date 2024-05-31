import { assert } from "chai";
import evalMath from '../src/index'
import * as Big from 'big.js'

describe("eval expression", () => {
      it("should", () => {
      let result = evalMath('2+3/2');
      assert.equal(result, 3.5);

      result = evalMath('(+1+12*(3-1/6*7*3) - 3*(6-21*3/2 - 0.000000000178999*6 + 33)-3+4)*2+8/(4*-6)+ -44');
      let bResult = Big(1)
      .add(Big(12).times(Big(3).minus(Big(1).div(6).times(7).times(3))))
      .minus(Big(3).times(Big(6).minus(Big(21).times(3).div(2)).minus(Big(0.000000000178999).times(6)).plus(33))).minus(3).add(4)
      .times(2)
      .add(Big(8).div(Big(4).times(-6)))
      .add(-44).toNumber()
      assert.equal(result, bResult)

      result = evalMath('0.0000000000000611670287*1182.8 --0.000000000000339156493611 *(33.1 - 11.234572342)')
      bResult = Big(0.0000000000000611670287).times(1182.8).minus(Big(-0.000000000000339156493611).times(Big(33.1).minus(11.234572342))).toNumber()
      assert.equal(result, bResult)


      result = evalMath('123456464*33534654764365+4848487272*8484884848484848848484/22-12354/33')
      bResult = Big(123456464).times(33534654764365).plus(Big(4848487272).times(8484884848484848848484).div(22)).plus(Big(12354).div(33)).toNumber()
      assert.equal(result, bResult)

   });
});