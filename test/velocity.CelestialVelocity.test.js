const expect = require("chai").expect;
const CelestialVelocity = require('../src/velocity/CelestialVelocity');
const MoonLocator = require('../src/locators/SolarStarLocator/planets/Moon');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const SystemSwitcher = require('../src/coords/SystemSwitcher');
const CelestialLocator = require('../src/locators/CelestialLocator');

describe('#CelestialVelocity', () => {
  describe('#Verify', () => {
    it('Moon Geocentric Ecliptic Velocity.', () => {
      let ML = new MoonLocator,
          CV = new CelestialVelocity(ML);
      // console.log(new CelestialLocator, (new SolarStarLocator) instanceof CelestialLocator);

      let {
        phi, // phi 方向角速度
        theta, // theta 方向角速度
        r, // 径向速度
      } = CV.get({
        t: 2448908.5,
      });

      expect(phi).to.closeTo(0.224, 0.005);

      let rc = CV.get({
        t: 2448908.5,
        celSys: 'eqc',
        celOpts: {
          withNutation: true,
        },
        coordSys: 'rc',
      });

      expect(rc).to.have.all.keys('x', 'y', 'z');
      console.log(rc);
    });
  });
});