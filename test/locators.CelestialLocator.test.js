// const expect = require("chai").expect;

// const CelestialLocator = require('../src/locators/CelestialLocator');
// const JDateRepository = require('../src/time/JDate/JDateRepository');

import { expect } from 'chai';
import Locator from '../src/locators/Locator';
import JDateRepository from '../src/time/JDate/JDateRepository';

describe('#Locator', () => {
  describe('#extends', () => {
    it('#大体测试一下接口继承是否正常运行。', () => {
      expect(() => {
        class A extends Locator {};
        A.id = '腹中有苦果';
        A.time = new JDateRepository;
        A.id;
        A.time;
      }).not.to.throw();

      class A extends Locator {};
      A.id = '腹中有苦果';

      expect(A.id).to.equal('腹中有苦果');
    });
  });
});
