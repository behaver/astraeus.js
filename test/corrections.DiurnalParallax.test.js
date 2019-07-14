const expect = require("chai").expect;
const DiurnalParallax = require('../src/corrections/DiurnalParallax');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const SiderealTime = require('../src/time/SiderealTime');
const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
const EquinoctialCoordinate = require('../src/coords/EquinoctialCoordinate');
const SystemSwitcher = require('../src/coords/SystemSwitcher');
const Angle = require('../src/math/Angle');

const angle = new Angle;

describe('#CelestialCoordinate', () => {
  describe('#constructor(options)', () => {
    it('The param options should be a Object', () => {
      expect(() => {
        new DiurnalParallax(12345);
      }).to.throw();
    });

    it('One of the params gc and tc should be defined.', () => {
      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: 33,
        });
      }).not.to.throw();

      expect(() => {
        let dp = new DiurnalParallax({
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: 33,
        });
      }).to.throw();
    });

    it('The param obElevation should be a Number.', () => {
      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: 33,
          obElevation: 1111,
        });
      }).not.to.throw();

      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: 33,
          obElevation: '111',
        });
      }).to.throw();
    });

    it('The param obElevation should be in (-12000, 3e7).', () => {
      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: 33,
          obElevation: -12001,
        });
      }).to.throw();

      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: 33,
          obElevation: 3e8,
        });
      }).to.throw();
    });

    it('The param siderealTime should be defined.', () => {
      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          obGeoLat: 33,
        });
      }).to.throw();
    });

    it('The param siderealTime should be a SiderealTime.', () => {
      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: {},
          obGeoLat: 33,
        });
      }).to.throw();
    });

    it('The param obGeoLat should be defined and be a Number.', () => {
      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
        });
      }).to.throw();

      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: '33',
        });
      }).to.throw();
    });

    it('The param obGeoLat should be in [-90, 90].', () => {
      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: -91,
        });
      }).to.throw();

      expect(() => {
        let dp = new DiurnalParallax({
          gc: new SphericalCoordinate3D(0.37276, 2, 2),
          siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
          obGeoLat: 91,
        });
      }).to.throw();
    })
  });

  describe('#calcCorrections()', () => {
    it('The return of method calcCorrections should have all keys x, y and z.', () => {
      let dp = new DiurnalParallax({
        gc: new SphericalCoordinate3D(0.37276, 2, 2),
        siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
        obGeoLat: 33,
      });

      expect(dp.calcCorrections()).to.have.all.keys('x', 'y', 'z');
    })
  });

  describe('#set TC(tc)', () => {
    it('The param tc should be a SphericalCoordinate3D.', () => {
      let dp = new DiurnalParallax({
        gc: new SphericalCoordinate3D(0.37276, 2, 2),
        siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
        obGeoLat: 33,
      });

      expect(() => {
        dp.TC = new SphericalCoordinate3D(0.37276, 2, 2);
      }).not.to.throw();

      expect(() => {
        dp.TC = '123';
      }).to.throw();
    });
  });

  describe('#get TC()', () => {
    it('The return of method get TC() should be a instance of SphericalCoordinate3D.', () => {
      let dp = new DiurnalParallax({
        gc: new SphericalCoordinate3D(0.37276, 2, 2),
        siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
        obGeoLat: 33,
      });

      expect(dp.TC).to.be.a.instanceof(SphericalCoordinate3D);
    });
  });

  describe('#set GC(gc)', () => {
    it('The param gc should be a SphericalCoordinate3D.', () => {
      let dp = new DiurnalParallax({
        tc: new SphericalCoordinate3D(0.37276, 2, 2),
        siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
        obGeoLat: 33,
      });

      expect(() => {
        dp.GC = new SphericalCoordinate3D(0.37276, 2, 2);
      }).not.to.throw();

      expect(() => {
        dp.GC = '123';
      }).to.throw();
    });
  });

  describe('#get GC()', () => {
    it('The return of method get GC() should be a instance of SphericalCoordinate3D.', () => {
      let dp = new DiurnalParallax({
        tc: new SphericalCoordinate3D(0.37276, 2, 2),
        siderealTime: new SiderealTime(new JDateRepository(0, 'J2000'), 116),
        obGeoLat: 33,
      });

      expect(dp.GC).to.be.a.instanceof(SphericalCoordinate3D);
    });
  });

  describe('#Verify', () => {
    it('#天文算法 例39.a，赤道坐标', () => {
      let date = new Date('2003/08/28 11:17:00');
      let jdate = new JDateRepository(date, 'date');
      let obGeoLong = angle.parseDACString('116°51′50″').getDegrees();
      let obGeoLat = angle.parseDACString('33°21′21″').getDegrees();
      let obElevation = 1713;

      let siderealTime = new SiderealTime(jdate, obGeoLong);

      expect(siderealTime.trueVal).to.closeTo(angle.parseHACString('1h 40m 45s').getSeconds() - angle.setDegrees(obGeoLong).inRound(-360, 'd').getSeconds(), 5);

      let r = 0.37276;
      let theta = angle.setDegrees(90 + 15.771083).getRadian();
      let phi = angle.setDegrees(339.530208).getRadian();
      let gc = new SphericalCoordinate3D(r, theta, phi);

      let dp = new DiurnalParallax({
        gc: gc,
        siderealTime: siderealTime,
        obGeoLat: obGeoLat,
        obElevation: 1713,
        system: 'equinoctial',
      });

      let tc = dp.TC;

      let RAt = angle.parseHACString('22h 38m 08.54s').getDegrees();
      let DECt = angle.parseDACString('-15°46′30″').getDegrees();

      expect(angle.setRadian(tc.phi).inRound().getDegrees()).to.closeTo(RAt, 0.00002);
      expect(90 - angle.setRadian(tc.theta).getDegrees()).to.closeTo(DECt, 0.00002);
    });

    it('#天文算法 例39.a 反向计算，赤道坐标，站心坐标 转 地心坐标', () => {
      let date = new Date('2003/08/28 11:17:00');
      let jdate = new JDateRepository(date, 'date');
      let obGeoLong = angle.parseDACString('116°51′50″').getDegrees();
      let obGeoLat = angle.parseDACString('33°21′21″').getDegrees();
      let obElevation = 1713;

      let siderealTime = new SiderealTime(jdate, obGeoLong);

      let r = 0.37276;
      let theta = Math.PI / 2 - angle.parseDACString('-15°46′30″').getRadian();
      let phi = angle.parseHACString('22h 38m 08.54s').getRadian();
      let tc = new SphericalCoordinate3D(r, theta, phi);

      let dp = new DiurnalParallax({
        tc: tc,
        siderealTime: siderealTime,
        obGeoLat: obGeoLat,
        obElevation: 1713,
        system: 'equinoctial',
      });

      let gc = dp.GC;

      let RAt = angle.setDegrees(339.530208).getDegrees();
      let DECt = angle.setDegrees(-15.771083).getDegrees();

      expect(angle.setRadian(gc.phi).inRound().getDegrees()).to.closeTo(RAt, 0.00002);
      expect(90 - angle.setRadian(gc.theta).getDegrees()).to.closeTo(DECt, 0.00002);
    });

    it('#天文算法 例39.a 地平坐标转换', () => {
      let date = new Date('2003/08/28 11:17:00');
      let jdate = new JDateRepository(date, 'date');
      let obGeoLong = angle.parseDACString('116°51′50″').getDegrees();
      let obGeoLat = angle.parseDACString('33°21′21″').getDegrees();
      let obElevation = 1713;

      let siderealTime = new SiderealTime(jdate, obGeoLong);

      let r = 0.37276;
      let theta = angle.setDegrees(90 + 15.771083).getRadian();
      let phi = angle.setDegrees(339.530208).getRadian();
      let egc = new SphericalCoordinate3D(r, theta, phi);

      let dp = new DiurnalParallax({
        gc: egc,
        siderealTime: siderealTime,
        obGeoLat: obGeoLat,
        obElevation: 1713,
        system: 'equinoctial',
      });

      // 赤道站心坐标
      let etc = dp.TC;

      let ec = new EquinoctialCoordinate({
        sc: egc,
        epoch: jdate,
        withNutation: true,
      });

      let SS = new SystemSwitcher();

      // 地平地心坐标
      let hgc = SS.from(ec).to('hc', {
        obGeoLong,
        obGeoLat,
      }).sc;

      let hdp = new DiurnalParallax({
        gc: hgc,
        siderealTime: siderealTime,
        obGeoLat: obGeoLat,
        obElevation: 1713,
        system: 'horizontal',
      });

      let htc = hdp.TC;

      let ec2 = new EquinoctialCoordinate({
        sc: new SphericalCoordinate3D(etc.r, etc.theta, etc.phi),
        epoch: jdate,
        withNutation: true,
        isContinuous: true,
      });

      let htc2 = SS.from(ec2).to('hc', {
        obGeoLong,
        obGeoLat,
      }).sc;

      expect(htc.r).to.closeTo(htc2.r, 0.000001);
      expect(htc.theta).to.closeTo(htc2.theta, 0.00001);
      expect(htc.phi).to.closeTo(htc2.phi, 0.00001);
    });
  })
});