import {Document, Footer, Header} from "docx";
import {
  createLogoFooterSenescyt,
  createLogoHeaderSenescyt,
  dxC1C2,
  dxParagraph, dxTextRun,
  dxTitle
} from "src/components/MyDocx"

export const DocxInformeTecnico = ({ solicitud, formValues, myPayload, perfilUsuario, autorizador, }) =>  {
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
          dxTitle({text:'Informe general'}),
          dxC1C2({text1:'Fecha:', text2:formValues.fecha,}),
          dxC1C2({
            text1:'Tema:',
            text2:'Análisis de la pertinencia, viabilidad y factibilidad de la investigación titulado/a “[TITULO DEL PROYECTO]” perteneciente al [NOMBRE DEL PROGRAMA]'
              .replaceAll('[TITULO DEL PROYECTO]', solicitud.nombreProyecto)
              .replaceAll('[NOMBRE DEL PROGRAMA]', myPayload.Propuesta.areaInvestigacion),
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
          dxTitle({text:'Antecedentes', level:'HEADING_2', alignment:'LEFT'}),
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
          dxTitle({text:'Base legal', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'(LA BASE LEGAL DEBERÁ SER DEFINIDA POR LAS INSTITUCIONES)'})
          ]),
          dxTitle({text:'Constitución de la República de Ecuador:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'En el artículo XX establece que ……. '})
          ]),
          dxTitle({text:'Código Orgánico del Ambiente:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'En el artículo 32, dispone que la entidad rectora del Sistema Nacional de Ciencia, Tecnología, Innovación y Saberes Ancestrales promoverá y regulará las investigaciones científicas in situ y ex situ que comprendan actividades de extracción, colección, recolección, importación, movilización, transportación, exportación y disposición temporal o final de especies de vida silvestre, implementando mecanismos de rastreo y monitoreo de la biodiversidad, de acuerdo a los lineamientos de las autoridades competentes.'})
          ]),
          dxParagraph([
            dxTextRun({text:'En el artículo 72, establece que “Los derechos otorgados sobre los recursos biológicos no conceden derecho alguno sobre los recursos genéticos o sus derivados, ni sobre los conocimientos colectivos asociados a estos, de conformidad con la ley y la Constitución. Las autorizaciones administrativas a las actividades de investigación, manejo, comercialización u otras, de especímenes, elementos constitutivos y subproductos de especies de vida silvestre, no autorizan el acceso a sus recursos genéticos o sus derivados. (…)”;'})
          ]),
          dxTitle({text:'Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'Uno de los fines de este Código, determinado en el artículo XXX…. el sector privado, popular y solidario, las instituciones del Sistema de Educación Superior y los demás sistemas, organismos y entidades que integran la economía social de los conocimientos, la creatividad y la innovación.'})
          ]),
          dxTitle({text:'Reglamento General al Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'En su artículo 25 prescribe que los permisos de acceso con fines de investigación a recursos genéticos y sus derivados para fines de investigación o comerciales, así como los permisos de importación de organismos vivos, especímenes de colecciones científicas que tengan como fin el desarrollo de procesos investigativos se tramitarán a través de una ventanilla única para la investigación para la biodiversidad en la que inter operarán la entidad rectora del Sistema Nacional de Ciencia, Tecnología, Innovación y Saberes Ancestrales, el instituto público de investigación científica sobre la biodiversidad, la autoridad ambiental nacional, la autoridad aduanera, así como las demás pertinentes. Dicha plataforma será administrada por la entidad rectora del Sistema Nacional de Ciencia, Tecnología, Innovación y Saberes Ancestrales y formará parte del Sistema Nacional de Información de Ciencia, Tecnología, Innovación y Conocimientos Tradicionales, sin perjuicio de que el contenido de la misma sea reproducido en otros sistemas públicos de información o se vincule a éstos.'})
          ]),
          dxTitle({text:'Reglamento que regula la investigación científica de la biodiversidad y el acceso a los recursos genéticos y sus derivados:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'En el artículo XX establece que …….'})
          ]),
          dxTitle({text:'Estatuto Orgánico de Gestión Organizacional por Procesos:', level:'HEADING_2', alignment:'LEFT'}),
          dxTitle({text:'3. Objetivo:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'(EL DEFINIDO POR LAS INSTITUCIONES)'})
          ]),
          dxTitle({text:'4. Análisis de la pertinencia, viabilidad y factibilidad de la investigación:', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'(El análisis será establecido por cada una de las instituciones, ya sea con una plantilla base o como un campo a completar para cada solicitud).'})
          ]),
          dxTitle({text:'5. Conclusiones y recomendaciones', level:'HEADING_2', alignment:'LEFT'}),
          dxParagraph([
            dxTextRun({text:'Del análisis realizado se evidenció que la solicitud Nro. ', level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:formValues.identificador, level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:' presentada por ', level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:myPayload.Solicitante.nombresCompletos, level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:' para desarrollar la investigación ', level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:solicitud.nombreProyecto, level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:' por el plazo de', level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:myPayload.Propuesta.plazo + ' meses', level:'HEADING_2', alignment:'LEFT'}),
            dxTextRun({text:', es pertinente, viable y factible conforme los criterios de esta Secretaría de Estado y, que la misma promueve la generación de nuevo conocimiento sobre la biodiversidad.', level:'HEADING_2', alignment:'LEFT'}),
          ]),
          dxParagraph([
            dxTextRun({text:'Con base en lo expuesto, se recomienda a la Subsecretaría de Investigación, Innovación y Transferencia de Tecnología que amparada en los numerales 27 y 28 del artículo 8 del Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación (COESCCI) y en el marco de las atribuciones y responsabilidades establecidas en el Estatuto Orgánico de Gestión Organizacional por Procesos de la Secretaría de Educación Superior, Ciencia, Tecnología e Innovación emitido mediante Acuerdo Nro. SENESCYT-2020-064 de 12 de agosto de 2020, otorgar el permiso de investigación sobre la biodiversidad para el desarrollo del proyecto '}),
            dxTextRun({text: solicitud.nombreProyecto, bold:true}),
            dxTextRun({text:`, ${myPayload.Propuesta.plazo} meses`, bold:true}),
            dxTextRun({text:' siempre y cuando no estén en contradicción con la normativa legal vigente.'}),
          ]),
          dxParagraph([dxTextRun({text:''})]),
          dxParagraph([
            dxTextRun({text:'Desarrollo del documento:'}),
          ]),
          dxParagraph([dxTextRun({text:''})]),
          dxParagraph([dxTextRun({text:''})]),
          dxParagraph([
            dxTextRun({text:perfilUsuario.usuario.nombreUsuario, bold:true})
          ]),
          dxParagraph([
            dxTextRun({text:'Analista de Investigación Científica'})
          ]),
        ],
      },
    ],
  })
}