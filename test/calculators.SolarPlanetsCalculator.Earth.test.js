const expect = require("chai").expect;
const Earth = require('../src/calculators/SolarPlanetsCalculator/planets/Earth');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const Angle = require('../src/math/Angle');

const angle = new Angle;

describe('#Earth', () => {
  describe('Verify', () => {
    it('天文算法 例.24.b', () => {
      let earth = new Earth(new JDateRepository(2448908.5, 'jde'));
      let sc = earth.sc;

      expect(earth.l.inRound().getRadian()).to.closeTo(angle.setRadian(-43.63484796).inRound().getRadian(), 0.00000001);
      expect(Math.PI / 2 - sc.theta).to.closeTo(angle.setRadian(-0.00000312).inRound(-90).getRadian(), 0.000001);
      expect(sc.r).to.closeTo(0.99760775, 0.00000001);
    })
  });
})