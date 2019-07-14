const JDate = require('../src/time/JDate/JDate');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const CacheSpaceOnJDate = require('../src/time/JDate/CacheSpaceOnJDate');
const expect = require("chai").expect;

describe('#CacheSpaceOnJDate', () => {
  describe('#constructor(jdate)', () => {
    it('The param should be a JDate', () => {
      expect(() => {
        let cache = new CacheSpaceOnJDate(new JDate(2446896));
        let cache2 = new CacheSpaceOnJDate(new JDateRepository(2446896));
      }).not.to.throw();

      expect(() => {
        new CacheSpaceOnJDate(new Date);
      }).to.throw();

      expect(() => {
        new CacheSpaceOnJDate([]);
      }).to.throw();

      expect(() => {
        new CacheSpaceOnJDate('2323');
      }).to.throw();
    })
  });

  describe('#on(jdate)', () => {
    it('Use and not throw.', () => {
      expect(() => {
        let cache = new CacheSpaceOnJDate(new JDate(2446896));
        cache.on(new JDateRepository(2446896));
      }).not.to.throw();
    })
  })

  describe('#get(key) & #set(key, val)', () => {
    it('Sync on JDate.', () => {
      let cache = new CacheSpaceOnJDate(new JDateRepository(2446896));
      cache.set('abc', 12345);
      expect(cache.get('abc')).equal(12345);

      let jdr = new JDateRepository(2446899);
      cache.on(jdr);
      expect(cache.get('abc')).not.equal(12345);

      cache.set('abc', 12345);
      expect(cache.get('abc')).equal(12345);

      jdr.JD = 2446892;
      expect(cache.get('abc')).not.equal(12345);
    })
  });

  describe('#remove(key)', () => {
    it('use it then the cache item should be remove.', () => {
      let cache = new CacheSpaceOnJDate(new JDateRepository(2446896));
      cache.set('abc', 12345);
      cache.remove('abc');

      expect(cache.has('abc')).to.equal(false);
    });
  })

  describe('#has(key)', () => {
    it('Normal use.', () => {
      let cache = new CacheSpaceOnJDate(new JDateRepository(2446896));
      cache.set('abc', 12345);
      expect(cache.has('abc')).to.be.true;

      cache.on(new JDate(2446896));
      expect(cache.has('abc')).to.be.false;
    })
  })

  describe('#clear()', () => {
    it('Normal use.', () => {
      let cache = new CacheSpaceOnJDate(new JDateRepository(2446896));
      cache.set('abc', 12345);
      expect(cache.has('abc')).to.be.true;

      cache.clear();
      expect(cache.has('abc')).to.be.false;
    })
  })
})