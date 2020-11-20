// const expect = require("chai").expect;
// const MarsLocator = require('../src/locators/SolarStarLocator/planets/Mars');
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const SystemSwitcher = require('../src/coords/SystemSwitcher');

import { expect } from 'chai';
import JDateRepository from '../src/time/JDate/JDateRepository';
import SystemSwitcher from '../src/coords/SystemSwitcher';
import MarsLocator from '../src/locators/SolarStarLocator/planets/Mars';

describe('#MarsLocator', () => {
  describe('#Verify', () => {
    it('#JPL 对比测试', () => {
      let jdate = new JDateRepository(2458582.5);
      let MP = new MarsLocator({ 
        time: jdate,
        withLTE: true, 
      });

      let res = MP.get();
      let ECC = res.coord;

      ECC.onGeocentric();

      let SS = new SystemSwitcher({
        coord: ECC,
      });

      let EQC0 = SS.to('eqc');
      EQC0.onJ2000();

      expect(EQC0.longitude.inRound().getDegrees()).to.closeTo(63.4162628, 0.00007);
      expect(EQC0.latitude.inRound().getDegrees()).to.closeTo(22.1740401, 0.00003);

      EQC0.on({
        epoch: jdate,
        enableNutation: true,
        withNutation: true,
        enableAnnualAberration: true,
        withAnnualAberration: true,
        enableGravitationalDeflection: true,
        withGravitationalDeflection: true,
      });

      expect(EQC0.longitude.inRound().getDegrees()).to.closeTo(63.6933751, 0.00008);
      expect(EQC0.latitude.inRound().getDegrees()).to.closeTo(22.2196102, 0.00003);
    
      ECC.on({
        epoch: jdate,
        enableNutation: true,
        withNutation: true,
        enableAnnualAberration: true,
        withAnnualAberration: true,
        enableGravitationalDeflection: true,
        withGravitationalDeflection: true,
      });

      expect(ECC.longitude.inRound().getDegrees()).to.closeTo(65.7748201, 0.00008);
      expect(ECC.latitude.inRound().getDegrees()).to.closeTo(0.9685752, 0.00003);
    });
  });
})