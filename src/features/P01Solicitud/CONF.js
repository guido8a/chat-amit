import {f} from "../../commons";

export const defaultHandleChange = (
  event,
  condition,
  setFormValues,
  formValues,
  validator,
  setFormErrors,
  formErrors
) => {
  if(!!condition === true) {
    const id = event.target.id
    const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    setFormValues({...formValues, [id]: value})
    if(validator && setFormErrors && formErrors) {
      const validation = validator(value)
      setFormErrors({...formErrors, [id]: validation})
    }
  }
}

const defaultHandleChange4TextArea = (
  event,
  condition,
  setFormValues,
  formValues,
  validator,
  setFormErrors,
  formErrors
) => {
  if(!!condition === true) {
    const id = event.target.id
    const value = event.target.value
    setFormValues({...formValues, [id]: value})
    if(validator && setFormErrors && formErrors) {
      const validation = validator(value)
      setFormErrors({...formErrors, [id]: validation})
    }
  }
}

const defaultHandleChange4Autocomplete = (
  event,
  condition,
  setFormValues,
  formValues,
  validator,
  setFormErrors,
  formErrors
) => {
  if(!!condition === true) {
    const id = event.target.id
    const value = event.target.value
    setFormValues({...formValues, [id]: value})
    if(validator && setFormErrors && formErrors) {
      const validation = validator(value)
      setFormErrors({...formErrors, [id]: validation})
    }
  }
}

export const defaultHandleChange4Switch = (
  event,
  value,
  condition,
  setFormValues,
  formValues
) => {
  if(condition) {
    setFormValues({...formValues, [event.target.id]: value})
  }
}

const defaultHandleChange4MultipleSelect = (
  id,
  value,
  condition,
  setFormValues,
  formValues
) => {
  let nArray = [...new Set(formValues[id].concat(value))]
  if(condition) {
    setFormValues({...formValues, [id]: nArray})
  }
}

export const CONF = {}

const Solicitante = {
  nombresCompletos: {
    value0: '',
    label: 'Nombres Completos',
    handleChange: defaultHandleChange,
    validator: () => '',
  },
  cedula:           {
    value0: '',
    label: 'Cédula/Pasaporte',
    handleChange: defaultHandleChange,
    validator: () => '',
  },
  genero:           {
    value0: '',
    label: 'Género',
    handleChange: defaultHandleChange,
    validator: () => '',
  },
  etnia:            {
    value0: '',
    label: 'Etnia',
    handleChange: defaultHandleChange,
    validator: () => '',
  },
  nacionalidad:     {
    value0: '',
    label: 'Nacionalidad',
    handleChange: defaultHandleChange,
    validator: () => '',
  },
  registro:         {
    value0: '',
    label: 'Número de Registro / Acreditación',
    handleChange: defaultHandleChange,
    validator: () => '',
  },
  celular:          {
    value0: '',
    label: 'Celular',
    handleChange: defaultHandleChange,
    validator: (value) => (value === null || value === '')?'Celular no puede quedar vacío':'',
  },
  telefono:         {
    value0: '',
    label: 'Teléfono del Domicilio',
    handleChange: defaultHandleChange,
    validator: (value) => (value === null || value === '')?'Teléfono del Domicilio no puede quedar vacío':'',
  },
  email:            {
    value0: '',
    label: 'Correo Electrónico',
    handleChange: defaultHandleChange,
    validator: (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)?'':'No tiene el formato de correo electrónico',
  },
  direccion:        {
    value0: '',
    label: 'Dirección del Domicilio',
    handleChange: defaultHandleChange,
    validator: (value) => (value === null || value === '')?' Dirección del Domicilio no puede quedar vacía':'',
  },
}

CONF.Solicitante = Solicitante

const Propuesta = {
  nombre: {
    value0: '',
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value === '') return `Nombre del proyecto sin definirse`
      else if(value.length > 1000) return `Nombre del proyecto no puede mayor a 1000 caracteres`
      else return null
    }},
  recoleccionDeRecursos: {
    value0:'in-situ',
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value === '') return `Recoleccion de recursos no válida`
      else return null
    },
  },
  patrocinador: {
    value0:'',
    handleChange: defaultHandleChange4Autocomplete,
    validator:(value) => {
      if(value === null || value === '') return `Patrocinador sin definirse`
      else return null
    },
  },
  repLegalPatrocidador: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:() => {return null }
  },
  montFinancimiento: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:(value) => {
      let myValue = (!f.isValid(value))?'':value
      myValue = myValue.split(' ').join('').split(',').join('.')
      if(myValue === null || myValue === '' || isNaN(myValue) || Number(myValue) < 0)
        return `Monto de financiamiento debe ser mayoy a 0 y menor o igual a 99 meses`
      else return null
    }
  },
  apoyo: {
    value0:'',
    handleChange: defaultHandleChange4Autocomplete,
    validator:(value) => {
      if(value === null || value === '') return `No ha ingresado la Institución Nacional de Apoyo`
      else return null
    },
  },
  cartaApoyo: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:(value) => {return null},
  },
  convenioApoyo: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:() => {return null}
  },
  repLegalApoyo: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value === '') return `No ha subido archivo del Nombramiento del Representante Legal de la Institución Nacional de Apoyo`
      else return null
    }
  },
  resumen: {
    value0:'',
    handleChange: defaultHandleChange4TextArea,
    validator:(value) => {
      if(value === null || value === '') return `Resumen ejecutivo no puede estar vacío`
      else return null
    },
  },
  objetivo: {
    value0:'',
    handleChange: defaultHandleChange4TextArea,
    validator:(value) => {
      if(value === null || value === '') return `Objetivo no puede estar vacío`
      else return null
    },
  },
  objetivos: {
    value0: [''],
    handleChange: defaultHandleChange4TextArea,
    validator:(value) => {
      if(value === null || value.length === 0 || value.filter(it=> it !== '').length === 0)
        return `Lista de objetivos puede estar vacío`
      else return null
    },
  },
  plazo: {
    value0:0,
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(!isNaN(value) && Number(value) > 0 && Number(value) <= 99)
        return null
      else
        return 'Plazo debe ser entero positivo menor o igual a 99 meses'},
  },
  areaInvestigacion: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value === '') return `No puede estar vacío el área de investigación`
      else return null
    },
  },
  lineaInvestigacion: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value === '') return `No puede estar vacía la línea de investigación`
      else return null
    },
  },
  definicionProblema: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value === '') return `No puede estar vacía la definición del problema`
      else return null
    },
  },
  justificacion: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value === '') return `No puede estar vacía la justificación`
      else return null
    },
  },
  metodologia: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:() => {return null}
  },
  metodologiaLaboratorio: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:() => { return null }
  },
  metodologiaDoc: {
    value0:'',
    handleChange: defaultHandleChange,
    validator:() => {return null},
  },
  resultadosEsperados: {
    value0:[''],
    handleChange: defaultHandleChange,
    validator:(value) => {
      if(value === null || value.length === 0 || value.filter(it=> it !== '').length === 0) return `Lista de resultados esperados no puede estar vacía`
      else return null
    },
  },
}

CONF.Propuesta = Propuesta

const RecursosInSitu = {
  recursos: {
    value0: [],
    handleChange: defaultHandleChange4MultipleSelect,
    validator:(value) => {
      return (value.length > 0)?null:'Debe contener al menos un recurso'
    },
  },
  muestras: {
    value0: [],
    handleChange: defaultHandleChange4MultipleSelect,
    validator:(value) => {
      return (value.length > 0)?null:'Debe contener al menos una muestra'
    },
  },
  provincias: {
    value0: [],
    handleChange: defaultHandleChange4MultipleSelect,
    validator:() => { return null },
  },
  areasProtegidas: {
    value0: [],
    handleChange: defaultHandleChange4MultipleSelect,
    validator:() => { return null},
  },
  bosquesProtectores: {
    value0: [],
    handleChange: defaultHandleChange4MultipleSelect,
    validator:() => { return null},
  },
  laboratorios: {
    value0: [],
    handleChange: defaultHandleChange4MultipleSelect,
    validator:(value) => { return null },
  },
  importacionRecursos: {
    value0: 'noDefinido',
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  importacionHolotipo: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  exportacionRecursos: {
    value0: 'noDefinido',
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  exportacionHolotipo: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
}

CONF.RecursosInSitu = RecursosInSitu

const RecursosExSitu = {
  centrosDocumentacion: {
    value0: [],
    handleChange: null,
    validator:(value) => {
      return (value.length > 0)?null:'Debe contener al menos un Centro de Documentación'
    },
  },
  laboratorios: {
    value0: [],
    handleChange: defaultHandleChange4MultipleSelect,
    validator:(value) => { return null },
  },
}

CONF.RecursosExSitu = RecursosExSitu

const AccesoConocimiento = {
  accesoConocimiento: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  clpi: {
    value0: '',
    handleChange: defaultHandleChange,
    validator:() => {
      return null
    },
  },
  contratoAccesoConocimiento: {
    value0: '',
    handleChange: defaultHandleChange,
    validator:() => {
      return null
    },
  },
  ambitoComunitario: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  valoresReligiososCultutrales: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  recursosBiologico: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  practicasAncestrales: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  etnozoologicos: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  aConocimientoTradicional: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  derivadosOSimilares: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
  medicinaTradicional: {
    value0: false,
    handleChange: defaultHandleChange4Switch,
    validator:() => { return null},
  },
}

CONF.AccesoConocimiento = AccesoConocimiento

const Personal = {
  personal: {
    value0: [{}],
    handleChange: defaultHandleChange,
    validator: (value) => {
      return (value.length > 0)?null:'Debe contener al menos una persona'
    },
  },
  experiencia: {
    value0: [],
    handleChange: defaultHandleChange,
    validator: (value) => {
      return (value.length > 0)?null:'No se especifica experiencia'
    },
  },
}

CONF.Personal = Personal

const Declaracion = {
  texto: {
    value0: '',
    handleChange: null,
    validator: () => null,
  },
  si: {
    value0: false,
    handleChange: defaultHandleChange,
    validator: (value) => {
      return (value === true)?null:'Debe aceptar la vercidad de la información'
    },
  },
}

CONF.Declaracion = Declaracion

export const rulesFor = (sectionName) => {
  const section = {
    'Solicitante'        : Solicitante,
    'Propuesta'          : Propuesta,
    'RecursosInSitu'     : RecursosInSitu,
    'RecursosExSitu'     : RecursosExSitu,
    'AccesoConocimiento' : AccesoConocimiento,
    'Personal'           : Personal,
    'Declaracion'        : Declaracion,
  }[sectionName]
  return {
    emptyPayload: (() => {
      const result={}
      Object.keys(section).forEach((item) => {result[item] = section[item].value0})
      return result
    }),
    labels: (() => {
      const result={}
      Object.keys(section).forEach((item) => {result[item] = !!section[item].label?section[item].label:null})
      return result
    }),
    initErros: (() => {
      const result={}
      Object.keys(section).forEach((item) => {result[item] = null})
      return result
    }),
    handlesChange: (() => {
      const result={}
      Object.keys(section).forEach((item) => {result[item] = section[item].handleChange})
      return result
    }),
    validators: (() => {
      const result={}
      Object.keys(section).forEach((item) => {result[item] = section[item].validator})
      return result
    }),
  }
}

export const perfiles = [
  {"id":1144,"perfil":"Coordinador de Casos - Maate","organizacion":"Maate"},
  {"id":164,"perfil":"Coordinador de Casos - Senescyt","organizacion":"Senescyt"},
  {"id":163,"perfil":"Usuario MenuInvestigador","organizacion":"Externa"},
  {"id":1142,"perfil":"Especialista de Interconsultas - Senescyt","organizacion":"Senescyt"},
  {"id":1139,"perfil":"Autorizador Principal - Senescyt","organizacion":"Senescyt"},
  {"id":1145,"perfil":"Especialista de Informes Tecnicos - Maate","organizacion":"Maate"},
  {"id":1141,"perfil":"Gestor de Casos Senescyt","organizacion":"Senescyt"},
  {"id":1147,"perfil":"Especialista de Consulta Territorio - Maate","organizacion":"Maate"},
  {"id":1143,"perfil":"Autorizador Sectorial - Maate","organizacion":"Maate"},
  {"id":1146,"perfil":"Especialista de Interconsultas - Maate","organizacion":"Maate"},
  {"id":1148,"perfil":"Autorizador Sectorial - Senadi","organizacion":"Senadi"},
  {"id":1150,"perfil":"Especialista de Informes Tecnicos - Senadi","organizacion":"Senadi"},
  {"id":1149,"perfil":"Coordinador de Casos - Senadi","organizacion":"Senadi"},
  {"id":1151,"perfil":"Especialista de Interconsultas - Senadi","organizacion":"Senadi"},
  {"id":165,"perfil":"Administrador del Sistema","organizacion":"Senescyt"}
]

export const areasInvestigacion = [
  'BIOCOMERCIO Y USOS SOSTENIBLES DE LA BIODIVERSIDAD.',
  'BIOECONOMÍA Y BIOCONOCIMIENTO.',
  'BIOINFORMACIÓN Y SISTEMAS BIOINFORMÁTICOS.',
  'BIOPROSPECCIÓN Y POTENCIAL BIOTECNOLÓGICO.',
  'BIORREMEDIACIÓN.',
  'CALENTAMIENTO GLOBAL, VARIEDAD Y CAMBIO CLIMÁTICO.',
  'CALIDAD AMBIENTAL.',
  'CAMBIOS DE USO DEL SUELO.',
  'CONOCIMIENTO ANCESTRAL Y/O TRADICIONAL ASOCIADO A LA BIODIVERSIDAD.',
  'CONSERVACIÓN DE LA BIODIVERSIDAD.',
  'CONTAMINACIÓN DE ECOSISTEMAS TERRESTRES Y ACUÁTICOS.',
  'ECOLOGÍA DE ESPECIES, POBLACIONES Y COMUNIDADES.',
  'ECOSISTEMAS MARIOS Y COSTEROS.',
  'ESPECIES EXÓTICAS INVASORAS.',
  'GESTIÓN DE RIESGOS RELACIONADOS CON DESASTRES NATURALES.',
  'TIC APLICADOS AL AMBIENTE, BIODIVERSIDAD Y CAMBIO CLIMÁTICO.',
  '',
]

export const paises = [
  'AFGANISTÁN',
  'ALBANIA',
  'ALEMANIA',
  'ANDORRA',
  'ANGOLA',
  'ANTIGUA Y BARBUDA',
  'ARABIA SAUDITA',
  'ARGELIA',
  'ARGENTINA',
  'ARMENIA',
  'AUSTRALIA',
  'AUSTRIA',
  'AZERBAIYÁN',
  'BAHAMAS',
  'BANGLADESH',
  'BARBADOS',
  'BARÉIN',
  'BELICE',
  'BENÍN',
  'BIELORRUSIA',
  'BOLIVIA',
  'BOSNIA Y HERZEGOVINA',
  'BOTSUANA',
  'BRASIL',
  'BRUNÉI',
  'BULGARIA',
  'BURKINA FASO',
  'BURUNDI',
  'BUTÁN',
  'BÉLGICA',
  'CABO VERDE',
  'CAMBOYA',
  'CAMERÚN',
  'CANADÁ',
  'CATAR',
  'CHAD',
  'CHILE',
  'CHINA',
  'CHIPRE',
  'CIUDAD DEL VATICANO*',
  'COLOMBIA',
  'COMORAS',
  'COREA DEL NORTE',
  'COREA DEL SUR',
  'COSTA DE MARFIL',
  'COSTA RICA',
  'CROACIA',
  'CUBA',
  'DINAMARCA',
  'DOMINICA',
  'ECUADOR',
  'EGIPTO',
  'EL SALVADOR',
  'EMIRATOS ÁRABES UNIDOS',
  'ERITREA',
  'ESLOVAQUIA',
  'ESLOVENIA',
  'ESPAÑA',
  'ESTADOS UNIDOS',
  'ESTONIA',
  'ETIOPÍA',
  'FILIPINAS',
  'FINLANDIA',
  'FIYI',
  'FRANCIA',
  'GABÓN',
  'GAMBIA',
  'GEORGIA',
  'GHANA',
  'GRANADA',
  'GRECIA',
  'GUATEMALA',
  'GUINEA',
  'GUINEA ECUATORIAL',
  'GUINEA-BISÁU',
  'GUYANA',
  'HAITÍ',
  'HONDURAS',
  'HUNGRÍA',
  'INDIA',
  'INDONESIA',
  'IRAK',
  'IRLANDA',
  'IRÁN',
  'ISLANDIA',
  'ISLAS MARSHALL',
  'ISLAS SALOMÓN',
  'ISRAEL',
  'ITALIA',
  'JAMAICA',
  'JAPÓN',
  'JORDANIA',
  'KAZAJISTÁN',
  'KENIA',
  'KIRGUISTÁN',
  'KIRIBATI',
  'KUWAIT',
  'LAOS',
  'LESOTO',
  'LETONIA',
  'LIBERIA',
  'LIBIA',
  'LIECHTENSTEIN',
  'LITUANIA',
  'LUXEMBURGO',
  'LÍBANO',
  'MACEDONIA DEL NORTE',
  'MADAGASCAR',
  'MALASIA',
  'MALAUI',
  'MALDIVAS',
  'MALTA',
  'MALÍ',
  'MARRUECOS',
  'MAURICIO',
  'MAURITANIA',
  'MICRONESIA',
  'MOLDAVIA',
  'MONGOLIA',
  'MONTENEGRO',
  'MOZAMBIQUE',
  'MYANMAR',
  'MÉXICO',
  'MÓNACO',
  'NAMIBIA',
  'NAURU',
  'NEPAL',
  'NICARAGUA',
  'NIGERIA',
  'NORUEGA',
  'NUEVA ZELANDA',
  'NÍGER',
  'OMÁN',
  'PAKISTÁN',
  'PALAOS',
  'PALESTINA*',
  'PANAMÁ',
  'PAPÚA NUEVA GUINEA',
  'PARAGUAY',
  'PAÍSES BAJOS',
  'PERÚ',
  'POLONIA',
  'PORTUGAL',
  'REINO UNIDO',
  'REPÚBLICA CENTROAFRICANA',
  'REPÚBLICA CHECA',
  'REPÚBLICA DEL CONGO',
  'REPÚBLICA DEMOCRÁTICA DEL CONGO',
  'REPÚBLICA DOMINICANA',
  'RUANDA',
  'RUMANÍA',
  'RUSIA',
  'SAMOA',
  'SAN CRISTÓBAL Y NIEVES',
  'SAN MARINO',
  'SAN VICENTE Y LAS GRANADINAS',
  'SANTA LUCÍA',
  'SANTO TOMÉ Y PRÍNCIPE',
  'SENEGAL',
  'SERBIA',
  'SEYCHELLES',
  'SIERRA LEONA',
  'SINGAPUR',
  'SIRIA',
  'SOMALIA',
  'SRI LANKA',
  'SUAZILANDIA',
  'SUDÁFRICA',
  'SUDÁN',
  'SUDÁN DEL SUR',
  'SUECIA',
  'SUIZA',
  'SURINAM',
  'TAILANDIA',
  'TANZANIA',
  'TAYIKISTÁN',
  'TIMOR ORIENTAL',
  'TOGO',
  'TONGA',
  'TRINIDAD Y TOBAGO',
  'TURKMENISTÁN',
  'TURQUÍA',
  'TUVALU',
  'TÚNEZ',
  'UCRANIA',
  'UGANDA',
  'URUGUAY',
  'UZBEKISTÁN',
  'VANUATU',
  'VENEZUELA',
  'VIETNAM',
  'YEMEN',
  'YIBUTI',
  'ZAMBIA',
  'ZIMBABUE',
  '',
]

export const muestras = [
  {reino:'ANIMALIA', dato:'CEREBRO'},
  {reino:'ANIMALIA', dato:'ELEMENTOS CONSTITUTIVOS'},
  {reino:'ANIMALIA', dato:'ESTOMAGO'},
  {reino:'ANIMALIA', dato:'HECES'},
  {reino:'ANIMALIA', dato:'HIGADO'},
  {reino:'ANIMALIA', dato:'ORINA'},
  {reino:'ANIMALIA', dato:'PELO'},
  {reino:'ANIMALIA', dato:'PIEL'},
  {reino:'ANIMALIA', dato:'PLUMAS'},
  {reino:'ANIMALIA', dato:'SANGRE'},
  {reino:'ANIMALIA', dato:'TEJIDO'},
  {reino:'ANIMALIA', dato:'ORGANISMO COMPLETO'},
  {reino:'ANIMALIA', dato:'EMBRION'},
  {reino:'ANIMALIA', dato:'GAMETO'},
  {reino:'ANIMALIA', dato:'EDNA'},
  {reino:'ANIMALIA', dato:'OTROS'},
  {reino:'PLANTAE', dato:'HOJAS SECAS'},
  {reino:'PLANTAE', dato:'RAIZ'},
  {reino:'PLANTAE', dato:'SEMILLAS'},
  {reino:'PLANTAE', dato:'TALLO'},
  {reino:'PLANTAE', dato:'ORGANISMO COMPLETO'},
  {reino:'PLANTAE', dato:'GAMETO'},
  {reino:'PLANTAE', dato:'EDNA'},
  {reino:'PLANTAE', dato:'OTROS'},
  {reino:'FUNGI', dato:'CUERPO FRUCTÍFERO'},
  {reino:'FUNGI', dato:'HISOPADOS'},
  {reino:'FUNGI', dato:'MUESTRAS BOTÁNICAS INFECTADAS CON HONGOS'},
  {reino:'FUNGI', dato:'MUESTRAS ZOOLÓGICAS INFECTADAS CON HONGOS'},
  {reino:'FUNGI', dato:'SWABS'},
  {reino:'FUNGI', dato:'EDNA'},
  {reino:'FUNGI', dato:'OTROS'},
  {reino:'ARCHAEA', dato:'HECES DE ANIMALES'},
  {reino:'ARCHAEA', dato:'MUESTRAS AMBIENTALES'},
  {reino:'ARCHAEA', dato:'MUESTRAS DE AGUA'},
  {reino:'ARCHAEA', dato:'MUESTRAS DE SUELO'},
  {reino:'ARCHAEA', dato:'COLONIA CELULAR'},
  {reino:'ARCHAEA', dato:'EDNA'},
  {reino:'ARCHAEA', dato:'OTROS'},
  {reino:'BACTERIA', dato:'HECES DE ANIMALES'},
  {reino:'BACTERIA', dato:'MUESTRAS AMBIENTALES'},
  {reino:'BACTERIA', dato:'MUESTRAS DE AGUA'},
  {reino:'BACTERIA', dato:'MUESTRAS DE SUELO'},
  {reino:'BACTERIA', dato:'COLONIA CELULAR'},
  {reino:'BACTERIA', dato:'EDNA'},
  {reino:'BACTERIA', dato:'OTROS'},
  {reino:'PROTISTA', dato:'HECES DE ANIMALES'},
  {reino:'PROTISTA', dato:'MUESTRAS AMBIENTALES'},
  {reino:'PROTISTA', dato:'MUESTRAS DE AGUA'},
  {reino:'PROTISTA', dato:'MUESTRAS DE SUELO'},
  {reino:'PROTISTA', dato:'COLONIA CELULAR'},
  {reino:'PROTISTA', dato:'EDNA'},
  {reino:'PROTISTA', dato:'OTROS'},
]

export const tiposTransporte =[ 'Aéreo','Terrestre','Marítimo']

export const areaInvestigacion = [
  'Agricultura y ganadería',
  'Ambiente, bioeconomía, bioconocimiento, cambio y variabilidad climática',
  'Ciencia, tecnología, sociedad y gobernabilidad',
  'Espacio marino-costero y recursos bioacuáticos',
  'Procesos industriales',
  '',
]

export const agricultura = [
  'Agrobiotecnología',
  'Agroecología',
  'Conservación de suelos y aguas',
  'Conservación y mejoramiento genético',
  'Impacto económico y social de la aplicación de tecnologías biotecnológicas agrícolas en el marco de la soberanía alimentaria',
  'Manejo de recursos genéticos en la agricultura y ganadería',
  'Manejo integrado de cultivos y ganado',
  'Prospección económica y social de tecnologías agrícolas',
  'Recuperación de semillas tradicionales',
  'Silvicultura y agroforestería sostenibles',
  'Soberanía alimentaria y agrobiodiversidad',
  'Transformación y agregación de valor de productos vegetales, lácteos y cárnicos y subproductos agropecuarios',
  ''
]

export const marino_costero = [
  'Biocomercio y usos sostenibles de la biodiversidad',
  'Bioinformación y sistemas bioinformáticos',
  'Bioprospección y potencial biogenético',
  'Biorremediación',
  'Calentamiento global, variabilidad y cambio climático',
  'Calidad ambiental',
  'Cambios de uso de suelo',
  'Conocimiento ancestral y/o tradicional asociado a la biodiversidad',
  'Conservación de la biodiversidad',
  'Contaminación de ecosistemas terrestres y acuáticos',
  'Ecología de especies, poblaciones y comunidades',
  'Especies exóticas invasoras',
  'Manejo de organismos genéticamente modificados',
  '',
]

export const ambienteBio = [
  'Biocomercio y usos sostenibles de la biodiversidad',
  'Bioinformación y sistemas bioinformáticos',
  'Bioprospección y potencial biogenético',
  'Biorremediación',
  'Calentamiento global, variabilidad y cambio climático',
  'Calidad ambiental',
  'Cambios de uso de suelo',
  'Conocimiento ancestral y/o tradicional asociado a la biodiversidad',
  'Conservación de la biodiversidad',
  'Contaminación de ecosistemas terrestres y acuáticos',
  'Ecología de especies, poblaciones y comunidades',
  'Especies exóticas invasoras',
  'Manejo de organismos genéticamente modificados',
  '',
]

export const procesosInd = [
  'Agroindustrias',
  'Cadenas de valor',
  'Calidad y confiabilidad',
  'Economía industrial',
  'Economía popular y solidaria',
  'Economía y trabajo',
  'Industrias creativas (se enfatiza en el aprovechamiento de los conocimientos tradicionales protegidos para su aplicación productiva en el área de salud, alimentación y gestión del riesgo)',
  'Ingeniería de métodos',
  'Ingeniería industrial y maquinaria y herramientas asociadas a la elaboración de nuevos productos y procesos',
  'Investigación de operaciones',
  'Logística industrial',
  'Procesos ingenios aeroespaciales y geoespaciales',
  'Procesos y servicios productivos',
  'Producción experimental que requieren de ensayos a escala natural, con los subsiguientes estudios de diseño e ingeniería',
  'Sostenibilidad industrial',
  '',
]

export const cienciaTec = [
  'Apropiación del desarrollo tecno-científico',
  'Arte como metodología en la gestión del conocimiento',
  'Estudio de la institucionalidad pública y privada de los sistemas de I+D+i',
  'Modelos de gobernanza de I+D+i',
  'Ocupaciones y habilidades emergentes más demandadas que se acoplen a las posibles transiciones tecno-científicas',
  'Promoción y aprovechamiento de resultados de procesos de I+D+i',
  'Prospectiva de la ciencia, tecnología e innovación',
  'Saberes ancestrales y ciencia, tecnología e innovación',
  '',
]
