const expect = require("chai").expect;
const Velocity = require('../src/velocity/EarthSSBVelocity');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const Angle = require('../src/math/Angle');

const angle = new Angle;

describe('#Velocity', () => {
  describe('#constructor(time)', () => {
    it('The param time should be a JDateRepository.', () => {
      expect(() => {
        let jdr = new JDateRepository(2334345, 'jde');
        new Velocity(jdr);
      }).not.to.throw();

      expect(() => {
        new Velocity(123);
      }).to.throw();
    })
  });

  describe('#verify', () => {
    it('天文算法 例 22.b', () => {
      let JD = (new JDateRepository(new Date('2028/11/13 8:0:0'), 'date')).JD,
          v = new Velocity(new JDateRepository(JD + 0.19, 'jd'));

      expect(v.x).to.closeTo(-1363700, 20);
      expect(v.y).to.closeTo(990286, 20);
      expect(v.z).to.closeTo(429285, 20);
    });
  })
})