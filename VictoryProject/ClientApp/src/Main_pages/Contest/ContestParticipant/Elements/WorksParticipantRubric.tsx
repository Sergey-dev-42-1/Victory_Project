import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react";
import {createStyles, Grid, makeStyles, Tab, Tabs, Toolbar} from "@material-ui/core";
import {DataGrid, GridColDef, GridRowsProp, GridSortCellParams} from "@material-ui/data-grid";
import {Button} from "@material-ui/core/";

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
    }
}))

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Номер работы', flex: 0.2},
    {field: 'author', headerName: 'Автор', flex: 0.2},
    {
        field: 'assessed', headerName: 'Оценена?', flex: 0.2, renderCell: ((params) => (
            <React.Fragment>
                {params.value === "yes" && "Да"}
                {params.value === "no" && "Нет"}
                {params.value === "returned" && "Возвращена на доработку"}
            </React.Fragment>
        ))
    },
    {field: 'mark', headerName: 'Оценка', flex: 0.2},

];

const rows = [
    {id: 1, assessed: "no", mark: "-"},
    {id: 2, assessed: "yes", mark: "76/100"},
    {id: 3, assessed: "returned", mark: "-"},
    {id: 4, assessed: "yes", mark: "65/100"},
];

const filteringApplications = (rows: GridRowsProp, filter: number) => {
    return rows.filter((value) => {
            if (filter === 0) {
                return value.assessed === "yes"
            } else if (filter === 1) {
                return value.assessed === "no"
            }
            else if (filter === 2) {
                return value.assessed === "returned"
            }
        }
    )
}

function getShow(params: GridSortCellParams) {
    return params.getValue("assessed") ;
}

export const WorksParticipantRubric = (props: RouteComponentProps) => {
    const [tab, setTab] = useState(0);
    const [applications, setApplications] = useState(filteringApplications(rows, 0));

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
        setApplications(
            filteringApplications(rows, newValue)
        )
    };
    const handleCheckClick = (() => {
        alert("clicked")
    })
    const classes = useStyles();

    columns.push({
        field: '',
        headerName: '',
        flex: 0.2,
        align: "center",
        sortable: false,
        disableClickEventBubbling: true,
        disableColumnMenu: true,
        valueGetter: getShow,
        renderCell: ((params) => (
            <React.Fragment>
                {
                    params.value === "returned" && <Button variant={"contained"} onClick={handleCheckClick}>Просмотр</Button>
                }
            </React.Fragment>
        ))
    })

    return (
        <React.Fragment>
            <Grid className={classes.root}>

                <Toolbar className={classes.toolbar}>
                    <Tabs value={tab} onChange={handleChangeTab}>
                        <Tab label="Проверенные"/>
                        <Tab label="Непроверенные"/>
                        <Tab label="Непринятые"/>
                    </Tabs>
                </Toolbar>
                <DataGrid className={classes.root} rows={applications} columns={columns} autoPageSize/>

            </Grid>
        </React.Fragment>
    )
}