import { assert } from "chai";
import evalMath from '../src/index'

describe("eval expression", () => {
      it("should", () => {
      const result = evalMath('2+3/2');
      assert.equal(result, 3.5);
   });
});