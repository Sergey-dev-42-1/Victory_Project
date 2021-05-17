import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react";
import {createStyles, Grid, makeStyles, Tab, Tabs, Toolbar} from "@material-ui/core";
import {DataGrid, GridColDef, GridRowsProp} from "@material-ui/data-grid";

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
        color: Theme.palette.getContrastText(Theme.palette.secondary.dark),
    },
    tabs:{
        flexGrow:1,
    }
}))

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Номер заявки', flex: 0.2},
    {field: 'contestName', headerName: 'Название конкурса', flex: 0.2},
    {field: 'status', headerName: 'Статус заявки', flex: 0.2},
    {field: '', headerName: '', flex: 0.2},
];

const rows = [
    {id: 1, contestName: 'Конкурс1', status: 'Принята'},
    {id: 2, contestName: 'Конкурс2', status: 'Рассматривается'},
    {id: 3, contestName: 'Конкурс3', status: 'Отклонена'},

];
//0 - непринятые, 1 - принятые 2 - отклоненные
const filteringApplications = (rows: GridRowsProp, filter: number) => {
    return rows.filter((value) => {
            if (filter === 0) {
                return true
            }
            return false
        }
    )
}


export const ApplicationsRubric = (props: RouteComponentProps) => {
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
                    <Tabs value={tab} className={classes.tabs} onChange={handleChangeTab}>
                        <Tab label="Поданные заявки"/>
                    </Tabs>
                </Toolbar>
                <DataGrid className={classes.root} rows={applications} columns={columns} autoPageSize/>

            </Grid>
        </React.Fragment>
    )
}