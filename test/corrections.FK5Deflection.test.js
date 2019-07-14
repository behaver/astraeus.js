const FK5Deflection = require("../src/corrections/FK5Deflection");
const JDateRepository = require("../src/time/JDate/JDateRepository");
const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
const Angle = require('../src/math/Angle');

const expect = require("chai").expect;
const angle = new Angle;

describe('#FK5Deflection', () => {
  describe('#constructor', () => {
    it('The param time should be a JDateRepository.', () => {
      expect(() => {
        new FK5Deflection({
          time: new JDateRepository(18, 'j2000'),
          sc: new SphericalCoordinate3D(1, 1, 1),
        })
      }).not.to.throw();

      expect(() => {
        new FK5Deflection({
          time: 123,
          sc: new SphericalCoordinate3D(1, 1, 1),
        })
      }).to.throw(); 
    });
  });

  describe('#get()', () => {
    it('Verify', () => {
      let time = new JDateRepository(2448976.5 - 0.0052612, 'jde'),
          a = angle.setDegrees(313.07689).getRadian(),
          b = Math.PI / 2 - angle.setDegrees(-2.08489).getRadian(),
          sc = new SphericalCoordinate3D(0.910947, b, a),
          FK5D = new FK5Deflection({
            time,
            sc,
            system: 'ecliptic',
          }),
          res = FK5D.get();

      expect(angle.setRadian(res.a).getDegrees()).to.closeTo(-0.00003, 0.00001);
      expect(angle.setRadian(res.b).getDegrees()).to.closeTo(0.00001, 0.00001);

      FK5D.system = 'equinoctial';

      console.log(FK5D.get());
    });
  });

  describe('#set time(time)', () => {
    it('After set time, the return of get() should be changed.', () => {
      let FK5D = new FK5Deflection({
        time: new JDateRepository(18, 'j2000'),
        sc: new SphericalCoordinate3D(1, 1, 1),
      });

      let r0 = FK5D.get();

      FK5D.time = new JDateRepository(0, 'j2000');

      let r1 = FK5D.get();

      expect(r0.a).not.to.equal(r1.a);
      expect(r0.b).not.to.equal(r1.b);
    })
  });

  describe('#get time()', () => {
    it('The return of set time() should be a JDateRepository.', () => {
      let FK5D = new FK5Deflection({
        time: new JDateRepository(18, 'j2000'),
        sc: new SphericalCoordinate3D(1, 1, 1),
      });

      expect(FK5D.time).to.be.a.instanceof(JDateRepository);
    })
  });
})