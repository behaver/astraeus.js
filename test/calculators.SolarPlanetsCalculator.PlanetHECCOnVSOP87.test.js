// const expect = require("chai").expect;
// const PlanetHECCOnVSOP87 = require('../src/calculators/SolarPlanetsCalculator/PlanetCalculator');
// const JDateRepository = require('../src/time/JDate/JDateRepository');

import { expect } from 'chai';
import PlanetHECCOnVSOP87 from '../src/calculators/SolarPlanetsCalculator/PlanetCalculator';
import JDateRepository from '../src/time/JDate/JDateRepository';

describe('#PlanetHECCOnVSOP87', () => {
	describe('#constructor', () => {
    it('The param obTime should be a JDateRepository.', () => {
      expect(() => {
        new PlanetHECCOnVSOP87(new JDateRepository(2446896));
      }).not.to.throw();

      expect(() => {
        new PlanetHECCOnVSOP87(2446896);
      }).to.throw();
    })
  });

  describe('#set obTime(jdr)', () => {
    it('The param jdr should be a JDateRepository.', () => {
      expect(() => {
        let a = new PlanetHECCOnVSOP87(new JDateRepository(2446896));
        a.obTime = new JDateRepository(2446816);
      }).not.to.throw();

      expect(() => {
        let a = new PlanetHECCOnVSOP87(new JDateRepository(2446896));
        a.obTime = 2446816;
      }).to.throw();
    });
  });

  describe('#get obTime()', () => {
    it('The return of method get obTime() should be a JDateRepository.', () => {
      let a = new PlanetHECCOnVSOP87(new JDateRepository(2446896));
      expect(a.obTime).to.be.an.instanceof(JDateRepository);
    });
  });
})