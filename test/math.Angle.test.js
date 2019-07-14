const Angle = require('../src/math/Angle');
const expect = require("chai").expect;

describe('#index.js', () => {
  describe('#constructor', () => {
    it('`new Angle(..., "d")` should equal `(new Angle()).getDegrees(...)`', () => {
      expect((new Angle(1, 'd')).getMilliseconds()).equal((new Angle()).setDegrees(1).getMilliseconds());
    });
    it('`new Angle(..., "hac")` should equal `(new Angle()).getHAComplex(...)`', () => {
      expect((new Angle({ h: 12, m: 23, s: 40 }, 'hac')).getMilliseconds()).equal((new Angle()).setHAComplex({ h: 12, m: 23, s: 40 }).getMilliseconds());
    });
    it('`new Angle(..., "dacs")` should equal `(new Angle()).parseDACString(...)`', () => {
      expect((new Angle('124°43′34.065″', 'dacs')).getMilliseconds()).equal((new Angle()).parseDACString('124°43′34.065″').getMilliseconds());
    })
  });

  describe('#setMilliseconds', () => {
    it('The param num should be a Number', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).setMilliseconds('d');
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).setMilliseconds({});
      }).to.throw();
    });
  })

  describe('#setValue() && #getValue()', () => {
    it('The param unit of getValue should be a String', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).getValue(12);
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).getValue({});
      }).to.throw();
    });
    it('The param unit of getValue should be valueble', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).getValue('x');
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).getValue('');
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).getValue('ts');
      }).not.to.throw();
    });

    it('The param unit of setValue should be a String', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).setValue(12, 12);
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).setValue({}, 12);
      }).to.throw();
    });
    it('The param unit of setValue should be valueble', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).setValue('x', 12);
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).setValue('', 12);
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).setValue('ts', 12);
      }).not.to.throw();
    });

    it('The param num of setValue should be a Number', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).setValue('d', 'd');
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).setValue('d', {});
      }).to.throw();
    });

    it('1° = 60′ = 3600″ = 360000ms', () => {
      expect((new Angle(1, 'd')).getMilliseconds())
        .equal((new Angle(60, 'm')).getMilliseconds())
        .equal((new Angle(3600, 's')).getMilliseconds())
        .equal((new Angle(3600000, 'ms')).getMilliseconds());
    });
    it('π = 180°', () => {
      expect((new Angle(Math.PI, 'r')).getMilliseconds())
        .equal((new Angle(180, 'd')).getMilliseconds());
    });
    it('15° = 1th = 60tm = 3600ts = 3600000tms', () => {
      expect((new Angle(15, 'd')).getMilliseconds())
        .equal((new Angle(1, 'th')).getMilliseconds())
        .equal((new Angle(60, 'tm')).getMilliseconds())
        .equal((new Angle(3600, 'ts')).getMilliseconds())
        .equal((new Angle(3600000, 'tms')).getMilliseconds())
    })
  });

  describe('#setHAComplex()', () => {
    it('`setHAComplex({ ... })` should equal `setHAComplex(h, m, s, ms)`', () => {
      expect((new Angle).setHAComplex({ h: 12, m: 24, s: 48, ms: 512 }).getMilliseconds()).equal((new Angle).setHAComplex(12, 24, 48, 512).getMilliseconds());
    });
    it('`setHAComplex(1, 1, 1, 1) should equal `setMilliseconds(54915015)`', () => {
      expect((new Angle({ h: 1, m: 1, s: 1, ms: 1 }, 'hac')).getMilliseconds()).equal(54915015);
    });
    it('`setHAComplex(1, -1, 1, 1) should to throw an Error`', () => {
      expect(() => {(new Angle).setHAComplex({ h: 1, m: -1, s: 1, ms: 1 })}).to.throw();
    });
  });

  describe('#getHAComplex()', () => {
    it('`setTMilliseconds(1).getHAComplex()` should equal { h: 0, m: 0, s: 0, ms: 1 }', () => {
      expect((new Angle(1, 'tms')).getHAComplex()).to.deep.equal({ h: 0, m: 0, s: 0, ms: 1 });
    });
  });

  describe('#setDAComplex()', () => {
    it('`setDAComplex({ ... })` should equal `setDAComplex(d, m, s, ms)`', () => {
      expect((new Angle).setDAComplex({ d: 12, m: 24, s: 48, ms: 512 }).getMilliseconds()).equal((new Angle).setDAComplex(12, 24, 48, 512).getMilliseconds());
    });
    it('`setDAComplex(1, 1, 1, 1) should equal `setMilliseconds(3661001)`', () => {
      expect((new Angle({ d: 1, m: 1, s: 1, ms: 1 }, 'dac')).getMilliseconds()).equal(3661001);
    });
    it('`setDAComplex(1, -1, 1, 1) should to throw an Error`', () => {
      expect(() => {(new Angle({ d: 1, m: -1, s: 1, ms: 1 }, 'dac'))}).to.throw();
    });
  });

  describe('#getDAComplex()', () => {
    it('`setSeconds(1).getDAComplex()` should equal { d: 0, m: 0, s: 1, ms: 0 }', () => {
      expect((new Angle(1, 's')).getDAComplex()).to.deep.equal({ d: 0, m: 0, s: 1, ms: 0.00 });
    });
  });

  describe('#parseDACString(str)', () => {
    it('The param str should be a String.', () => {
      expect(() => {
        (new Angle).parseDACString({});
      }).to.throw();
      expect(() => {
        (new Angle).parseDACString(12);
      }).to.throw();
    });

    it('The param str should be a HAC String.', () => {
      expect(() => {
        (new Angle).parseDACString('123');
      }).to.throw();
    });

    it('`parseDACString("128°56′28.45″").getDAComplex()` should equal `{ d: 128, m: 56, s: 28, ms: 450 }`', () => {
      expect((new Angle).parseDACString("128°56′28.45″").getDAComplex()).to.deep.equal({ d: 128, m: 56, s: 28, ms: 450 });
    });
    it('`parseDACString("128d 56m 28s 45ms").getDAComplex()` should equal `{ d: 128, m: 56, s: 28, ms: 45 }`', () => {
      expect((new Angle).parseDACString("128d 56m 28s 45ms").getDAComplex()).to.deep.equal({ d: 128, m: 56, s: 28, ms: 45 });
    });
  });

  describe('#makeDACString()', () => {
    it('`(new Angle({ d: 128, m: 56, s: 28, ms: 52 }, "dac")).makeDACString()` should equal `128°56′28.052″`', () => {
      expect((new Angle({ d: 128, m: 56, s: 28, ms: 52 }, "dac")).makeDACString()).equal('128°56′28.052″');
    });
    it('`(new Angle({ d: -128, m: -56, s: -28, ms: -52 }, "dac")).makeDACString()` should equal `-128°56′28.052″`', () => {
      expect((new Angle({ d: -128, m: -56, s: -28, ms: -52 }, "dac")).makeDACString()).equal('-128°56′28.052″');
    });
  });

  describe('#parseHACString(str)', () => {
    it('The param str should be a String.', () => {
      expect(() => {
        (new Angle).parseHACString({});
      }).to.throw();
      expect(() => {
        (new Angle).parseHACString(12);
      }).to.throw();
    });

    it('The param str should be a HAC String.', () => {
      expect(() => {
        (new Angle).parseHACString('123');
      }).to.throw();
    });

    it('`parseHACString("128h 56m 28s 45ms").getHAComplex()` should equal `{ h: 128, m: 56, s: 28, ms: 45 }`', () => {
      expect((new Angle).parseHACString("128h 56m 28s 45ms").getHAComplex()).to.deep.equal({ h: 128, m: 56, s: 28, ms: 45 });
    });
    it('`parseHACString("128h 56m 28.45s").getHAComplex()` should equal `{ h: 128, m: 56, s: 28, ms: 450 }`', () => {
      expect((new Angle).parseHACString("128h 56m 28.45s").getHAComplex()).to.deep.equal({ h: 128, m: 56, s: 28, ms: 450 });
    });
  });

  describe('#makeHACString()', () => {
    it('`(new Angle({ h: 12, m: 0, s: 28, ms: 512 }, "hac")).makeHACString()` should equal `12h 0m 28s 512ms`', () => {
      expect((new Angle({ h: 12, m: 0, s: 28, ms: 512 }, "hac")).makeHACString()).equal('12h 0m 28s 512.00ms');
    });
    it('`(new Angle({ h: -12, m: 0, s: -28, ms: -512 }, "hac")).makeHACString()` should equal `-12h 0m 28s 512ms`', () => {
      expect((new Angle({ h: -12, m: 0, s: -28, ms: -512 }, "hac")).makeHACString()).equal('-12h 0m 28s 512.00ms');
    });
  });

  describe('#inRound()', () => {
    it('The param unit should be a String', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).inRound(12, 12);
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).inRound(12, {});
      }).to.throw();
    });
    it('The param unit should be valueble', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).inRound(12, 'x');
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).inRound(12, '');
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).inRound(12, 'ts');
      }).not.to.throw();
    });

    it('The param from should be a Number', () => {
      expect(() => {
        let x = (new Angle(120, 'd')).inRound('d', 'd');
      }).to.throw();
      expect(() => {
        let x = (new Angle(120, 'd')).inRound({}, 'd');
      }).to.throw();
    });

    it('360° inRound from 361° should equal 720°', () => {
      expect((new Angle(360, 'd')).inRound(361, 'd').getDegrees()).equal(720);
    });
    it('361° inRound from 361° should equal 361°', () => {
      expect((new Angle(361, 'd')).inRound(361, 'd').getDegrees()).equal(361);
    });
    it('362° inRound from 361° should equal 362°', () => {
      expect((new Angle(362, 'd')).inRound(361, 'd').getDegrees()).equal(362);
    });
    it('720° inRound from 361° should equal 720°', () => {
      expect((new Angle(720, 'd')).inRound(361, 'd').getDegrees()).equal(720);
    });
    it('721° inRound from 361° should equal 361°', () => {
      expect((new Angle(721, 'd')).inRound(361, 'd').getDegrees()).equal(361);
    });
    it('722° inRound from 361° should equal 362°', () => {
      expect((new Angle(722, 'd')).inRound(361, 'd').getDegrees()).equal(362);
    });
    it('359° inRound from 2π should equal 719°', () => {
      expect((new Angle(359, 'd')).inRound(2 * Math.PI, 'r').getDegrees()).equal(719);
    });
    it('2π inRound from 361° should equal 720°', () => {
      expect((new Angle(2 * Math.PI, 'r')).inRound(361, 'd').getDegrees()).equal(720);
    });
    it('-1° inRound should equal 359°', () => {
      expect((new Angle(-1, 'd')).inRound().getDegrees()).equal(359);
    });
    it('0° inRound should equal 0°', () => {
      expect((new Angle(0, 'd')).inRound().getDegrees()).equal(0);
    });
    it('1° inRound should equal 1°', () => {
      expect((new Angle(1, 'd')).inRound().getDegrees()).equal(1);
    });
    it('359° inRound should equal 359°', () => {
      expect((new Angle(359, 'd')).inRound().getDegrees()).equal(359);
    });
    it('360° inRound should equal 0°', () => {
      expect((new Angle(360, 'd')).inRound().getDegrees()).equal(0);
    });
    it('361° inRound should equal 1°', () => {
      expect((new Angle(361, 'd')).inRound().getDegrees()).equal(1);
    });
  });

  describe('#toString()', () => {
    it('toString()', () => {
      expect(String(new Angle(12223443, 'ms'))).equal('3°23′43.443″');
    });
  });
});