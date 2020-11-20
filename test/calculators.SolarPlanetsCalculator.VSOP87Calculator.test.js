// const expect = require("chai").expect;
// const VSOP87Calculator = require('../src/calculators/SolarPlanetsCalculator/VSOP87Calculator');
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const dataArray = require('../src/calculators/SolarPlanetsCalculator/data/Earth/l');
// const b = require('../src/calculators/SolarPlanetsCalculator/data/Earth/b');

import { expect } from 'chai';
import VSOP87Calculator from '../src/calculators/SolarPlanetsCalculator/VSOP87Calculator';
import dataArray from '../src/calculators/SolarPlanetsCalculator/data/Earth/l';
import JDateRepository from '../src/time/JDate/JDateRepository';
import b from '../src/calculators/SolarPlanetsCalculator/data/Earth/b';

describe('#VSOP87Calculator', () => {
  describe('#constructor(jdr)', () => {
    it('The param jdr should be a JDateRepository.', () => {
      expect(() => {
        new VSOP87Calculator(new JDateRepository(2446896));
      }).to.not.throw();

      expect(() => {
        new VSOP87Calculator(2446896);
      }).to.throw();

      expect(() => {
        new VSOP87Calculator();
      }).to.throw();
    });
  });

  describe('#get jdr()', () => {
    it('The return of get jdr() should be a JDateRepository.', () => {
      let calculator = new VSOP87Calculator(new JDateRepository(2446896));
      expect(calculator.jdr).to.be.an.instanceof(JDateRepository);
    });
  });

  describe('#set jdr(jdr)', () => {
    it('The param jdr should be a JDateRepository.', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.jdr = new JDateRepository(2446846);
      }).to.not.throw();

      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.jdr = 2446846;
      }).to.throw();
    });

    it('After setting the property jdr should be change.', () => {
      let calculator = new VSOP87Calculator(new JDateRepository(2446896));
      let jd1 = calculator.jdr.JD;
      calculator.jdr = new JDateRepository(2446846);
      let jd2 = calculator.jdr.JD;
      expect(jd1).not.to.equal(jd2);
    });
  });

  describe('#calc(dataArray, tNumsArray)', () => {
    it('The param dataArray should be an Array.', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.calc(dataArray, [ 27, 15, 8, 4, 3, 1 ]);
      }).to.not.throw();

      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.calc(123, [ 27, 15, 8, 4, 3, 1 ]);
      }).to.throw();
    });

    it('The param tNumsArray should be an Array or undefined', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.calc(dataArray);
      }).to.not.throw();

      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.calc(dataArray, 123);
      }).to.throw();
    });
  });

  describe('#estimateMaxError(dataArray, tNumsArray)', () => {
    it('The param dataArray should be an Array.', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        // console.log(dataArray.length);
        calculator.estimateMaxError(dataArray, [ 27, 15, 8, 4, 3, 1 ]);
      }).to.not.throw();

      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.estimateMaxError(123, [ 27, 15, 8, 4, 3, 1 ]);
      }).to.throw();
    });

    it('The param tNumsArray should be an Array or undefined', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.estimateMaxError(dataArray);
      }).to.not.throw();

      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        calculator.estimateMaxError(dataArray, 123);
      }).to.throw();
    });
  });

  describe('#makeTruncationNums(dataArray, maximumError)', () => {
    it('The param dataArray should be an Array.', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2236896));
        let t = calculator.makeTruncationNums(dataArray, 0.000001);
        // console.log(t);
      }).to.not.throw();

      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        let t = calculator.makeTruncationNums(123, 0.00000001);
      }).to.throw();
    });

    it('The param maximumError should be a Number.', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        let t = calculator.makeTruncationNums(dataArray, '0.00000001');
      }).to.throw();
    });

    it('The param maximumError should be greater than 0.', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        let t = calculator.makeTruncationNums(dataArray, -1);
      }).to.throw();
    });
  });

  describe('#makeMeanTruncationNums(dataArray, maximumError)', () => {
    it('verify', () => {
      expect(() => {
        let calculator = new VSOP87Calculator(new JDateRepository(2446896));
        let t = calculator.makeMeanTruncationNums(b, 0.000005);

        // console.log(t);
      }).not.to.throw();
    })
  })
});