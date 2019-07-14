const expect = require("chai").expect;
const JDateRepository = require('../src/time/JDate/JDateRepository');
const Pluto99HECC = require('../src/calculators/Pluto99Calculator');
const RectangularCoordinate3D = require('../src/math/Coordinate/3d/RectangularCoordinate3D');
const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
const EclipticCoordinate = require('../src/coords/EclipticCoordinate');

describe('#Pluto99HECC', () => {
  describe('#constructor(jdate)', () => {
    it('The param jdate should be a JDateRepository.', () => {
      expect(() => {
        new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
      }).not.to.throw();

      expect(() => {
        new Pluto99HECC(123);
      }).to.throw();
    });
  });

  describe('get x()', () => {
    it('The return should be a Number.', () => {
      let pluto = new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
      expect(pluto.x).to.be.a('Number');
    });
  });

  describe('get y()', () => {
    it('The return should be a Number.', () => {
      let pluto = new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
      expect(pluto.y).to.be.a('Number');
    });
  });

  describe('get z()', () => {
    it('The return should be a Number.', () => {
      let pluto = new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
      expect(pluto.z).to.be.a('Number');
    });
  });

  describe('get rc()', () => {
    it('The return should be a RectangularCoordinate3D.', () => {
      let pluto = new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
      expect(pluto.rc).to.be.an.instanceof(RectangularCoordinate3D);
    });
  });

  describe('#set obTime(jdr)', () => {
    it('The param jdr should be a JDateRepository.', () => {
      expect(() => {
        let pluto = new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
        pluto.obTime = new JDateRepository(2448999, 'jde')
      }).not.to.throw();

      expect(() => {
        let pluto = new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
        pluto.obTime = 123;
      }).to.throw();
    });
  });

  describe('#get obTime(jdr)', () => {
    it('The return should be a JDateRepository.', () => {
      let pluto = new Pluto99HECC(new JDateRepository(2448908.5, 'jde'));
      expect(pluto.obTime).to.be.an.instanceof(JDateRepository);
    });
  });

  describe('#Verify', () => {
    it('天文算法 例36.a', () => {
      let jdate = new JDateRepository(2448908.5, 'jde');
      let pluto = new Pluto99HECC(jdate);
      let { r, theta, phi } = pluto.rc.toSC();

      let ECC = new EclipticCoordinate({
        sc: new SphericalCoordinate3D(r, theta, phi),
        centerMode: 'heliocentric',
        withNutation: false,
      });

      expect(ECC.longitude.inRound().getDegrees()).to.closeTo(232.74009, 0.0006);
      expect(ECC.latitude.inRound(-90).getDegrees()).to.closeTo(14.58769, 0.0002);
      expect(ECC.radius).to.closeTo(29.711383, 0.0004);
    })

    it('JEphem 数据测试', () => {
      let JDEs = [
        807932.5,  // -2500 Jan 01
        990557.5,  // -2000 Jan 01
        1173182.5, // -1500 Jan 01
        1355807.5, // -1000 Jan 01
        1538432.5, // -500 Jan 01
        1721057.5, // 0 Jan 01 
        1903682.5, // 500 Jan 01
        2086307.5, // 1000 Jan 01
        2268932.5, // 1500 Jan 01
        2451557.5, // 2000 Jan 14
        2634182.5  // 2500 Jan 17
      ];

      let coords = [
        [ -24.450898,  27.864841, 4.020151 ],
        [ -28.090595,  20.600908, 5.869147 ],
        [ -30.166984,  12.762686, 7.327759 ],
        [ -30.612416,   4.703150, 8.334771 ],
        [ -29.447885,  -3.154766, 8.849075 ],
        [ -26.904668, -10.265583, 8.881072 ],
        [ -23.346605, -16.332474, 8.505363 ],
        [ -19.112797, -21.288876, 7.813304 ],
        [ -14.504729, -25.154226, 6.893533 ],
        [ -9.837480,  -27.977994, 5.841542 ],
        [ -5.418324,  -29.873589, 4.758520 ]
      ];

      let jdate = new JDateRepository(807932.5, 'jde');
      let pluto = new Pluto99HECC(jdate);

      for (var i = 0; i < JDEs.length; i++) {
        let jde = JDEs[i];
        pluto.obTime = new JDateRepository(jde, 'jde');

        expect(pluto.rc.x).to.closeTo(coords[i][0], 0.000001);
        expect(pluto.rc.y).to.closeTo(coords[i][1], 0.000001);
        expect(pluto.rc.z).to.closeTo(coords[i][2], 0.000001);
      }
    });
  });
});
