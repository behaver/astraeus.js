// const expect = require("chai").expect;

// const Locator = require('../src/Locator');
// const JDate = require('../src/time/JDate/JDateRepository');
// const CommonCoordinate = require('../src/coords/CommonCoordinate');
// const SystemCrossLocator = require('../src/locators/SystemCrossLocator');
// const OrbitSystemCrossLocator = require('../src/locators/OrbitSystemCrossLocator');

import { expect } from 'chai';
import Observer from '../src/Observer';
import JDate from '../src/time/JDate/JDateRepository';
import CommonCoordinate from '../src/coords/CommonCoordinate';
import SystemCrossLocator from '../src/locators/SystemCrossLocator';
import OrbitSystemCrossLocator from '../src/locators/OrbitSystemCrossLocator';

describe('#Observer', () => {
  let L = new Observer,
      time = new JDate(new Date(1992, 7, 15, 8, 25), 'date');

  L.onObservatory({
    longitude: -124.23,
    latitude: 40.07,
    elevation: 100,
    temperature: 23.5,
  }).withCorrections({
    nutation: 3,
    lightTime: 3,
    annualAberration: 3,
    annualParallax: 3,
    atmRefraction: 3,
    graDeflection: 3,
    fk5: 0,
  }).useCoordSetting({
    system: 'ecc',
    centerMode: 'geocentric',
    isContinuous: false,
  }).atTime(time);

  it('Run get() no error.', () => {
    expect(() => {
      let CoordMoon = L.get('moon');
    }).not.to.throw();
  });

  let CoordMoon = L.get('moon');

  it('The method get() should return CommonCoordinate.', () => {
    expect(CoordMoon.coord).to.be.an.instanceof(CommonCoordinate);
  });

  it('Run getAll() no error.', () => {
    expect(() => {
      L.getAll();
    }).not.to.throw();
  });

  let AscLocator = new SystemCrossLocator({
    sysA: 'hc',
    sysB: 'ecc',
    direction: true,
    coordHandler: L.coordHandler, 
  });

  L.registerLocator('asc', AscLocator);

  let coordAsc = L.get('asc');

  it('Verify the result of asc located.', () => {
    expect(coordAsc.coord.longitude.inRound().getDegrees()).to.closeTo(183.26, 0.1);
  });

  let NCLocator = new OrbitSystemCrossLocator({
    orbit: L.getLocator('moon'),
    sys: 'ecc',
    direction: true,
    coordHandler: L.coordHandler, 
  });

  L.registerLocator('nc', NCLocator);

  let resNC = L.get('nc');

  it('Verify the result of nc located.', () => {
    expect(resNC.coord.longitude.getDegrees()).to.closeTo(88.7, 0.01);
  });

  L.registerStar({
    id: 'θPersei',
    ra: 41.0500,
    dec: 49.2283,
    pmra: 0.336,
    pmdec: -0.089,
    radvel: 25,
    parallax: 0.089,
  });

  L.time = new JDate(2462088.69, 'jde');

  let coordAsc2 = L.get('asc');
  
  it('After setted time, the result of asc located should be changed.', () => {
    expect(coordAsc.coord.longitude.getDegrees()).not.to.equal(coordAsc2.coord.longitude.getDegrees());
  });

  L.useCoordSetting({
    system: 'eqc',
  });

  let coordThetaPersei = L.get('θPersei');

  it('Fixed star locate normally.', () => {
    expect(coordThetaPersei.coord).to.be.an.instanceof(CommonCoordinate);
  });

  it('Verify the result of θPersei located.', () => {
    expect(coordThetaPersei.coord.longitude.getDegrees()).to.closeTo(41.5599646, 0.02);
    expect(coordThetaPersei.coord.latitude.getDegrees()).to.closeTo(49.3520685, 0.002);
  });

  L.setAfterResultProcessed(function(result) {
    let coord = result.coord;
    result = {
      longitude: coord.longitude.getDegrees(),
      latitude: coord.latitude.getDegrees(),
    }

    return result;
  });

  let coordList = L.getAll();

  it('Verify the return formart of getAll() and setAfterResultProcessed().', () => {
    expect(coordList['sun']).to.have.all.keys('longitude', 'latitude');
  });

  // console.log(coordList);
});