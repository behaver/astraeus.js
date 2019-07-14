const Derivator = require('../src/math/UnaryToolkit/Derivator');
const expect = require("chai").expect;

describe('#Derivator', () => {
  describe('#Verify', () => {
    it('sin函数求导', () => {
      // 实例化微分求导器，设定 sin 函数为原函数
      let df = new Derivator({
        f: Math.sin,
        dx: 1e-7,
      });

      // 获取 π 值处的导数值
      let res = df.get(Math.PI);

      expect(res).to.closeTo(-1, 1e-7); 
    });

    it('多元结果求导', () => {
      let f = function(x) {
        let sinx = Math.sin(x);

        return {
          sin: sinx,
          sin2: sinx * sinx,
        }
      }
      // 实例化微分求导器，设定 sin 函数为原函数
      let df = new Derivator({
        f,
        dx: 1e-7,
        direction: 'both',
      });

      // 获取 π 值处的导数值
      let res = df.get(Math.PI);
console.log(res);
      expect(res).to.have.all.keys('sin', 'sin2');
      expect(res.sin).to.closeTo(-1, 1e-7); 
      expect(res.sin2).to.closeTo(0, 1e-7); 
    });
  });
});
