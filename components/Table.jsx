import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Table({
    rows = [],
    columns = [],
    isCheckboxSelection = true,
    getRowsData
}) {
    const [selectionModel, setSelectionModel] = useState([]);

    const getSelectedRows = (selectionModel) => {
        const selectedRows = rows.filter(row => selectionModel.includes(row.id));
        getRowsData(selectedRows);
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                checkboxSelection={isCheckboxSelection}
                disableSelectionOnClick={!isCheckboxSelection}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                    getSelectedRows(newSelectionModel);
                }}
                selectionModel={selectionModel}
                rows={rows}
                columns={columns}
            />
        </div>
    );
}