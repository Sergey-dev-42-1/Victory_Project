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
        color: Theme.palette.getContrastText(Theme.palette.secondary.dark)
    }
}))

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Номер приглашения', flex: 0.2},
    {field: 'firstName', headerName: 'Имя', flex: 0.2},
    {field: 'lastName', headerName: 'Фамилия', flex: 0.2},
  
];

const rows = [
    {id: 1, lastName: 'Иванов', firstName: 'Иван',  accepted: "no"},
    {id: 2, lastName: 'Петров', firstName: 'Петр', accepted: "no"},
    {id: 3, lastName: 'Васильев', firstName: 'Василий',  accepted: "no"},
    {id: 4, lastName: 'Кириллов', firstName: 'Кирилл',  accepted: "yes"},
];
//0 - непринятые, 1 - принятые 2 - отклоненные
const filteringApplications = (rows: GridRowsProp, filter: number) => {
    return rows.filter((value) => {
            if (filter === 0) {
                return value.accepted === "no"
            } else if(filter === 1) {
                return value.accepted === "yes"
            }
        }
    )
}

export const ExpertsRubric = (props: RouteComponentProps) => {
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
                        <Tab label="Действующие эксперты"/>
                        <Tab label="Отправленные приглашения"/>
                    </Tabs>
                </Toolbar>
                <DataGrid className={classes.root} rows={applications} columns={columns} autoPageSize/>

            </Grid>
        </React.Fragment>
    )
}