// const expect = require("chai").expect;
// const EarthLocator = require('../src/locators/SolarStarLocator/planets/Earth');
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const EclipticCoordinate = require('../src/coords/EclipticCoordinate');
// const Angle = require('../src/math/Angle');

import { expect } from 'chai';
import JDateRepository from '../src/time/JDate/JDateRepository';
import EclipticCoordinate from '../src/coords/EclipticCoordinate';
import EarthLocator from '../src/locators/SolarStarLocator/planets/Earth';
import Angle from '../src/math/Angle';

const angle = new Angle;

describe('#EarthLocator', () => {

  describe('#constructor(options)', () => {
    it('The param options.time should be a valid JDateRepository.', () => {
      expect(() => {
        new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
      }).not.to.throw();

      expect(() => {
        new EarthLocator;
      }).not.to.throw();

      expect(() => {
        new EarthLocator({ time: 123 });
      }).to.throw();
    });
  });

  describe('#set time(value)', () => {
    it('The param value should be a valid JDateRepository.', () => {
      expect(() => {
        let EC = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
        EC.time = new JDateRepository(2448908, 'jde');
      }).not.to.throw();

      expect(() => {
        let EC = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
        EC.time = 123;
      }).to.throw();
    });

    it('After setted, the property time should be changed.', () => {
      let EC = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
      EC.time = new JDateRepository(2448908, 'jde');

      expect(EC.time.JDE).to.equal(2448908);
    });
  });

  describe('#get time()', () => {
    it('The return should be a JDateRepository.', () => {
      let EC = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
      expect(EC.time).to.be.an.instanceof(JDateRepository);
    })
  });

  describe('#set withLTE(value)', () => {
    it('Run with no error.', () => {
      expect(() => {
        let EL = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
        EL.withLTE = true;
      }).not.to.throw();
    });

    it('not equal after set withLTE', () => {
      let EL = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
      let coord1 = EL.get().coord;
      EL.withLTE = true;
      let coord2 = EL.get().coord;

      expect(coord1.longitude.getDegrees()).not.to.equal(coord2.longitude.getDegrees());
    });
  });

  describe('#get withLTE()', () => {
    it('get equal set.', () => {
      let EL = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
      EL.withLTE = true;
      expect(EL.withLTE).to.equal(true);
    });
  });

  describe('#get(options)', () => {
    it('The return should be a EclipticCoordinate.', () => {
      let EC = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
      let res = EC.get();
      expect(res.coord).to.be.an.instanceof(EclipticCoordinate);
    });
  });

  describe('Verify', () => {
    it('天文算法 例.24.b', () => {
      let ec = new EarthLocator({ time: new JDateRepository(2448908.5, 'jde') });
      let res = ec.get();
      let sc = res.coord.sc;

      expect(sc.phi).to.closeTo(angle.setRadian(-43.63484796).inRound().getRadian(), 0.00000001);
      expect(Math.PI / 2 - sc.theta).to.closeTo(angle.setRadian(-0.00000312).inRound(-90).getRadian(), 0.000001);
      expect(sc.r).to.closeTo(0.99760775, 0.00000001);
    });
  });
})