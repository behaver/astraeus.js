// const expect = require("chai").expect;
// const SunCoordinate = require('../src/locators/SolarStarLocator/planets/Sun');
// const HorizontalCoordinate = require('../src/coords/HorizontalCoordinate');
// const SystemSwitcher = require('../src/coords/SystemSwitcher');
// const JDateRepository = require('../src/time/JDate/JDateRepository');

// const NewtonSolver = require('../src/math/UnaryToolkit/NewtonSolver');

import { expect } from 'chai';
import SunCoordinate from '../src/locators/SolarStarLocator/planets/Sun';
import HorizontalCoordinate from '../src/coords/HorizontalCoordinate';
import SystemSwitcher from '../src/coords/SystemSwitcher';
import JDateRepository from '../src/time/JDate/JDateRepository';
import NewtonSolver from '../src/math/UnaryToolkit/NewtonSolver';

describe('#NewtonSolver', () => {
  describe('#Verify', () => {
    it('1992-08-15 08:25 124°23E 40°08N', () => {
      let obGeoLong = -124.23,
          obGeoLat = 40.08,
          centerMode = 'geocentric';
 
      // 构造自变量为 jd 求解为 0 线性函数
      let f = function (jd) {
        let SunPosition = new SunCoordinate(new JDateRepository(jd)),
            SunECC = SunPosition.get(),
            SS = new SystemSwitcher(SunECC),
            SunHC = SS.to('hc', {
              obTime: new JDateRepository(jd),
              obGeoLong: obGeoLong,
              obGeoLat: obGeoLat,
              centerMode: centerMode,
            });

        return 90 - SunHC.latitude.getDegrees();
      };

      let epoch = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

      let NLSolver = new NewtonSolver({
        f: f,
        dx: 0.0006, // < 1分钟
        bias: 0.0002, // < 1″
      });

      // 执行求解
      NLSolver.solve(epoch.JD);

      // console.log(NLSolver.x, NLSolver.stepNum, NLSolver.y, (new JDateRepository(NLSolver.x)).date.toLocaleString());

      let SunPosition = new SunCoordinate(new JDateRepository(NLSolver.x)),
          SunECC = SunPosition.get(),
          SS = new SystemSwitcher(SunECC),
          SunHC = SS.to('hc', {
            obTime: new JDateRepository(NLSolver.x),
            obGeoLong: obGeoLong,
            obGeoLat: obGeoLat,
            centerMode: centerMode,
          });
      
      // console.log(SunECC.epoch.JD, SunECC.l.getDegrees(), SunECC.b.getDegrees());
      console.log(SunHC.epoch.JD, SunHC.SiderealTime.obTime.JD, SunHC.latitude.getDegrees(), SunHC.longitude.getDegrees());

      SunHC.on({
        obTime: epoch,
      });

      console.log(SunHC.epoch.JD, SunHC.SiderealTime.obTime.JD, SunHC.latitude.getDegrees(), SunHC.longitude.getDegrees());

      SS = new SystemSwitcher({
        coord: SunHC
      });

      SunECC = SS.to('ecc');
      // console.log(SunECC.epoch.JD, SunECC.l.getDegrees(), SunECC.b.getDegrees());

      // console.log(R.l.getDegrees(), SunECC.l.getDegrees());
      // console.log(R.b.getDegrees(), SunECC.b.getDegrees());
      // console.log(SunEQC.ra.getDegrees());

      // console.log(SunHC.a.getDegrees(), SunHC.h.getDegrees(), SunECC.b.getDegrees());

      // expect(R.l.getDegrees()).to.closeTo(183.26, 0.01);
    });

    it('1992-08-15 08:25 124°23E 40°08N 上升点：183.26', () => {
      let obGeoLong = -124.23,
          obGeoLat = 40.08,
          centerMode = 'geocentric',
          epoch = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

      let f = function(a) {
        let HC = new HorizontalCoordinate({
              longitude: a,
              latitude: 0,
              obGeoLong,
              obGeoLat,
              epoch: epoch,
              centerMode,
            }),
            SS = new SystemSwitcher({ coord: HC }),
            ECC = SS.to('ecc');

        return ECC.latitude.getDegrees();
      }

      let NLSolver = new NewtonSolver({
        f: f,
        dx: 0.0003, // < 1分钟
        bias: 0.0002, // < 1″
      });

      // 执行求解
      NLSolver.solve(270);

      console.log(NLSolver.x, NLSolver.y);

      let HC = new HorizontalCoordinate({
            longitude: NLSolver.x,
            latitude: 0,
            obGeoLong,
            obGeoLat,
            epoch: epoch,
            centerMode,
          }),
          SS = new SystemSwitcher({ coord: HC }),
          ECC = SS.to('ecc');

      expect(ECC.longitude.getDegrees()).to.closeTo(183.26, 0.1);
    });
  });
});