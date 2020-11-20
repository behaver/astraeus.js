// const expect = require("chai").expect;
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const EquinoctialCoordinate = require('../src/coords/EquinoctialCoordinate');
// const DynamicCalculator = require('../src/calculators/FixedStarCalculator/DynamicCalculator');
// const TrigonometricCalculator = require('../src/calculators/FixedStarCalculator/TrigonometricCalculator');
// const FixedStarLocator = require('../src/locators/FixedStarLocator');

import { expect } from 'chai';
import JDateRepository from '../src/time/JDate/JDateRepository';
import EquinoctialCoordinate from '../src/coords/EquinoctialCoordinate';
import DynamicCalculator from '../src/calculators/FixedStarCalculator/DynamicCalculator';
import TrigonometricCalculator from '../src/calculators/FixedStarCalculator/TrigonometricCalculator';
import FixedStarLocator from '../src/locators/FixedStarLocator';

describe('#index', () => {
  describe('#constructor(options)', () => {
    it('construct with no error.', () => {
      expect(() => {
        new FixedStarLocator;
      }).not.to.throw();
    });
  });

  describe('#set time(value)', () => {
    it('The param value should be an instance of JDateRepository.', () => {
      expect(() => {
        let FSC = new FixedStarLocator;
        FSC.time = new JDateRepository(2362088.69, 'jde');
      }).not.to.throw();

      expect(() => {
        let FSC = new FixedStarLocator;
        FSC.time = '123';
      }).to.throw();
    });

    it('After setting, the related props should be auto changed too.', () => {
      let FSC = new FixedStarLocator;
      FSC.time = new JDateRepository(2362088.69, 'jde');

      expect(FSC.private.time.JDE).to.equal(2362088.69);
      expect(FSC.Calculator.epoch.JDE).to.equal(2362088.69);
    });
  });

  describe('#get time()', () => {
    it('The return of this method should be an instance of JDateRepository.', () => {
      let FSC = new FixedStarLocator;

      expect(FSC.time).to.be.an.instanceof(JDateRepository);
    });
  });

  describe('#set model(value)', () => {
    it('The param value should be a valid String.', () => {
      expect(() => {
        let FSC = new FixedStarLocator(new JDateRepository(2462088.69, 'jde'));
        FSC.model = 'tri';
      }).not.to.throw();

      expect(() => {
        let FSC = new FixedStarLocator(new JDateRepository(2462088.69, 'jde'));
        FSC.model = 'abc';
      }).to.throw();
    });

    it('After setting, the related props should be auto changed too.', () => {
      let FSC = new FixedStarLocator(new JDateRepository(2462088.69, 'jde'));
      FSC.model = 'tri';
      
      expect(FSC.private.model).to.equal('tri');
      expect(FSC.Calculator).to.be.an.instanceof(TrigonometricCalculator);
    });
  });

  describe('#get model()', () => {
    it('The return of method should be a String.', () => {
      let FSC = new FixedStarLocator(new JDateRepository(2462088.69, 'jde'));

      expect(FSC.model).to.equal('dyn');
    });
  });

  describe('#get(options)', () => {
    it('The param options should be all number and existed.', () => {
      expect(() => {
        let FSC = new FixedStarLocator;
        FSC.get({
          ra: 41.0500,
          dec: 49.2283,
          pmra: 0.336,
          pmdec: -0.089,
          radvel: 25,
          parallax: 0.089,
        });
      }).not.to.throw();

      // expect(() => { // 缺值
      //   let FSC = new FixedStarLocator;
      //   FSC.get({
      //     ra: 41.0500,
      //     dec: 49.2283,
      //     pmra: 0.336,
      //     pmdec: -0.089,
      //     radvel: 25,
      //   });
      // }).to.throw();

      expect(() => { // 错值
        let FSC = new FixedStarLocator;
        FSC.get({
          ra: '41.0500',
          dec: 49.2283,
          pmra: 0.336,
          pmdec: -0.089,
          radvel: 25,
          parallax: 0.089,
        });
      }).to.throw();
    });

    it('The return of method should be an EquinoctialCoordinate.', () => {
      let FSC = new FixedStarLocator;
      let res = FSC.get({
        ra: 41.0500,
        dec: 49.2283,
        pmra: 0.336,
        pmdec: -0.089,
        radvel: 25,
        parallax: 0.089,
      });

      expect(res.coord).to.be.an.instanceof(EquinoctialCoordinate);
    });

    it('Verify', () => {
      let FSC = new FixedStarLocator({
        time: new JDateRepository(2462088.69, 'jde'),
      });
      
      let res = FSC.get({
        ra: 41.0500,
        dec: 49.2283,
        pmra: 0.336,
        pmdec: -0.089,
        radvel: 25,
        parallax: 0.089,
      });
      let coord = res.coord;

      expect(coord.longitude.getDegrees()).to.closeTo(41.5599646, 0.002);
      expect(coord.latitude.getDegrees()).to.closeTo(49.3520685, 0.0002);
    });
  });
})