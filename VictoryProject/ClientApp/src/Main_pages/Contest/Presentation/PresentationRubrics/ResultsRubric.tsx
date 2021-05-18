import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react";
import {createStyles, Grid, makeStyles, Tab, Tabs, Toolbar} from "@material-ui/core";
import {DataGrid, GridColDef, GridSortCellParams} from "@material-ui/data-grid";


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
        justifyContent:"center"
    },
    tabIndicator: {
        display:"none"
    }
}))


function getPlace(params: GridSortCellParams) {
    const marks: any[] = []
    rows.forEach((item)=>{marks.push({id:item.id,mark:item.mark})})
    marks.sort((itemA,itemB)=>{return (itemB.mark >= itemA.mark ? 1 : -1)})
    return `${marks.findIndex((item)=>{return item.id === params.id}) + 1}`;

}

let columns: GridColDef[] = [
    {field: 'id', headerName: 'Номер работы', flex: 0.2},
    {field: 'author', headerName: 'Автор', flex: 0.2},
    {field: 'mark', headerName: 'Оценка', flex: 0.2},
    {field: "place", headerName: "Место", flex: 0.2, valueGetter:getPlace}
];

const rows = [
    {id: 1, author: 'Иванов', assessed: true, mark: 100},
    {id: 2, author: 'Петров', assessed: true, mark: 79},
    {id: 3, author: 'Смирнов', assessed: true, mark: 59},
    {id: 4, author: 'Сергеев', assessed: true, mark: 60},
];




export const ResultsRubric = (props:RouteComponentProps) => {
    const [tab, setTab] = useState(0);
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <Grid className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Tabs  TabIndicatorProps={{ className:classes.tabIndicator }} centered value={tab}>
                        <Tab disableRipple label="Результаты"/>
                    </Tabs>
                </Toolbar>
                <DataGrid className={classes.root} rows={rows} columns={columns} autoPageSize/>
            </Grid>
        </React.Fragment>
    )
}