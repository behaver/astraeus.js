const calcUTDelay = require('../src/time/UTDelay');
const expect = require("chai").expect;

describe('#index.js', () => {
  describe('#Logic', () => {
  	it('If the param is not number, it should throw an error.', () => {
      expect(() => {calcUTDelay('1842')}).to.throw();
    });
    it('If the param less than -4000, it should throw an error.', () => {
      expect(() => {calcUTDelay(-4001)}).to.throw();
    });
  });

  describe('#Verification', () => {
    // it('Input 1620, output 124.[天文算法 9.A]', () => {
    //   expect(calcUTDelay(1620).toFixed(0)).equal('124');
    // });
    // it('Input 1680, output 16.[天文算法 9.A]', () => {
    //   expect(calcUTDelay(1680).toFixed(0)).equal('16');
    // });
    // it('Input 1720, output 11.[天文算法 9.A]', () => {
    //   expect(calcUTDelay(1720).toFixed(0)).equal('11');
    // });
    it('Input 1780, output 17.[天文算法 9.A]', () => {
      expect(calcUTDelay(1780).toFixed(0)).equal('17');
    });
    it('Input 1820, output 12.[天文算法 9.A]', () => {
      expect(calcUTDelay(1820).toFixed(0)).equal('12');
    });
    // it('Input 1880, output -5.4.[天文算法 9.A]', () => {
    //   expect(calcUTDelay(1880).toFixed(1)).equal('-5.4');
    // });
    // it('Input 1900, output -2.7.[天文算法 9.A]', () => {
    //   expect(calcUTDelay(1900).toFixed(1)).equal('-2.7');
    // });
    it('Input 1950, output 29.1.[天文算法 9.A]', () => {
      expect(calcUTDelay(1950).toFixed(1)).equal('29.1');
    });
    // it('Input 1992, output 58.3.[天文算法 9.A]', () => {
    //   expect(calcUTDelay(1992).toFixed(1)).equal('58.3');
    // });
    // it('Input 333, output 7074.[天文算法 9.b]', () => {
    //   expect(calcUTDelay(333).toFixed(0)).equal('7074');
    // });
  })
});