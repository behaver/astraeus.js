// const Nutation = require('../src/corrections/Nutation');
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const JDate = require('../src/time/JDate/JDate');
// const expect = require("chai").expect;

import { expect } from 'chai';
import Nutation from "../src/corrections/Nutation";
import JDateRepository from '../src/time/JDate/JDateRepository';
import JDate from '../src/time/JDate/JDate';

describe('#Nutation', () => {
  describe('#consturctor(options)', () => {
    it('The param epoch should be a JDateRepository', () => {
      expect(() => {
        new Nutation();
      }).to.throw();
      expect(() => {
        new Nutation({
          epoch: 12
        });
      }).to.throw();
      expect(() => {
        let jdate = new JDate();
        new Nutation({
          epoch: jdate
        });
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new Nutation({
          epoch: jdr
        });
      }).not.to.throw();
    });
  });

  describe('#set epoch(value)', () => {
    it('The param value should be a JDateRepository.', () => {
      expect(() => {
        let jdr = new JDateRepository(2446896);
        let nut = new Nutation({
          epoch: jdr
        });
        nut.epoch = 10086;
      }).to.throw();

      expect(() => {
        let jdr = new JDateRepository(2446896);
        let nut = new Nutation({
          epoch: jdr
        });
        nut.epoch = new JDateRepository(2446899);
      }).not.to.throw();
    });

    it('The res of calc should be change after anthor epoch be setted.', () => {
      let jdr = new JDateRepository(2446896);
      let nut = new Nutation({
        epoch: jdr
      });
      let l0 = nut.longitude;
      nut.epoch = new JDateRepository(2446899);
      let l1 = nut.longitude;

      expect(l0).not.to.equal(l1);
    });
  });

  describe('#set model(value)', () => {
    it('The param value should be a right String', () => {
      let jdr = new JDateRepository(2446896);
      let nut = new Nutation({
        epoch: jdr,
      });

      expect(() => {
        nut.model = '123';
      }).to.throw();

      expect(() => {
        nut.model = 123;
      }).to.throw();

      expect(() => {
        nut.model = 'lp';
      }).not.to.throw();
    });

    it('The res of calc should be change after anthor model be setted.', () => {
      let jdr = new JDateRepository(2446896);
      let nut = new Nutation({
        epoch: jdr,
      });

      let l0 = nut.longitude;

      nut.model = 'lp';

      let l1 = nut.longitude;

      expect(l0).not.to.equal(l1);
    });
  });

  describe('#get longitude()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let n = new Nutation({
        epoch: jdr
      });
      expect(n.longitude).to.be.a('Number');
    })
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let n = new Nutation({
        epoch: jdr
      });
      let l_old = n.longitude;
      jdr.JD = 2446816;
      expect(l_old).not.equal(n.longitude);
    })
  })

  describe('#get obliquity()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let n = new Nutation({
        epoch: jdr
      });
      expect(n.obliquity).to.be.a('Number');
    })
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let n = new Nutation({
        epoch: jdr
      });
      let l_old = n.obliquity;
      jdr.JD = 2446816;
      expect(l_old).not.equal(n.obliquity);

      // console.log((new Nutation(new JDateRepository(0, 'j2000'))).obliquity);
    })
  })

  describe('verify', () => {
    it('《天文算法》P115 例21.a', () => {
      let jdr = new JDateRepository(2446895.5);
      let n = new Nutation({
        epoch: jdr
      });

      expect(n.longitude).to.closeTo(-3788, 10);
      expect(n.obliquity).to.closeTo(9443, 10);
    })
  })
})