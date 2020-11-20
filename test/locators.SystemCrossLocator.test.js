// const expect = require("chai").expect;
// const SystemCrossLocator = require('../src/locators/SystemCrossLocator');
// const HorizontalCoordinate = require('../src/coords/HorizontalCoordinate');
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const Coord = require('../src/Coord');

import { expect } from 'chai';
import JDateRepository from '../src/time/JDate/JDateRepository';
import HorizontalCoordinate from '../src/coords/HorizontalCoordinate';
import SystemCrossLocator from '../src/locators/SystemCrossLocator';
import Coord from '../src/Coord';

describe('#SystemCrossLocator', () => {
  describe('#Verify', () => {
    it('1992/08/15 08:25 地平黄道交点测试', () => {
      let coordHandler = new Coord({
        obGeoLong: -124.23,
        obGeoLat: 40.08,
        centerMode: 'geocentric',
        withNutation: true, 
      });

      let SCL = new SystemCrossLocator({
        time: new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date'),
        direction: true,
        sysA: 'hc',
        sysB: 'ecc',
        coordHandler,
      });

      SCL.direction = false;

      let coord_ecc = SCL.get().coord;

      expect(coord_ecc.longitude.inRound().getDegrees()).to.closeTo(3.26, 0.1);

      SCL.direction = true;

      coord_ecc = SCL.get().coord;

      expect(coord_ecc.longitude.inRound().getDegrees()).to.closeTo(183.26, 0.1);
      expect(Math.sin(coord_ecc.latitude.inRound().getRadian())).to.closeTo(0, 0.0001);

    });

    it('1992/08/15 08:25 地平赤道交点测试', () => {
      let coordHandler = new Coord({
        obGeoLong: -124.23,
        obGeoLat: 40.08,
        centerMode: 'geocentric',
        withNutation: true,
        enableAnnualAberration: false,
        enableGravitationalDeflection: false,
        enableFK5: false,
        enableAR: false, 
      });
      
      let SCL = new SystemCrossLocator({
        direction: true,
        sysA: 'hc',
        sysB: 'eqc',
        coordHandler,
        time: new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date'),
      });

      let EQC = SCL.get().coord;

      expect(EQC.longitude.inRound().getDegrees()).to.closeTo(184.41, 0.3);
      expect(Math.sin(EQC.latitude.inRound().getRadian())).to.closeTo(0, 0.0001);

    });
  });
})