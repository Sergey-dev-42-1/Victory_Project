import * as React from "react";
import {useState} from "react";

import {Contest} from "../../Additional/Types";
import {ContestCard} from "./Elements/ContestCard";
import {Sidebar, sidebarTypes} from "../../Main_components/Sidebar";
import {CreateContestModal} from "../../Forms/CreateContestModal";
import {Footer} from "../../Main_components/Footer";


import {useSidebar} from "../../hooks/useSidebar"
import {RouteComponentProps} from "@reach/router";

import {createStyles, Dialog, Paper} from "@material-ui/core";

import {receive, selectContests} from "../../state/contestSlice"
import {useDispatch, useSelector} from "react-redux";
import {makeStyles, Tab, Tabs, Typography} from "@material-ui/core/";


const tempContestData = (id: string) => {
    return {
        id: id,
        name: "Название",
        notes: "Заметки о конкурсе",
        status: "Начат",
        role: Math.floor(Math.random() * 3),
        dateBeginning: Date.now(),
        dateEnding: Date.now() + 86400 * 1000,
        applyDateBeginning: Date.now() + 86400 * 1000 * 20,
        applyDateEnding: Date.now() + 86400 * 1000 * 31,
    }
};

const useStyles = makeStyles((theme) => createStyles({
    pageTitle: {
        backgroundColor: theme.palette.secondary.main,
        width: "100%",
        height: "auto",
        paddingLeft: "20px",
        marginBottom: "20px"
    },
    color: {
        color: theme.palette.getContrastText(theme.palette.background.paper),
        backgroundColor: theme.palette.background.paper
    },
    controlTabs: {
        color: theme.palette.getContrastText(theme.palette.primary.light),
        backgroundColor: theme.palette.primary.light,
        alignItems: "center"
    },
    tab: {
        color: theme.palette.getContrastText(theme.palette.primary.light),
        opacity: 1
    }
}))

const generateTempData: object[] = [tempContestData("1"), tempContestData("2"), tempContestData("3"),
    tempContestData("4"), tempContestData("5"), tempContestData("6"), tempContestData("7"), tempContestData("8")]



export const BasePage = (props: RouteComponentProps) => {

    useSidebar()


    const contestsSelector = useSelector(selectContests)

    const [createNew, setCreateNew] = React.useState(false);

    const [deleteState, setDeleteState] = React.useState(false);

    const [tab, setTab] = useState(0);

    const [contests, setContests] = useState<Contest[] | null>(null);

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
        //TODO: фильтр опасный, не стоит опираться на магические числа
        setContests((contestsSelector as Contest[]).filter((item) => {
            return item.role === newValue
        }))
    };

    const dispatch = useDispatch()

    dispatch(receive(generateTempData))

    const classes = useStyles()

    const handleCloseCreate = () => {
        setCreateNew(false)
    }

    React.useEffect(() => {
        setContests((contestsSelector as Contest[]).filter((item) => {
            return item.role === 0
        }))
    }, [contestsSelector])
    return (

        <React.Fragment>

            <Dialog onClose={handleCloseCreate} aria-labelledby="simple-dialog-title" open={createNew}>
                <CreateContestModal close={handleCloseCreate}/>
            </Dialog>
            
            <Paper square elevation={0} className="mainPageContainer">
                <Sidebar type={sidebarTypes.Org}/>

                <main className="contentContainer">
                    <Paper elevation={0} square className={classes.pageTitle}>
                        <Typography className={classes.color} variant={"h3"}>Ваши конкурсы</Typography>
                    </Paper>
                    <div className="contestManagementContainer">

                        <div className="contestControls">
                            <div
                                onClick={() => {
                                    setCreateNew(true);
                                }}
                                className="option"
                            >
                                Создать новый конкурс
                            </div>
                            <div
                                onClick={() => {
                                    setDeleteState(!deleteState);
                                }}
                                className="option"
                            >
                                Удалить
                            </div>
                        </div>
                    
                        <div className="managementContainer">
                            <Tabs value={tab} onChange={handleChangeTab} className={classes.controlTabs}>
    
                                <Tab className={classes.tab} label={"Организатор"}/>
                                <Tab className={classes.tab} label={"Участник"}/>
                                <Tab className={classes.tab} label={"Эксперт"}/>
                            </Tabs>
                            {contests && contests.map((item) => {
                                return <ContestCard deleteState={deleteState} controls key={item.id} contest={item} id={item.id.toString()}/>
                            })}
                        </div>
                    </div>

                <Footer/>
            </main>
        </Paper>
</React.Fragment>
);
};
