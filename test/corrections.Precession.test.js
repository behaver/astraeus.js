const Precession = require('../src/corrections/Precession');
const JDateRepository = require('../src/time/JDate/JDateRepository');
const JDate = require('../src/time/JDate/JDate');
const expect = require("chai").expect;

describe('#Precession', () => {
  describe('#consturctor(jdr)', () => {
    it('The param jdr should be a JDateRepository', () => {
      expect(() => {
        new Precession();
      }).to.throw();
      expect(() => {
        new Precession({
          epoch: 333
        });
      }).to.throw();
      expect(() => {
        let jdate = new JDate();
        new Precession({
          epoch: jdate,
        });
      }).to.throw();
      expect(() => {
        let jdr = new JDateRepository(2446896);
        new Precession({
          epoch: jdr,
        });
      }).not.to.throw();
    });
  });

  describe('#set epoch(value)', () => {
    it('The param value should be JDateRepository.', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });

      expect(() => {
        p.epoch = 222;
      }).to.throw();

      expect(() => {
        p.epoch = new JDateRepository(2446892);
      }).not.to.throw();
    });
  });

  describe('#get epoch()', () => {
    it('The res should be JDateRepository.', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });

      expect(p.epoch).to.be.an.instanceof(JDateRepository);
    });
  });

  describe('#set model(value)', () => {
    it('The param value should be a valuable String.', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });

      expect(() => {
        p.model = 123;
      }).to.throw();

      expect(() => {
        p.model = 'erw';
      }).to.throw();

      expect(() => {
        p.model = 'iau2006';
      }).not.to.throw();
    });
  });

  describe('#get(key)', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.get('psi')).to.be.a('Number');
    })
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let psi_old = p.get('psi');
      jdr.JD = 2446816;
      expect(psi_old).not.equal(p.get('psi'));
    })
    it('The param should be in range.', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(() => { p.get('a') }).to.throw();
    })
  })

  describe('#get P()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.P).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let P_old = p.P;
      jdr.JD = 2446816;
      expect(P_old).not.equal(p.P);
    })
  })

  describe('#get Q()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.Q).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let Q_old = p.Q;
      jdr.JD = 2446816;
      expect(Q_old).not.equal(p.Q);
    })
  })

  describe('#get eta()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.eta).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let eta_old = p.eta;
      jdr.JD = 2446816;
      expect(eta_old).not.equal(p.eta);
    })
  })

  describe('#get pi()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.pi).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let pi_old = p.pi;
      jdr.JD = 2446816;
      expect(pi_old).not.equal(p.pi);
    })
  })

  describe('#get p()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.p).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let p_old = p.p;
      jdr.JD = 2446816;
      expect(p_old).not.equal(p.p);
    })
  })

  describe('#get epsilon()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.epsilon).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let epsilon_old = p.epsilon;
      jdr.JD = 2446816;
      expect(epsilon_old).not.equal(p.epsilon);
    })
  })

  describe('#get chi()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.chi).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let chi_old = p.chi;
      jdr.JD = 2446816;
      expect(chi_old).not.equal(p.chi);
    })
  })

  describe('#get omega()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.omega).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let omega_old = p.omega;
      jdr.JD = 2446816;
      expect(omega_old).not.equal(p.omega);
    })
  })

  describe('#get psi()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.psi).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let psi_old = p.psi;
      jdr.JD = 2446816;
      expect(psi_old).not.equal(p.psi);
    })
  })

  describe('#get theta()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.theta).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let theta_old = p.theta;
      jdr.JD = 2446816;
      expect(theta_old).not.equal(p.theta);
    })
  })

  describe('#get zeta()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.zeta).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let zeta_old = p.zeta;
      jdr.JD = 2446816;
      expect(zeta_old).not.equal(p.zeta);
    })
  })

  describe('#get z()', () => {
    it('The res should be a Number', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      expect(p.z).to.be.a('Number');
    });
    it('The cache should be sync on jdate', () => {
      let jdr = new JDateRepository(2446896);
      let p = new Precession({
        epoch: jdr,
      });
      let z_old = p.z;
      jdr.JD = 2446816;
      expect(z_old).not.equal(p.z);
    })
  })

  describe('verify', () => {
    it('《天文算法》P109 例20.b', () => {
      let jdr = new JDateRepository(2462088.69);
      let p = new Precession({
        epoch: jdr,
        model: 'iau1976',
      });

      expect(p.zeta).to.closeTo(665.7627, 0.0001);
      expect(p.z).to.closeTo(665.8288, 0.0001);
      expect(p.theta).to.closeTo(578.5489, 0.0001);
    })
  })
});
