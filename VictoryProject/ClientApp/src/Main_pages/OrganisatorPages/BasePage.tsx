import * as React from "react";

import {Contest, UserRoles} from "../../Additional/Types";
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
import {useState} from "react";


const tempContestData = (id:string) => {return( new Contest(
    id,
    "Название",
    "Заметки о конкурсе",
    "Начат",
    (Math.floor(Math.random()*3)) as UserRoles,
    new Date(Date.now()),
    new Date(Date.now() + 86400 * 1000),
    new Date(Date.now() + 86400 * 1000 * 20),
    new Date(Date.now() + 86400 * 1000 * 31)
))};

const useStyles = makeStyles((theme)=>createStyles({
    pageTitle:{
        backgroundColor: theme.palette.secondary.main ,
        width:"100%",
        height:"auto",
        paddingLeft:"20px",
        marginBottom:"20px"
    },
    color:{
        backgroundColor:"white"
    },
    controlTabs:{


        color: theme.palette.getContrastText(theme.palette.primary.light),
        backgroundColor: theme.palette.primary.light,
        alignItems:"center"
    },
    tab:{
        color: theme.palette.getContrastText(theme.palette.primary.light),
        opacity: 1
    }
}))

const generateTempData: Contest[] = [tempContestData("1"),tempContestData("2"),tempContestData("3"),
    tempContestData("4"),tempContestData("5"),tempContestData("6"),tempContestData("7"),tempContestData("8")]

const options = ["Архивировать конкурс", "Удалить конкурс"];

export const BasePage = (props: RouteComponentProps) => {

    useSidebar()
    
    const contestsSelector = useSelector(selectContests)
    
    
    const [createNew, setCreateNew] = React.useState(false);
    
    const [tab, setTab] = useState(1);
    const [contests, setContests] = useState(contestsSelector);
    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
        //TODO: фильтр опасный, не стоит опираться на магические числа
        setContests(contestsSelector.filter((item)=>{return item.role === newValue-1}))
    };
    
    const dispatch = useDispatch()
    dispatch(receive(generateTempData))
   
    const classes = useStyles()
    
    const handleCloseCreate = () => {
        setCreateNew(false)
    }
    
    React.useEffect(()=>{
        setContests(contestsSelector.filter((item)=>{return item.role === 0}))
    },[contestsSelector])
    return (

        <React.Fragment>

            <Dialog onClose={handleCloseCreate} aria-labelledby="simple-dialog-title" open={createNew}>
                <CreateContestModal close={handleCloseCreate}/>
            </Dialog>   

            <div className="mainPageContainer">
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
                            {options.map((element, index) => {
                                return (
                                    <span key={index} className="option">
                    {element}
                  </span>
                                );
                            })}
                        </div>
                        <div className="managementContainer">
                            
                            <Tabs value={tab} onChange={handleChangeTab} className={classes.controlTabs}>
                                <Typography style={{alignSelf:"center", padding:"0 0 5px 10px"}} variant={"h5"}>Фильтрация по роли</Typography>
                                <Tab className={classes.tab} label={"Организатор"}/>
                                <Tab className={classes.tab} label={"Участник"}/>
                                <Tab  className={classes.tab} label={"Эксперт"}/>
                            </Tabs>
                            {contests.map( (item) =>{
                                return <ContestCard key={item.id} contest={item} id={item.id.toString()}/>
                            })}
                        </div>
                    </div>
                    <Footer/>
                </main>
            </div>
        </React.Fragment>
    );
};
