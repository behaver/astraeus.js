import { expect } from 'chai';
import {
  Coord,
  Observer,
  Velocity,
  JDateRepository,
  SiderealTime,
  Angle,
  SphericalCoordinate3D,
  CylindricalCoordinate3D,
  RectangularCoordinate3D,
  PolarCoordinate2D,
  RectangularCoordinate2D,
  Derivator,
  NewtonSolver,
  FixedStarLocator,
  OrbitSystemCrossLocator,
  SystemCrossLocator,
  SunLocator,
  MercuryLocator,
  VenusLocator,
  EarthLocator,
  MoonLocator,
  MarsLocator,
  JupiterLocator,
  SaturnLocator,
  NeptuneLocator,
  PlutoLocator,
  EclipticCoordinate,
  EquinoctialCoordinate,
  GalacticCoordinate,
  HorizontalCoordinate,
  HourAngleCoordinate,
  SystemSwitcher,
  Nutation,
  Precession,
  AnnualAberration,
  AnnualParallax,
  AtmosphericRefraction,
  DiurnalParallax,
  FK5Deflection,
  GravitationalDeflection,
  FSDynamicCalculator,
  FSTrigonometricCalculator,
  MoonELP2000Calculator,
  Pluto99Calculator,
  EarthCalculator,
  JupiterCalculator,
  MarsCalculator,
  MercuryCalculator,
  NeptuneCalculator,
  SaturnCalculator,
  UranusCalculator,
  VenusCalculator,
  EarthSSBCalculator,
} from "../index";

describe('#demo', () => {
  it('normally use', () => {
    expect(() => {
      // 实例化天体坐标定位控制器
      let observer = new Observer;

      // 实例化儒略时间
      let JDate = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

      // 设置定位参数
      observer.onObservatory({
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
      }).atTime(JDate);

      // 注册恒星 θPersei
      observer.registerStar({
        id: 'θPersei',
        ra: 41.0500,
        dec: 49.2283,
        pmra: 0.336,
        pmdec: -0.089,
        radvel: 25,
        parallax: 0.089,
      });

      // 获取月亮坐标结果
      let resMoon = observer.get('moon');

      // 获取 θPersei 坐标结果
      let resThetaPersei = observer.get('θPersei');
    }).not.to.throw();
  });
});

