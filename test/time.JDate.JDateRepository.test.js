const JDateRepository = require('../src/time/JDate/JDateRepository');
const expect = require("chai").expect;

describe("#JDateRepository", () => {
  describe('#constructor(d, dtype)', () => {
    it('The param d must be Number or Date, if not throw an error', () => {
      expect(() => { new JDateRepository('123', 'jd') }).to.throw();
      expect(() => { new JDateRepository(['123'], 'jd') }).to.throw();
      expect(() => { new JDateRepository(false, 'jd') }).to.throw();
      expect(() => { new JDateRepository(1223323, 'jd') }).to.not.throw();
      expect(() => { new JDateRepository(new Date, 'date') }).to.not.throw();
      expect(() => { new JDateRepository }).not.throw();
    });
    it('The param dtype must in { "date", "jd", "jde", "j2000", "jdec", "jdet" }, if not throw an error', () => {
      expect(() => { new JDateRepository(112233, 'cc') }).to.throw();
      expect(() => { new JDateRepository(112233, 123) }).to.throw();
      expect(() => { new JDateRepository(112233, false) }).to.throw();
    })
    it('new JDateRepository(2551545) and (new JDateRepository).set JD(2551545) represent the same time.', () => {
      let jdate = new JDateRepository;
      jdate.JD = 2551545;
      expect((new JDateRepository(2551545)).JD).equal(jdate.JD);
    });
  });

  describe('#JDECP(exp = 1)', () => {
    it('The param exp should be a number.', () => {
      expect(() => {
        (new JDateRepository(2551545)).JDECP('1');
      }).to.throw();
      expect(() => {
        (new JDateRepository(2551545)).JDECP(1);
        (new JDateRepository(2551545)).JDECP(0);
        (new JDateRepository(2551545)).JDECP(-2);
        (new JDateRepository(2551545)).JDECP(1.3);
      }).not.to.throw();
    });

    it('JDECP(0) should equal 1.', () => {
      expect((new JDateRepository(2551545)).JDECP(0)).equal(1);
    })

    it('jdr.JDECP(1) should equal jdr.JDEC', () => {
      let jdr = new JDateRepository(2551545);
      expect(jdr.JDECP(1)).equal(jdr.JDEC);
    })

    it('The cache should be sync on jdate.', () => {
      let jdr = new JDateRepository(2551545);
      let a = jdr.JDECP(3);
      jdr.JD = 2551245;
      expect(a).not.equal(jdr.JDECP(3));
    })
  })

  describe('#JDETP(exp = 1)', () => {
    it('The param exp should be a number.', () => {
      expect(() => {
        (new JDateRepository(2551545)).JDETP('1');
      }).to.throw();
      expect(() => {
        (new JDateRepository(2551545)).JDETP(1);
        (new JDateRepository(2551545)).JDETP(0);
        (new JDateRepository(2551545)).JDETP(-2);
        (new JDateRepository(2551545)).JDETP(1.3);
      }).not.to.throw();
    });

    it('JDETP(0) should equal 1.', () => {
      expect((new JDateRepository(2551545)).JDETP(0)).equal(1);
    })

    it('jdr.JDETP(1) should equal jdr.JDET', () => {
      let jdr = new JDateRepository(2551545);
      expect(jdr.JDETP(1)).equal(jdr.JDET);
    })

    it('The cache should be sync on jdate.', () => {
      let jdr = new JDateRepository(2551545);
      let a = jdr.JDETP(3);
      jdr.JD = 2551245;
      expect(a).not.equal(jdr.JDETP(3));
    })
  })
})