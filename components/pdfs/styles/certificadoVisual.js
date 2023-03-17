import { StyleSheet } from '@react-pdf/renderer';

const cvStyles = StyleSheet.create({
    cabecera: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        fontSize: 15,
    },
    cabeceraContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid black",
        borderBottom: "none",
        marginTop: 10,
        padding: 10,
    },
    grayCell: {
        backgroundColor: "#F2F2F2",
    },
    cabeceraText: {
        fontSize: 10,
    },
    bodyTableCol: {
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    bodyTitle: {
        fontSize: 12,
        textAlign: "center",
    },
    bodySubTitle: {
        fontSize: 9,
    },
    bodyText: {
        fontSize: 9,
    },
    bodyTitleContainer: {
        border: "1px solid black",
        marginTop: 15,
        borderBottomWidth: 0,
        padding: 5
    }
});

export default cvStyles;