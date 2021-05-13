import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react"
import {
    DataGrid,
    GridColDef,
    GridColumnMenuProps,
    gridColumnMenuStateSelector,
    GridRowsProp, GridSortCellParams
} from '@material-ui/data-grid';
import {AppBar, Button, createStyles, Grid, makeStyles, Tab, Tabs, Toolbar, Typography} from "@material-ui/core/";


const useStyles = makeStyles((Theme) => createStyles({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        flexGrow: 1,
    },
    toolbar: {
        backgroundColor: Theme.palette.secondary.dark,
        color: Theme.palette.getContrastText(Theme.palette.secondary.dark)
    },

}))

function getShow(params: GridSortCellParams) {
    return params.getValue('accepted') === "no" ;
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Номер заявки', flex: 0.2},
    {field: 'firstName', headerName: 'Имя', flex: 0.2},
    {field: 'lastName', headerName: 'Фамилия', flex: 0.2},
    {
        field: 'actions',
        align: "center",
        sortable: false,
        disableClickEventBubbling: true,
        disableColumnMenu: true,
        headerName: 'Действия',
        valueGetter: getShow,
        flex: 0.2,
        renderCell: (params) => {
            return (
                <React.Fragment>
                    {params.value &&
                        <React.Fragment><Button style={{marginRight: '8px', backgroundColor: "#5fcf3a"}} variant={"contained"}
                                         onClick={() => {
                                             alert("clicked")
                                         }}>Принять</Button>
                    <Button style={{marginRight: '8px', backgroundColor: "#de3e53"}} variant={"contained"}
                            onClick={() => {
                                alert("clicked")
                            }}>Отклонить</Button></React.Fragment>
                    }
                </React.Fragment>
            )
        }
    },
];

const rows = [
    {id: 1, lastName: 'Иванов', firstName: 'Иван', age: 35, accepted: "no"},
    {id: 2, lastName: 'Петров', firstName: 'Петр', age: 42, accepted: "no"},
    {id: 3, lastName: 'Сергеев', firstName: 'Сергей', age: 45, accepted: "declined"},
    {id: 4, lastName: 'Васильев', firstName: 'Василий', age: 16, accepted: "no"},
    {id: 5, lastName: 'Кириллов', firstName: 'Кирилл', age: 22, accepted: "yes"},

];
//0 - непринятые, 1 - принятые 2 - отклоненные
const filteringApplications = (rows: GridRowsProp, filter: number) => {
    return rows.filter((value) => {
            if (filter === 0) {
                return value.accepted === "no"
            } else if (filter === 1) {
                return value.accepted === "yes"
            } else {
                return value.accepted === "declined"
            }
        }
    )
}

export const ParticipantsRubric = (props: RouteComponentProps) => {
    const [tab, setTab] = useState(0);
    const [applications, setApplications] = useState(filteringApplications(rows, 0));
    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
        setApplications(
            filteringApplications(rows, newValue)
        )
    };
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid className={classes.root}>

                <Toolbar className={classes.toolbar}>
                    <Tabs value={tab} onChange={handleChangeTab}>
                        <Tab label="Нерассмотренные заявки"/>
                        <Tab label="Принятые заявки"/>
                        <Tab label="Отклоненные заявки"/>
                    </Tabs>
                </Toolbar>
                <DataGrid className={classes.root} rows={applications} columns={columns} autoPageSize/>

            </Grid>
        </React.Fragment>
    )
}