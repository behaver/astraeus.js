// 'use strict';

// const expect = require("chai").expect;
// const Position = require('../src/calculators/EarthSSBCalculator');
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const Angle = require('../src/math/Angle');

// import CommonCalculator from './CommonCalculator';
import { expect } from 'chai';
import Position from '../src/calculators/EarthSSBCalculator';
import JDateRepository from '../src/time/JDate/JDateRepository';
import Angle from '../src/math/Angle';

const angle = new Angle;

describe('#Position', () => {
  describe('#constructor(time)', () => {
    it('The param time should be a JDateRepository.', () => {
      expect(() => {
        let jdr = new JDateRepository(2334345, 'jde');
        new Position(jdr);
      }).not.to.throw();

      expect(() => {
        new Position(123);
      }).to.throw();
    })
  });

  describe('#verify', () => {
    it('天文算法 例 22.b', () => {
      let JD = (new JDateRepository(new Date('2028/11/13 8:0:0'), 'date')).JD,
          p = new Position(new JDateRepository(JD + 0.19, 'jd'));

      console.log(p.x, p.y, p.z);
    });
  })
})