'use strict';

const expect = require("chai").expect;
const JDateRepository = require('../src/time/JDate/JDateRepository');
const ELP2000Calculator = require('../src/calculators/MoonELP2000Calculator/ELP2000Calculator');

const DataL = require('../src/calculators/MoonELP2000Calculator/data/l');
const DataB = require('../src/calculators/MoonELP2000Calculator/data/b');
const DataR = require('../src/calculators/MoonELP2000Calculator/data/r');

describe('#ELP2000Calculator', () => {
  describe('#constructor(jdr)', () => {
    it('The param jdr should be a JDateRepository.', () => {
      expect(() => {
        new ELP2000Calculator(new JDateRepository(2446896));
      }).to.not.throw();

      expect(() => {
        new ELP2000Calculator(2446896);
      }).to.throw();

      expect(() => {
        new ELP2000Calculator();
      }).to.throw();
    });
  });

  describe('#get jdr()', () => {
    it('The return of get jdr() should be a JDateRepository.', () => {
      let calculator = new ELP2000Calculator(new JDateRepository(2446896));
      expect(calculator.jdr).to.be.an.instanceof(JDateRepository);
    });
  });

  describe('#set jdr(jdr)', () => {
    it('The param jdr should be a JDateRepository.', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.jdr = new JDateRepository(2446846);
      }).to.not.throw();

      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.jdr = 2446846;
      }).to.throw();
    });

    it('After setting the property jdr should be change.', () => {
      let calculator = new ELP2000Calculator(new JDateRepository(2446896));
      let jd1 = calculator.jdr.JD;
      calculator.jdr = new JDateRepository(2446846);
      let jd2 = calculator.jdr.JD;
      expect(jd1).not.to.equal(jd2);
    });
  });

  describe('#calc(dataArray, tNumsArray)', () => {
    it('The param dataArray should be an Array.', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        // console.log(DataL.length);
        let res = calculator.calc(DataL, [ 27, 15, 8, 4 ]);
        // console.log('calc(DataL, [ 27, 15, 8, 4 ])', res);
      }).to.not.throw();

      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.calc(123, [ 27, 15, 8, 4 ]);
      }).to.throw();
    });

    it('The param tNumsArray should be an Array or undefined', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.calc(DataL);
      }).to.not.throw();

      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.calc(DataL, 123);
      }).to.throw();
    });
  });

  describe('#estimateMaxError(dataArray, tNumsArray)', () => {
    it('The param dataArray should be an Array.', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        // console.log(dataArray.length);
        let res = calculator.estimateMaxError(DataL, [ 27, 15, 8, 4 ]);
        // console.log('estimateMaxError(DataL, [ 27, 15, 8, 4 ])', res);
      }).to.not.throw();

      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.estimateMaxError(123, [ 27, 15, 8, 4 ]);
      }).to.throw();
    });

    it('The param tNumsArray should be an Array or undefined', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.estimateMaxError(DataL);
      }).to.not.throw();

      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        calculator.estimateMaxError(DataL, 123);
      }).to.throw();
    });
  });

  describe('#makeTruncationNums(dataArray, maximumError)', () => {
    it('The param dataArray should be an Array.', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2236896));
        let t = calculator.makeTruncationNums(DataB, 1e-20);
        // console.log('makeTruncationNums(DataL, 0.000001)', t);
      }).to.not.throw();

      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        let t = calculator.makeTruncationNums(123, 0.00000001);
      }).to.throw();
    });

    it('The param maximumError should be a Number.', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        let t = calculator.makeTruncationNums(DataL, '0.00000001');
      }).to.throw();
    });

    it('The param maximumError should be greater than 0.', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        let t = calculator.makeTruncationNums(DataL, -1);
      }).to.throw();
    });
  });

  describe('#makeMeanTruncationNums(dataArray, maximumError)', () => {
    it('verify', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        let t = calculator.makeMeanTruncationNums(DataL, 5);

        // console.log('makeMeanTruncationNums(DataB, 0.000005)', t);
      }).not.to.throw();
    })
  })

  describe('#makeSafeTruncationNums(dataArray, maximumError)', () => {
    it('verify', () => {
      expect(() => {
        let calculator = new ELP2000Calculator(new JDateRepository(2446896));
        let t = calculator.makeSafeTruncationNums(DataR, 0.5);

        // console.log('makeSafeTruncationNums(DataR, 0.000005)', t);
      }).not.to.throw();
    })
  })
});
