import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ columns = [], rows = [] }) {
    return (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
            />
        </div>
    );
}