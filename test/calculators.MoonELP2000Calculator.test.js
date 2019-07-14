const expect = require("chai").expect;
const JDateRepository = require('../src/time/JDate/JDateRepository');
const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
const ELP2000MoonGECC = require('../src/calculators/MoonELP2000Calculator');
const EclipticCoordinate = require('../src/coords/EclipticCoordinate');
const SystemSwitcher = require('../src/coords/SystemSwitcher');
const Angle = require('../src/math/Angle');
const angle = new Angle;

describe('#ELP2000MoonGECC', () => {
  describe('#constructor(jdate)', () => {
    it('The param jdate should be a JDateRepository.', () => {
      expect(() => {
        new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      }).not.to.throw();

      expect(() => {
        new ELP2000MoonGECC(123);
      }).to.throw();
    });
  });

  describe('get l()', () => {
    it('The return should be an Angle.', () => {
      let ec = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(ec.l).to.be.an.instanceof(Angle);
    });
  });

  describe('get b()', () => {
    it('The return should be an Angle.', () => {
      let ec = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(ec.b).to.be.an.instanceof(Angle);
    });
  });

  describe('get r()', () => {
    it('The return should be a Number.', () => {
      let ec = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(ec.r).to.be.a('Number');
    });
  });

  describe('get sc()', () => {
    it('The return should be a SphericalCoordinate3D.', () => {
      let ec = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(ec.sc).to.be.an.instanceof(SphericalCoordinate3D);
    });
  });

  describe('get meanLongitude()', () => {
    it('The return should be an Angle.', () => {
      let ec = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(ec.meanLongitude).to.be.an.instanceof(Angle);
    });
  });

  describe('get longitudePerturbationCorrection()', () => {
    it('The return should be an Angle.', () => {
      let ec = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(ec.longitudePerturbationCorrection).to.be.an.instanceof(Angle);
    });
  });

  describe('get longitudePrecessionCorrection()', () => {
    it('The return should be an Angle.', () => {
      let ec = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(ec.longitudePrecessionCorrection).to.be.an.instanceof(Angle);
    });
  });

  describe('#set obTime(jdr)', () => {
    it('The param jdr should be a JDateRepository.', () => {
      expect(() => {
        let EC = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
        EC.obTime = new JDateRepository(2448999, 'jde')
      }).not.to.throw();

      expect(() => {
        let EC = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
        EC.obTime = 123;
      }).to.throw();
    });
  });

  describe('#get obTime(jdr)', () => {
    it('The return should be a JDateRepository.', () => {
      let EC = new ELP2000MoonGECC(new JDateRepository(2448908.5, 'jde'));
      expect(EC.obTime).to.be.an.instanceof(JDateRepository);
    });
  });

  describe('#set accuracy(level)', () => {
    it('The param level should be low、normal、high、fine or complete.', () => {
      expect(() => {
        let elp = new ELP2000MoonGECC(new JDateRepository(2446896));
        elp.sc;
        elp.accuracy = 'low';
        elp.sc;
        elp.accuracy = 'normal';
        elp.sc;
        elp.accuracy = 'high';
        elp.sc;
        elp.accuracy = 'fine';
        elp.sc;
        elp.accuracy = 'complete';
        elp.sc;
      }).not.to.throw();

      expect(() => {
        let elp = new ELP2000MoonGECC(new JDateRepository(2446896));
        elp.accuracy = 'a';
      }).to.throw();

      expect(() => {
        let elp = new ELP2000MoonGECC(new JDateRepository(2446896));
        elp.accuracy = 123;
      }).to.throw();
    })
  });

  describe('#get accuracy()', () => {
    it('The return of get accuracy() should be low、normal、high、fine、complete.', () => {
      let elp = new ELP2000MoonGECC(new JDateRepository(2446896));
      expect(elp.accuracy).to.equal('complete');
    })
  });

  describe('setMaxError(item, value, mode)', () => {
    it('The param item should be l、b、r.', () => {
      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setMaxError('l', 0.000005);
        a.setMaxError('b', 0.0000005, 'true');
        a.setMaxError('b', 0.0000005, 'mean');
        a.setMaxError('b', 0.0000005, 'safe');
      }).not.to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setMaxError('a', 0.000005);
      }).to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setMaxError(123, 0.000005);
      }).to.throw();
    });

    it('The param value should be a Number witch is greater than 0.', () => {
      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setMaxError('l', '0.000005');
      }).to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setMaxError('l', -0.000005);
      }).to.throw();
    });
  });

  describe('getMaxError(item)', () => {
    it('The return of getMaxError(item) should be a Number.', () => {
      let a = new ELP2000MoonGECC(new JDateRepository(2446896));
      expect(a.getMaxError('l')).to.be.a('Number');
    });
  });

  describe('setTruncation(item, tNumsArray)', () => {
    it('The param tNumsArray should be an Array.', () => {
      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2 ]);
      }).not.to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation('l', 123);
      }).to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation('l');
      }).to.throw();
    });

    it('The param item should be l、b、r.', () => {
      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation('a', [ 2, 2, 2, 2 ]);
      }).to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation(123, [ 2, 2, 2, 2 ]);
      }).to.throw();
    });
  });

  describe('getTruncation(item)', () => {
    it('The param item should be l、b、r.', () => {
      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2 ]);
        a.getTruncation('l');
      }).not.to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2 ]);
        a.getTruncation('a');
      }).to.throw();

      expect(() => {
        let a = new ELP2000MoonGECC(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2 ]);
        a.getTruncation(123);
      }).to.throw();
    });
  });

  describe('#Verify', () => {
    it('《天文算法》例54.a', () => {
      let jdate = new JDateRepository(2448724.5, 'jde');
      let EC = new ELP2000MoonGECC(jdate);
      let ECC = new EclipticCoordinate({
        sc: EC.sc,
        centerMode: 'geocentric',
        epoch: jdate,
        withNutation: false,
      });

      expect(ECC.longitude.inRound().getDegrees()).to.closeTo(133.162659, 0.0003);
      expect(ECC.latitude.inRound(-90).getDegrees()).to.closeTo(-3.229127, 0.0002);
      expect(ECC.radius * 149597871).to.closeTo(368405.6, 1);

      // 地心视黄经检验
      ECC.withNutation = true;

      expect(ECC.longitude.inRound().getDegrees()).to.closeTo(133.167269, 0.0003);

      let SS = new SystemSwitcher({
        coord: ECC
      });

      // 地心视赤道坐标检验
      let EQC = SS.to('eqc');

      expect(angle.setRadian(EQC.sc.phi).inRound().getDegrees()).to.closeTo(angle.parseHACString('8h 58m 45.1s').getDegrees(), 0.0003);
      expect(angle.setRadian(Math.PI / 2 - EQC.sc.theta).inRound(-90).getDegrees()).to.closeTo(13.768366, 0.0002);
    });
  });
});
