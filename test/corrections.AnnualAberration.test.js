const expect = require("chai").expect;
const AnnualAberration = require("../src/corrections/AnnualAberration");
const JDateRepository = require("../src/time/JDate/JDateRepository");
const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
const Angle = require('../src/math/Angle');

const angle = new Angle;

describe('#AnnualAberration', () => {
  describe('#constructor', () => {
    it('The param time should be a JDateRepository.', () => {
      expect(() => {
        new AnnualAberration({
          time: new JDateRepository(18, 'j2000'),
          system: 'equinoctial',
          sc: new SphericalCoordinate3D(1, 1, 1),
        })
      }).not.to.throw();

      expect(() => {
        new AnnualAberration({
          time: 123,
          sc: new SphericalCoordinate3D(1, 1, 1),
        })
      }).to.throw();
    });
  });

  describe('#get()', () => {
    it('Verify', () => {
      let JD = (new JDateRepository(new Date('2028/11/13 8:0:0'), 'date')).JD,
          time = new JDateRepository(JD + 0.19, 'jd'),
          a = angle.setDegrees(41.0540613).getRadian(),
          b = Math.PI / 2 - angle.setDegrees(49.2277489).getRadian(),
          sc = new SphericalCoordinate3D(1, b, a),
          AA = new AnnualAberration({
            time,
            sc,
          }),
          res = AA.get();

      expect(res.a).to.closeTo(0.000145252, 0.000000001);
      expect(res.b).to.closeTo(0.000032723, 0.000000001);

      AA.system = 'ecliptic';

      console.log(AA.get());
    });
  });

  describe('#set time(time)', () => {
    it('After set time, the return of get() should be changed.', () => {
      let AA = new AnnualAberration({
        time: new JDateRepository(18, 'j2000'),
        sc: new SphericalCoordinate3D(1, 1, 1),
      });

      let r0 = AA.get();

      AA.time = new JDateRepository(0, 'j2000');

      let r1 = AA.get();

      expect(r0.a).not.to.equal(r1.a);
      expect(r0.b).not.to.equal(r1.b);
    })
  });

  describe('#get time()', () => {
    it('The return of set time() should be a JDateRepository.', () => {
      let AA = new AnnualAberration({
        time: new JDateRepository(18, 'j2000'),
        sc: new SphericalCoordinate3D(1, 1, 1),
      });

      expect(AA.time).to.be.a.instanceof(JDateRepository);
    })
  });
})