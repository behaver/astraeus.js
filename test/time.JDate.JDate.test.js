const JDate = require('../src/time/JDate/JDate');
const expect = require("chai").expect;

describe('#Logic', () => {
  describe('#constructor(d, dtype)', () => {
    it('The param d must be Number or Date, if not throw an error', () => {
      expect(() => { new JDate('123', 'jd') }).to.throw();
      expect(() => { new JDate(['123'], 'jd') }).to.throw();
      expect(() => { new JDate(false, 'jd') }).to.throw();
      expect(() => { new JDate(1223323, 'jd') }).to.not.throw();
      expect(() => { new JDate(new Date, 'date') }).to.not.throw();
      expect(() => { new JDate }).not.throw();
    });
    it('The param dtype should be a String.', () => {
      expect(() => { new JDate(1223323, 123) }).to.throw();
      expect(() => { new JDate(1223323, null) }).to.throw();
    });
    it('The param dtype must in { "date", "jd", "jde", "j2000", "jdec", "jdet" }, if not throw an error', () => {
      expect(() => { new JDate(112233, 'cc') }).to.throw();
      expect(() => { new JDate(112233, 123) }).to.throw();
      expect(() => { new JDate(112233, false) }).to.throw();
      expect(() => { new JDate(1223323, 'JD') }).to.not.throw();
      expect(() => { new JDate(1223323, 'jd') }).to.not.throw();
    })
    it('new JDate(11223344) and (new JDate).set JD(11223344) represent the same time.', () => {
      let jdate = new JDate;
      jdate.JD = 11223344;
      expect((new JDate(11223344)).JD).equal(jdate.JD);
    });
  });
  describe('#get date()', () => {
    it('get date() should return a Date Object', () => {
      expect((new JDate(11223344)).date).to.be.a('date');
    });
  });
  describe('#set date(date)', () => {
    it('When the parem date is not a Date Object, it should throw an error.', () => {
      expect(() => {(new JDate).date = 123}).to.throw();
      expect(() => {(new JDate).date = (new Date('2000/1/1'))}).to.not.throw();
    });
  });
  describe('#get JD()', () => {
    it('get JD() should return a Number.', () => {
      expect((new JDate).JD).to.be.a('number');
    });
  });
  describe('#set JD(jd)', () => {
    it('When jd is not a Number, it should throw an error.', () => {
      expect(() => {(new JDate).JD = '123'}).to.throw();
    });
    it('When jd is < 0, it should throw an error.', () => {
      expect(() => {(new JDate).JD = -123}).to.throw();
    });
  });
  describe('#get JDE()', () => {
    it('get JDE() should return a Number.', () => {
      expect((new JDate).JDE).to.be.a('number');
    });
  });
  describe('#set JDE(jde)', () => {
    it('When jde is not a Number, it should throw an error.', () => {
      expect(() => {(new JDate).JDE = '11223344'}).to.throw();
    });
  });
  describe('#get J2000()', () => {
    it('get J2000() should return a Number.', () => {
      expect((new JDate).J2000).to.be.a('number');
    });
  });
  describe('#set J2000(jde)', () => {
    it('When j2000 is not a Number, it should throw an error.', () => {
      expect(() => {(new JDate).J2000 = '11223344'}).to.throw();
    });
  });
  describe('#get JDEC()', () => {
    it('get JDEC() should return a Number.', () => {
      expect((new JDate).JDEC).to.be.a('number');
    });
  });
  describe('#set JDEC(jdec)', () => {
    it('When jdec is not a Number, it should throw an error.', () => {
      expect(() => {(new JDate).JDEC = '11223344'}).to.throw();
    });
  });
  describe('#get JDET()', () => {
    it('get JDET() should return a Number.', () => {
      expect((new JDate).JDET).to.be.a('number');
    });
  });
  describe('#set JDET(jdet)', () => {
    it('When jdet is not a Number, it should throw an error.', () => {
      expect(() => {(new JDate).JDET = '11223344'}).to.throw();
    });
  });
  describe('#get BEpoch()', () => {
    it('The return should be a Number.', () => {
      expect((new JDate).BEpoch).to.be.a('number');
    });
    it('Verify B1900.', () => {
      let jdate = new JDate(2415020.3135, 'jde');
      expect(jdate.BEpoch).to.closeTo(1900.0, 0.0001);
    });
    it('Verify B1950.', () => {
      let jdate = new JDate(2433282.4235, 'jde');
      expect(jdate.BEpoch).to.closeTo(1950.0, 0.0001);
      // console.log(jdate.BEpoch);
    });
  });
  describe('#set BEpoch(be)', () => {
    it('The param be should be a Number.', () => {
      expect(() => { (new JDate).BEpoch = '1990' }).to.throw();
    });
    it('Verify B1900.', () => {
      let jdate = new JDate(1900.0, 'bepoch');
      expect(jdate.JDE).to.closeTo(2415020.3135, 0.0001);
    });
    it('Verify B1950.', () => {
      let jdate = new JDate(1950.0, 'bepoch');
      expect(jdate.JDE).to.closeTo(2433282.4235, 0.0003);
    });
  });
  describe('#get JEpoch()', () => {
    it('The return should be a Number.', () => {
      expect((new JDate).JEpoch).to.be.a('number');
    });
    it('Verify J2000.', () => {
      let jdate = new JDate(2451545.0, 'jde');
      expect(jdate.JEpoch).to.closeTo(2000.0, 0.0001);
    });
    it('Verify J2050.', () => {
      let jdate = new JDate(2469807.5, 'jde');
      expect(jdate.JEpoch).to.closeTo(2050.0, 0.0001);
      // console.log(jdate.JEpoch);
    });
  });
  describe('#set JEpoch(je)', () => {
    it('The param be should je a Number.', () => {
      expect(() => { (new JDate).JEpoch = '2000' }).to.throw();
    });
    it('Verify J2000.', () => {
      let jdate = new JDate(2000.0, 'jepoch');
      expect(jdate.JDE).to.closeTo(2451545.00, 0.0001);
    });
    it('Verify J2050.', () => {
      let jdate = new JDate(2050.0, 'jepoch');
      expect(jdate.JDE).to.closeTo(2469807.50, 0.0001);
    });
  });
});

describe('#Verify', () => {
  it('JD 2446896.30625; Date 1987/4/11 03:21:00; JDEC -0.1272743 [天文算法 12.b]', () => {
    let d = new Date('1987/4/11 03:21:00');
    let jdate = new JDate(d, 'date');
    expect(jdate.JD).equal(2446896.30625);
    expect(jdate.JDEC.toFixed(7)).equal('-0.1272743');
  })
});
