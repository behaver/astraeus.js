const expect = require("chai").expect;
const SunLocator = require('../src/locators/SolarStarLocator/planets/Sun');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const EclipticCoordinate = require('../src/coords/EclipticCoordinate');
const Angle = require('../src/math/Angle');

const angle = new Angle;

describe('#SunLocator', () => {
  describe('Verify', () => {
    it('天文算法 例24.b', () => {
      let SunC = new SunLocator({ time: new JDateRepository(2448908.5, 'jde') });
      let ECC = SunC.get().coord;

      expect(ECC.longitude.getDegrees()).to.closeTo(199.907372, 0.000001);
      expect(ECC.latitude.getDegrees()).to.closeTo(0.000179, 0.00002);
      expect(ECC.radius).to.closeTo(0.99760775, 0.00000001);

      ECC.enableFK5 = true;
      ECC.onFK5 = true;

      expect(ECC.longitude.getDegrees()).to.closeTo(199.907347, 0.000001);
      expect(ECC.latitude.getSeconds()).to.closeTo(0.62, 0.05);

      ECC.withNutation = true;
      ECC.enableAnnualAberration = true;
      ECC.withAnnualAberration = true;

      expect(ECC.longitude.getDegrees()).to.closeTo(angle.parseDACString('199°54′21.818″').getDegrees(), 0.000001);
      expect(ECC.latitude.getSeconds()).to.closeTo(0.62, 0.05);
      expect(ECC.radius).to.closeTo(0.99760775, 0.00000001);
    })
  });
})