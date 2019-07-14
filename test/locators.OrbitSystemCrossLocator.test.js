const expect = require("chai").expect;
const OrbitSystemCrossLocator = require('../src/locators/OrbitSystemCrossLocator');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const MoonLocator = require('../src/locators/SolarStarLocator/planets/Moon');

describe('#OrbitSystemCrossLocator', () => {
  describe('#Verify', () => {
    it('1992/08/15 08:25 北交点测试', () => {
      // 实例化儒略时间
      // let jdate = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

      var jd0 = (new JDateRepository(new Date(1992, 7, 10, 8, 25), 'date')).JD;

      for (var i = 0; i < 28; i++) {
        // 实例化月球位置计算组件
        let ML = new MoonLocator({
          time: new JDateRepository(jd0),
          withLTE: true,
        });

        // 实例化轨道与基本平面交点位置计算组件
        let OSCL = new OrbitSystemCrossLocator({
          time: new JDateRepository(jd0),
          direction: true,
          orbit: ML,
          sys: 'ecc',
        });

        OSCL.coordHandler.options.withNutation = true;
        
        let {
          coord, // 交点坐标
          direction, // 相交方向（升、降）
          time, // 相交时间
        } = OSCL.get();

        expect(coord.longitude.getDegrees()).to.closeTo(88.7, 0.01);
        expect(coord.latitude.getDegrees()).to.closeTo(0, 0.01);
        
        jd0 ++;
      }
    })
  });
});

