const expect = require("chai").expect;
const VenusLocator = require('../src/locators/SolarStarLocator/planets/Venus');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const EclipticCoordinate = require('../src/coords/EclipticCoordinate');
const Angle = require('../src/math/Angle');

const angle = new Angle;

describe('#VenusLocator', () => {
  describe('Verify', () => {
    it('天文算法 例31.a', () => {
      let venus = new VenusLocator({ time: new JDateRepository(2448976.5, 'jde') });
      let sc = venus.get().coord.sc;

      expect(sc.phi).to.closeTo(angle.setRadian(-68.6592582).inRound().getRadian(), 0.00001);
      expect(Math.PI / 2 - sc.theta).to.closeTo(angle.setRadian(-0.0457399).inRound(-90).getRadian(), 0.00001);
      expect(sc.r).to.closeTo(0.724603, 0.00001);

      venus.withLTE = true;
      let sc2 = venus.get().coord.sc;
      
      expect(sc.phi).not.to.equal(sc2.phi);
      expect(sc.theta).not.to.equal(sc2.theta);
    });
  });
});
