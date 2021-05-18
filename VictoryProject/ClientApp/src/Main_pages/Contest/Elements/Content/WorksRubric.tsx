import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react";
import {createStyles, Dialog, Grid, makeStyles, Tab, Tabs, Toolbar} from "@material-ui/core";
import {DataGrid, GridColDef, GridRowsProp, GridSortCellParams} from "@material-ui/data-grid";
import {Button} from "@material-ui/core/";

import {ApplicationAssessForm} from "Forms/ContestForms/ApplicationAssessForm";
import {Application, ApplicationField, HTMLInputTypes} from "../../../../Additional/Types";

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
                {params.value as boolean && "Да"}
                {!params.value as boolean && "Нет"}
            </React.Fragment>
        ))
    },
    {field: 'mark', headerName: 'Оценка', flex: 0.2},

];

const rows = [
    {id: 1, author: 'Иванов', assessed: false, mark: "-"},
    {id: 2, author: 'Петров', assessed: true, mark: "76/100"},
    {id: 3, author: 'Смирнов', assessed: false, mark: "-"},
    {id: 4, author: 'Сергеев', assessed: false, mark: "-"},
];
//0 - непринятые, 1 - принятые 2 - отклоненные
const filteringApplications = (rows: GridRowsProp, filter: number) => {
    return rows.filter((value) => {
            if (filter === 0) {
                return !value.assessed
            } else if (filter === 1) {
                return value.assessed
            }
        }
    )
}

function getShow(params: GridSortCellParams) {
    return !params.getValue("assessed") ;
}
const fields : ApplicationField[] = [{type:HTMLInputTypes.text,limit:20,name:"Обоснование оценки",required:true},
    {type:HTMLInputTypes.number, limit:10,name:"Оценка",required:true}, {type:HTMLInputTypes.number, limit:100,name:"Оценка2",required:true}, {type:HTMLInputTypes.number, limit:5,name:"Оценка3",required:true}]
const TempApplication: Application = {fileUrl:"C:/Users/xo3ab/Desktop/RyzhikhSergey_KI17-14B.pdf",
    fields:fields
}

interface Props extends RouteComponentProps{
    hideAuthor?: boolean
}

export const WorksRubric = (props: Props) => {
    const [tab, setTab] = useState(0);

    if(props.hideAuthor){
        columns.splice(1,1)
    }
    
    const [applications, setApplications] = useState(filteringApplications(rows, 0));
    const [formOpen, setFormOpen] = useState(false);
    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
        setApplications(
            filteringApplications(rows, newValue)
        )
    };
    const handleCheckClick = (() => {
        setFormOpen(true)
    })
    const handleCloseClick = (() => {
        setFormOpen(false)
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
                    params.value && <Button variant={"contained"} onClick={handleCheckClick}>Проверить</Button>
                }
            </React.Fragment>
        ))
    })

    return (
        <React.Fragment>
            <Dialog onClose={handleCloseClick} aria-labelledby="simple-dialog-title" open={formOpen}>
                <ApplicationAssessForm Application={TempApplication} setFormOpen={setFormOpen}/>
            </Dialog>
            <Grid className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Tabs value={tab} onChange={handleChangeTab}>
                        <Tab label="Непроверенные"/>
                        <Tab label="Проверенные"/>
                    </Tabs>
                </Toolbar>
                <DataGrid className={classes.root} rows={applications} columns={columns} autoPageSize/>

            </Grid>
        </React.Fragment>
    )
}