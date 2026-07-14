/**
 * Центральный файл всех string enum проекта.
 *
 * String enum вместо числового: значения читаемы в IndexedDB, JSON и DevTools,
 * не ломаются при переупорядочивании вариантов, безопасны при сериализации.
 */

/**
 * Тип астрономического объекта.
 * «Cluster» разбит на open/globular — они принципиально разные по природе и наблюдению.
 */
export enum CelestialObjectType {
  Star = 'star',
  DoubleStar = 'double_star',
  VariableStar = 'variable_star',
  Planet = 'planet',
  Moon = 'moon',
  Sun = 'sun',
  Asteroid = 'asteroid',
  Comet = 'comet',
  Galaxy = 'galaxy',
  Nebula = 'nebula',
  PlanetaryNebula = 'planetary_nebula',
  SupernovaRemnant = 'supernova_remnant',
  OpenCluster = 'open_cluster',
  GlobularCluster = 'globular_cluster',
}

/** Тип астрономического инструмента. */
export enum InstrumentType {
  Refractor = 'refractor',
  Reflector = 'reflector',
  Catadioptric = 'catadioptric',
  Binoculars = 'binoculars',
  NakedEye = 'naked_eye',
  Camera = 'camera',
}

/** Статус записи наблюдения. Draft позволяет сохранять незаконченные сессии. */
export enum ObservationStatus {
  Draft = 'draft',
  Completed = 'completed',
}

/** Каталоги астрономических объектов. */
export enum AstronomicalCatalog {
  Messier = 'messier',
  NGC = 'ngc',
  IC = 'ic',
  Caldwell = 'caldwell',
  Hipparcos = 'hip',
  HenryDraper = 'hd',
  BrightStar = 'hr',
  Bayer = 'bayer',
  Flamsteed = 'flamsteed',
  SAO = 'sao',
}

/** Единица измерения расстояния до объекта. */
export enum DistanceUnit {
  AstronomicalUnit = 'au',
  LightYear = 'ly',
  KiloLightYear = 'kly',
  MegaLightYear = 'mly',
  Parsec = 'pc',
  Kiloparsec = 'kpc',
  Megaparsec = 'mpc',
}

/** Фаза Луны. */
export enum MoonPhase {
  New = 'new',
  WaxingCrescent = 'waxing_crescent',
  FirstQuarter = 'first_quarter',
  WaxingGibbous = 'waxing_gibbous',
  Full = 'full',
  WaningGibbous = 'waning_gibbous',
  LastQuarter = 'last_quarter',
  WaningCrescent = 'waning_crescent',
}

/**
 * IAU-коды всех 88 созвездий.
 * Используются как ключи привязки объектов к области неба.
 */
export enum Constellation {
  Andromeda = 'And',
  Antlia = 'Ant',
  Apus = 'Aps',
  Aquarius = 'Aqr',
  Aquila = 'Aql',
  Ara = 'Ara',
  Aries = 'Ari',
  Auriga = 'Aur',
  Bootes = 'Boo',
  Caelum = 'Cae',
  Camelopardalis = 'Cam',
  Cancer = 'Cnc',
  CanesVenatici = 'CVn',
  CanisMajor = 'CMa',
  CanisMinor = 'CMi',
  Capricornus = 'Cap',
  Carina = 'Car',
  Cassiopeia = 'Cas',
  Centaurus = 'Cen',
  Cepheus = 'Cep',
  Cetus = 'Cet',
  Chamaeleon = 'Cha',
  Circinus = 'Cir',
  Columba = 'Col',
  ComaBerenices = 'Com',
  CoronaAustralis = 'CrA',
  CoronaBorealis = 'CrB',
  Corvus = 'Crv',
  Crater = 'Crt',
  Crux = 'Cru',
  Cygnus = 'Cyg',
  Delphinus = 'Del',
  Dorado = 'Dor',
  Draco = 'Dra',
  Equuleus = 'Equ',
  Eridanus = 'Eri',
  Fornax = 'For',
  Gemini = 'Gem',
  Grus = 'Gru',
  Hercules = 'Her',
  Horologium = 'Hor',
  Hydra = 'Hya',
  Hydrus = 'Hyi',
  Indus = 'Ind',
  Lacerta = 'Lac',
  Leo = 'Leo',
  LeoMinor = 'LMi',
  Lepus = 'Lep',
  Libra = 'Lib',
  Lupus = 'Lup',
  Lynx = 'Lyn',
  Lyra = 'Lyr',
  Mensa = 'Men',
  Microscopium = 'Mic',
  Monoceros = 'Mon',
  Musca = 'Mus',
  Norma = 'Nor',
  Octans = 'Oct',
  Ophiuchus = 'Oph',
  Orion = 'Ori',
  Pavo = 'Pav',
  Pegasus = 'Peg',
  Perseus = 'Per',
  Phoenix = 'Phe',
  Pictor = 'Pic',
  Pisces = 'Psc',
  PiscisAustrinus = 'PsA',
  Puppis = 'Pup',
  Pyxis = 'Pyx',
  Reticulum = 'Ret',
  Sagitta = 'Sge',
  Sagittarius = 'Sgr',
  Scorpius = 'Sco',
  Sculptor = 'Scl',
  Scutum = 'Sct',
  Serpens = 'Ser',
  Sextans = 'Sex',
  Taurus = 'Tau',
  Telescopium = 'Tel',
  Triangulum = 'Tri',
  TriangulumAustrale = 'TrA',
  Tucana = 'Tuc',
  UrsaMajor = 'UMa',
  UrsaMinor = 'UMi',
  Vela = 'Vel',
  Virgo = 'Vir',
  Volans = 'Vol',
  Vulpecula = 'Vul',
}
