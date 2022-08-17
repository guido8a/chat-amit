import RobotoCondensedRegular from 'src/styles/MyFonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import MonserratLight from 'src/styles/MyFonts/Montserrat/static/Montserrat-Light.ttf'

export const color01 ='rgba(155,209,113,255)'
export const color02 = 'rgba(148,193,32,255)'

export const common ={
  bg : {
    backgroundColor: '#f5faf3',
  },
  head: {
    color: 'black',
    fontfamily: MonserratLight,
    fontSize: '3rem',
    fontWeight: 'lighter',
    letterspacing: '1.2rem',
    textAlign: 'center',
    padding:'1rem 2rem 0.5rem 2rem',
  },
  head2: {
    color: 'black',
    fontfamily: MonserratLight,
    fontSize: '1rem',
    fontWeight: 'normal',
    letterspacing: '1rem',
    textAlign: 'center',
    padding:'1rem 1rem 0.5rem 1rem',
  },
  body: {
    padding: '2rem 2rem 0.5rem 2rem',
  },
  warnig: {
    fontfamily: RobotoCondensedRegular,
    fontSize: '0.8re,',
    fontWeight: 'bolder',
    margin: '1rem',
  }
}

export const modal = {
  box:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '440px',
    backgroundColor: 'white',
    border: '0px solid #94c020',
    borderRadius: '8px',
    boxShadow: 4,
    padding: 0
  }
}

export const accordeonBox = {
  container: {
    p: '1rem 0 4rem 0',
  },
  container2: {
    pt: 0,
    pr: '3rem',
    pb: 0,
    pl: '3rem',
  },
  titleBox: {
    backgroundColor: color02,
    color: 'white',
    p: '4px 4px 4px 42px',
    height:'2rem',
    // position: 'fixed',
  },
  bottomBar: {
    height:'3rem',
    top:'auto',
    bottom: 0,
    margin: 0,
    padding:0,
    backgroundColor:color02
  },
  titleBox2: {
    p: '4px 4px 4px 38px',
    flexDirection: 'row-reverse',
  },
  titleTypography: {
    fontSize: '1.1rem',
    fontfamily: RobotoCondensedRegular,
    fontWeight: 'normail',
    color:'white',
  },
  titleTypography2: {
    fontSize: '1rem',
    fontfamily: RobotoCondensedRegular,
    color:'#1a746b',
  },
}

export const gridStyles = {
  gridContainer0 : {
    p: '0',
    backgroundColor:'#94c020',
  },
  gridContainer : {
    p: '12px 0 12px 0',
    // backgroundColor:'#FCE4CA',
  },
  gridContainer2 : {
    p: '6px 0 6px 0',
  },
  gridItem : {
    p: 0,
  },
  gridItemButton : {
    p: '4px 12px 4px 12px',
  },
  gridItemDiv : {
    p: '16px 0 0 0',
  }
}

export const appBarStyles = {
  appBar: {
    backgroundColor: color01, //  '#99e600', //  '#1a746b',
    color: 'black',
    pl:'12px',
  },
  toolBar: {
    minHeight: '4rem'
  }
}

export const dialog = {
  readOnlyIcon: {
    fill: 'rgba(120,120,120,1)',
    margin:'-0.2rem 0.6rem 0 0',
    width: '1.2rem',
  },
  tableCellD: {
    fontSize: '10px',
  },
  tableCellDD: {
    fontSize: '9px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    borderBottom: '2px dotted #888888',
    borderTop: '2px dotted #888888',
  },
  tableCellH: {
    fontSize: '0.8rem',
    fontWeight: 'normal',
    backgroundColor: '#94c120',
    fontFamily: RobotoCondensedRegular,
    color: '#ffffff'
  },
  textFieldIcon: {
    fontSize: '14px',
    color:'silver'
  },
  formLabel: {
    fontSize: '1rem',
    fontWeight:'bolder',
    fontfamily: RobotoCondensedRegular,
    color:'black'
  },
  select: {
    fontfamily: RobotoCondensedRegular,
    fontSize:'1rem',
    fontWeight:'bolder'
  },
  gridItem: {
    p:'0 0 0 12px',
    height:'44px'
  },
  gridItem2: {
    p:'0 0 0 24px',
    height:'44px'
  },
  formControl: {
    m: 0,
    p: 0,
  },
  inputLabel: {
    p:'8px 0 0 8px',
    fontSize:'14px',
    fontWeight:'bolder',
  },
  tableRow: {
    p: 0,
    m: 0.
  },
  tableCellHeader: {
    p: '4px',
    backgroundColor: '#94c11d',
    color: 'white',
    fontSize: '11px',
    fontWeight: 'bolder',
  },
  tableCell: {
    p: '6px 0 6px 0',
  },
  titleContainer: {
    borderBottom:'1px #26a69a solid',
    m: '12px 0 8px 0'
  },
  titleContainer2: {
    orderBottom:'1px #86b300 solid',

    m: '12px 0 8px 16px'
  },
  titleTypography: {
    fontSize: '1.2rem',
    fontfamily: RobotoCondensedRegular,
    color:'#86b300',
  },
  titleTypography2: {
    fontSize: '0.9rem',
    fontfamily: RobotoCondensedRegular,
    color: '#575756',
  },
  fileSelected: {
    fontSize: 10,
    fontWeight: 'bolder',
    p:0,
    margin: '0 0 0 6px'
  },
  textTypography: {
    fontSize: '1rem',
    fontWeight: 'bolder',
    color:'#444444',
  },
  sectionTitle: {
    textAlign: 'left',
    fontFamily: RobotoCondensedRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1rem',
    color: '#26a69a',
  },
  sectionTitle2: {
    textAlign: 'left',
    fontFamily: RobotoCondensedRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1rem',
    color: '#26a69a',
  },
  sectionTitle2bold: {
    textAlign: 'left',
    fontFamily: RobotoCondensedRegular,
    fontStyle: 'normal',
    fontWeight: 'bolder',
    fontSize: '1rem',
    color: 'blue',
  },
  dataLabel:{
    textAlign: 'left',
    fontFamily: RobotoCondensedRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontsize: '1rem',
    color:'#575756',
  },
  dataText:{
    textAlign: 'left',
    fontFamily: RobotoCondensedRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontsize: '1rem',
    color:'#878787',
  },
}
