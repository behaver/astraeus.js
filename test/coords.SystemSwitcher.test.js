// const expect = require("chai").expect;
// const SystemSwitcher = require('../src/coords/SystemSwitcher');
// const HorizontalCoordinate = require('../src/coords/HorizontalCoordinate');
// const HourAngleCoordinate = require('../src/coords/HourAngleCoordinate');
// const EquinoctialCoordinate = require('../src/coords/EquinoctialCoordinate');
// const EclipticCoordinate = require('../src/coords/EclipticCoordinate');
// const GalacticCoordinate = require('../src/coords/GalacticCoordinate');
// const JDateRepository = require('../src/time/JDate/JDateRepository');

// const Angle = require('../src/math/Angle');

import { expect } from 'chai';
import SystemSwitcher from '../src/coords/SystemSwitcher';
import HorizontalCoordinate from '../src/coords/HorizontalCoordinate';
import HourAngleCoordinate from '../src/coords/HourAngleCoordinate';
import EquinoctialCoordinate from '../src/coords/EquinoctialCoordinate';
import EclipticCoordinate from '../src/coords/EclipticCoordinate';
import GalacticCoordinate from '../src/coords/GalacticCoordinate';
import JDateRepository from '../src/time/JDate/JDateRepository';
import Angle from '../src/math/Angle';

const angle = new Angle;

describe('#SystemSwitcher', () => {
  describe('#constructor(coord)', () => {
    it('Called with no error.', () => {
      expect(() => {
        new SystemSwitcher;
        new SystemSwitcher({
          coord: new EclipticCoordinate({ longitude: 123.2332 })
        });
      }).not.to.throw();
    });
  });

  describe('#from(coord)', () => {
    it('The param coord should be an instanceof CelestialCoordinate.', () => {
      expect(() => {
        let SS = new SystemSwitcher();
        SS.from(new EclipticCoordinate({ longitude: 123.2332 }));
      }).not.to.throw();

      expect(() => {
        let SS = new SystemSwitcher();
        SS.from(123);
      }).to.throw();
    });
  });

  describe('#to(sysCode, options)', () => {
    it('The origin coord should have been given first.', () => {
      expect(() => {
        let SS = new SystemSwitcher();
        SS.from(new EclipticCoordinate({ longitude: 123.2332, latitude: 30 }));
        SS.to('eqc');
      }).not.to.throw();

      expect(() => {
        let SS = new SystemSwitcher();
        SS.to('eqc');
      }).to.throw();
    });

    it('The param sysCode should be valid.', () => {
      expect(() => {
        let SS = new SystemSwitcher();
        SS.from(new EclipticCoordinate({ longitude: 123.2332, latitude: 30 }));
        SS.to('ccc');
      }).to.throw();
    });
  });

  describe('#Verify', () => {
    it('EQC 2 ECC 《天文算法》12.a', () => {
      let EQC = new EquinoctialCoordinate({
        longitude: angle.parseHACString('7h 45m 18.946s').getDegrees(),
        latitude: 28.026183,
      });

      let Switcher = new SystemSwitcher;

      let ECC = Switcher.from(EQC).to('ecc');

      expect(ECC.longitude.getDegrees()).to.closeTo(113.215630, 0.000001);
      expect(ECC.latitude.getDegrees()).to.closeTo(6.684170, 0.000011);
    });

    it('EQC 2 HC 《天文算法》12.b', () => {
      let epoch = new JDateRepository(new Date('1987/04/11 03:21:00'), 'date');
      let EQC = new EquinoctialCoordinate({
        longitude: angle.parseHACString('23h 09m 16.641s').getDegrees(),
        latitude: angle.parseDACString('-6°43′11.61″').getDegrees(),
        epoch: epoch,
        withNutation: true,
        withAnnualAberration: true,
        withGravitationalDeflection: true,
        onFK5: true,
      });

      let Switcher = new SystemSwitcher;

      let HC = Switcher.from(EQC).to('hc', {
        epoch: epoch,
        obGeoLong: angle.parseDACString('77°03′56″').getDegrees(),
        obGeoLat: angle.parseDACString('38°55′17″').getDegrees(),
      });

      console.warn(
        epoch.JD,
        angle.parseHACString('23h 09m 16.641s').getDegrees(),
        angle.parseDACString('-6°43′11.61″').getDegrees(),
        angle.parseDACString('77°03′56″').getDegrees(),
        angle.parseDACString('38°55′17″').getDegrees()
      );

      expect(HC.longitude.getDegrees()).to.closeTo(68.0337, 0.00012);
      expect(HC.latitude.getDegrees()).to.closeTo(15.1249, 0.0001);
    });

    it('EQC 2 GC 《天文算法》12.练习', () => {
      let epoch = new JDateRepository(1950, 'bepoch');
      let EQC = new EquinoctialCoordinate({
        longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
        latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
        epoch: epoch,
        // withNutation: true,
      });

      let Switcher = new SystemSwitcher;

      let GC = Switcher.from(EQC).to('gc', {
        epoch: new JDateRepository(1978, 'bepoch')
      });

      expect(GC.longitude.getDegrees()).to.closeTo(12.9593, 0.0003);
      expect(GC.latitude.getDegrees()).to.closeTo(6.0463, 0.00016);
    });

    it('JPL数据，Mars，2019-Apr-09 00:00', () => {
      let epoch = new JDateRepository(2458582.5);
      let EQC = new EquinoctialCoordinate({
        longitude: 63.70635,
        latitude: 22.22585,
        radius: 3394.0 / 149597870.700,
        epoch,
        withNutation: 1,
        withAnnualAberration: 1,
        withGravitationalDeflection: 1,
      });

      let Switcher = new SystemSwitcher;

      Switcher.options({
        enableAnnualAberration: false,
        enableGravitationalDeflection: false,
      });

      let HC = Switcher.from(EQC).to('hc', {
        epoch: epoch,
        obGeoLong: angle.parseDACString('89°30′00.0″').getDegrees(),
        obGeoLat: angle.parseDACString('34°22′01.2″').getDegrees(),
        withAR: 1,
      });

      expect(angle.setSeconds(HC.SiderealTime.trueVal).getTHours()).to.closeTo(7.1632716855, 0.0001);

      expect(HC.longitude.getDegrees()).to.closeTo(264.1757 - 180, 0.0005);
      expect(HC.latitude.getDegrees()).to.closeTo(49.9564, 0.02);

      Switcher.from(HC, {
        withNutation: 1,
        withAnnualAberration: 0,
        withGravitationalDeflection: 0,
      });

      let ECC = Switcher.to('ecc', {
        withNutation: 1,
        withAnnualAberration: 0,
        withGravitationalDeflection: 0,
      });

      expect(ECC.longitude.getDegrees()).to.closeTo(65.7877413, 0.002);
      expect(ECC.latitude.getDegrees()).to.closeTo(0.9726054, 0.005);
    });
  });
})