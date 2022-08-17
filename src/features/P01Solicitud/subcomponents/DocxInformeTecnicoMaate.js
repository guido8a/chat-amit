import {Document, Footer, Header} from "docx";
import {
  createLogoFooterSenescyt,
  createLogoHeaderSenescyt,
  dxC1C2,
  dxParagraph, dxTextRun,
  dxTitle
} from "src/components/MyDocx"

export const DocxInformeTecnicoMaate = ({ solicitud, formValues, myPayload, perfilUsuario, autorizador, }) =>  {
  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 2000,
              right: 1000,
              bottom: 2000,
              left: 1200,
            },
          },
        },
        headers: {
          default: new Header({
            children: [createLogoHeaderSenescyt(),],
          }),
        },
        footers: {
          default: new Footer({
            children: [createLogoFooterSenescyt(),],
          }),
        },
        children: [
          dxTitle({text:`Informe técnico Nro. ${formValues.identificador}`}),
          dxC1C2({text1:'Fecha:', text2:formValues.fecha,}),
          dxC1C2({text1:'No. de solicitud:', text2:formValues.identificador,}),
          dxC1C2({
            text1:'Tema:',
            text2:`Análisis de la pertinencia, viabilidad y factibilidad de la investigación titulado/a “${solicitud.nombreProyecto}” perteneciente al ${myPayload.Propuesta.areaInvestigacion}`
          }),
          dxTitle({text:'Datos generales', level:'HEADING_2', alignment:'LEFT'}),
          dxC1C2({
            text1:'No. de Informe:',
            text2: `${formValues.identificador}`,
            marginLeft: 400,
          }),
          dxTitle({text:'Funcionario responsable de informe:', level:'HEADING_2', alignment:'LEFT'}),
          dxC1C2({
            text1: 'Nombre:',
            text2: perfilUsuario.usuario.nombreUsuario,
            marginLeft: 400,
          }),
          dxC1C2({
            text1: 'Cargo:',
            text2: perfilUsuario.perfil.descripcionPerfil,
            marginLeft: 400,
          }),
          dxC1C2({
            text1: 'Correo electrónico:',
            text2: perfilUsuario.usuario.correoUsuario,
            marginLeft:400,
          }),
          dxTitle({text:'Informe dirigido a:', level:'HEADING_2', alignment:'LEFT'}),
          dxC1C2({
            text1: 'Nombre:',
            text2: autorizador.nombreUsuario,
            marginLeft:400,
          }),
          dxC1C2({
            text1: 'Cargo:',
            text2: autorizador.descripcionPerfil,
            marginLeft:400,
          }),
          dxC1C2({
            text1: 'Correo electrónico:',
            text2: autorizador.correoUsuario,
            marginLeft:400,
          }),
          dxTitle({text:'1. Antecedentes', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'(LOS ANTECEDENTES DEBERÁN SER DEFINIDOS POR LAS INSTITUCIONES)'})
          ]),
          dxParagraph([
            dxTextRun({text: 'Mediante solicitud Nro. '}),
            dxTextRun({text: formValues.identificador, bold:true}),
            dxTextRun({text: ', '}),
            dxTextRun({text: myPayload.Solicitante.nombresCompletos, bold:true}),
            dxTextRun({text: ' solicitó autorización para desarrollar la investigación '}),
            dxTextRun({text: solicitud.nombreProyecto, bold:true}),
            dxTextRun({text: ' por el plazo de '}),
            dxTextRun({text: myPayload.Propuesta.plazo + ' meses', bold:true}),
            dxTextRun({text: '.'}),
          ]),
          dxTitle({text:'2. Objetivo', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:`Realizar la evaluación técnica a la solicitud Nro. ${formValues.identificador}, de ${formValues.fecha} para la autorización de ${solicitud.nombreProyecto}`})
          ]),
          dxParagraph([
            dxTextRun({text:'(Será generado mediante una plantilla base y podrá ser modificado por el técnico.)'})
          ]),
          dxParagraph([
            dxTextRun({text:'Campo de texto para incluir observaciones y resultados del análisis a la solicitud.'})
          ]),
          dxTitle({text:'4. Conclusiones y recomendaciones', level:'HEADING_2', alignment:'LEFT'}),
          dxTitle({text:'[POSTIIVO]:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:`Del análisis realizado se evidenció que la solicitud Nro. ${formValues.identificador} presentada por ${myPayload.Solicitante.nombresCompletos} para desarrollar la investigación “${solicitud.nombreProyecto}” por el plazo de ${myPayload.Propuesta.plazo} meses, es pertinente, viable y factible conforme  los criterios de xxxxxx de este Ministerio y, que la misma promueve la conservación y uso sostenible de la biodiversidad, así como la generación de nuevo conocimiento sobre la misma.`})
          ]),
          dxParagraph([
            dxTextRun({text:`Por lo expuesto, se recomienda, desde el ámbito de xxxxxxx, otorgar el permiso de investigación sobre la biodiversidad para el desarrollo del proyecto ${solicitud.nombreProyecto} por el plazo de ${myPayload.Propuesta.plazo}, siempre y cuando no estén en contradicción con la normativa legal vigente.`})
          ]),
          dxTitle({text:'[NEGATIVO]:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:`Del análisis realizado se evidenció que la solicitud Nro. ${formValues.identificador} presentada por ${myPayload.Solicitante.nombresCompletos} para desarrollar la investigación “${solicitud.nombreProyecto}” por el plazo de ${myPayload.Propuesta.plazo} meses, no cumple con los criterios e conservación y uso sostenible de la biodiversidad.`})
          ]),
          dxParagraph([
            dxTextRun({text:`Por lo expuesto, se recomienda, no otorgar el permiso de investigación sobre la biodiversidad solicitado y solventar la información entregada en una nueva solicitud para el desarrollo del proyecto ${solicitud.nombreProyecto} en cumplimiento de la normativa legal vigente.`})
          ]),
          dxTitle({text:'Desarrollo del documento:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'(firma del especialista de informes técnicos)'})
          ]),
          dxTitle({text: perfilUsuario.usuario.nombreUsuario, level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:formValues.fecha})
          ]),
        ],
      },
    ],
  })
}
