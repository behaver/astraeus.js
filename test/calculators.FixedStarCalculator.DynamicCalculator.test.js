// const expect = require("chai").expect;
// const DynamicCalculator = require('../src/calculators/FixedStarCalculator/DynamicCalculator');
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const EquinoctialCoordinate = require('../src/coords/EquinoctialCoordinate');
// const Angle = require('../src/math/Angle');

import { expect } from 'chai';
import DynamicCalculator from '../src/calculators/FixedStarCalculator/DynamicCalculator';
import EquinoctialCoordinate from '../src/coords/EquinoctialCoordinate';
import JDateRepository from '../src/time/JDate/JDateRepository';
import Angle from '../src/math/Angle';

const angle = new Angle;

describe('#index', () => {
  describe('Verify', () => {
    it('恒星 θPersei 赤道坐标计算，参照《天文算法》', () => {
      let jdate = new JDateRepository(2462088.69, 'jde');

      expect(jdate.JDEC).to.closeTo(0.288670500, 1e-9);

      let FS = new DynamicCalculator(jdate);

      let res1 = FS.calc({
        ra: 41.0500,
        dec: 49.2283,
        pmra: 0.336,
        pmdec: -0.089,
        radvel: 25,
        parallax: 0.089,
      });

      let ec1 = new EquinoctialCoordinate({
        sc: res1,
        withAnnualAberration: false,
        withNutation: false,
      });

      // 修正岁差
      ec1.epoch = FS.epoch;

      // 修正光行差
      ec1.withAnnualAberration = true;

      // 修正章动
      ec1.withNutation = true;

      expect(ec1.longitude.getDegrees()).to.closeTo(41.5599646, 0.002);
      expect(ec1.latitude.getDegrees()).to.closeTo(49.3520685, 0.0002);
    });

    it('仙女座α星', () => {
      let date = new Date('2018/06/25');
      date.setFullYear(-2200);

      let jdate = new JDateRepository(date, 'date');

      let Calculator = new DynamicCalculator(jdate);

      let sc = Calculator.calc({
        ra: angle.parseHACString('00h 08m 23.2586s').getDegrees(),
        dec: angle.parseDACString('29°05′25.555″').getDegrees(),
        pmra: 0.13568,
        pmdec: -0.16295,
        radvel: -10.6,
        parallax: 0.03360,
      });

      let eqc = new EquinoctialCoordinate({
        sc,
        withAnnualAberration: false,
        withNutation: false,
      });

      // 修正岁差
      eqc.epoch = Calculator.epoch;

      // 修正光行差
      eqc.withAnnualAberration = true;

      // 修正章动
      eqc.withNutation = true;

      expect(eqc.longitude.getDegrees()).to.closeTo(311.2155, 0.0001);
      expect(eqc.latitude.getDegrees()).to.closeTo(8.393648, 0.005);
    });
  })
});