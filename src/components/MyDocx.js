import {
  AlignmentType,
  HeadingLevel,
  Paragraph,
  TabStopType,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
  BorderStyle, ImageRun, VerticalAlign
} from "docx";
import {f} from "../commons";

const tabStops2C = [
  {
    type: TabStopType.RIGHT,
    position: 2268,
  },
]

const dafaultfontSize = 18

const escudo = fetch('https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/republica-ecuador-escudo.png').then((r) => r.blob())

const senescyt = fetch('https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/logo-senescyt.jpeg').then((r) => r.blob())

const gobiernodetodos = fetch('https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/gobierno-de-todos.png').then((r) => r.blob())

export const createLogoHeaderSenescyt = () => {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: escudo,
                    transformation: {
                      width: 175,
                      height: 94,
                    },
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.END,
                children: [
                  new ImageRun({
                    data: senescyt,
                    transformation: {
                      width: 300,
                      height: 32,
                    },
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
    ],
    width: {size: 100, type: WidthType.PERCENTAGE,},
    borders: {
      top: { style: BorderStyle.NONE,},
      bottom: { style: BorderStyle.NONE, },
      left: { style: BorderStyle.NONE, },
      right: {style: BorderStyle.NONE,},
      insideVertical: {style: BorderStyle.NONE,}
    },
  })
}

export const createLogoFooterSenescyt = () => {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children:[
                  new TextRun({
                    text: "Dirección: Edificio Matriz: Alpallana E7-183 entre Av. Diego de Almagro y Whymper",
                    font: "Arial",
                    size: 12,
                  }),
                ],
              }),
              new Paragraph({
                children:[
                  new TextRun({
                    text: "Código Postal: 170518 / Quito - Ecuador",
                    font: "Arial",
                    size: 12
                  }),
                ]
              }),
              new Paragraph({
                children:[
                  new TextRun({
                    text: "Teléfono: 593-2 3934-300",
                    font: "Arial",
                    size: 12
                  }),
                ]
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.END,
                children: [
                  new ImageRun({
                    data: gobiernodetodos,
                    transformation: {
                      width: 190,
                      height: 66,
                    },
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE, },
    borders: {
      top: {
        style: BorderStyle.NONE,
      },
      bottom: {
        style: BorderStyle.NONE,
      },
      left: {
        style: BorderStyle.NONE,
      },
      right: {
        style: BorderStyle.NONE,
      },
      insideVertical: {
        style: BorderStyle.NONE,
      }
    },
  });
}

export const dxC1C2 = ({text1, text2, marginLeft=0}) => {
  const noBorder = {style: BorderStyle.NONE, size: 0, color: "#ffffff"}
  return new Table({
    width: {size: 100, type: WidthType.PERCENTAGE,},
    margins: {
      top: 0,
      right: 0,
      bottom: 0,
      left: marginLeft,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
            width: {size: 24, type: WidthType.PERCENTAGE},
            children: [
              new Paragraph({
                spacing: {before: 50, after:50,},
                children: [dxTextRun({text:`${text1}`, bold:true}),]
              })
            ],
          }),
          new TableCell({
            borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
            width: {size: 75, type: WidthType.PERCENTAGE},
            children: [
              new Paragraph({
                spacing: {before: 100, after:100, line:280},
                children: [dxTextRun({text:`${text2}`})]
              })
            ],
          }),
        ],
      }),
    ]
  })
}

export const dxTitle = ({text, level='TITLE', alignment='CENTER', font='Arial',after=null, color='000000'}) => {
  const size = {
    'TITLE': 20,
    'TITLE2': 18,
    'HEADING_2': 24,
  }[level] ?? 28

  const bold = {
    'TITLE': true,
    'TITLE2': false,
    'HEADING_2': true,
  }[level] ?? false

  const before = {
    'TITLE': 300,
    'TITLE2': 40,
    'HEADING_2': 500,
  }[level] ?? 500

  return new Paragraph({
    spacing: {after: after ?? 200, before},
    alignment: AlignmentType[alignment],
    children: [
      dxTextRun({text, font, size, heading: HeadingLevel[level], bold, color})
    ],
  })
}

export const dxSubTitleBlue = ({text}) => dxTitle({level: 'HEADING_2', text, alignment: 'LEFT', color:'0000DD', after:50})

export const dxSubTitleGray = ({text}) => dxTitle({level: 'HEADING_3', text, alignment: 'LEFT', color:'888888', after:10})

export const dxParagraph = (dxTexts) => {
  return new Paragraph({
      spacing: {after: 200, before:100, line:280},
      alignment: AlignmentType.JUSTIFIED,
      children: dxTexts,
    },
  )
}

export const dxTextRun = ({text, font='Arial', size=dafaultfontSize, heading=null, bold=false, color='000000'}) => {
  let opts = {text, font, size, bold, color}
  opts = f.isValid(heading)?{...opts, heading}:opts
  return new TextRun({...opts})
}
