import React, {useState} from "react";

import {Contest, UserRoles} from "../../Additional/Types";

import {useHeader as hideHeader} from "../../hooks/useHeader";
import {useSidebar} from "../../hooks/useSidebar";

import {RouteComponentProps} from "@reach/router";
import {createStyles, Fab, Grid, makeStyles, ThemeProvider, Tooltip} from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import {hide, selectHeaderHide} from "../../state/headerSlice";
import {selectSidebarOpen} from "../../state/sidebarSlice";
import {selectContests} from "../../state/contestSlice"

import {useDispatch, useSelector} from "react-redux";

import {ContestHeader} from "./Elements/ContestHeader"
import {ContestRubricsOrganizator} from "./ContestOrganizator/ContestRubricsOrganizator";
import {ContestPagesOrganizator} from "./ContestOrganizator/ContestPagesOrganizator";
import {ContestRubricsExpert} from "./ContestExpert/ContestRubricsExpert"
import {ContestPagesExpert} from "./ContestExpert/ContestPagesExpert"
import {ContestRubricsParticipant} from "./ContestParticipant/ContestRubricsParticipant"
import {ContestPagesParticipant} from "./ContestParticipant/ContestPagesParticipant"

import {ContestFooter} from "./Elements/ContestFooter";

import {ContestContext} from "./Context/contestContext";

import {Sidebar, sidebarTypes} from "../../Main_components/Sidebar";

import {createMuiTheme} from "@material-ui/core/";
import {darkTheme} from "../../MaterialUI/Themes";
import {selectDarkTheme} from "../../state/themeSlice";

import {ruRU} from "@material-ui/data-grid";
import {HttpError} from "../../Extra_pages/HTTPErrorPage";

interface Props
    extends RouteComponentProps {
    id?: string;
}

const newTheme = createMuiTheme({

        palette: {
            primary: {
                main: "#4caf50",
                contrastText: '#ffffff',

            },
            secondary: {
                main: "#3d5afe",
            },
        }
    }, ruRU
);

const useStyles = makeStyles(() => (createStyles({
    contestPage: {
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
    },
    pageBody: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    Fab: {
        zIndex: 1100,
        position: "fixed",
        alignSelf: "flex-end",
        margin: "10px 0"
    }
})))

export const ContestPageManagement = (props: Props) => {
    useSidebar()
    hideHeader()
    const themeType = useSelector(selectDarkTheme)
    
    const [theme, setTheme] = useState(themeType ? darkTheme : newTheme);
    
    const dispatch = useDispatch()
    const classes = useStyles()


    
    const contests: Contest[] = useSelector(selectContests) as Contest[]
    console.log(contests)
    const contest = contests.find((item)=>{
        return item.Id.toString() === props.id!.toString()}
    )

    const sidebar = useSelector(selectSidebarOpen)
    const headerHidden = useSelector(selectHeaderHide)

    React.useEffect(()=>{setTheme(themeType ? darkTheme : newTheme)},[themeType])

    const handleToggleHeader = () => {
        dispatch(hide(!headerHidden));
    }


    return (
        //Для кастомизации, нужно доставать из темы свойства и делать отдельный ThemeProvider
        <React.Fragment>
            {contest && <React.Fragment>
                <Sidebar type={sidebarTypes.Org}/>
                <ThemeProvider theme={theme}>

                    <ContestContext.Provider value={contest!}>

                        <Grid color={"primary"} className={classes.contestPage}>

                            <Tooltip title={"Элементы управления"}>
                                <Fab color={"secondary"} onClick={() => {
                                    handleToggleHeader()
                                }}
                                     className={classes.Fab} disabled={sidebar}>

                                    {headerHidden ? <ExpandMoreIcon/> : <ExpandLessIcon/>}

                                </Fab>
                            </Tooltip>

                            <Grid color={"primary"} className={classes.pageBody}>
                                <ContestHeader/>
                                <Grid color={"primary"} container style={{flexGrow: 1}}>
                                    
                                    <React.Fragment>
                                        <ContestRubricsOrganizator/>
                                        <ContestPagesOrganizator setTheme={setTheme}/>
                                    </React.Fragment>
                                 
                                    {contest!.UserRoleContest === UserRoles.expert &&
                                    <React.Fragment>
                                        <ContestRubricsExpert/>
                                        <ContestPagesExpert/>
                                    </React.Fragment>
                                    }
                                    {contest!.UserRoleContest === UserRoles.participant &&
                                    <React.Fragment>
                                        <ContestRubricsParticipant/>
                                        <ContestPagesParticipant/>
                                    </React.Fragment>
                                    }
                                    <ContestFooter/>
                                </Grid>
                            </Grid>

                        </Grid>

                    </ContestContext.Provider>

                </ThemeProvider>
            </React.Fragment>
            }
            {!contest && <HttpError errorType={"HTTP 404"}
                                    errorMessage={"Выбранный вами конкурс не найден(возможно вы пытались перейти через адресную строку, аяяй)"}/>}
        </React.Fragment>
    );
}
