import React from 'react';
import { Page, Text, View, Document, Image, Rect, Svg } from '@react-pdf/renderer';
import Logo from '../../public/medic-logo.jpg';
import Firma from '../../public/firma.png';
import commonStyles from './styles/common';
import cvStyles from './styles/certificadoVisual';
import { getSessionStorageData, calculateAge } from '../../helpers/helpers';

const CertificadoSaludPDF = ({ ...props }) => {
    const user = getSessionStorageData("datosBasicos");
    const data = {
        idUsuario: user.idUsuario,
        fecha: new Date().toLocaleString(),
        idMedico: user.idMedico,
        nombreMedico: user.nombreMedico.toUpperCase(),
        nombres: user.nombreUsuario.toUpperCase(),
        genero: user.genero.toUpperCase(),
        fechaNacimiento: new Date(user.fechaNacimiento).toLocaleDateString(),
        edad: calculateAge(user.fechaNacimiento),
        direccion: user.direccion.toUpperCase(),
        contacto: user.contacto,
        tipoConsulta: user.tipoConsulta.toUpperCase(),
        peso: props.peso,
        talla: props.talla,
        visionOjoDerecho: props.visionOjoDerecho,
        visionOjoIzquierdo: props.visionOjoIzquierdo,
        recomendacionVisual: props.recomendacionVisual?.toUpperCase(),
        audicionOidoDerecho: props.audicionOidoDerecho,
        audicionOidoIzquierdo: props.audicionOidoIzquierdo,
        recomendacionAuditiva: props.recomendacionAuditiva?.toUpperCase(),
        piezasDentarias: props.piezasDentarias,
        presenciaCaries: props.presenciaCaries,
        recomendacionesDental: props.recomendacionesDental?.toUpperCase(),
        discapacidadLimitacionFisica: props.discapacidadLimitacionFisica?.toUpperCase(),
        convivirCompartir: props.convivirCompartir?.toUpperCase(),
        maltratoViolencia: props.maltratoViolencia?.toUpperCase(),
        abandonoNegligencia: props.abandonoNegligencia?.toUpperCase(),
        recomendacionGeneral: props.recomendacionGeneral?.toUpperCase(),
    }

    return (
        <Document>
            <Page size="A3" style={commonStyles.page}>
                <View style={cvStyles.cabeceraContainer}>
                    <View>
                        <Image
                            src={Logo.src}
                            alt="Logo"
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </View>
                    <View style={cvStyles.cabecera}>
                        <Text>IT: 72193409 - 8 DR. JAIR SAMUEL AYA</Text>
                        <Text>CALLE 08 10 65 Barrio Pueblo Nuevo - San Vicente de Chucuri</Text>
                        <Text>Teléfono 3118609660</Text>
                        <Text>samuelaya@live.com</Text>
                    </View>
                </View>

                <View style={commonStyles.table}>
                    <View style={commonStyles.tableRow}>
                        <View style={[commonStyles.tableCol, cvStyles.grayCell]}>
                            <Text style={[commonStyles.tableCell, cvStyles.cabeceraText]}>IDENTIFICACION DEL USUARIO</Text>
                        </View>
                        <View style={[commonStyles.tableCol, cvStyles.grayCell]}>
                            <Text style={[commonStyles.tableCell, cvStyles.cabeceraText]}>FECHA Y HORA DE ATENCION</Text>
                        </View>
                        <View style={[commonStyles.tableCol, cvStyles.grayCell, { width: '20%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.cabeceraText]}>IDENTIFICACION DEL MEDICO</Text>
                        </View>
                        <View style={[commonStyles.tableCol, cvStyles.grayCell, { width: '30%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.cabeceraText]}>NOMBRE DEL MEDICO QUE ATIENDE</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={commonStyles.tableCol}>
                            <Text style={commonStyles.tableCell}>{data.idUsuario}</Text>
                        </View>
                        <View style={commonStyles.tableCol}>
                            <Text style={commonStyles.tableCell}>{data.fecha}</Text>
                        </View>
                        <View style={[commonStyles.tableCol, { width: '20%' }]}>
                            <Text style={commonStyles.tableCell}>{data.idMedico}</Text>
                        </View>
                        <View style={[commonStyles.tableCol, { width: '30%' }]}>
                            <Text style={commonStyles.tableCell}>{data.nombreMedico}</Text>
                        </View>
                    </View>
                </View>

                {/* DATOS DEL USUARIO */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>DATOS DEL USUARIO</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '65%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>NOMBRES Y APELLIDOS DEL USUARIO</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '15%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>GENERO</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '20%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>FECHA DE NACIMIENTO</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, { width: '65%' }]}>
                            <Text style={commonStyles.tableCell}>{data.nombres}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{data.genero}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '20%' }]}>
                            <Text style={commonStyles.tableCell}>{data.fechaNacimiento}</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '15%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>EDAD</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '50%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>DIRECCION</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '15%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>CONTACTO</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '20%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>TIPO DE CONSULTA</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{data.edad}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '50%' }]}>
                            <Text style={commonStyles.tableCell}>{data.direccion}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{data.contacto}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '20%' }]}>
                            <Text style={commonStyles.tableCell}>{data.tipoConsulta}</Text>
                        </View>
                    </View>

                </View>

                {/* IMPRESIÓN DIAGNOSTICA */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>IMPRESIÓN DIAGNOSTICA</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>Z000</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>EXAMEN MEDICO GENERAL </Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>Z027</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>EXTENSION DE CERTIFICADO MEDICO</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>Z020</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>EXAMEN PARA ADMISION A INSTITUCIONES EDUCATIVAS</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>Z761</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>
                                CONSULTA PARA ATENCION Y SUPERVISION DE LA
                                SALUD DEL NIÑO
                            </Text>
                        </View>
                    </View>

                </View>

                {/* PLAN DE MANEJO */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>PLAN DE MANEJO</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>
                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '10%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>CONSECUTIVO</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '40%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>DESCRIPCION</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '10%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>CANTIDAD</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '40%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>OBSERVACION</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, { width: '10%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodyText]}>P1060</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '40%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodyText]}>CERTIFICADO DE SALUD</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '10%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodyText]}>1</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '40%' }]}>

                            <Text style={{
                                marginTop: 5,
                                marginBottom: 5,
                                fontSize: 9,
                            }}>
                                PESO: <Text style={{ fontSize: 10 }}>{data.peso} KG </Text>
                                TALLA: <Text style={{ fontSize: 10 }}>{data.talla} CMS</Text>
                            </Text>

                            <View style={[commonStyles.tableCell, cvStyles.bodyText, {
                                display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'
                            }]}
                            >
                                <Text>REVISION VISUAL: </Text>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text>*VISION OJO DERECHO: {data.visionOjoDerecho}</Text>
                                    <Text>*VISION OJO IZQUIERDO: {data.visionOjoIzquierdo}</Text>
                                    <Text>*RECOMENDACION:</Text>
                                    <Text>{data.recomendacionVisual}</Text>
                                </View>
                            </View>

                            <View style={[commonStyles.tableCell, cvStyles.bodyText, {
                                display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'
                            }]}>
                                <Text>REVISION AUDITIVIA: </Text>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text>*AUDICION OIDO DERECHO: {data.audicionOidoDerecho}</Text>
                                    <Text>*AUDICION OIDO IZQUIERDO: {data.audicionOidoIzquierdo}</Text>
                                    <Text>*RECOMENDACION: </Text>
                                    <Text>{data.recomendacionAuditiva}</Text>
                                </View>
                            </View>

                            <View style={[commonStyles.tableCell, cvStyles.bodyText, {
                                display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'
                            }]}>
                                <Text>REVISION DENTAL: </Text>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text>*PIEZAS DENTARIAS: {data.piezasDentarias}</Text>
                                    <Text>*PRESENCIA DE CARIES: {data.presenciaCaries}</Text>
                                    <Text>*RECOMENDACION: </Text>
                                    <Text>{data.recomendacionesDental}</Text>
                                </View>
                            </View>

                            <View style={[commonStyles.tableCell, cvStyles.bodyText, {
                                display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'
                            }]}>
                                <Text>REVISION GENERAL: </Text>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text>*PRESENTA DISCAPACIDAD O LIMITACION FISICA?: </Text>
                                    <Text>-{data.discapacidadLimitacionFisica}</Text>
                                    <Text>*PUEDE CONVIVIR Y COMPARTIR CON OTROS NIÑOS? : </Text>
                                    <Text>-{data.convivirCompartir}</Text>
                                    <Text>*PRESENTA HUELLAS DE MALTRATO O VIOLENCIA?: </Text>
                                    <Text>-{data.maltratoViolencia}</Text>
                                    <Text>*PRESENTA HUELLAS DE ABANDONO O NEGLIGENCIA?: </Text>
                                    <Text>-{data.abandonoNegligencia}</Text>
                                    <Text>*RECOMENDACION: </Text>
                                    <Text>-{data.recomendacionGeneral}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>

                {/* FIRMAS  */}

                <Svg viewBox="0 0 220 100">
                    <Rect x={0} y={5} width={110} height={40} style={{
                        fill: 'white',
                        stroke: 'black',
                        strokeWidth: 0.2,
                    }} />
                    <Text x={3} y={10} style={{ fontSize: 3 }}>
                        FIRMA DEL USUARIO
                    </Text>
                    <Text x={120} y={10} style={{ fontSize: 3 }}>FIRMA DEL MEDICO O PERSONA RESPONSABLE</Text>
                    <Text x={120} y={30} style={{ fontSize: 3 }}>J.SAMUEL AYA CACERES</Text>
                    <Text x={120} y={35} style={{ fontSize: 3 }}>MEDICINA GENERAL</Text>
                    <Text x={120} y={40} style={{ fontSize: 3 }}>Tarjeta Profesional 72193409</Text>
                    <Image x={170} y={10} src={Firma.src} style={{
                        width: 50,
                        height: 50,
                    }} />
                </Svg>

            </Page>
        </Document>
    );
}

export default CertificadoSaludPDF;
