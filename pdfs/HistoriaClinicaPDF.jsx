import React from 'react';
import { Page, Text, View, Document, Image, Svg } from '@react-pdf/renderer';
import Logo from '../public/medic-logo.jpg';
import Firma from '../public/firma.png';
import commonStyles from './styles/common';
import cvStyles from './styles/certificadoVisual';
import { lodash as _ } from '../lib/lodash';
import { signosVitalesFields } from '../data/inputs';

const HistoriaClinicaPDF = ({ paciente }) => {
    const { datosBasicos, anamnesis, antecedentes, signosVitales, funcionRenal, examenFisico, impresionDiagnostica, formulacion } = paciente || {};
    const { motivoConsulta, enfermedadActual, ...anamnesisData } = anamnesis || {};
    const { edad, sexo, peso, talla, ...funcionRenalData } = funcionRenal || {};
    const { barthel, ...examenFisicoData } = examenFisico || {};
    funcionRenalData["TFG CORREGIDA"] = funcionRenalData.tfgCorregida;
    delete funcionRenalData.tfgCorregida;
    const formulacionData = [formulacion?.laboratorios, formulacion?.medicamentos, formulacion?.insumos, formulacion?.procedimientos].flat();

    const newSignosVitales = {};
    if (signosVitales) {
        signosVitalesFields.forEach((field) => {
            field.fields.forEach((subField) => {
                newSignosVitales[subField.name] = signosVitales[subField.property] + " " + (_.toUpper(subField.unit) || "");
            });
        });
    }

    const formatDate = (fecha) => {
        const date = new Date(fecha).toLocaleDateString();
        const [dia, mes, año] = date.split("/");
        return `${dia?.padStart(2, "0")}/${mes?.padStart(2, "0")}/${año}`;
    }

    const getFullAge = (fecha) => {
        const [dia, mes, año] = new Date(fecha).toLocaleDateString().split("/");
        const [diaActual, mesActual, añoActual] = new Date().toLocaleDateString().split("/");
        const edad = mesActual >= mes ? añoActual - año : (añoActual - año) - 1
        const meses = mesActual - mes;
        const dias = diaActual - dia;
        return `${edad} A / ${Math.abs(meses)} M / ${Math.abs(dias)} D`;
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
                            <Text style={commonStyles.tableCell}>{datosBasicos?.idUsuario}</Text>
                        </View>
                        <View style={commonStyles.tableCol}>
                            <Text style={commonStyles.tableCell}>{new Date().toLocaleString()}</Text>
                        </View>
                        <View style={[commonStyles.tableCol, { width: '20%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.idMedico}</Text>
                        </View>
                        <View style={[commonStyles.tableCol, { width: '30%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.nombreMedico.toUpperCase()}</Text>
                        </View>
                    </View>
                </View>

                {/* DATOS DEL USUARIO */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>DATOS DE INGRESO</Text>
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
                            <Text style={commonStyles.tableCell}>{datosBasicos?.nombreUsuario.toUpperCase()}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.genero.toUpperCase()}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '20%' }]}>
                            <Text style={commonStyles.tableCell}>{formatDate(datosBasicos?.fechaNacimiento)}</Text>
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
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>ADMINISTRADORA (EPS)</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{getFullAge(datosBasicos?.fechaNacimiento)}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '50%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.direccion.toUpperCase()}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.contacto}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '20%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.eps.toUpperCase()}</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '15%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>NIVEL</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '50%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>ACOMPAÑANTE</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '15%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>TEL.ACOMPAÑANTE</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '20%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>TIPO DE CONSULTA</Text>
                        </View>
                    </View>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.nivel}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '50%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.nombreAcompanante.toUpperCase()}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '15%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.contactoAcompanante}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '20%' }]}>
                            <Text style={commonStyles.tableCell}>{datosBasicos?.tipoConsulta.toUpperCase()}</Text>
                        </View>
                    </View>

                </View>

                {/* AMNANESIS */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>ANAMNESIS</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>MOTIVO CONSULTA</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{anamnesis?.motivoConsulta.toUpperCase()}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>ENF. ACTUAL</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{anamnesis?.enfermedadActual?.toUpperCase()}</Text>
                        </View>
                    </View>

                </View>

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>REVISION POR SISTEMAS</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    {
                        _.slice(_.map(anamnesisData, (value, key) => {
                            return (
                                <View style={commonStyles.tableRow} key={key}>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{key.toUpperCase()}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{value.toUpperCase()}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.keys(anamnesisData, key), 5, 10)[_.indexOf(_.keys(anamnesisData, key), key)]?.toUpperCase()
                                        }</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.values(anamnesisData, key), 5, 10)[_.indexOf(_.keys(anamnesisData, key), key)]?.toUpperCase()
                                        }</Text>
                                    </View>
                                </View>
                            )
                        }), 0, 5)
                    }

                </View>

                {/* ANTECEDENTES */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>ANTECEDENTES</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    {
                        _.slice(_.map(antecedentes, (value, key) => {
                            const replaceValues = (value) => {
                                return {
                                    CIGARRILLOHUMOLEÑA: 'CIGARRILLO-LEÑA',
                                    SUSTANCIASPSICOACTIVAS: 'S.PSICOACTIVAS',
                                    ESPECIALISTASTRATANTES: 'ESPECIALISTAS TRAT',
                                    GINECOOBSTETRICOS: 'GINECO-OBSTETRICOS',
                                    ULTIMACITOLOGIACERVICOVAGINAL: 'ULTIMA CCV',
                                    OTROSANTECEDENTESPEDIATRICO: 'OTROS(PEDIATRICOS)',
                                    OTROSANTECEDENTESADULTOS: 'OTROS(ADULTOS)',
                                }[value] || value
                            }

                            return (
                                <View style={commonStyles.tableRow} key={key}>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{replaceValues(key.toUpperCase())}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{value.toUpperCase()}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            replaceValues(_.slice(_.keys(antecedentes, key), 8, 16)[_.indexOf(_.keys(antecedentes, key), key)]?.toUpperCase())
                                        }</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.values(antecedentes, value), 8, 16)[_.indexOf(_.keys(antecedentes, key), key)]?.toUpperCase()
                                        }</Text>
                                    </View>
                                </View>
                            )
                        }), 0, 8)
                    }

                </View>

                {/* SIGNOS VITALES */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>SIGNOS VITALES</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    {
                        _.slice(_.map(newSignosVitales, (value, key) => {
                            return (
                                <View style={commonStyles.tableRow} key={key}>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{key.toUpperCase()}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{value}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.keys(newSignosVitales, key), 7, 14)[_.indexOf(_.keys(newSignosVitales, key), key)]?.toUpperCase()
                                        }</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.values(newSignosVitales, key), 7, 14)[_.indexOf(_.keys(newSignosVitales, key), key)]
                                        }</Text>
                                    </View>
                                </View>
                            )
                        }), 0, 7)
                    }

                </View>

                {/* FUNCION RENAL */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>FUNCION RENAL</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    {
                        _.slice(_.map(funcionRenalData, (value, key) => {
                            return (
                                <View style={commonStyles.tableRow} key={key}>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{key.toUpperCase()}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{value}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.keys(funcionRenalData, key), 2, 4)[_.indexOf(_.keys(funcionRenalData, key), key)]?.toUpperCase()
                                        }</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.values(funcionRenalData, key), 2, 4)[_.indexOf(_.keys(funcionRenalData, key), key)]
                                        }</Text>
                                    </View>
                                </View>
                            )
                        }), 0, 2)
                    }

                </View>

                {/* EXAMEN FISICO */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>EXAMEN FISICO</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>

                    {
                        _.slice(_.map(examenFisicoData, (value, key) => {
                            return (
                                <View style={commonStyles.tableRow} key={key}>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{_.upperCase(key)}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{_.toUpper(value)}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.keys(examenFisicoData, key), 5, 10)[_.indexOf(_.keys(examenFisicoData, key), key)]?.toUpperCase()
                                        }</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{
                                            _.slice(_.values(examenFisicoData, key), 5, 10)[_.indexOf(_.keys(examenFisicoData, key), key)]?.toUpperCase()
                                        }</Text>
                                    </View>
                                </View>
                            )
                        }), 0, 5)
                    }

                </View>

                {/* TEST BARTHEL */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>TEST DE BARTHEL: ACTIVIDADES BÁSICAS DE LA VIDA DIARIA</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>
                    <View style={commonStyles.tableRow}>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>PUNTAJE</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{_.get(barthel, 'puntuacion', 'NO APLICA')}</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>NIVEL DE DEPENDENCIA</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, { width: '25%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{_.get(barthel, 'barthel', 'NO APLICA')}</Text>
                        </View>
                    </View>
                </View>

                {/* IMPRESION DIAGNOSTICA */}

                <View>
                    <View style={[cvStyles.bodyTitleContainer, cvStyles.grayCell]}>
                        <Text style={cvStyles.bodyTitle}>IMPRESIÓN DIAGNOSTICA</Text>
                    </View>
                </View>

                <View style={[commonStyles.table]}>
                    {
                        _.map(impresionDiagnostica?.impresionDiagnostica, (value, key) => {
                            return (
                                <View style={commonStyles.tableRow} key={key}>
                                    <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '30%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{value?.codigo}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '70%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>{value?.descripcion.toUpperCase()}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
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
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '47%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>DESCRIPCION</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '8%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>CANTIDAD</Text>
                        </View>
                        <View style={[cvStyles.bodyTableCol, cvStyles.grayCell, { width: '35%' }]}>
                            <Text style={[commonStyles.tableCell, cvStyles.bodySubTitle]}>OBSERVACION</Text>
                        </View>
                    </View>

                    {
                        _.map(formulacionData, (value, key) => {
                            return (
                                <View style={commonStyles.tableRow} key={key}>
                                    <View style={[cvStyles.bodyTableCol, { width: '10%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodyText]}>{value?.consecutivo}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '47%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodyText, { textAlign: 'left', marginLeft: 1.2 }]}>
                                            {value?.servicio.toUpperCase()}
                                        </Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '8%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodyText]}>{value?.cantidad}</Text>
                                    </View>
                                    <View style={[cvStyles.bodyTableCol, { width: '35%' }]}>
                                        <Text style={[commonStyles.tableCell, cvStyles.bodyText, { textAlign: 'left', marginLeft: 1.2 }]}>
                                            {value?.descripcionManual.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>

                {/* FIRMAS  */}

                <Svg viewBox="0 0 220 100">
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

export default HistoriaClinicaPDF;
