// const expect = require("chai").expect;
// const JDateRepository = require('../src/time/JDate/JDateRepository');
// const SphericalCoordinate3D = require('../src/math/Coordinate/3d/SphericalCoordinate3D');
// const Angle = require('../src/math/Angle');
// const GalacticCoordinate = require('../src/coords/GalacticCoordinate');
// const EquinoctialCoordinate = require('../src/coords/EquinoctialCoordinate');

import { expect } from 'chai';
import SphericalCoordinate3D from '../src/math/Coordinate/3d/SphericalCoordinate3D';
import EquinoctialCoordinate from '../src/coords/EquinoctialCoordinate';
import JDateRepository from '../src/time/JDate/JDateRepository';
import Angle from '../src/math/Angle';
import GalacticCoordinate from '../src/coords/GalacticCoordinate';

const angle = new Angle;

describe('#GalacticCoordinate', () => {
  describe('#constructor', () => {
    // 与 form 测试一致
  });

  describe('#from', () => {
    it('The param sc if existed should be a SphericalCoordinate3D.', () => {
      expect(() => {
        new GalacticCoordinate({
          sc: 'asdf'
        });
      }).to.throw();
      expect(() => {
        new GalacticCoordinate({
          sc: new SphericalCoordinate3D(1, 3.03252, 1.34326)
        });
      }).not.to.throw();
    });

    it('The param longitude should be a Number.', () => {
      expect(() => {
        new GalacticCoordinate({
          longitude: '232'
        })
      }).to.throw();
      expect(() => {
        new GalacticCoordinate({
          longitude: 123.2332
        });
      }).not.to.throw();
    });

    it('The param latitude should be a Number.', () => {
      expect(() => {
        new GalacticCoordinate({
          longitude: 132.2332,
          latitude: '22'
        });
      }).to.throw();
      expect(() => {
        new GalacticCoordinate({
          longitude: 112.2323,
          latitude: 23.22
        });
      }).not.to.throw()
    });

    it('The param radius should be a Number.', () => {
      expect(() => {
        new GalacticCoordinate({
          longitude: 122.3223,
          latitude: 23.223,
          radius: '233'
        });
      }).to.throw();
      expect(() => {
        new GalacticCoordinate({
          longitude: 122.3223,
          latitude: 23.223,
          radius: 1.09382
        });
      }).not.to.throw();
    })

    it('The param radius should be greater than 10e-8.', () => {
      expect(() => {
        new GalacticCoordinate({
          longitude: 122.3223,
          latitude: 23.223,
          radius: 0
        });
      }).to.throw();
    });

    it('The param epoch should be a JDateRepository', () => {
      expect(() => {
        new GalacticCoordinate({
          longitude: 122.3223,
          latitude: 23.223,
          epoch: '2231232'
        });
      }).to.throw();

      expect(() => {
        new GalacticCoordinate({
          longitude: 122.3223,
          latitude: 23.223,
          epoch: new JDateRepository(2000.0, 'jepoch')
        });
      }).not.to.throw();
    })
  });

  describe('#on', () => {
    it('The param epoch should be a JDateRepository', () => {
      let gc  = new GalacticCoordinate({
        longitude: 122.3223,
      });

      expect(() => {
        gc.on({
          epoch: 2323232,
        });
      }).to.throw();

      expect(() => {
        gc.on({
          epoch: new JDateRepository(1950, 'BEpoch'),
        })
      }).not.to.throw();
    });

    it('Verify', () => {
      
    })
  });

  describe('#position', () => {
    it('The param sc if existed should be a SphericalCoordinate3D.', () => {
      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          sc: 'asdf'
        })
      }).to.throw();

      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          sc: new SphericalCoordinate3D(1, 3.03252, 1.34326)
        })
      }).not.to.throw();
    });

    it('The param longitude should be a Number.', () => {
      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          longitude: '232'
        })
      }).to.throw();

      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          longitude: 232
        })
      }).not.to.throw();
    });

    it('The param latitude should be a Number.', () => {
      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          longitude: 112.2323,
          latitude: '23.22'
        })
      }).to.throw();

      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          longitude: 112.2323,
          latitude: 23.22
        })
      }).not.to.throw()
    });

    it('The param radius should be a Number.', () => {
      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          longitude: 112.2323,
          latitude: 23.22,
          radius: '1.09382',
        })
      }).to.throw();

      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          longitude: 112.2323,
          latitude: 23.22,
          radius: 1.09382,
        })
      }).not.to.throw();
    })

    it('The param radius should be greater than 10e-8.', () => {
      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: 123.2332
        });

        gc.position({
          longitude: 112.2323,
          latitude: 23.22,
          radius: 0,
        })
      }).to.throw();
    });

    it('The property after using position should update.', () => {
      let gc = new GalacticCoordinate({
        longitude: 123.2332
      });

      gc.position({
        longitude: 112.2323,
        latitude: 23.22,
        radius: 1,
      })

      expect(gc.longitude.getDegrees()).to.equal(112.2323);
    });
  });

  describe('#get', () => {
    it('The param epoch should be a JDateRepository', () => {
      let gc  = new GalacticCoordinate({
        longitude: 122.3223,
      });

      expect(() => {
        gc.get({
          epoch: 2323232,
        });
      }).to.throw();

      expect(() => {
        gc.get({
          epoch: new JDateRepository(1950.0, 'bepoch'),
        });
      }).not.to.throw();
    });

    it('This method wont change the origin condition property.', () => {
      let gc = new GalacticCoordinate({
        longitude: 122.3223,
        epoch: new JDateRepository(2000.0, 'jepoch'),
      });

      gc.get({
        epoch: new JDateRepository(1950.0, 'jepoch'),
      });

      expect(gc.epoch.JEpoch).to.equal(2000);
    });

    it('The return should be a right structure.', () => {
      let gc = new GalacticCoordinate({
        longitude: 122.3223,
      });

      let res = gc.get({
        epoch: new JDateRepository(1950.0, 'jepoch'),
      });

      expect(res).to.have.all.key('sc', 'epoch');
    })
  });

  describe('#onEpoch', () => {
    it('The param epoch should be a JDateRepository.', () => {
      expect(() => {
        let gc = new GalacticCoordinate({
          longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
          latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
        });
        
        gc.onEpoch(2322232);
      }).to.throw();
    });

    it('The property epoch after onEpoch should equal the epoch setted.', () => {
      let gc = new GalacticCoordinate({
        longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
        latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
      });
      
      let epoch = new JDateRepository(1950.0, 'bepoch');

      gc.onEpoch(epoch);

      expect(gc.epoch.BEpoch).to.closeTo(1950, 0.0000000001);
    })
  });

  describe('#get sc', () => {
    it('The return should be a SphericalCoordinate3D.', () => {
      let gc = new GalacticCoordinate({
        longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
        latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
      });

      expect(gc.sc).to.be.instanceof(SphericalCoordinate3D);
    });
  });

  describe('#get longitude', () => {
    it('The return should be a Angle.', () => {
      let gc = new GalacticCoordinate({
        longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
        latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
      });

      expect(gc.longitude).to.be.instanceof(Angle);
    })
  });

  describe('#get latitude', () => {
    it('The return should be a Angle.', () => {
      let gc = new GalacticCoordinate({
        longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
        latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
      });

      expect(gc.latitude).to.be.instanceof(Angle);
    })
  });

  describe('#get radius', () => {
    it('The return should be a Number.', () => {
      let gc = new GalacticCoordinate({
        longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
        latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
      });

      expect(gc.radius).to.be.a('Number');
    })
  });

  describe('#get epoch', () => {
    it('The return should be a JDateRepository.', () => {
      let gc = new GalacticCoordinate({
        longitude: angle.parseHACString('17h 48m 59.74s').getDegrees(),
        latitude: angle.parseDACString('-14°43′08.2″').getDegrees(),
      });

      expect(gc.epoch).to.be.instanceof(JDateRepository);
    });
  });

  describe('#set epoch', () => {
    it('Run normally, throw no error.', () => {
      let gc = new GalacticCoordinate({
        longitude: 123.45,
        latitude: 34.567,
      });

      expect(() => {
        gc.epoch = new JDateRepository(12, 'J2000');
      }).not.to.throw();
    });

    it('After set epoch, the properties should be changed.', () => {
      let gc = new GalacticCoordinate({
        longitude: 123.34,
        latitude: 22.34,
      });

      let epoch0 = gc.epoch,
          phi0 = gc.sc.phi,
          theta0 = gc.sc.theta;

      gc.epoch = new JDateRepository(1950.0, 'bepoch');

      expect(epoch0.JD).not.to.equal(gc.epoch.JD);
      expect(theta0).not.to.equal(gc.sc.theta);
      // expect(phi0).not.to.equal(gc.sc.phi);
    });
  });
});