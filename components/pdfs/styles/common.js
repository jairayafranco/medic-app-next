import { StyleSheet } from '@react-pdf/renderer';

const commonStyles = StyleSheet.create({
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: "center",
        fontSize: 10
    },
    page: {
        padding: 10,
    },
});

export default commonStyles;