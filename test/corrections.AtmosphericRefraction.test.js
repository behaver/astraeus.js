// const expect = require("chai").expect;
// const AtmosphericRefraction = require('../src/corrections/AtmosphericRefraction');

import { expect } from 'chai';
import AtmosphericRefraction from "../src/corrections/AtmosphericRefraction";

describe('#AtmosphericRefraction', () => {
  describe('constructor(options)', () => {
    it('The param options should be a Object', () => {
      expect(() => {
        new AtmosphericRefraction();
      }).not.to.throw();

      expect(() => {
        new AtmosphericRefraction({
          apparentH: 12,
        });
      }).not.to.throw();

      expect(() => {
        new AtmosphericRefraction(123);
      }).to.throw();
    });
  });

  describe('#init(options)', () => {
    it('The param T should be a Number.', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          T: 23,
        });
      }).not.to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          T: '23',
        });
      }).to.throw();
    });

    it('The param T should be in (-100, 100).', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          T: -101,
        });
      }).to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          T: 101,
        });
      });
    });

    it('The param P should be a Number.', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          P: 1017
        });
      }).not.to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          P: '1017'
        });
      }).to.throw();
    });

    it('The param P should be in (500, 1500).', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          P: 499,
        });
      }).to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          P: 1501,
        })
      }).to.throw();
    });

    it('The param apparentH should be a Number.', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          apparentH: 15.01,
        })
      }).not.to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          apparentH: '15.01',
        })
      }).to.throw();
    });

    it('The param trueH should be a Number.', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          trueH: 15.01,
        })
      }).not.to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.init({
          trueH: '15.01',
        })
      }).to.throw();
    });
  });

  describe('#set T(t)', () => {
    it('The param t should be a Number.', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.T = 23;
      }).not.to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.T = '23';
      }).to.throw();
    });

    it('The param T should be in (-100, 100).', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.T = -101;
      }).to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.T = 101;
      });
    });
  });

  describe('#set P(p)', () => {
    it('The param p should be a Number.', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.P = 1017;
      }).not.to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.P = '1017';
      }).to.throw();
    });

    it('The param p should be in (500, 1500).', () => {
      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.P = 499;
      }).to.throw();

      expect(() => {
        let ar = new AtmosphericRefraction();
        ar.P = 1501;
      }).to.throw();
    });
  });

  describe('get apparentH()', () => {
    it('The return of get apparentH() should be a Number', () => {
      let ar = new AtmosphericRefraction({
        trueH: 0.5,
      });
      expect(ar.apparentH).to.be.a('Number');
    })
  });

  describe('get trueH()', () => {
    it('The return of get trueH() should be a Number', () => {
      let ar = new AtmosphericRefraction({
        apparentH: 0.5,
      });
      expect(ar.trueH).to.be.a('Number');
    })
  });

  describe('get r()', () => {
    it('The return of get r() should be a Number', () => {
      let ar = new AtmosphericRefraction({
        apparentH: 0.5,
      });
      expect(ar.r).to.be.a('Number');
    });
  })

  describe('get R()', () => {
    it('The return of get R() should be a Number', () => {
      let ar = new AtmosphericRefraction({
        apparentH: 0.5,
      });
      expect(ar.R).to.be.a('Number');
    });
  });

  describe('get T()', () => {
    it('The return of get T() should be a Number', () => {
      let ar = new AtmosphericRefraction({
        apparentH: 0.5,
      });
      expect(ar.T).to.be.a('Number');
    });
  });

  describe('get P()', () => {
    it('The return of get P() should be a Number', () => {
      let ar = new AtmosphericRefraction({
        apparentH: 0.5,
      });
      expect(ar.P).to.be.a('Number');
    });
  });

  describe('get isStrict()', () => {
    it('The return of get isStrict() should be a Number', () => {
      let ar = new AtmosphericRefraction({
        apparentH: 0.5,
      });
      expect(ar.isStrict).to.be.a('Boolean');
    });
  });

  describe('#verify', () => {
    it('《天文算法》例 15.a', () => {
      let ar = new AtmosphericRefraction({
        apparentH: 0.5,
        isStrict: false,
      });
      
      // 经过二次修正
      expect(ar.r).to.closeTo(0.478904, 0.00001);
      expect(ar.trueH).to.closeTo(0.021095, 0.00001);

      ar.trueH = 0.554083;

      expect(ar.apparentH).to.closeTo(0.96402, 0.00001);
    })
  });
});
