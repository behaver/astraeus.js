// const expect = require("chai").expect;
// const GravitationalDeflection = require("../src/corrections/GravitationalDeflection");
// const JDateRepository = require("../src/time/JDate/JDateRepository");
// const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
// const Angle = require('../src/math/Angle');

import { expect } from 'chai';
import SphericalCoordinate3D from '../src/math/Coordinate/3d/SphericalCoordinate3D';
import GravitationalDeflection from "../src/corrections/GravitationalDeflection";
import JDateRepository from '../src/time/JDate/JDateRepository';
import Angle from '../src/math/Angle';

const angle = new Angle;

describe('#GravitationalDeflection', () => {
  describe('#constructor', () => {
    it('The param time should be a JDateRepository.', () => {
      expect(() => {
        new GravitationalDeflection({
          time: new JDateRepository(18, 'j2000'),
          sc: new SphericalCoordinate3D(1, 1, 1),
        })
      }).not.to.throw();

      expect(() => {
        new GravitationalDeflection({
          time: 123,
          sc: new SphericalCoordinate3D(1, 1, 1),
        })
      }).to.throw(); 
    });
  });

  describe('#get()', () => {
    it('Verify', () => {
      let JD = (new JDateRepository(new Date('2028/11/13 8:0:0'), 'date')).JD,
          time = new JDateRepository(JD + 0.19, 'jd'),
          a = angle.setDegrees(41.0540613).getRadian(),
          b = Math.PI / 2 - angle.setDegrees(49.2277489).getRadian(),
          sc = new SphericalCoordinate3D(206265, b, a),
          GD = new GravitationalDeflection({
            time,
            sc,
          }),
          res = GD.get();

      console.log(GD.get());

      GD.system = 'ecliptic';

      console.log(GD.get());
    });
  });

  describe('#set time(time)', () => {
    it('After set time, the return of get() should be changed.', () => {
      let GD = new GravitationalDeflection({
        time: new JDateRepository(18, 'j2000'),
        sc: new SphericalCoordinate3D(1, 1, 1),
      });

      let r0 = GD.get();

      GD.time = new JDateRepository(0, 'j2000');

      let r1 = GD.get();

      expect(r0.a).not.to.equal(r1.a);
      expect(r0.b).not.to.equal(r1.b);
    })
  });

  describe('#get time()', () => {
    it('The return of set time() should be a JDateRepository.', () => {
      let GD = new GravitationalDeflection({
        time: new JDateRepository(18, 'j2000'),
        sc: new SphericalCoordinate3D(1, 1, 1),
      });

      expect(GD.time).to.be.a.instanceof(JDateRepository);
    })
  });
})