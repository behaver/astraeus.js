const expect = require("chai").expect;
const Venus = require('../src/calculators/SolarPlanetsCalculator/planets/Venus');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
const Angle = require('../src/math/Angle');

const angle = new Angle;

describe('#Venus', () => {
  describe('#constructor(obTime, accuracy)', () => {
    it('The param obTime should be a JDateRepository.', () => {
      expect(() => {
        new Venus(new JDateRepository(2446896), 'low');
        new Venus(new JDateRepository(2446896));
      }).not.to.throw();

      expect(() => {
        new Venus(2446896);
      }).to.throw();
    });

    it('The param accuracy should be low、normal、high、fine or complete.', () => {
      expect(() => {
        new Venus(new JDateRepository(2446896), 'abc');
      }).to.throw();

      expect(() => {
        new Venus(new JDateRepository(2446896), 123);
      }).to.throw();
    });
  });

  describe('#set accuracy(level)', () => {
    it('The param level should be low、normal、high、fine or complete.', () => {
      expect(() => {
        let venus = new Venus(new JDateRepository(2446896));
        venus.sc;
        venus.accuracy = 'low';
        venus.sc;
        venus.accuracy = 'normal';
        venus.sc;
        venus.accuracy = 'high';
        venus.sc;
        venus.accuracy = 'fine';
        venus.sc;
        venus.accuracy = 'complete';
        venus.sc;
      }).not.to.throw();

      expect(() => {
        let venus = new Venus(new JDateRepository(2446896));
        venus.accuracy = 'a';
      }).to.throw();

      expect(() => {
        let venus = new Venus(new JDateRepository(2446896));
        venus.accuracy = 123;
      }).to.throw();
    })
  });

  describe('#get accuracy()', () => {
    it('The return of get accuracy() should be low、normal、high、fine、complete.', () => {
      let venus = new Venus(new JDateRepository(2446896));
      expect(venus.accuracy).to.equal('normal');
    })
  });

  describe('#get l()', () => {
    it('The return of get l() should be an Angle.', () => {
      let venus = new Venus(new JDateRepository(2446896));
      expect(venus.l).to.be.an.instanceof(Angle);
    })
  });

  describe('#get b()', () => {
    it('The return of get b() should be an Angle.', () => {
      let venus = new Venus(new JDateRepository(2446896));
      expect(venus.b).to.be.an.instanceof(Angle);
    });
  });

  describe('#get r()', () => {
    it('The return of get r() should be a Number.', () => {
      let venus = new Venus(new JDateRepository(2446896));
      expect(venus.r).to.be.a('Number');
    });
  });

  describe('#get sc()', () => {
    it('The return of get sc() should be a SphericalCoordinate3D.', () => {
      let venus = new Venus(new JDateRepository(2446896));
      expect(venus.sc).to.be.an.instanceof(SphericalCoordinate3D);
    });
  });

  describe('#setTruncation(item, tNumsArray)', () => {
    it('The param tNumsArray should be an Array.', () => {
      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2, 2, 2 ]);
      }).not.to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation('l', 123);
      }).to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation('l');
      }).to.throw();
    });

    it('The param item should be l、b、r.', () => {
      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation('a', [ 2, 2, 2, 2, 2, 2 ]);
      }).to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation(123, [ 2, 2, 2, 2, 2, 2 ]);
      }).to.throw();
    });
  });

  describe('#getTruncation(item)', () => {
    it('The param item should be l、b、r.', () => {
      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2, 2, 2 ]);
        a.getTruncation('l');
      }).not.to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2, 2, 2 ]);
        a.getTruncation('a');
      }).to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setTruncation('l', [ 2, 2, 2, 2, 2, 2 ]);
        a.getTruncation(123);
      }).to.throw();
    });
  });

  describe('#setMaxError(item, value, mode = \'true\')', () => {
    it('The param item should be l、b、r.', () => {
      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setMaxError('l', 0.000005);
        a.setMaxError('b', 0.0000005, 'true');
        a.setMaxError('b', 0.0000005, 'mean');
        a.setMaxError('b', 0.0000005, 'safe');
      }).not.to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setMaxError('a', 0.000005);
      }).to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setMaxError(123, 0.000005);
      }).to.throw();
    });

    it('The param value should be a Number witch is greater than 0.', () => {
      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setMaxError('l', '0.000005');
      }).to.throw();

      expect(() => {
        let a = new Venus(new JDateRepository(2446896));
        a.setMaxError('l', -0.000005);
      }).to.throw();
    });
  });

  describe('#getMaxError(item)', () => {
    it('The return of getMaxError(item) should be a Number.', () => {
      let a = new Venus(new JDateRepository(2446896));
      expect(a.getMaxError('l')).to.be.a('Number');
    });
  });

  describe('Verify', () => {
    it('天文算法 例31.a', () => {
      let venus = new Venus(new JDateRepository(2448976.5, 'jde'));
      let sc = venus.sc;

      expect(venus.l.inRound().getRadian()).to.closeTo(angle.setRadian(-68.6592582).inRound().getRadian(), 0.00001);
      expect(Math.PI / 2 - sc.theta).to.closeTo(angle.setRadian(-0.0457399).inRound(-90).getRadian(), 0.00001);
      expect(sc.r).to.closeTo(0.724603, 0.00001);
    })

    it('MaxError', () => {
      let a = new Venus(new JDateRepository(2446896));
      let me_l0 = a.getMaxError('l');
      let tNums_l0 = a.getTruncation('l');
      let accuracy_0 = a.accuracy;

      a.setMaxError('l', 0.000005);

      let me_l1 = a.getMaxError('l');
      let tNums_l1 = a.getTruncation('l');
      let accuracy_1 = a.accuracy;

      a.setMaxError('l', 0.000005, 'mean');

      let me_l2 = a.getMaxError('l');
      let tNums_l2 = a.getTruncation('l');

      a.setMaxError('l', 0.000005, 'safe');

      let me_l3 = a.getMaxError('l');
      let tNums_l3 = a.getTruncation('l');

      expect(me_l0).not.to.equal(me_l1);
      expect(me_l1).not.to.equal(me_l2);
      expect(me_l2).not.to.equal(me_l3);

      expect(tNums_l0).not.to.deep.equal(tNums_l1);
      expect(tNums_l1).not.to.deep.equal(tNums_l2);
      expect(tNums_l2).not.to.deep.equal(tNums_l3);

      expect(accuracy_0).not.to.equal(accuracy_1);
    });

    // it('low', () => {
    //   let Planet = require('../src/planets/Uranus');
    //   let a = new Planet(new JDateRepository(2446896));
    //   let me_l0 = a.getMaxError('l');
    //   let tNums_l0 = a.getTruncation('l');

    //   a.setMaxError('l', 0.00005, 'safe');

    //   let me_l3 = a.getMaxError('l');
    //   let tNums_l3 = a.getTruncation('l');

    //   console.log(me_l0, me_l3);
    //   console.log(tNums_l0, tNums_l3);

    //   let me_b0 = a.getMaxError('b');
    //   let tNums_b0 = a.getTruncation('b');

    //   a.setMaxError('b', 0.00005, 'safe');

    //   let me_b3 = a.getMaxError('b');
    //   let tNums_b3 = a.getTruncation('b');

    //   console.log(me_b0, me_b3);
    //   console.log(tNums_b0, tNums_b3);

    //   let me_r0 = a.getMaxError('r');
    //   let tNums_r0 = a.getTruncation('r');

    //   a.setMaxError('r', 0.00005, 'safe');

    //   let me_r3 = a.getMaxError('r');
    //   let tNums_r3 = a.getTruncation('r');

    //   console.log(me_r0, me_r3);
    //   console.log(tNums_r0, tNums_r3);
    // })
  });
})