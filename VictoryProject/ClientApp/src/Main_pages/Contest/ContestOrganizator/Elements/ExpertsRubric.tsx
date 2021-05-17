import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react";

import {ExpertInviteForm} from "../../../../Forms/ContestForms/ExpertInviteForm";

import {Button, createStyles, Dialog, Grid, makeStyles, Tab, Tabs, Toolbar} from "@material-ui/core";
import {DataGrid, GridColDef, GridRowsProp} from "@material-ui/data-grid";
import {ConfirmationDialog} from "../../Elements/ConfirmationDialog";


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
    {field: 'id', headerName: 'Номер приглашения', flex: 0.2},
    {field: 'firstName', headerName: 'Имя', flex: 0.2},
    {field: 'lastName', headerName: 'Фамилия', flex: 0.2},
];

const rows = [
    {id: 1, lastName: 'Иванов', firstName: 'Иван',  acting: "no"},
    {id: 2, lastName: 'Петров', firstName: 'Петр', acting: "no"},
    {id: 3, lastName: 'Васильев', firstName: 'Василий',  acting: "no"},
    {id: 4, lastName: 'Кириллов', firstName: 'Кирилл',  acting: "yes"},
];

const filteringApplications = (rows: GridRowsProp, filter: number) => {
    return rows.filter((value) => {
            if (filter === 0) {
                return value.acting === "no"
            } else if(filter === 1) {
                return value.acting === "yes"
            }
            return false
        }
    )
}



export const ExpertsRubric = (props: RouteComponentProps) => {
    
    const [tab, setTab] = useState(0);
    const [applications, setApplications] = useState(filteringApplications(rows, 0));

    const [formOpen, setFormOpen] = useState(false);
    const [confDialogOpen, setConfDialogOpen] = useState(false);
    
    const toggleInviteExpert = () => {
        formOpen ? setFormOpen(false) : setFormOpen(true)
    }
    const onInviteSubmit = () =>{
        setConfDialogOpen(true)
    }
    
    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
        setApplications(
            filteringApplications(rows, newValue)
        )
    };
    
    const classes = useStyles();
    return (
        <React.Fragment>
            
            <ConfirmationDialog content={"Приглашение успешно отправлено, после принятия приглашения," +
            " эксперт появится во вкладке \"Эксперты\" "} open={confDialogOpen} setOpen={setConfDialogOpen}/>
            <Dialog onClose={toggleInviteExpert} aria-labelledby="simple-dialog-title" open={formOpen}>
                 <ExpertInviteForm setFormOpen={setFormOpen} onSubmit={onInviteSubmit}/>
            </Dialog>
            <Grid className={classes.root}>
                
                <Toolbar className={classes.toolbar}>
                    <Tabs value={tab} className={classes.tabs} onChange={handleChangeTab}>
                        <Tab label="Действующие эксперты"/>
                        <Tab label="Отправленные приглашения"/>
                    </Tabs>
                    <Button variant={"contained"} onClick={toggleInviteExpert} color={"primary"}>Пригласить эксперта</Button>
                </Toolbar>
                <DataGrid className={classes.root} rows={applications} columns={columns} autoPageSize/>

            </Grid>
        </React.Fragment>
    )
}